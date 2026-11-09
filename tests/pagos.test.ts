/**
 * Suite de pruebas de la pasarela simulada (Cap. 13) · src/lib/pagos.ts
 * Ejecutar:  npm test
 * Cubre las 4 reglas de negocio del enunciado: (1) teléfono CR, (2) tarifas gremiales,
 * (3) anti-replay de comprobantes y (4) comprobante con respaldo fiscal, más la pasarela de tarjeta (BAC simulado).
 */
import { describe, test } from "node:test";
import assert from "node:assert/strict";
import {
  validarSinpe,
  validarTarjeta,
  validarMonto,
  procesarPago,
  huellaComprobante,
  luhn,
  TARIFAS,
  TARJETA_RECHAZO,
} from "../src/lib/pagos.ts";

const rapido = { demoraMs: 0 };
const pyme = { plan: "regular" as const, monto: TARIFAS.regular };

describe("Regla 1 · Teléfono SINPE Móvil de Costa Rica", () => {
  test("acepta un celular de 8 dígitos que inicia en 8", () => {
    assert.equal(validarSinpe("8812-3456", "20261108123").telefono, undefined);
  });
  test("acepta el prefijo internacional +506", () => {
    assert.equal(validarSinpe("+506 7012 3456", "20261108123").telefono, undefined);
  });
  test("rechaza un teléfono fijo (inicia en 2)", () => {
    assert.ok(validarSinpe("2440-1234", "20261108123").telefono);
  });
  test("rechaza un número de 7 dígitos", () => {
    assert.ok(validarSinpe("881-2345", "20261108123").telefono);
  });
});

describe("Formato del comprobante bancario", () => {
  test("rechaza un comprobante con letras", () => {
    assert.ok(validarSinpe("8812-3456", "SINPE-123").comprobante);
  });
  test("rechaza un comprobante de menos de 6 dígitos", () => {
    assert.ok(validarSinpe("8812-3456", "12345").comprobante);
  });
});

describe("Regla 2 · Tarifas gremiales", () => {
  test("acepta ₡15.000 para el plan Pyme / Comercial", () => {
    assert.equal(validarMonto("regular", 15000), null);
  });
  test("acepta ₡35.000 para el plan Corporativo", () => {
    assert.equal(validarMonto("corporativo", 35000), null);
  });
  test("rechaza un monto manipulado que no coincide con la tarifa", () => {
    assert.match(validarMonto("regular", 1500) ?? "", /no coincide/);
  });
  test("la pasarela rechaza el cobro si el monto no coincide con el plan", async () => {
    const r = await procesarPago("tarjeta", { numero: "4111111111111111", plan: "corporativo", monto: 15000 }, rapido);
    assert.equal(r.aprobado, false);
  });
});

describe("Regla 3 · Anti-replay de comprobantes SINPE", () => {
  test("acepta un comprobante nuevo", async () => {
    const r = await procesarPago("sinpe", { comprobante: "900000000001", ...pyme }, rapido);
    assert.equal(r.aprobado, true);
  });
  test("rechaza el mismo comprobante usado por segunda vez", async () => {
    await procesarPago("sinpe", { comprobante: "900000000002", ...pyme }, rapido);
    const r = await procesarPago("sinpe", { comprobante: "900000000002", ...pyme }, rapido);
    assert.equal(r.aprobado, false);
    assert.match(r.motivo ?? "", /duplicados/);
  });
  test("registra la huella SHA-256 del comprobante, no el número en claro", async () => {
    const h = await huellaComprobante("900000000003");
    assert.match(h, /^[0-9a-f]{64}$/);
    assert.ok(!h.includes("900000000003"));
    assert.equal(h, await huellaComprobante(" 900000000003 "));
  });
});

describe("Pasarela de tarjeta · BAC Compra Click (simulada)", () => {
  test("una tarjeta de prueba válida (4111…) pasa la validación", () => {
    assert.ok(luhn("4111 1111 1111 1111"));
    assert.deepEqual(validarTarjeta("4111 1111 1111 1111", "Ana Mora", "12/30", "123"), {});
  });
  test("un dígito alterado falla el algoritmo de Luhn", () => {
    assert.ok(validarTarjeta("4111 1111 1111 1112", "Ana Mora", "12/30", "123").numero);
  });
  test("rechaza una tarjeta vencida", () => {
    assert.match(validarTarjeta("4111 1111 1111 1111", "Ana Mora", "01/24", "123").vencimiento ?? "", /vencida/);
  });
  test("la tarjeta de prueba de rechazo es declinada por el banco", async () => {
    const r = await procesarPago("tarjeta", { numero: TARJETA_RECHAZO, ...pyme }, rapido);
    assert.equal(r.aprobado, false);
    assert.equal(r.estado, "RECHAZADO");
  });
});

describe("Regla 4 · Comprobante con respaldo fiscal", () => {
  test("un pago aceptado emite radicado, estado en aprobación, monto y nota de la Ley 7092", async () => {
    const r = await procesarPago("tarjeta", { numero: "4111111111111111", ...pyme }, rapido);
    assert.equal(r.aprobado, true);
    assert.match(r.radicado, /^CCA-\d{4}-\d{6}$/);
    assert.equal(r.estado, "EN APROBACIÓN · TESORERÍA CCA");
    assert.equal(r.monto, 15000);
    assert.match(r.notaFiscal ?? "", /7092/);
  });
});
