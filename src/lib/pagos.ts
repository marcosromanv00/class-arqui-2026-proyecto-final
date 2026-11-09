/**
 * Pasarela de pagos SIMULADA (prototipo académico, Cap. 13). No mueve dinero.
 *
 * - SINPE Móvil: valida formato (celular CR de 8 dígitos, comprobante de 6 a 14 dígitos)
 *   y anti-replay: un comprobante ya usado se rechaza. Basado en tools/10_ecommerce_pagos/sinpe_movil_validator.js.
 * - Tarjeta (BAC Compra Click simulado): valida formato (Luhn, vencimiento, CVV) y aprueba
 *   todas las tarjetas válidas EXCEPTO la tarjeta de prueba de rechazo, igual que los
 *   "test cards" de las pasarelas reales.
 */

export const TARJETA_RECHAZO = "4000000000000002";
export const SINPE_DESTINO = "8703-0792"; // número de Tesorería que usa el portal (mismo del WhatsApp de contacto)

export type Metodo = "sinpe" | "tarjeta";

export interface ResultadoPago {
  aprobado: boolean;
  metodo: Metodo;
  radicado: string;
  referencia: string;
  estado: string;
  motivo?: string;
  monto?: number;
  notaFiscal?: string;
}

const soloDigitos = (s = "") => s.replace(/\D/g, "");

/** Algoritmo de Luhn: detecta números de tarjeta mal digitados */
export function luhn(numero: string) {
  const d = soloDigitos(numero);
  if (d.length < 13 || d.length > 19) return false;
  let suma = 0;
  for (let i = 0; i < d.length; i++) {
    let n = Number(d[d.length - 1 - i]);
    if (i % 2 === 1) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    suma += n;
  }
  return suma % 10 === 0;
}

export function validarSinpe(telefono: string, comprobante: string) {
  const errores: Record<string, string> = {};
  const tel = soloDigitos(telefono).replace(/^506/, "");
  if (!/^[678]\d{7}$/.test(tel)) errores.telefono = "Debe ser un celular costarricense de 8 dígitos (inicia en 6, 7 u 8).";
  if (!/^\d{6,14}$/.test(comprobante.trim())) errores.comprobante = "El comprobante del banco es numérico, de 6 a 14 dígitos.";
  return errores;
}

export function validarTarjeta(numero: string, nombre: string, vencimiento: string, cvv: string) {
  const errores: Record<string, string> = {};
  if (!luhn(numero)) errores.numero = "Número de tarjeta inválido. Revise los dígitos.";
  if (nombre.trim().length < 3) errores.nombre = "Escriba el nombre como aparece en la tarjeta.";
  const m = vencimiento.match(/^(\d{2})\s*\/\s*(\d{2})$/);
  if (!m || Number(m[1]) < 1 || Number(m[1]) > 12) errores.vencimiento = "Use el formato MM/AA.";
  else {
    const fin = new Date(2000 + Number(m[2]), Number(m[1]), 1); // primer día del mes siguiente
    if (fin <= new Date()) errores.vencimiento = "La tarjeta está vencida.";
  }
  if (!/^\d{3,4}$/.test(cvv)) errores.cvv = "El CVV tiene 3 o 4 dígitos.";
  return errores;
}

// --- Regla 2: tarifas gremiales oficiales del prototipo
export type Plan = "regular" | "corporativo";
export const TARIFAS: Record<Plan, number> = { regular: 15000, corporativo: 35000 };

/** El monto cobrado debe coincidir EXACTAMENTE con la tarifa del plan (evita montos manipulados en el navegador) */
export function validarMonto(plan: Plan, monto: number): string | null {
  const esperado = TARIFAS[plan];
  if (esperado === undefined) return "Plan de afiliación desconocido.";
  if (monto !== esperado) return `El monto (₡${monto.toLocaleString("es-CR")}) no coincide con la tarifa del plan (₡${esperado.toLocaleString("es-CR")}).`;
  return null;
}

// --- Regla 3: anti-replay de comprobantes SINPE.
// Se guarda la HUELLA SHA-256 del comprobante, no el número en claro. En el prototipo el registro
// vive en el navegador (localStorage, con respaldo en memoria); en producción estaría en la base de datos de Tesorería.
const CLAVE = "cca-sinpe-huellas";
const memoria = new Set<string>();

export async function huellaComprobante(comprobante: string): Promise<string> {
  const datos = new TextEncoder().encode(`SINPE:${comprobante.trim()}`);
  const hash = await globalThis.crypto.subtle.digest("SHA-256", datos);
  return Array.from(new Uint8Array(hash), (b) => b.toString(16).padStart(2, "0")).join("");
}

function usados(): Set<string> {
  const s = new Set(memoria);
  try {
    (JSON.parse(globalThis.localStorage?.getItem(CLAVE) || "[]") as string[]).forEach((h) => s.add(h));
  } catch {
    /* sin almacenamiento persistente */
  }
  return s;
}
function registrar(huella: string) {
  memoria.add(huella);
  try {
    globalThis.localStorage?.setItem(CLAVE, JSON.stringify([...usados()]));
  } catch {
    /* sin almacenamiento: queda solo en memoria */
  }
}

// --- Regla 4: comprobante con respaldo fiscal
// Ley 7092, art. 8: ningún inciso menciona cuotas a cámaras (el inciso i) se refiere a cuotas PATRONALES).
// La deducibilidad depende del criterio general de gasto necesario para producir renta gravable.
export const NOTA_FISCAL =
  "Respaldo para su contabilidad. La cuota puede deducirse si constituye un gasto necesario para producir renta gravable (Ley N.º 7092, art. 8); confírmelo con su contador.";

const nuevoRadicado = () => `CCA-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
const espera = (ms: number) => new Promise((ok) => setTimeout(ok, ms));
const rechazo = (metodo: Metodo, referencia: string, motivo: string): ResultadoPago => ({
  aprobado: false, metodo, radicado: nuevoRadicado(), referencia, estado: "RECHAZADO", motivo,
});

/** Simula la respuesta del banco (≈1,2 s por defecto; las pruebas usan demoraMs: 0) */
export async function procesarPago(
  metodo: Metodo,
  datos: { comprobante?: string; numero?: string; plan: Plan; monto: number },
  opciones: { demoraMs?: number } = {}
): Promise<ResultadoPago> {
  await espera(opciones.demoraMs ?? 1200);

  const errorMonto = validarMonto(datos.plan, datos.monto);
  if (errorMonto) return rechazo(metodo, "—", errorMonto);

  const exito = (referencia: string): ResultadoPago => ({
    aprobado: true, metodo, radicado: nuevoRadicado(), referencia, estado: "EN APROBACIÓN · TESORERÍA CCA",
    monto: datos.monto, notaFiscal: NOTA_FISCAL,
  });

  if (metodo === "sinpe") {
    const c = (datos.comprobante ?? "").trim();
    const huella = await huellaComprobante(c);
    if (usados().has(huella)) {
      return rechazo(metodo, c, `El comprobante ${c} ya fue registrado para otra afiliación. No se permiten comprobantes duplicados.`);
    }
    registrar(huella);
    return exito(c);
  }

  const n = soloDigitos(datos.numero);
  const ultimos = `**** ${n.slice(-4)}`;
  if (n === TARJETA_RECHAZO) {
    return rechazo(metodo, ultimos, "El banco emisor rechazó la transacción (fondos insuficientes). Intente con otra tarjeta o pague por SINPE Móvil.");
  }
  const autorizacion = String(Math.floor(100000 + Math.random() * 900000));
  return exito(`${ultimos} · Aut. ${autorizacion}`);
}
