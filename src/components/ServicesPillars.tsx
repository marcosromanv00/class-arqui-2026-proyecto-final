"use client";

import { useState } from "react";
import { PILLARS_DATA, MUNICIPAL_PROCEDURES_DATA } from "@/lib/data";
import { Scale, Globe, FileCheck, Lightbulb, ArrowRight, CheckCircle2, Download, Building, Clock, ShieldCheck } from "lucide-react";

export function ServicesPillars() {
  const [activeTab, setActiveTab] = useState<"patente" | "arbitraje">("patente");

  const iconMap: Record<string, React.ReactNode> = {
    Scale: <Scale className="w-5 h-5 text-[#991b1b]" />,
    Globe: <Globe className="w-5 h-5 text-[#991b1b]" />,
    FileCheck: <FileCheck className="w-5 h-5 text-[#991b1b]" />,
    Lightbulb: <Lightbulb className="w-5 h-5 text-[#991b1b]" />
  };

  const selectedProcedure = activeTab === "patente" 
    ? MUNICIPAL_PROCEDURES_DATA[0] 
    : MUNICIPAL_PROCEDURES_DATA[1];

  return (
    <section id="servicios" className="border-b border-neutral-200 bg-white py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabecera Centrada Estilo ICC */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#09090b] tracking-tight leading-tight">
            Hacemos que el comercio funcione <span className="text-[#991b1b]">para todos</span>, en cada cantón
          </h2>
          <p className="mt-4 text-sm text-neutral-600 leading-relaxed max-w-2xl mx-auto">
            Para servir a toda la comunidad empresarial alajuelense, nuestros servicios gremiales se organizan en cuatro pilares estratégicos de ejecución:
          </p>
        </div>

        {/* 4 Cajas de Servicios Estilo ICC */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PILLARS_DATA.map((pillar, idx) => (
            <div
              key={idx}
              className="bg-[#f9fafb] border border-neutral-200 p-8 flex flex-col justify-between hover:border-neutral-400 transition-colors group"
            >
              <div>
                <div className="w-10 h-10 rounded-full border border-neutral-300 bg-white flex items-center justify-center mb-6">
                  {iconMap[pillar.icon]}
                </div>
                <h3 className="text-lg font-bold text-[#09090b] mb-1 group-hover:text-[#991b1b] transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-[11px] font-semibold text-[#991b1b] uppercase tracking-wider mb-3">
                  {pillar.tagline}
                </p>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              <div className="pt-8">
                <a
                  href={pillar.actionHref}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#09090b] hover:text-[#991b1b] transition-colors"
                >
                  <span>{pillar.actionText}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#991b1b] group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Ventanilla de Formalización y Arbitraje (Rescate de /documentos/ del sitio original) */}
        <div id="tramites" className="mt-20 pt-16 border-t border-neutral-200">
          <div className="bg-[#f9fafb] border border-neutral-200 p-8 sm:p-10">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-6 border-b border-neutral-200 gap-4">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-[#991b1b]">
                  Ventanilla Técnica de Formalización
                </p>
                <h3 className="text-2xl font-bold text-[#09090b] mt-1">
                  Guías Oficiales de Trámites y Resolución
                </h3>
                <p className="text-xs text-neutral-600 mt-1 max-w-xl">
                  Requisitos normativos contrastados para formalizar o expandir su empresa en Alajuela sin intermediarios.
                </p>
              </div>

              {/* Selector de Pestañas Minimalista */}
              <div className="flex items-center gap-1 bg-neutral-200/60 p-1 self-start lg:self-center">
                <button
                  onClick={() => setActiveTab("patente")}
                  className={`px-4 py-2 text-xs font-bold transition-all ${
                    activeTab === "patente"
                      ? "bg-white text-[#09090b] shadow-xs"
                      : "text-neutral-600 hover:text-neutral-900"
                  }`}
                >
                  Patente Comercial
                </button>
                <button
                  onClick={() => setActiveTab("arbitraje")}
                  className={`px-4 py-2 text-xs font-bold transition-all ${
                    activeTab === "arbitraje"
                      ? "bg-white text-[#09090b] shadow-xs"
                      : "text-neutral-600 hover:text-neutral-900"
                  }`}
                >
                  Arbitraje & Conciliación
                </button>
              </div>
            </div>

            {/* Contenido del Procedimiento */}
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-5 space-y-4">
                <h4 className="text-base font-bold text-[#09090b]">
                  {selectedProcedure.title}
                </h4>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  {selectedProcedure.summary}
                </p>

                <div className="p-4 bg-white border border-neutral-200 space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-neutral-700">
                    <Building className="w-4 h-4 text-neutral-400 shrink-0" />
                    <span><strong>Entidad:</strong> {selectedProcedure.institution}</span>
                  </div>
                  <div className="flex items-center gap-2 text-neutral-700">
                    <Clock className="w-4 h-4 text-neutral-400 shrink-0" />
                    <span><strong>Tiempo estimado:</strong> {selectedProcedure.timeEstimate}</span>
                  </div>
                  <div className="flex items-center gap-2 text-neutral-700">
                    <ShieldCheck className="w-4 h-4 text-[#991b1b] shrink-0" />
                    <span><strong>Arancel:</strong> {selectedProcedure.cost}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href="#afiliacion"
                    className="inline-flex items-center gap-2 bg-[#991b1b] hover:bg-[#7f1d1d] text-white px-5 py-2.5 text-xs font-bold transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Descargar Guía Oficial (PDF)</span>
                  </a>
                </div>
              </div>

              <div className="lg:col-span-7 bg-white p-6 border border-neutral-200 space-y-3">
                <span className="text-[11px] font-bold text-[#09090b] uppercase tracking-wider block mb-2">
                  Pasos Requeridos para Completar el Trámite:
                </span>
                {selectedProcedure.steps.map((step, sIdx) => (
                  <div key={sIdx} className="flex items-start gap-3 p-3 bg-[#f9fafb] border border-neutral-100">
                    <CheckCircle2 className="w-4 h-4 text-[#991b1b] shrink-0 mt-0.5" />
                    <span className="text-xs text-neutral-700 font-medium leading-relaxed">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
