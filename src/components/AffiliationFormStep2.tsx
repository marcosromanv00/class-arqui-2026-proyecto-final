"use client";

import { useState } from "react";
import { Smartphone, CreditCard, AlertCircle, MessageSquare, ArrowRight, Loader2, FlaskConical } from "lucide-react";
import { Metodo, ResultadoPago, SINPE_DESTINO, TARJETA_RECHAZO, procesarPago, validarSinpe, validarTarjeta } from "@/lib/pagos";

interface AffiliationFormStep2Props {
  merchantName: string;
  cedula: string;
  plan: "regular" | "corporativo";
  price: number;
  phone: string;
  onBack: () => void;
  onResult: (r: ResultadoPago) => void;
}

const inputBase = "w-full px-3.5 py-2.5 text-sm bg-surface border rounded-lg text-ink focus:outline-hidden font-mono";

function Campo({ id, etiqueta, error, children }: { id: string; etiqueta: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-medium text-ink mb-1">{etiqueta}</label>
      {children}
      {error && (
        <span id={`${id}-error`} className="text-xs text-brand flex items-center gap-1.5 mt-1.5">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {error}
        </span>
      )}
    </div>
  );
}

const agrupar = (v: string) => v.replace(/\D/g, "").slice(0, 19).replace(/(\d{4})(?=\d)/g, "$1 ");

