"use client";

import { useState } from "react";
import { AffiliationValueProps } from "@/components/AffiliationValueProps";
import { AffiliationFormStep1 } from "@/components/AffiliationFormStep1";
import { AffiliationFormStep2 } from "@/components/AffiliationFormStep2";
import { AffiliationFormStep3 } from "@/components/AffiliationFormStep3";

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

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!merchantName || !cedula || !phone) return;
    setStep(2);
  };

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comprobante) return;
    setIsSuccess(true);
    setStep(3);
  };

  const handleReset = () => {
    setStep(1);
    setIsSuccess(false);
    setMerchantName("");
    setCedula("");
    setPhone("");
    setComprobante("");
  };

  return (
    <section id="afiliacion" className="border-b border-neutral-200 bg-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Columna Izquierda: Información de Valor Gremial & ROI */}
          <div className="lg:col-span-5">
            <AffiliationValueProps />
          </div>

          {/* Columna Derecha: Wizard Interactivo Estilo ICC */}
          <div className="lg:col-span-7 bg-[#f9fafb] border border-neutral-200 p-6 sm:p-8">
            
            {/* Indicador de 3 Pasos */}
            <div className="flex items-center justify-between border-b border-neutral-200 pb-5 mb-6 text-xs">
              <div className="flex items-center gap-2">
                <span className={`w-6 h-6 flex items-center justify-center font-bold text-xs ${
                  step >= 1 ? "bg-[#991b1b] text-white" : "bg-neutral-200 text-neutral-600"
                }`}>
                  1
                </span>
                <span className={`font-semibold ${step >= 1 ? "text-[#09090b]" : "text-neutral-400"}`}>
                  Datos del Comercio
                </span>
              </div>
              <div className="w-8 sm:w-12 h-px bg-neutral-200" />
              <div className="flex items-center gap-2">
                <span className={`w-6 h-6 flex items-center justify-center font-bold text-xs ${
                  step >= 2 ? "bg-[#991b1b] text-white" : "bg-neutral-200 text-neutral-600"
                }`}>
                  2
                </span>
                <span className={`font-semibold ${step >= 2 ? "text-[#09090b]" : "text-neutral-400"}`}>
                  Pasarela SINPE
                </span>
              </div>
              <div className="w-8 sm:w-12 h-px bg-neutral-200" />
              <div className="flex items-center gap-2">
                <span className={`w-6 h-6 flex items-center justify-center font-bold text-xs ${
                  step === 3 ? "bg-[#991b1b] text-white" : "bg-neutral-200 text-neutral-600"
                }`}>
                  3
                </span>
                <span className={`font-semibold ${step === 3 ? "text-[#09090b]" : "text-neutral-400"}`}>
                  Radicado Oficial
                </span>
              </div>
            </div>

            {/* Pasos */}
            {step === 1 && (
              <AffiliationFormStep1
                plan={plan}
                setPlan={setPlan}
                merchantName={merchantName}
                setMerchantName={setMerchantName}
                cedula={cedula}
                setCedula={setCedula}
                canton={canton}
                setCanton={setCanton}
                phone={phone}
                setPhone={setPhone}
                onNext={handleStep1Submit}
              />
            )}

            {step === 2 && (
              <AffiliationFormStep2
                merchantName={merchantName}
                cedula={cedula}
                plan={plan}
                price={price}
                comprobante={comprobante}
                setComprobante={setComprobante}
                onBack={() => setStep(1)}
                onSubmit={handleStep2Submit}
              />
            )}

            {step === 3 && isSuccess && (
              <AffiliationFormStep3
                comprobante={comprobante}
                merchantName={merchantName}
                cedula={cedula}
                canton={canton}
                price={price}
                onReset={handleReset}
              />
            )}

          </div>

        </div>
      </div>
    </section>
  );
}
