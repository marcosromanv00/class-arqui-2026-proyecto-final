import { Receipt } from "lucide-react";

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
  onReset
}: AffiliationFormStep3Props) {
  return (
    <div id="wizard-success-card" className="space-y-5 text-center py-4">
      <div className="w-14 h-14 bg-neutral-100 text-[#991b1b] flex items-center justify-center mx-auto border border-neutral-300">
        <Receipt className="w-7 h-7" />
      </div>

      <div>
        <h3 className="text-2xl font-bold text-[#09090b]">
          ¡Afiliación Confirmada Exitosamente!
        </h3>
        <p className="text-xs text-neutral-600 mt-1 max-w-md mx-auto">
          Su comercio ha sido incorporado al Directorio Oficial y al Registro Gremial de la Cámara de Comercio de Alajuela.
        </p>
      </div>

      {/* Comprobante Digital con Estilo Ticket Minimalista */}
      <div className="bg-[#f9fafb] border border-neutral-300 p-5 text-left text-xs space-y-2.5 font-mono">
        <div className="text-center font-bold text-[#09090b] border-b border-dashed border-neutral-300 pb-2">
          CÁMARA DE COMERCIO DE ALAJUELA<br />
          <span className="text-[10px] text-neutral-500 font-normal">COMPROBANTE DE AFILIACIÓN GREMIAL · LEY 7092</span>
        </div>
        <div className="flex justify-between pt-1">
          <span className="text-neutral-500">Radicado:</span>
          <span className="font-bold text-[#991b1b]">{comprobante}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-neutral-500">Comercio:</span>
          <span className="font-bold text-[#09090b]">{merchantName}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-neutral-500">Cédula:</span>
          <span className="text-neutral-900">{cedula}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-neutral-500">Cantón:</span>
          <span className="text-neutral-900">{canton}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-neutral-500">Cuota:</span>
          <span className="font-bold text-[#09090b]">₡{price.toLocaleString("es-CR")}</span>
        </div>
        <div className="pt-2 border-t border-dashed border-neutral-300 text-[10px] text-neutral-500 text-center leading-relaxed">
          Gasto deducible del impuesto sobre la renta según Artículo 8 de la Ley 7092. Conserve este radicado para su formulario D-101.
        </div>
      </div>

      <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          type="button"
          onClick={onReset}
          className="border border-neutral-300 hover:bg-neutral-100 px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors"
        >
          Afiliar otro comercio
        </button>
        <a
          href="#directorio"
          className="bg-[#09090b] hover:bg-neutral-800 text-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors"
        >
          Ver en el Directorio
        </a>
      </div>
    </div>
  );
}