export function AffiliationFormStep2({ merchantName, cedula, plan, price, phone, onBack, onResult }: AffiliationFormStep2Props) {
  const [metodo, setMetodo] = useState<Metodo>("sinpe");
  const [telefono, setTelefono] = useState(phone);
  const [comprobante, setComprobante] = useState("");
  const [numero, setNumero] = useState("");
  const [nombre, setNombre] = useState("");
  const [vencimiento, setVencimiento] = useState("");
  const [cvv, setCvv] = useState("");
  const [errores, setErrores] = useState<Record<string, string>>({});
  const [rechazo, setRechazo] = useState<string | null>(null);
  const [procesando, setProcesando] = useState(false);

  const cambiarMetodo = (m: Metodo) => {
    setMetodo(m);
    setErrores({});
    setRechazo(null);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRechazo(null);
    const errs = metodo === "sinpe" ? validarSinpe(telefono, comprobante) : validarTarjeta(numero, nombre, vencimiento, cvv);
    setErrores(errs);
    if (Object.keys(errs).length) return;

    setProcesando(true);
    const r = await procesarPago(metodo, { comprobante, numero });
    setProcesando(false);
    if (r.aprobado) onResult(r);
    else setRechazo(r.motivo ?? "Pago rechazado.");
  };

  const borde = (campo: string) => (errores[campo] ? "border-brand" : "border-border focus:border-brand");

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      {/* Aviso de simulación */}
      <div id="wizard-aviso-simulacion" className="flex items-start gap-2 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-950">
        <FlaskConical className="w-4 h-4 shrink-0 mt-px text-amber-700" />
        <span>
          <strong>Prototipo académico:</strong> esta pasarela es una simulación. No realice transferencias reales ni use datos de su tarjeta.
        </span>
      </div>

      {/* Resumen */}
      <div className="bg-surface border border-border p-4 space-y-2 rounded-lg shadow-xs">
        <div className="flex justify-between items-center text-xs pb-2 border-b border-border">
          <span className="text-text-muted">Empresa:</span>
          <span className="font-semibold text-ink">{merchantName}</span>
        </div>
        <div className="flex justify-between items-center text-xs pb-2 border-b border-border">
          <span className="text-text-muted">Modalidad:</span>
          <span className="font-medium text-brand">{plan === "regular" ? "Comercio y Pyme" : "Empresa e Industria"}</span>
        </div>
        <div className="flex justify-between items-center text-sm pt-1">
          <span className="font-semibold text-ink">Cuota mensual asociativa:</span>
          <span className="font-serif font-bold text-ink text-xl">₡{price.toLocaleString("es-CR")}</span>
        </div>
      </div>

      {/* Selector de método */}
      <div role="tablist" aria-label="Método de pago" className="grid grid-cols-2 gap-2 p-1 rounded-lg bg-surface-muted border border-border">
        {([
          ["sinpe", "SINPE Móvil", Smartphone],
          ["tarjeta", "Tarjeta (BAC)", CreditCard],
        ] as const).map(([m, t, Icon]) => (
          <button
            key={m}
            id={`wizard-metodo-${m}`}
            type="button"
            role="tab"
            aria-selected={metodo === m}
            onClick={() => cambiarMetodo(m)}
            className={`py-2 rounded-md text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
              metodo === m ? "bg-surface text-brand border border-border shadow-xs" : "text-ink-muted hover:text-ink"
            }`}
          >
            <Icon className="w-4 h-4" /> {t}
          </button>
        ))}
      </div>

      {metodo === "sinpe" ? (
        <>
          <div className="p-4 bg-surface border border-border rounded-lg space-y-2 shadow-xs">
            <span className="font-semibold text-xs text-ink flex items-center gap-1.5">
              <Smartphone className="w-4 h-4 text-brand" /> Transferencia SINPE Móvil oficial
            </span>
            <p className="text-xs text-ink-muted leading-relaxed">
              Realice la transferencia por <strong>₡{price.toLocaleString("es-CR")}</strong> al número de tesorería institucional:
            </p>
            <div className="flex items-center justify-between bg-surface-muted px-4 py-2.5 rounded-md border border-border">
              <span className="text-base font-mono font-bold text-ink">+506 {SINPE_DESTINO}</span>
              <button
                type="button"
                onClick={() => navigator.clipboard?.writeText(SINPE_DESTINO.replace(/\D/g, ""))}
                title="Copiar número SINPE Móvil"
                className="text-xs text-brand hover:underline font-medium bg-brand/5 px-2.5 py-1 rounded border border-brand/20 transition-colors"
              >
                Copiar número
              </button>
            </div>
          </div>
          <Campo id="wizard-input-telefono" etiqueta="Celular desde el que pagó *" error={errores.telefono}>
            <input id="wizard-input-telefono" inputMode="numeric" value={telefono} onChange={(e) => setTelefono(e.target.value)} placeholder="Ej. 8812-3456" className={`${inputBase} ${borde("telefono")}`} />
          </Campo>
          <Campo id="wizard-input-comprobante" etiqueta="Número de comprobante bancario *" error={errores.comprobante}>
            <input
              id="wizard-input-comprobante"
              inputMode="numeric"
              value={comprobante}
              onChange={(e) => setComprobante(e.target.value.replace(/\D/g, "").slice(0, 14))}
              placeholder="Ej. 2026098124"
              className={`${inputBase} ${borde("comprobante")}`}
            />
          </Campo>

          {/* Opción asistida por WhatsApp */}
          <div className="p-3.5 bg-surface border border-border rounded-lg text-xs space-y-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="font-medium text-ink flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>¿Desea enviar el comprobante directamente por WhatsApp?</span>
              </span>
              <a
                id="wizard-whatsapp-assisted"
                href={`https://wa.me/50687030792?text=Hola%20Administraci%C3%B3n%20CCA,%20adjunto%20el%20comprobante%20de%20afiliaci%C3%B3n%20para%20la%20empresa%20${encodeURIComponent(merchantName)}%20(C%C3%A9dula%20${encodeURIComponent(cedula)}).`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cca-secondary px-3 py-1 text-xs shrink-0 inline-flex items-center justify-center"
              >
                Enviar por WhatsApp
              </a>
            </div>
          </div>
        </>
      ) : (
        <div className="space-y-3">
          <Campo id="wizard-input-tarjeta" etiqueta="Número de tarjeta *" error={errores.numero}>
            <input id="wizard-input-tarjeta" inputMode="numeric" autoComplete="off" value={numero} onChange={(e) => setNumero(agrupar(e.target.value))} placeholder="0000 0000 0000 0000" className={`${inputBase} ${borde("numero")}`} />
          </Campo>
          <Campo id="wizard-input-nombre" etiqueta="Nombre en la tarjeta *" error={errores.nombre}>
            <input id="wizard-input-nombre" autoComplete="off" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Como aparece en la tarjeta" className={`${inputBase} ${borde("nombre")} font-sans`} />
          </Campo>
          <div className="grid grid-cols-2 gap-3">
            <Campo id="wizard-input-vencimiento" etiqueta="Vence (MM/AA) *" error={errores.vencimiento}>
              <input
                id="wizard-input-vencimiento"
                inputMode="numeric"
                autoComplete="off"
                value={vencimiento}
                onChange={(e) => {
                  const d = e.target.value.replace(/\D/g, "").slice(0, 4);
                  setVencimiento(d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d);
                }}
                placeholder="MM/AA"
                className={`${inputBase} ${borde("vencimiento")}`}
              />
            </Campo>
            <Campo id="wizard-input-cvv" etiqueta="CVV *" error={errores.cvv}>
              <input id="wizard-input-cvv" inputMode="numeric" autoComplete="off" value={cvv} onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))} placeholder="123" className={`${inputBase} ${borde("cvv")}`} />
            </Campo>
          </div>
          <details className="text-xs text-text-muted">
            <summary className="cursor-pointer font-medium">Tarjetas de prueba</summary>
            <p className="mt-1">Cualquier número válido se aprueba (ej. 4111 1111 1111 1111). La tarjeta {agrupar(TARJETA_RECHAZO)} simula un rechazo del banco.</p>
          </details>
        </div>
      )}

      {rechazo && (
        <div id="wizard-pago-rechazado" role="alert" className="p-3 rounded-lg bg-brand/5 border border-brand/20 text-xs text-brand flex items-start gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 mt-px" />
          <span><strong>Pago rechazado.</strong> {rechazo}</span>
        </div>
      )}

      <div className="flex gap-3 pt-2">
        <button type="button" onClick={onBack} disabled={procesando} className="btn-cca-secondary w-1/3 py-2.5 text-xs sm:text-sm disabled:opacity-50">
          Regresar
        </button>
        <button id="wizard-step2-submit" type="submit" disabled={procesando} className="btn-cca-primary w-2/3 py-2.5 text-xs sm:text-sm flex items-center justify-center gap-2 disabled:opacity-70">
          {procesando ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> {metodo === "sinpe" ? "Verificando comprobante..." : "Procesando con BAC..."}
            </>
          ) : (
            <>
              <span>{metodo === "sinpe" ? "Completar solicitud" : `Pagar ₡${price.toLocaleString("es-CR")}`}</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
