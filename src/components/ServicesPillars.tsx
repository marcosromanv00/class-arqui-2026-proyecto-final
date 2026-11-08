"use client";

import { useState } from "react";
import { MUNICIPAL_PROCEDURES_DATA } from "@/lib/data";
import { Scale, FileCheck, Users, Briefcase, CheckCircle2, Clock, ShieldCheck, ArrowRight } from "lucide-react";

const CORE_SERVICES = [
  {
    icon: Scale,
    tag: "Seguridad Contractual",
    title: "Centro de Conciliación y Arbitraje",
    desc: "Resolución alterna de controversias comerciales y contractuales sin llegar a tribunales ordinarios. Sentencias con fuerza vinculante y total confidencialidad.",
    access: "Arancel preferencial para asociados con membresía activa.",
  },
  {
    icon: FileCheck,
    tag: "Apertura y Permisos",
    title: "Ventanilla de Patentes y Trámites",
    desc: "Orientación técnica paso a paso para obtención y renovación de patentes municipales, permisos sanitarios del Ministerio de Salud y usos de suelo.",
    access: "Asesoría inicial sin costo para comerciantes de la provincia.",
  },
  {
    icon: Users,
    tag: "Alianzas y Ahorro",
    title: "Convenios Comerciales y Salud",
    desc: "Beneficios exclusivos con clínicas de salud ocupacional, servicios legales, telecomunicaciones, seguros y tarifas preferenciales entre miembros.",
    access: "Presentando el carné digital o físico de asociado CCA.",
  },
  {
    icon: Briefcase,
    tag: "Gestión de Talento",
    title: "Bolsa de Empleo y Formación",
    desc: "Canal directo para publicar vacantes laborales y acceder a talleres ejecutivos sobre reforma tributaria, facturación electrónica y gestión empresarial.",
    access: "Publicaciones ilimitadas para empresas del padrón oficial.",
  },
];

export function ServicesPillars() {
  const [activeTab, setActiveTab] = useState<"patente" | "arbitraje">("patente");
  const selectedProcedure =
    activeTab === "patente"
      ? MUNICIPAL_PROCEDURES_DATA[0]
      : MUNICIPAL_PROCEDURES_DATA[1];

  return (
    <section id="servicios" className="bg-surface-muted py-16 lg:py-24 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 mb-10 border-b border-border gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-brand font-semibold">
              Servicios para el Sector Productivo
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-semibold text-ink tracking-tight mt-1">
              Plataforma integral de soporte a su negocio
            </h2>
          </div>
          <p className="text-sm text-ink-muted max-w-lg">
            Soluciones prácticas para reducir costos operativos, blindar contratos
            y resolver trámites institucionales con rapidez.
          </p>
        </div>

        {/* Cuadrícula de 4 Servicios Principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {CORE_SERVICES.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="p-7 bg-surface border border-border rounded-lg flex flex-col justify-between hover:border-brand/40 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-md bg-brand/10 text-brand flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono font-medium text-text-muted">
                      {item.tag}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-ink-muted leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-xs text-text-muted">
                  <span>
                    <strong className="text-ink">Acceso:</strong> {item.access}
                  </span>
                  <a href="#contacto" className="text-brand font-medium hover:underline inline-flex items-center gap-1">
                    Consultar <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Sección Interactiva: Guías de Trámites y Arbitraje */}
        <div id="tramites" className="bg-surface border border-border rounded-xl p-6 sm:p-10 shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-6 border-b border-border gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-brand font-semibold">
                Guía Práctica Normativa
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-semibold text-ink mt-1">
                Requisitos oficiales y etapas del trámite
              </h3>
            </div>

            <div className="flex items-center gap-2 bg-surface-muted p-1 rounded-lg border border-border self-start lg:self-center">
              <button
                type="button"
                onClick={() => setActiveTab("patente")}
                className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-md transition-all ${
                  activeTab === "patente"
                    ? "bg-surface text-ink shadow-xs border border-border"
                    : "text-text-muted hover:text-ink"
                }`}
              >
                Patente Comercial Municipal
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("arbitraje")}
                className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-md transition-all ${
                  activeTab === "arbitraje"
                    ? "bg-surface text-ink shadow-xs border border-border"
                    : "text-text-muted hover:text-ink"
                }`}
              >
                Conciliación y Arbitraje (Ley 7727)
              </button>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 space-y-4">
              <h4 className="text-lg font-semibold text-ink">
                {selectedProcedure.title}
              </h4>
              <p className="text-sm text-ink-muted leading-relaxed">
                {selectedProcedure.summary}
              </p>

              <div className="p-4 bg-surface-muted rounded-lg border border-border space-y-2 text-xs sm:text-sm">
                <div className="flex items-center gap-2 text-ink-muted">
                  <ShieldCheck className="w-4 h-4 text-brand shrink-0" />
                  <span><strong>Entidad:</strong> {selectedProcedure.institution}</span>
                </div>
                <div className="flex items-center gap-2 text-ink-muted">
                  <Clock className="w-4 h-4 text-text-muted shrink-0" />
                  <span><strong>Plazo estimado:</strong> {selectedProcedure.timeEstimate}</span>
                </div>
                <div className="flex items-center gap-2 text-ink-muted">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span><strong>Costo / Arancel:</strong> {selectedProcedure.cost}</span>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="#contacto"
                  className="btn-cca-primary px-5 py-2.5 text-xs sm:text-sm inline-flex items-center gap-2"
                >
                  <span>Solicitar acompañamiento técnico</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-7 bg-surface-muted p-6 rounded-lg border border-border space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-ink font-semibold block mb-2">
                Paso a paso del procedimiento:
              </span>
              <ul className="space-y-2.5">
                {selectedProcedure.steps.map((step, idx) => (
                  <li
                    key={idx}
                    className="p-3 bg-surface border border-border rounded-md text-sm text-ink-muted flex items-start gap-3"
                  >
                    <span className="font-mono text-brand font-semibold text-xs mt-0.5">
                      0{idx + 1}.
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
