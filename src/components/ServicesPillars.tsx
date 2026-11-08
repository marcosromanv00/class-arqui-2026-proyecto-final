"use client";

import { useState } from "react";
import { MUNICIPAL_PROCEDURES_DATA } from "@/lib/data";
import { Scale, FileCheck, Users, Briefcase, Clock, ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react";

const CORE_SERVICES = [
  {
    icon: Scale,
    title: "Centro de Arbitraje y Mediación",
    desc: "Resolución confidencial de disputas comerciales con plena validez de cosa juzgada sin acudir a tribunales ordinarios.",
    benefit: "Arancel preferencial para asociados al día.",
  },
  {
    icon: FileCheck,
    title: "Ventanilla de Patentes y Permisos",
    desc: "Acompañamiento en requisitos de uso de suelo, Ministerio de Salud y licencias comerciales cantonales.",
    benefit: "Guía técnica sin costo para comerciantes.",
  },
  {
    icon: Users,
    title: "Convenios Comerciales y Salud",
    desc: "Descuentos en salud ocupacional, servicios jurídicos, telecomunicaciones y compras entre afiliados.",
    benefit: "Acceso con carné digital CCA.",
  },
  {
    icon: Briefcase,
    title: "Bolsa de Empleo y Capacitación",
    desc: "Publicación de vacantes laborales y talleres especializados en tributación y gestión empresarial.",
    benefit: "Publicaciones ilimitadas para asociados.",
  },
];

export function ServicesPillars() {
  const [activeTab, setActiveTab] = useState<"patente" | "arbitraje">("patente");
  const selectedProcedure =
    activeTab === "patente"
      ? MUNICIPAL_PROCEDURES_DATA[0]
      : MUNICIPAL_PROCEDURES_DATA[1];

  return (
    <section id="servicios" className="bg-surface-muted py-14 lg:py-20 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 mb-8 border-b border-border gap-3">
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold text-ink tracking-tight">
              Servicios y plataforma gremial
            </h2>
            <p className="mt-1 text-sm text-ink-muted max-w-xl">
              Herramientas concretas para formalizar, proteger y hacer crecer su negocio en Alajuela.
            </p>
          </div>
        </div>

        {/* 4 Servicios en Formato Ledger Escaneable */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {CORE_SERVICES.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="p-5 bg-surface border border-border rounded-lg flex flex-col justify-between hover:border-brand/40 transition-colors"
              >
                <div>
                  <div className="w-8 h-8 rounded-md bg-surface-muted border border-border flex items-center justify-center text-brand mb-3">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-semibold text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-xs sm:text-sm text-ink-muted leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs text-text-muted">
                  <span>{item.benefit}</span>
                  <a href="#contacto" className="text-brand font-medium hover:underline inline-flex items-center gap-1">
                    Consultar <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Guía Interactiva de Requisitos (Patentes vs Arbitraje) */}
        <div id="tramites" className="bg-surface border border-border rounded-lg p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-border gap-4">
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-ink">
                Guía de requisitos y procedimientos
              </h3>
              <p className="text-xs text-text-muted mt-0.5">
                Consulte los pasos oficiales y tiempos estimados
              </p>
            </div>

            <div className="flex items-center gap-1 bg-surface-muted p-1 rounded-md border border-border self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setActiveTab("patente")}
                className={`px-3 py-1.5 text-xs font-medium rounded-sm transition-all ${
                  activeTab === "patente"
                    ? "bg-surface text-ink border border-border shadow-xs"
                    : "text-text-muted hover:text-ink"
                }`}
              >
                Patente Comercial
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("arbitraje")}
                className={`px-3 py-1.5 text-xs font-medium rounded-sm transition-all ${
                  activeTab === "arbitraje"
                    ? "bg-surface text-ink border border-border shadow-xs"
                    : "text-text-muted hover:text-ink"
                }`}
              >
                Conciliación y Arbitraje
              </button>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-5 space-y-3">
              <h4 className="text-base font-semibold text-ink">
                {selectedProcedure.title}
              </h4>
              <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                {selectedProcedure.summary}
              </p>

              <div className="p-3.5 bg-surface-muted rounded-md border border-border space-y-1.5 text-xs text-ink-muted">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand shrink-0" />
                  <span><strong>Entidad:</strong> {selectedProcedure.institution}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-text-muted shrink-0" />
                  <span><strong>Plazo estimado:</strong> {selectedProcedure.timeEstimate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span><strong>Costo:</strong> {selectedProcedure.cost}</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 bg-surface-muted p-4 sm:p-5 rounded-md border border-border">
              <span className="text-xs font-semibold text-ink block mb-2">
                Etapas del procedimiento:
              </span>
              <ol className="space-y-1.5">
                {selectedProcedure.steps.map((step, idx) => (
                  <li
                    key={idx}
                    className="p-2.5 bg-surface border border-border rounded text-xs text-ink-muted flex items-start gap-2"
                  >
                    <span className="font-mono text-brand font-semibold text-xs mt-0.5">
                      {idx + 1}.
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
