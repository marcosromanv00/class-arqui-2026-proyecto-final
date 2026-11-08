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
      <fieldset className="space-y-2">
        <legend className="text-xs font-semibold text-ink mb-1">
          Modalidad de membresía:
        </legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            id="wizard-plan-regular"
            type="button"
            onClick={() => setPlan("regular")}
            className={`p-4 border text-left transition-all rounded-lg ${
              plan === "regular"
                ? "border-brand bg-surface ring-2 ring-brand/20 shadow-xs"
                : "border-border bg-surface hover:border-border-strong"
            }`}
          >
            <span className="text-xs font-mono font-semibold text-brand block">
              Comercio y Pyme
            </span>
            <span className="text-xl font-semibold text-ink font-serif mt-1 block">
              ₡15.000 <span className="text-xs font-normal text-text-muted">/mes</span>
            </span>
            <p className="text-xs text-ink-muted mt-1 leading-relaxed">
              Comercios detallistas, restaurantes, consultorios y pymes.
            </p>
          </button>

          <button
            id="wizard-plan-corporate"
            type="button"
            onClick={() => setPlan("corporativo")}
            className={`p-4 border text-left transition-all rounded-lg ${
              plan === "corporativo"
                ? "border-brand bg-surface ring-2 ring-brand/20 shadow-xs"
                : "border-border bg-surface hover:border-border-strong"
            }`}
          >
            <span className="text-xs font-mono font-semibold text-brand block">
              Empresa e Industria
            </span>
            <span className="text-xl font-semibold text-ink font-serif mt-1 block">
              ₡35.000 <span className="text-xs font-normal text-text-muted">/mes</span>
            </span>
            <p className="text-xs text-ink-muted mt-1 leading-relaxed">
              Industrias de manufactura, zonas francas y distribuidores mayoristas.
            </p>
          </button>
        </div>
      </fieldset>

      <div>
        <label htmlFor="wizard-input-name" className="block text-xs font-medium text-ink mb-1">
          Razón social o nombre comercial *
        </label>
        <input
          id="wizard-input-name"
          type="text"
          required
          value={merchantName}
          onChange={(e) => setMerchantName(e.target.value)}
          placeholder="Ej. Distribuidora Central de Alajuela S.A."
          className="w-full px-3.5 py-2.5 text-sm bg-surface border border-border rounded-lg text-ink focus:border-brand focus:outline-hidden"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="wizard-input-cedula" className="block text-xs font-medium text-ink mb-1">
            Cédula jurídica o física *
          </label>
          <input
            id="wizard-input-cedula"
            type="text"
            required
            value={cedula}
            onChange={(e) => setCedula(e.target.value)}
            placeholder="3-101-000000"
            className="w-full px-3.5 py-2.5 text-sm bg-surface border border-border rounded-lg text-ink focus:border-brand focus:outline-hidden font-mono"
          />
        </div>

        <div>
          <label htmlFor="wizard-input-canton" className="block text-xs font-medium text-ink mb-1">
            Cantón de operación *
          </label>
          <select
            id="wizard-input-canton"
            value={canton}
            onChange={(e) => setCanton(e.target.value)}
            className="w-full px-3.5 py-2.5 text-sm bg-surface border border-border rounded-lg text-ink focus:border-brand focus:outline-hidden"
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
        <label htmlFor="wizard-input-phone" className="block text-xs font-medium text-ink mb-1">
          Teléfono de contacto (+506) *
        </label>
        <input
          id="wizard-input-phone"
          type="tel"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="2441-8118 / 8888-0000"
          className="w-full px-3.5 py-2.5 text-sm bg-surface border border-border rounded-lg text-ink focus:border-brand focus:outline-hidden font-mono"
        />
      </div>

      <div className="p-3.5 bg-surface border border-border rounded-lg text-xs text-ink-muted flex items-start gap-2.5">
        <FileText className="w-4 h-4 text-brand shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-ink">Acompañamiento en patentes:</strong> Si su empresa aún está tramitando la patente comercial, le brindamos la guía de ventanilla única.
        </p>
      </div>

      <button
        id="wizard-step1-submit"
        type="submit"
        className="btn-cca-primary w-full py-3 text-sm flex items-center justify-center gap-2"
      >
        <span>Continuar al comprobante de pago</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </form>
  );
}
