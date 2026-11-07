"use client";

import { useState } from "react";
import { PILLARS_DATA, MUNICIPAL_PROCEDURES_DATA } from "@/lib/data";
import { Scale, Globe, FileCheck, Lightbulb, ArrowUpRight, CheckCircle2, Download, ShieldAlert, Clock, Building } from "lucide-react";

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
    <section id="servicios" className="border-b border-slate-200/80 bg-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabecera Editorial con Identidad Rojo Carmín */}
        <div className="max-w-3xl border-b border-slate-200/80 pb-8 mb-12">
          <p className="text-xs uppercase font-bold tracking-widest text-[#991b1b] mb-2">
            Servicios Gremiales & Seguridad Jurídica
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#09090b] tracking-tight leading-tight">
            Hacemos que el comercio funcione para todos, en cada cantón
          </h2>
          <p className="mt-3.5 text-slate-600 text-sm leading-relaxed">
            Nuestros cuatro pilares institucionales aseguran certidumbre jurídica, agilidad en trámites municipales y crecimiento sostenible para el sector productivo de Alajuela.
          </p>
        </div>

        {/* 4 Cajas de Servicios en Claymorph Tactile Cards (80% blanco) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PILLARS_DATA.map((pillar, idx) => (
            <div
              key={idx}
              className="clay-card p-6 bg-white rounded-2xl border border-slate-200/90 flex flex-col justify-between group h-84 hover:border-red-300 transition-all"
            >
              <div>
                <div className="w-11 h-11 bg-red-50 border border-red-100 rounded-xl flex items-center justify-center mb-5 shadow-2xs group-hover:scale-105 transition-transform">
                  {iconMap[pillar.icon]}
                </div>
                
                <h3 className="text-base font-bold text-[#09090b] leading-snug group-hover:text-[#991b1b] transition-colors">
                  {pillar.title}
                </h3>
                
                <p className="text-[11px] font-semibold text-[#991b1b] uppercase tracking-wider mt-1.5">
                  {pillar.tagline}
                </p>

                <p className="mt-3 text-xs text-slate-600 leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <a
                  href={pillar.actionHref}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 hover:text-[#991b1b] transition-colors"
                >
                  <span>{pillar.actionText}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#991b1b]" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Módulo Especial: Ventanilla de Patentes y Arbitraje (Rescate de /documentos/ del sitio original) */}
        <div id="tramites" className="mt-16 pt-12 border-t border-slate-200/80">
          <div className="clay-card rounded-2xl bg-white border border-slate-200/90 p-6 sm:p-10 shadow-sm">
            
            <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-6 border-b border-slate-200/80 gap-6">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#991b1b] bg-red-50 px-2.5 py-1 rounded-md border border-red-100">
                  Ventanilla Técnica de Formalización
                </span>
                <h3 className="text-2xl font-bold text-[#09090b] mt-2">
                  Guías Oficiales de Trámites y Resolución
                </h3>
                <p className="text-xs text-slate-500 mt-1 max-w-xl">
                  Información técnica contrastada para abrir su negocio en Alajuela sin intermediarios ni demoras injustificadas.
                </p>
              </div>

              {/* Selector de Pestañas Claymorph */}
              <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-xl self-start lg:self-center">
                <button
                  onClick={() => setActiveTab("patente")}
                  className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                    activeTab === "patente"
                      ? "bg-white text-[#991b1b] shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Patente Comercial Alajuela
                </button>
                <button
                  onClick={() => setActiveTab("arbitraje")}
                  className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                    activeTab === "arbitraje"
                      ? "bg-white text-[#991b1b] shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Arbitraje & Conciliación
                </button>
              </div>
            </div>

            {/* Contenido Dinámico del Trámite */}
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              <div className="lg:col-span-5 space-y-4">
                <h4 className="text-lg font-bold text-slate-900">
                  {selectedProcedure.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {selectedProcedure.summary}
                </p>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-slate-700">
                    <Building className="w-4 h-4 text-slate-400 shrink-0" />
                    <span><strong>Entidad:</strong> {selectedProcedure.institution}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                    <span><strong>Tiempo estimado:</strong> {selectedProcedure.timeEstimate}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <ShieldAlert className="w-4 h-4 text-[#991b1b] shrink-0" />
                    <span><strong>Arancel:</strong> {selectedProcedure.cost}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href="#afiliacion"
                    className="clay-button-primary inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Descargar Guía Oficial (PDF)</span>
                  </a>
                </div>
              </div>

              {/* Pasos Secuenciales del Procedimiento */}
              <div className="lg:col-span-7 bg-slate-50/70 rounded-xl p-6 border border-slate-200/80 space-y-3">
                <span className="text-[11px] font-bold text-slate-900 uppercase tracking-wider block mb-2">
                  Pasos Requeridos para Completar el Trámite:
                </span>
                {selectedProcedure.steps.map((step, sIdx) => (
                  <div key={sIdx} className="flex items-start gap-3 bg-white p-3 rounded-lg border border-slate-100 shadow-2xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-700 font-medium leading-relaxed">{step}</span>
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
