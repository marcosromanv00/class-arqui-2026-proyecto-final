"use client";

import { useState } from "react";
import { CheckCircle2, ShieldCheck, ArrowRight, Smartphone, Receipt, AlertCircle } from "lucide-react";

export function AffiliationWizard() {
  const [step, setStep] = useState(1);
  const [plan, setPlan] = useState<"regular" | "corporativo">("regular");
  const [phone, setPhone] = useState("");
  const [merchantName, setMerchantName] = useState("");
  const [cedula, setCedula] = useState("");
  const [canton, setCanton] = useState("Alajuela");
  const [comprobante, setComprobante] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const price = plan === "regular" ? 15000 : 35000;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      if (!merchantName || !cedula || !phone) return;
      setStep(2);
    } else if (step === 2) {
      if (!comprobante) return;
      setIsSuccess(true);
      setStep(3);
    }
  };

  return (
    <section id="afiliacion" className="border-b border-slate-200 bg-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Columna Izquierda: Información de Valor Gremial */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <p className="text-xs uppercase font-extrabold tracking-widest text-sky-600 mb-2">
                Afiliación Digital Instantánea
              </p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight">
                Únase a la red de comercio más influyente de la provincia
              </h2>
              <p className="mt-4 text-sm text-slate-600 leading-relaxed">
                Transformamos el trámite presencial de 5 días hábiles en un proceso digital en 3 pasos con validación SINPE Móvil inmediata.
              </p>
            </div>

            {/* Deducibilidad Fiscal Ley 7092 */}
            <div className="p-4 bg-sky-50/70 border border-sky-200 text-xs text-sky-950 space-y-1">
              <span className="font-extrabold uppercase tracking-wide text-sky-900 flex items-center gap-1.5 text-[11px]">
                <ShieldCheck className="w-4 h-4 text-sky-700" /> Beneficio Tributario Ley 7092
              </span>
              <p className="leading-relaxed">
                El 100% de la cuota de afiliación gremial es deducible como gasto operativo del Impuesto sobre la Renta (Artículo 8 de la Ley de Impuesto sobre la Renta de Costa Rica).
              </p>
            </div>

            <div className="space-y-3 pt-2 text-xs text-slate-700">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Inclusión inmediata en el Directorio Comercial Oficial verificado</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Acceso al Centro de Arbitraje, Mediación y Conciliación sin costo inicial</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Descuentos en más de 40 convenios médicos, ópticos y logísticos</span>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Wizard Interactivo */}
          <div className="lg:col-span-7 bg-slate-50 border border-slate-200 p-6 sm:p-8">
            
            {/* Pasos */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-6 text-xs">
              <div className="flex items-center gap-2">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold ${
                  step >= 1 ? "bg-slate-950 text-white" : "bg-slate-200 text-slate-600"
                }`}>
                  1
                </span>
                <span className={`font-semibold ${step >= 1 ? "text-slate-950" : "text-slate-400"}`}>
                  Datos del Comercio
                </span>
              </div>
              <div className="w-8 h-px bg-slate-200" />
              <div className="flex items-center gap-2">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold ${
                  step >= 2 ? "bg-slate-950 text-white" : "bg-slate-200 text-slate-600"
                }`}>
                  2
                </span>
                <span className={`font-semibold ${step >= 2 ? "text-slate-950" : "text-slate-400"}`}>
                  Pasarela SINPE
                </span>
              </div>
              <div className="w-8 h-px bg-slate-200" />
              <div className="flex items-center gap-2">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold ${
                  step === 3 ? "bg-emerald-600 text-white" : "bg-slate-200 text-slate-600"
                }`}>
                  3
                </span>
                <span className={`font-semibold ${step === 3 ? "text-emerald-700" : "text-slate-400"}`}>
                  Comprobante
                </span>
              </div>
            </div>

            {/* Paso 1: Datos */}
            {step === 1 && (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Selección de Plan */}
                <div className="grid grid-cols-2 gap-3 mb-2">
                  <div
                    onClick={() => setPlan("regular")}
                    className={`p-3.5 border cursor-pointer transition-all ${
                      plan === "regular"
                        ? "border-slate-950 bg-white shadow-xs"
                        : "border-slate-200 bg-slate-100/60 hover:bg-white"
                    }`}
                  >
                    <span className="text-[10px] font-bold uppercase tracking-wider text-sky-600 block">
                      Plan Pyme / Personal
                    </span>
                    <span className="text-xl font-extrabold text-slate-950 font-mono">
                      ₡15.000 <span className="text-xs font-normal text-slate-500">/mes</span>
                    </span>
                    <p className="text-[11px] text-slate-500 mt-1">
                      Comercios físicos, profesionales independientes y microempresas.
                    </p>
                  </div>

                  <div
                    onClick={() => setPlan("corporativo")}
                    className={`p-3.5 border cursor-pointer transition-all ${
                      plan === "corporativo"
                        ? "border-slate-950 bg-white shadow-xs"
                        : "border-slate-200 bg-slate-100/60 hover:bg-white"
                    }`}
                  >
                    <span className="text-[10px] font-bold uppercase tracking-wider text-sky-600 block">
                      Plan Corporativo
                    </span>
                    <span className="text-xl font-extrabold text-slate-950 font-mono">
                      ₡35.000 <span className="text-xs font-normal text-slate-500">/mes</span>
                    </span>
                    <p className="text-[11px] text-slate-500 mt-1">
                      Grandes empresas, industrias y cadenas de comercio cantonal.
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                    Nombre Comercial o Razón Social
                  </label>
                  <input
                    type="text"
                    required
                    value={merchantName}
                    onChange={(e) => setMerchantName(e.target.value)}
                    placeholder="Ej. Distribuidora Central de Alajuela S.A."
                    className="w-full px-3 py-2 text-sm bg-white border border-slate-300 focus:border-slate-950 focus:outline-hidden"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                      Cédula Jurídica / Física
                    </label>
                    <input
                      type="text"
                      required
                      value={cedula}
                      onChange={(e) => setCedula(e.target.value)}
                      placeholder="Ej. 3-101-123456"
                      className="w-full px-3 py-2 text-sm bg-white border border-slate-300 focus:border-slate-950 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                      Cantón de Operación
                    </label>
                    <select
                      value={canton}
                      onChange={(e) => setCanton(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-white border border-slate-300 focus:border-slate-950 focus:outline-hidden"
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
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                    Teléfono Móvil (Validación Costarricense +506)
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="8492-3925"
                    className="w-full px-3 py-2 text-sm bg-white border border-slate-300 focus:border-slate-950 focus:outline-hidden"
                  />
                  <span className="text-[11px] text-slate-500">Debe contener 8 dígitos para pagos por SINPE Móvil.</span>
                </div>

                <button
                  type="submit"
                  className="w-full mt-4 py-3 bg-slate-950 hover:bg-sky-600 text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
                >
                  Continuar a Pasarela Transaccional <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}

            {/* Paso 2: Pago SINPE Móvil */}
            {step === 2 && (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                <div className="bg-white border border-slate-200 p-4 space-y-2">
                  <div className="flex justify-between items-center text-xs pb-2 border-b border-slate-100">
                    <span className="text-slate-500">Comercio:</span>
                    <span className="font-bold text-slate-900">{merchantName}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs pb-2 border-b border-slate-100">
                    <span className="text-slate-500">Plan Seleccionado:</span>
                    <span className="font-bold text-sky-700 uppercase tracking-wider text-[11px]">
                      {plan === "regular" ? "Pyme / Personal" : "Corporativo"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm pt-1">
                    <span className="font-extrabold text-slate-900">Total a Cancelar:</span>
                    <span className="font-extrabold text-slate-950 font-mono text-lg">
                      ₡{price.toLocaleString("es-CR")}
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-emerald-50 border border-emerald-200 space-y-2">
                  <span className="font-bold text-xs text-emerald-900 uppercase tracking-wider flex items-center gap-1.5">
                    <Smartphone className="w-4 h-4 text-emerald-700" /> Instrucciones SINPE Móvil Oficial CCA
                  </span>
                  <p className="text-xs text-emerald-800 leading-relaxed">
                    Realice la transferencia SINPE Móvil por <strong>₡{price.toLocaleString("es-CR")}</strong> al teléfono institucional:
                  </p>
                  <p className="text-lg font-mono font-extrabold text-emerald-950 tracking-wider">
                    8492-3925
                  </p>
                  <p className="text-[11px] text-emerald-700">
                    Destinatario: <strong>Cámara de Comercio de Alajuela (Céd. Jurídica 3-002-045123)</strong>
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                    Número de Comprobante / Referencia Bancaria
                  </label>
                  <input
                    type="text"
                    required
                    value={comprobante}
                    onChange={(e) => setComprobante(e.target.value)}
                    placeholder="Ej. SINPE-2026-981248"
                    className="w-full px-3 py-2 text-sm bg-white border border-slate-300 focus:border-slate-950 focus:outline-hidden font-mono"
                  />
                  <span className="text-[11px] text-slate-500 flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3.5 h-3.5 text-slate-400" /> Sistema protegido contra comprobantes duplicados (Anti-Replay).
                  </span>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="w-1/3 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs uppercase tracking-wider"
                  >
                    Regresar
                  </button>
                  <button
                    type="submit"
                    className="w-2/3 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
                  >
                    Confirmar Pago SINPE <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

            {/* Paso 3: Éxito y Recibo Fiscal */}
            {step === 3 && isSuccess && (
              <div className="space-y-4 text-center py-4">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                  <Receipt className="w-6 h-6" />
                </div>

                <div>
                  <h3 className="text-xl font-extrabold text-slate-950">
                    ¡Afiliación Confirmada Exitosamente!
                  </h3>
                  <p className="text-xs text-slate-600 mt-1">
                    Su empresa ha sido incorporada al Directorio Comercial Oficial de la Cámara de Comercio de Alajuela.
                  </p>
                </div>

                {/* Comprobante Digital Oficial */}
                <div className="bg-white border border-slate-200 p-5 text-left text-xs space-y-2 font-mono">
                  <div className="text-center font-bold text-slate-900 border-b border-dashed border-slate-200 pb-2">
                    CÁMARA DE COMERCIO DE ALAJUELA<br />
                    <span className="text-[10px] text-slate-500 font-normal">COMPROBANTE OFICIAL DE AFILIACIÓN · LEY 7092</span>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span className="text-slate-500">Transacción:</span>
                    <span className="font-bold text-slate-900">{comprobante}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Afiliado:</span>
                    <span className="font-bold text-slate-900">{merchantName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Cédula:</span>
                    <span className="text-slate-900">{cedula}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Cantón:</span>
                    <span className="text-slate-900">{canton}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Monto:</span>
                    <span className="font-bold text-slate-900">₡{price.toLocaleString("es-CR")}</span>
                  </div>
                  <div className="pt-2 border-t border-dashed border-slate-200 text-[10px] text-slate-500 text-center">
                    Gasto deducible del impuesto sobre la renta según Art. 8 Ley 7092.
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setStep(1);
                    setIsSuccess(false);
                    setMerchantName("");
                    setCedula("");
                    setPhone("");
                    setComprobante("");
                  }}
                  className="px-6 py-2.5 bg-slate-950 text-white text-xs font-semibold uppercase tracking-wider"
                >
                  Realizar otra afiliación
                </button>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
