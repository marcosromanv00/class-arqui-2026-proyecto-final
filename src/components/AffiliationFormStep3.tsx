import { Receipt, CheckCircle2 } from "lucide-react";

interface AffiliationFormStep3Props {
  comprobante: string;
  merchantName: string;
  cedula: string;
  canton: string;
  price: number;
  onReset: () => void;
}

export function AffiliationFormStep3({
  comprobante,
  merchantName,
  cedula,
  canton,
  price,
  onReset,
}: AffiliationFormStep3Props) {
  return (
    <div id="wizard-success-card" className="space-y-5 text-center py-4">
      <div className="w-14 h-14 bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto rounded-full border border-emerald-200">
        <CheckCircle2 className="w-8 h-8" />
      </div>

      <div>
        <h3 className="font-serif text-2xl font-semibold text-ink">
          Solicitud de afiliación registrada
        </h3>
        <p className="text-xs sm:text-sm text-ink-muted mt-1.5 max-w-md mx-auto leading-relaxed">
          Su solicitud ha ingresado para verificación de tesorería e incorporación al padrón oficial de la Cámara de Comercio de Alajuela.
        </p>
      </div>

      <div className="bg-surface border border-border p-6 rounded-xl text-left text-xs space-y-3 font-mono shadow-xs">
        <div className="text-center font-semibold text-ink border-b border-dashed border-border pb-3">
          <p className="font-serif text-sm tracking-wide">CÁMARA DE COMERCIO DE ALAJUELA</p>
          <span className="text-[11px] text-text-muted font-normal font-sans">
            CONSTANCIA OFICIAL DE AFILIACIÓN · ART. 8 LEY N.° 7092
          </span>
        </div>
        <div className="flex justify-between pt-1">
          <span className="text-text-muted">Comprobante bancario:</span>
          <span className="font-semibold text-brand">{comprobante}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-text-muted">Empresa:</span>
          <span className="font-semibold text-ink">{merchantName}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-text-muted">Cédula:</span>
          <span className="text-ink">{cedula}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-text-muted">Cantón:</span>
          <span className="text-ink">{canton}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-text-muted">Cuota mensual:</span>
          <span className="font-bold text-ink">
            ₡{price.toLocaleString("es-CR")}
          </span>
        </div>
        <div className="pt-2 border-t border-dashed border-border text-[11px] text-text-muted text-center font-sans">
          Gasto 100% deducible del Impuesto sobre la Renta conforme al marco tributario costarricense.
        </div>
      </div>

      <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          type="button"
          onClick={onReset}
          className="btn-cca-secondary px-5 py-2.5 text-xs sm:text-sm"
        >
          Registrar otra empresa
        </button>
        <a
          href="#directorio"
          className="btn-cca-primary px-5 py-2.5 text-xs sm:text-sm"
        >
          Ver Directorio Empresarial
        </a>
      </div>
    </div>
  );
}
