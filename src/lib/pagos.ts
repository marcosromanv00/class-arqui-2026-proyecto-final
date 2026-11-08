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

// --- Anti-replay de comprobantes SINPE (en el prototipo vive en el navegador; en producción, en la base de datos de Tesorería)
const CLAVE = "cca-sinpe-comprobantes";
function usados(): Set<string> {
  try {
    return new Set(JSON.parse(localStorage.getItem(CLAVE) || "[]"));
  } catch {
    return new Set();
  }
}
function registrar(c: string) {
  try {
    const s = usados();
    s.add(c);
    localStorage.setItem(CLAVE, JSON.stringify([...s]));
  } catch {
    /* sin almacenamiento: el anti-replay no persiste */
  }
}

const nuevoRadicado = () => `CCA-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
const espera = (ms: number) => new Promise((ok) => setTimeout(ok, ms));

/** Simula la respuesta del banco (≈1,2 s) */
export async function procesarPago(
  metodo: Metodo,
  datos: { comprobante?: string; numero?: string }
): Promise<ResultadoPago> {
  await espera(1200);
  const radicado = nuevoRadicado();

  if (metodo === "sinpe") {
    const c = datos.comprobante!.trim();
    if (usados().has(c)) {
      return { aprobado: false, metodo, radicado, referencia: c, estado: "RECHAZADO", motivo: `El comprobante ${c} ya fue registrado para otra afiliación. No se permiten comprobantes duplicados.` };
    }
    registrar(c);
    return { aprobado: true, metodo, radicado, referencia: c, estado: "EN APROBACIÓN · TESORERÍA CCA" };
  }

  const n = soloDigitos(datos.numero);
  const ultimos = `**** ${n.slice(-4)}`;
  if (n === TARJETA_RECHAZO) {
    return { aprobado: false, metodo, radicado, referencia: ultimos, estado: "RECHAZADO", motivo: "El banco emisor rechazó la transacción (fondos insuficientes). Intente con otra tarjeta o pague por SINPE Móvil." };
  }
  const autorizacion = String(Math.floor(100000 + Math.random() * 900000));
  return { aprobado: true, metodo, radicado, referencia: `${ultimos} · Aut. ${autorizacion}`, estado: "EN APROBACIÓN · TESORERÍA CCA" };
}
