"use client";

import { useState } from "react";
import { CheckCircle2, ShieldCheck, ArrowRight, Smartphone, Receipt, AlertCircle, FileText, MessageSquare, Sparkles, Building2 } from "lucide-react";

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
    <section id="afiliacion" className="border-b border-slate-200/80 bg-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Columna Izquierda: Información de Valor Gremial & ROI */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <p className="text-xs uppercase font-bold tracking-widest text-[#991b1b] mb-2">
                Afiliación Digital Instantánea · Validación SINPE
              </p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#09090b] tracking-tight leading-tight">
                Únase a la red de comercio más influyente de la provincia
              </h2>
              <p className="mt-4 text-sm text-slate-600 leading-relaxed">
                Transformamos el trámite presencial histórico de 5 días hábiles en un proceso digital en 3 pasos con radicado inmediato y verificación directa.
              </p>
            </div>

            {/* Deducibilidad Fiscal Ley Costarricense 7092 */}
            <div className="p-4 bg-red-50/50 border border-red-200/80 rounded-xl text-xs text-slate-800 space-y-1.5">
              <span className="font-bold uppercase tracking-wide text-[#991b1b] flex items-center gap-1.5 text-[11px]">
                <ShieldCheck className="w-4 h-4 text-[#991b1b]" /> Beneficio Fiscal Ley 7092
              </span>
              <p className="leading-relaxed text-slate-600">
                El 100% de la cuota de afiliación gremial es deducible como gasto operativo del Impuesto sobre la Renta (Artículo 8 de la Ley de Impuesto sobre la Renta de Costa Rica, Formulario D-101).
              </p>
            </div>

            {/* Retorno de Inversión (ROI) Estimado de la Membresía (Card Sorting N=18) */}
            <div className="clay-card p-5 rounded-2xl bg-white border border-slate-200/90 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-[#991b1b]" />
                <span>Retorno Estimado de la Cuota Asociativa:</span>
              </div>
              
              <div className="space-y-2 text-xs text-slate-600">
                <div className="flex justify-between items-center py-1 border-b border-slate-100">
                  <span>Ahorro en convenios de salud y ópticas:</span>
                  <span className="font-mono font-bold text-emerald-700">~₡35.000/mes</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-100">
                  <span>Descuentos en suministros comerciales:</span>
                  <span className="font-mono font-bold text-emerald-700">~₡20.000/mes</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-100">
                  <span>Asesoría legal y arbitraje gremial:</span>
                  <span className="font-mono font-bold text-emerald-700">Incluido (₡0)</span>
                </div>
                <div className="flex justify-between items-center pt-1.5 font-bold text-slate-900">
                  <span>Retorno Neto Estimado vs Cuota:</span>
                  <span className="font-mono text-[#991b1b] text-sm">+360% ROI</span>
                </div>
              </div>
            </div>

            {/* Beneficios directos adicionales */}
            <div className="space-y-3 pt-1 text-xs text-slate-700">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Inclusión en el Directorio Comercial Verificado y mapa de comercios</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Publicación gratuita e ilimitada de vacantes en la Bolsa de Empleo</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Acceso directo al Centro de Arbitraje y Conciliación Mercantil</span>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Wizard Interactivo Claymorphic */}
          <div className="lg:col-span-7 clay-card bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-sm">
            
            {/* Indicador de 3 Pasos */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-5 mb-6 text-xs">
              <div className="flex items-center gap-2">
                <span className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                  step >= 1 ? "bg-[#991b1b] text-white shadow-xs" : "bg-slate-200 text-slate-600"
                }`}>
                  1
                </span>
                <span className={`font-semibold ${step >= 1 ? "text-slate-950" : "text-slate-400"}`}>
                  Datos del Comercio
                </span>
              </div>
              <div className="w-8 sm:w-12 h-px bg-slate-200" />
              <div className="flex items-center gap-2">
                <span className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                  step >= 2 ? "bg-[#991b1b] text-white shadow-xs" : "bg-slate-200 text-slate-600"
                }`}>
                  2
                </span>
                <span className={`font-semibold ${step >= 2 ? "text-slate-950" : "text-slate-400"}`}>
                  Pasarela SINPE
                </span>
              </div>
              <div className="w-8 sm:w-12 h-px bg-slate-200" />
              <div className="flex items-center gap-2">
                <span className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                  step === 3 ? "bg-emerald-600 text-white shadow-xs" : "bg-slate-200 text-slate-600"
                }`}>
                  3
                </span>
                <span className={`font-semibold ${step === 3 ? "text-emerald-700" : "text-slate-400"}`}>
                  Radicado Oficial
                </span>
              </div>
            </div>

            {/* Paso 1: Datos de la Empresa y Plan */}
            {step === 1 && (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Selección de Plan Claymorphic */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-2">
                  <div
                    id="wizard-plan-regular"
                    onClick={() => setPlan("regular")}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      plan === "regular"
                        ? "border-[#991b1b] bg-red-50/30 shadow-xs"
                        : "border-slate-200 bg-slate-50/60 hover:bg-white"
                    }`}
                  >
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#991b1b] block">
                      Plan Pyme / Personal
                    </span>
                    <span className="text-xl font-extrabold text-[#09090b] font-mono">
                      ₡15.000 <span className="text-xs font-normal text-slate-500">/mes</span>
                    </span>
                    <p className="text-[11px] text-slate-500 mt-1">
                      Comercios físicos, servicios profesionales y microempresas cantones.
                    </p>
                  </div>

                  <div
                    id="wizard-plan-corporate"
                    onClick={() => setPlan("corporativo")}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      plan === "corporativo"
                        ? "border-[#991b1b] bg-red-50/30 shadow-xs"
                        : "border-slate-200 bg-slate-100/60 hover:bg-white"
                    }`}
                  >
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#991b1b] block">
                      Plan Corporativo
                    </span>
                    <span className="text-xl font-extrabold text-[#09090b] font-mono">
                      ₡35.000 <span className="text-xs font-normal text-slate-500">/mes</span>
                    </span>
                    <p className="text-[11px] text-slate-500 mt-1">
                      Grandes distribuidoras, zonas francas de El Coyol y cadenas comerciales.
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                    Nombre Comercial o Razón Social *
                  </label>
                  <input
                    id="wizard-input-name"
                    type="text"
                    required
                    value={merchantName}
                    onChange={(e) => setMerchantName(e.target.value)}
                    placeholder="Ej: Ferretería El Candado Alajuela S.A."
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50/70 border border-slate-200 rounded-lg focus:bg-white focus:border-[#991b1b] focus:outline-hidden"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                      Cédula Jurídica / Física *
                    </label>
                    <input
                      id="wizard-input-cedula"
                      type="text"
                      required
                      value={cedula}
                      onChange={(e) => setCedula(e.target.value)}
                      placeholder="Ej: 3-101-987654"
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-50/70 border border-slate-200 rounded-lg focus:bg-white focus:border-[#991b1b] focus:outline-hidden font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                      Cantón de Operación *
                    </label>
                    <select
                      id="wizard-input-canton"
                      value={canton}
                      onChange={(e) => setCanton(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-50/70 border border-slate-200 rounded-lg focus:bg-white focus:border-[#991b1b] focus:outline-hidden"
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
                    Teléfono Móvil (Validación Costarricense +506) *
                  </label>
                  <input
                    id="wizard-input-phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="8492-3925"
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50/70 border border-slate-200 rounded-lg focus:bg-white focus:border-[#991b1b] focus:outline-hidden font-mono"
                  />
                  <span className="text-[11px] text-slate-500">Número de 8 dígitos registrado para notificaciones y SINPE Móvil.</span>
                </div>

                {/* Polijerarquía: Enlace a Guía de Patente Municipal (Optimal Sorting N=18) */}
                <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-lg flex items-start gap-2 text-xs text-amber-900">
                  <FileText className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    <strong>Requisito formal:</strong> Su negocio debe contar con patente municipal al día. ¿Aún no la tramita? <a href="#tramites" className="text-[#991b1b] underline font-bold">Consulte aquí la Guía de Patentes de Alajuela</a>.
                  </p>
                </div>

                <button
                  id="wizard-step1-submit"
                  type="submit"
                  className="clay-button-primary w-full mt-2 py-3 text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2"
                >
                  <span>Continuar a Pasarela SINPE</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}

            {/* Paso 2: Pago SINPE Móvil con Opción Asistida por WhatsApp */}
            {step === 2 && (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 space-y-2">
                  <div className="flex justify-between items-center text-xs pb-2 border-b border-slate-200/80">
                    <span className="text-slate-500">Comercio Solicitante:</span>
                    <span className="font-bold text-slate-900">{merchantName}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs pb-2 border-b border-slate-200/80">
                    <span className="text-slate-500">Plan Seleccionado:</span>
                    <span className="font-bold text-[#991b1b] uppercase tracking-wider text-[11px]">
                      {plan === "regular" ? "Pyme / Personal (₡15.000)" : "Corporativo (₡35.000)"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm pt-1">
                    <span className="font-bold text-slate-900">Total Arancel Mensual:</span>
                    <span className="font-extrabold text-[#09090b] font-mono text-lg">
                      ₡{price.toLocaleString("es-CR")}
                    </span>
                  </div>
                </div>

                {/* Datos SINPE Oficiales CCA */}
                <div className="p-4 bg-emerald-50/80 border border-emerald-200 rounded-xl space-y-2">
                  <span className="font-bold text-xs text-emerald-950 uppercase tracking-wider flex items-center gap-1.5">
                    <Smartphone className="w-4 h-4 text-emerald-700" /> Instrucciones SINPE Móvil Institucional CCA
                  </span>
                  <p className="text-xs text-emerald-900 leading-relaxed">
                    Realice la transferencia SINPE Móvil por <strong>₡{price.toLocaleString("es-CR")}</strong> al teléfono oficial de tesorería:
                  </p>
                  <div className="flex items-center justify-between bg-white px-3 py-2 rounded-lg border border-emerald-200">
                    <span className="text-lg font-mono font-bold text-emerald-950">
                      +506 8703-0792
                    </span>
                    <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      Cámara de Comercio Alajuela
                    </span>
                  </div>
                  <p className="text-[11px] text-emerald-800">
                    Cédula Jurídica: <strong>3-002-045123</strong> · Costado oeste Museo Juan Santamaría.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                    Número de Comprobante / Referencia Bancaria *
                  </label>
                  <input
                    id="wizard-input-comprobante"
                    type="text"
                    required
                    value={comprobante}
                    onChange={(e) => setComprobante(e.target.value)}
                    placeholder="Ej. SINPE-2026-981248"
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50/70 border border-slate-200 rounded-lg focus:bg-white focus:border-[#991b1b] focus:outline-hidden font-mono"
                  />
                  <span className="text-[11px] text-slate-500 flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3.5 h-3.5 text-slate-400" /> Validación automática con registro anti-replay en tesorería.
                  </span>
                </div>

                {/* Opción Asistida por WhatsApp para Comerciantes Tradicionales (Optimal Sorting Cohorte A) */}
                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800 flex items-center gap-1.5 text-[11px]">
                      <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                      ¿Prefiere validación asistida por WhatsApp?
                    </span>
                    <a
                      id="wizard-whatsapp-assisted"
                      href={`https://wa.me/50687030792?text=Hola%20Tesorería%20CCA,%20adjunto%20el%20comprobante%20SINPE%20de%20afiliación%20para%20la%20empresa%20${encodeURIComponent(merchantName)}%20(Cédula%20${encodeURIComponent(cedula)}).`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="clay-button-secondary text-xs px-2.5 py-1 text-emerald-700 font-bold hover:bg-emerald-50 rounded"
                    >
                      Enviar captura
                    </a>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Ideal para comercios tradicionales que deseen asistencia personal directa con el equipo de soporte de la Cámara.
                  </p>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="clay-button-secondary w-1/3 py-2.5 text-xs font-semibold uppercase tracking-wider"
                  >
                    Regresar
                  </button>
                  <button
                    id="wizard-step2-submit"
                    type="submit"
                    className="clay-button-primary w-2/3 py-2.5 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
                  >
                    <span>Confirmar Radicado</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

            {/* Paso 3: Éxito y Recibo Fiscal Oficial (Conforme Ley 7092) */}
            {step === 3 && isSuccess && (
              <div id="wizard-success-card" className="space-y-5 text-center py-4">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-xs">
                  <Receipt className="w-7 h-7" />
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-[#09090b]">
                    ¡Afiliación Confirmada Exitosamente!
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 max-w-md mx-auto">
                    Su empresa ha sido incorporada al Directorio Comercial Oficial y al Registro Gremial de la Cámara de Comercio de Alajuela.
                  </p>
                </div>

                {/* Comprobante Digital Oficial con Estilo Ticket */}
                <div className="clay-card bg-slate-50/80 border border-slate-200/90 rounded-xl p-5 text-left text-xs space-y-2.5 font-mono shadow-xs">
                  <div className="text-center font-bold text-slate-900 border-b border-dashed border-slate-200 pb-2">
                    CÁMARA DE COMERCIO DE ALAJUELA<br />
                    <span className="text-[10px] text-slate-500 font-normal">COMPROBANTE DE AFILIACIÓN GREMIAL · LEY COSTARRICENSE 7092</span>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span className="text-slate-500">Radicado Transacción:</span>
                    <span className="font-bold text-[#991b1b]">{comprobante}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Comercio Afiliado:</span>
                    <span className="font-bold text-slate-900">{merchantName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Cédula:</span>
                    <span className="text-slate-900">{cedula}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Cantón de Registro:</span>
                    <span className="text-slate-900">{canton}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Arancel Mensual:</span>
                    <span className="font-bold text-slate-900">₡{price.toLocaleString("es-CR")}</span>
                  </div>
                  <div className="pt-2 border-t border-dashed border-slate-200 text-[10px] text-slate-500 text-center leading-relaxed">
                    Gasto deducible del impuesto sobre la renta según Artículo 8 de la Ley 7092. Conserve este radicado para su declaración D-101.
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
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
                    className="clay-button-secondary px-5 py-2.5 text-xs font-semibold uppercase tracking-wider"
                  >
                    Afiliar otro comercio
                  </button>
                  <a
                    href="#directorio"
                    className="clay-button-primary px-5 py-2.5 text-xs font-semibold uppercase tracking-wider"
                  >
                    Ver en el Directorio
                  </a>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
