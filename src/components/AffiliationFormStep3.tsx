import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import type { ResultadoPago } from "@/lib/pagos";

interface AffiliationFormStep3Props {
  pago: ResultadoPago;
  merchantName: string;
  cedula: string;
  canton: string;
  price: number;
  onReset: () => void;
}

export function AffiliationFormStep3({ pago, merchantName, cedula, canton, price, onReset }: AffiliationFormStep3Props) {
  const sinpe = pago.metodo === "sinpe";
  const fila = (k: string, v: string, clase = "text-ink") => (
    <div className="flex justify-between gap-4">
      <span className="text-text-muted">{k}:</span>
      <span className={`text-right ${clase}`}>{v}</span>
    </div>
  );

  return (
    <div id="wizard-success-card" className="space-y-5 text-center py-4">
      <div className="w-14 h-14 bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto rounded-full border border-emerald-200">
        <CheckCircle2 className="w-8 h-8" />
      </div>

      <div>
        <h3 className="font-serif text-2xl font-semibold text-ink">Transacción exitosa</h3>
        <p className="text-xs sm:text-sm text-ink-muted mt-1.5 max-w-md mx-auto leading-relaxed">
          Su afiliación quedó <strong>en aprobación por la Tesorería de la Cámara</strong>
          {sinpe ? ", que verificará su transferencia SINPE Móvil" : ""}. Cuando se apruebe, su empresa se incorpora al padrón oficial y al Directorio.
        </p>
      </div>

      <div id="wizard-comprobante" className="bg-surface border border-border p-6 rounded-xl text-left text-xs space-y-3 font-mono shadow-xs">
        <div className="text-center font-semibold text-ink border-b border-dashed border-border pb-3">
          <p className="font-serif text-sm tracking-wide">CÁMARA DE COMERCIO DE ALAJUELA</p>
          <span className="text-[11px] text-text-muted font-normal font-sans">CONSTANCIA DE SOLICITUD DE AFILIACIÓN · SIMULACIÓN ACADÉMICA</span>
        </div>
        <div className="pt-1 space-y-3">
          {fila("Radicado", pago.radicado, "font-semibold text-brand")}
          {fila("Estado", pago.estado, "font-semibold text-ink")}
          {fila("Método", sinpe ? "SINPE Móvil" : "Tarjeta · BAC Compra Click")}
          {fila(sinpe ? "Comprobante bancario" : "Tarjeta", pago.referencia)}
          {fila("Empresa", merchantName, "font-semibold text-ink")}
          {fila("Cédula", cedula)}
          {fila("Cantón", canton)}
          {fila("Cuota mensual", `₡${price.toLocaleString("es-CR")}`, "font-bold text-ink")}
          {fila("Fecha", new Date().toLocaleString("es-CR"))}
        </div>
        <div className="pt-2 border-t border-dashed border-border text-[11px] text-text-muted text-center font-sans">
          Gasto 100% deducible del Impuesto sobre la Renta conforme al marco tributario costarricense.
        </div>
      </div>

      <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
        <button type="button" onClick={onReset} className="btn-cca-secondary px-5 py-2.5 text-xs sm:text-sm">
          Registrar otra empresa
        </button>
        <Link href="/directorio" className="btn-cca-primary px-5 py-2.5 text-xs sm:text-sm">
          Ver Directorio Empresarial
        </Link>
      </div>
    </div>
  );
}
