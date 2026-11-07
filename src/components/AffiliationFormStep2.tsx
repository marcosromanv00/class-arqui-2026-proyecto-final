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
      {/* Resumen del Pedido */}
      <div className="bg-neutral-50 border border-neutral-200 p-4 space-y-2">
        <div className="flex justify-between items-center text-xs pb-2 border-b border-neutral-200">
          <span className="text-neutral-500">Comercio Solicitante:</span>
          <span className="font-bold text-[#09090b]">{merchantName}</span>
        </div>
        <div className="flex justify-between items-center text-xs pb-2 border-b border-neutral-200">
          <span className="text-neutral-500">Plan Seleccionado:</span>
          <span className="font-bold text-[#991b1b] uppercase tracking-wider text-[11px]">
            {plan === "regular" ? "Pyme / Comercial (₡15.000)" : "Corporativo (₡35.000)"}
          </span>
        </div>
        <div className="flex justify-between items-center text-sm pt-1">
          <span className="font-bold text-[#09090b]">Total Arancel Mensual:</span>
          <span className="font-extrabold text-[#09090b] font-mono text-lg">
            ₡{price.toLocaleString("es-CR")}
          </span>
        </div>
      </div>

      {/* Datos SINPE Oficiales */}
      <div className="p-4 bg-white border border-neutral-300 space-y-2">
        <span className="font-bold text-xs text-[#09090b] uppercase tracking-wider flex items-center gap-1.5">
          <Smartphone className="w-4 h-4 text-[#991b1b]" /> Instrucciones SINPE Móvil Oficial CCA
        </span>
        <p className="text-xs text-neutral-600 leading-relaxed">
          Realice la transferencia por <strong>₡{price.toLocaleString("es-CR")}</strong> al número oficial de tesorería:
        </p>
        <div className="flex items-center justify-between bg-neutral-100 px-3 py-2 border border-neutral-200">
          <span className="text-lg font-mono font-bold text-[#09090b]">
            +506 8703-0792
          </span>
          <span className="text-[11px] font-semibold text-[#991b1b] bg-white px-2 py-0.5 border border-neutral-200">
            Cámara de Comercio Alajuela
          </span>
        </div>
        <p className="text-[11px] text-neutral-500">
          Cédula Jurídica: <strong>3-002-045123</strong> · Costado oeste Museo Juan Santamaría.
        </p>
      </div>

      <div>
        <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-1">
          Número de Comprobante / Referencia Bancaria *
        </label>
        <input
          id="wizard-input-comprobante"
          type="text"
          required
          value={comprobante}
          onChange={(e) => setComprobante(e.target.value)}
          placeholder="Ej. SINPE-2026-981248"
          className="w-full px-3.5 py-2.5 text-sm bg-white border border-neutral-300 focus:border-[#991b1b] focus:outline-hidden font-mono"
        />
        <span className="text-[11px] text-neutral-500 flex items-center gap-1 mt-1">
          <AlertCircle className="w-3.5 h-3.5 text-neutral-400" /> Registro oficial con validación anti-replay en tesorería.
        </span>
      </div>

      {/* Opción Asistida por WhatsApp */}
      <div className="p-3.5 bg-neutral-50 border border-neutral-200 text-xs space-y-1">
        <div className="flex items-center justify-between">
          <span className="font-bold text-[#09090b] flex items-center gap-1.5 text-[11px]">
            <MessageSquare className="w-3.5 h-3.5 text-[#991b1b]" />
            ¿Prefiere comprobante asistido por WhatsApp?
          </span>
          <a
            id="wizard-whatsapp-assisted"
            href={`https://wa.me/50687030792?text=Hola%20Tesorería%20CCA,%20adjunto%20el%20comprobante%20SINPE%20de%20afiliación%20para%20la%20empresa%20${encodeURIComponent(merchantName)}%20(Cédula%20${encodeURIComponent(cedula)}).`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs px-2.5 py-1 text-[#09090b] border border-neutral-300 font-bold hover:bg-white"
          >
            Enviar captura
          </a>
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onBack}
          className="w-1/3 py-2.5 text-xs font-bold uppercase tracking-wider border border-neutral-300 hover:bg-neutral-100 transition-colors"
        >
          Regresar
        </button>
        <button
          id="wizard-step2-submit"
          type="submit"
          className="w-2/3 py-2.5 text-xs font-bold uppercase tracking-wider bg-[#991b1b] hover:bg-[#7f1d1d] text-white flex items-center justify-center gap-2 transition-colors"
        >
          <span>Confirmar Radicado</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
}

