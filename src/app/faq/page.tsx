import type { Metadata } from "next";
import { Breadcrumb } from "@/components/Breadcrumb";
import { FaqAccordion } from "@/components/faq/FaqAccordion";
import { HelpCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Preguntas Frecuentes | Centro de Ayuda y Soporte · CCA",
  description: "Respuestas oficiales a dudas sobre afiliación, deducibilidad de cuota (Ley 7092), requisitos de patentes municipales, arbitraje mercantil y bolsa de empleo.",
};

export default function FaqPage() {
  return (
    <main className="flex-1 py-8 sm:py-12 bg-surface">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Breadcrumb items={[{ label: "Preguntas Frecuentes" }]} />

        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/5 border border-brand/20 text-xs font-semibold text-brand tracking-wide uppercase">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Centro de Asistencia Gremial</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-semibold text-ink tracking-tight leading-[1.15]">
            Preguntas frecuentes sobre servicios, cuotas y trámites
          </h1>
          <p className="text-base text-ink-muted leading-relaxed">
            Consulte las respuestas a las interrogantes más comunes planteadas por comerciantes y empresarios de Alajuela.
          </p>
        </div>

        <FaqAccordion />
      </div>
    </main>
  );
}

