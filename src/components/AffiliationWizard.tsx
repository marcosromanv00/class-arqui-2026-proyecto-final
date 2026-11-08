"use client";

import { useState } from "react";
import { AffiliationValueProps } from "@/components/AffiliationValueProps";
import { AffiliationFormStep1 } from "@/components/AffiliationFormStep1";
import { AffiliationFormStep2 } from "@/components/AffiliationFormStep2";
import { AffiliationFormStep3 } from "@/components/AffiliationFormStep3";
import type { ResultadoPago } from "@/lib/pagos";

export function AffiliationWizard() {
  const [step, setStep] = useState(1);
  const [plan, setPlan] = useState<"regular" | "corporativo">("regular");
  const [phone, setPhone] = useState("");
  const [merchantName, setMerchantName] = useState("");
  const [cedula, setCedula] = useState("");
  const [canton, setCanton] = useState("Alajuela");
  const [pago, setPago] = useState<ResultadoPago | null>(null);

  const price = plan === "regular" ? 15000 : 35000;

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!merchantName || !cedula || !phone) return;
    setStep(2);
  };

  // Pasarela simulada (src/lib/pagos.ts): solo avanza si el pago fue aceptado
  const handlePago = (r: ResultadoPago) => {
    setPago(r);
    setStep(3);
  };

  const handleReset = () => {
    setStep(1);
    setPago(null);
    setMerchantName("");
    setCedula("");
    setPhone("");
  };

  return (
    <section id="afiliacion" className="bg-surface py-16 lg:py-24 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Columna Izquierda: Beneficios */}
          <div className="lg:col-span-5">
            <AffiliationValueProps />
          </div>

          {/* Columna Derecha: Formulario en Pasos */}
          <div className="lg:col-span-7 bg-surface-muted border border-border p-6 sm:p-8 rounded-xl shadow-xs">
            {/* Indicador de progreso */}
            <div className="flex items-center justify-between border-b border-border pb-5 mb-6 text-xs">
              <div className="flex items-center gap-2">
                <span
                  className={`w-6 h-6 flex items-center justify-center font-mono font-semibold text-xs rounded-full ${
                    step >= 1 ? "bg-brand text-surface" : "bg-surface border border-border text-text-muted"
                  }`}
                >
                  1
                </span>
                <span className={`font-medium ${step >= 1 ? "text-ink" : "text-text-muted"}`}>
                  Datos de la empresa
                </span>
              </div>
              <div className="w-8 sm:w-16 h-px bg-border" />
              <div className="flex items-center gap-2">
                <span
                  className={`w-6 h-6 flex items-center justify-center font-mono font-semibold text-xs rounded-full ${
                    step >= 2 ? "bg-brand text-surface" : "bg-surface border border-border text-text-muted"
                  }`}
                >
                  2
                </span>
                <span className={`font-medium ${step >= 2 ? "text-ink" : "text-text-muted"}`}>
                  Pago
                </span>
              </div>
              <div className="w-8 sm:w-16 h-px bg-border" />
              <div className="flex items-center gap-2">
                <span
                  className={`w-6 h-6 flex items-center justify-center font-mono font-semibold text-xs rounded-full ${
                    step === 3 ? "bg-brand text-surface" : "bg-surface border border-border text-text-muted"
                  }`}
                >
                  3
                </span>
                <span className={`font-medium ${step === 3 ? "text-ink" : "text-text-muted"}`}>
                  Constancia
                </span>
              </div>
            </div>

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
                phone={phone}
                onBack={() => setStep(1)}
                onResult={handlePago}
              />
            )}

            {step === 3 && pago && (
              <AffiliationFormStep3
                pago={pago}
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
