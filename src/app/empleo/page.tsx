import type { Metadata } from "next";
import { Breadcrumb } from "@/components/Breadcrumb";
import { EmploymentClientView } from "@/components/employment/EmploymentClientView";
import { Briefcase } from "lucide-react";

export const metadata: Metadata = {
  title: "Bolsa de Empleo Cantonal | Vacantes Formales en Alajuela · CCA",
  description: "Encuentre oportunidades de empleo formal en comercios tradicionales, pymes de servicios y empresas de El Coyol. Postulación rápida de CV respaldada por la CCA.",
};

export default function EmpleoPage() {
  return (
    <main className="flex-1 py-8 sm:py-12 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Breadcrumb items={[{ label: "Bolsa de Empleo" }]} />

        <div className="space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/5 border border-brand/20 text-xs font-semibold text-brand tracking-wide uppercase">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Intermediación Laboral Provincial Oficial</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-ink tracking-tight leading-[1.15]">
            Bolsa de empleo y vinculación de talento alajuelense
          </h1>
          <p className="text-base sm:text-lg text-ink-muted leading-relaxed">
            Conectamos a la fuerza laboral de la provincia con las empresas más sólidas y formalizadas del cantón central, zonas francas y distritos productivos.
          </p>
        </div>

        <EmploymentClientView />
      </div>
    </main>
  );
}

