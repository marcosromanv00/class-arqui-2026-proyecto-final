import { ArrowRight, FileText } from "lucide-react";

interface AffiliationFormStep1Props {
  plan: "regular" | "corporativo";
  setPlan: (plan: "regular" | "corporativo") => void;
  merchantName: string;
  setMerchantName: (val: string) => void;
  cedula: string;
  setCedula: (val: string) => void;
  canton: string;
  setCanton: (val: string) => void;
  phone: string;
  setPhone: (val: string) => void;
  onNext: (e: React.FormEvent) => void;
}

export function AffiliationFormStep1({
  plan,
  setPlan,
  merchantName,
  setMerchantName,
  cedula,
  setCedula,
  canton,
  setCanton,
  phone,
  setPhone,
  onNext
}: AffiliationFormStep1Props) {
  return (
    <form onSubmit={onNext} className="space-y-4">
      {/* Selección de Plan Minimalista */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-2">
        <div
          id="wizard-plan-regular"
          onClick={() => setPlan("regular")}
          className={`p-4 border cursor-pointer transition-all ${
            plan === "regular"
              ? "border-[#991b1b] bg-white ring-1 ring-[#991b1b]"
              : "border-neutral-200 bg-neutral-50 hover:bg-white"
          }`}
        >
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#991b1b] block">
            Plan Pyme / Comercial
          </span>
          <span className="text-xl font-extrabold text-[#09090b] font-mono">
            ₡15.000 <span className="text-xs font-normal text-neutral-500">/mes</span>
          </span>
          <p className="text-[11px] text-neutral-500 mt-1">
            Comercios locales, servicios profesionales y microempresas cantonales.
          </p>
        </div>

        <div
          id="wizard-plan-corporate"
          onClick={() => setPlan("corporativo")}
          className={`p-4 border cursor-pointer transition-all ${
            plan === "corporativo"
              ? "border-[#991b1b] bg-white ring-1 ring-[#991b1b]"
              : "border-neutral-200 bg-neutral-50 hover:bg-white"
          }`}
        >
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#991b1b] block">
            Plan Corporativo
          </span>
          <span className="text-xl font-extrabold text-[#09090b] font-mono">
            ₡35.000 <span className="text-xs font-normal text-neutral-500">/mes</span>
          </span>
          <p className="text-[11px] text-neutral-500 mt-1">
            Grandes distribuidoras, zonas francas de El Coyol y cadenas provinciales.
          </p>
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-1">
          Nombre Comercial o Razón Social *
        </label>
        <input
          id="wizard-input-name"
          type="text"
          required
          value={merchantName}
          onChange={(e) => setMerchantName(e.target.value)}
          placeholder="Ej: Ferretería El Candado Alajuela S.A."
          className="w-full px-3.5 py-2.5 text-sm bg-white border border-neutral-300 focus:border-[#991b1b] focus:outline-hidden"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-1">
            Cédula Jurídica / Física *
          </label>
          <input
            id="wizard-input-cedula"
            type="text"
            required
            value={cedula}
            onChange={(e) => setCedula(e.target.value)}
            placeholder="Ej: 3-101-987654"
            className="w-full px-3.5 py-2.5 text-sm bg-white border border-neutral-300 focus:border-[#991b1b] focus:outline-hidden font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-1">
            Cantón de Operación *
          </label>
          <select
            id="wizard-input-canton"
            value={canton}
            onChange={(e) => setCanton(e.target.value)}
            className="w-full px-3.5 py-2.5 text-sm bg-white border border-neutral-300 focus:border-[#991b1b] focus:outline-hidden"
          >
            <option value="Alajuela">Alajuela</option>
            <option value="San Ramón">San Ramón</option>
            <option value="Grecia">Grecia</option>
            <option value="Atenas">Atenas</option>
            <option value="Naranjo">Naranjo</option>
            <option value="Palmares">Palmares</option>
            <option value="Poás">Poás</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-1">
          Teléfono Móvil (Validación Costa Rica +506) *
        </label>
        <input
          id="wizard-input-phone"
          type="tel"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="8492-3925"
          className="w-full px-3.5 py-2.5 text-sm bg-white border border-neutral-300 focus:border-[#991b1b] focus:outline-hidden font-mono"
        />
        <span className="text-[11px] text-neutral-500">Número registrado para notificaciones y SINPE Móvil.</span>
      </div>

      {/* Requisito de Patente Municipal */}
      <div className="p-3 bg-neutral-50 border border-neutral-200 text-xs text-neutral-700 flex items-start gap-2">
        <FileText className="w-4 h-4 text-[#991b1b] shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Requisito normativo:</strong> El comercio debe contar con patente al día. ¿Desea gestionarla? <a href="#tramites" className="text-[#991b1b] font-bold hover:underline">Consulte aquí la Guía de Patentes</a>.
        </p>
      </div>

      <button
        id="wizard-step1-submit"
        type="submit"
        className="w-full mt-2 py-3 text-xs uppercase tracking-wider font-bold bg-[#991b1b] hover:bg-[#7f1d1d] text-white flex items-center justify-center gap-2 transition-colors"
      >
        <span>Continuar a Pasarela SINPE</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </form>
  );
}

