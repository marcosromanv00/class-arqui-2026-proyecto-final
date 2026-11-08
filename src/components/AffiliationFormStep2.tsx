import { Smartphone, AlertCircle, MessageSquare, ArrowRight } from "lucide-react";

interface AffiliationFormStep2Props {
  merchantName: string;
  cedula: string;
  plan: "regular" | "corporativo";
  price: number;
  comprobante: string;
  setComprobante: (val: string) => void;
  onBack: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function AffiliationFormStep2({
  merchantName,
  cedula,
  plan,
  price,
  comprobante,
  setComprobante,
  onBack,
  onSubmit
}: AffiliationFormStep2Props) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="bg-surface border border-border p-4 space-y-2 rounded-lg shadow-xs">
        <div className="flex justify-between items-center text-xs pb-2 border-b border-border">
          <span className="text-text-muted">Empresa:</span>
          <span className="font-semibold text-ink">{merchantName}</span>
        </div>
        <div className="flex justify-between items-center text-xs pb-2 border-b border-border">
          <span className="text-text-muted">Modalidad:</span>
          <span className="font-medium text-brand">
            {plan === "regular" ? "Comercio y Pyme" : "Empresa e Industria"}
          </span>
        </div>
        <div className="flex justify-between items-center text-sm pt-1">
          <span className="font-semibold text-ink">Cuota mensual asociativa:</span>
          <span className="font-serif font-bold text-ink text-xl">
            ₡{price.toLocaleString("es-CR")}
          </span>
        </div>
      </div>

      <div className="p-4 bg-surface border border-border rounded-lg space-y-2 shadow-xs">
        <span className="font-semibold text-xs text-ink flex items-center gap-1.5">
          <Smartphone className="w-4 h-4 text-brand" /> Transferencia SINPE Móvil oficial
        </span>
        <p className="text-xs text-ink-muted leading-relaxed">
          Realice la transferencia por <strong>₡{price.toLocaleString("es-CR")}</strong> al número de tesorería institucional:
        </p>
        <div className="flex items-center justify-between bg-surface-muted px-4 py-2.5 rounded-md border border-border">
          <span className="text-base font-mono font-bold text-ink">
            +506 8703-0792
          </span>
          <span className="text-xs font-semibold text-brand bg-brand/5 px-2.5 py-1 rounded-sm border border-brand/20">
            Cámara de Comercio de Alajuela
          </span>
        </div>
      </div>

      <div>
        <label htmlFor="wizard-input-comprobante" className="block text-xs font-medium text-ink mb-1">
          Número de comprobante bancario *
        </label>
        <input
          id="wizard-input-comprobante"
          type="text"
          required
          value={comprobante}
          onChange={(e) => setComprobante(e.target.value)}
          placeholder="Ej. 2026098124"
          className="w-full px-3.5 py-2.5 text-sm bg-surface border border-border rounded-lg text-ink focus:border-brand focus:outline-hidden font-mono"
        />
        <span className="text-xs text-text-muted flex items-center gap-1.5 mt-1.5">
          <AlertCircle className="w-3.5 h-3.5 text-text-muted shrink-0" />
          <span>Verificación automática por el departamento de tesorería y contabilidad.</span>
        </span>
      </div>

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

      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onBack}
          className="btn-cca-secondary w-1/3 py-2.5 text-xs sm:text-sm"
        >
          Regresar
        </button>
        <button
          id="wizard-step2-submit"
          type="submit"
          className="btn-cca-primary w-2/3 py-2.5 text-xs sm:text-sm flex items-center justify-center gap-2"
        >
          <span>Completar solicitud</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
}
