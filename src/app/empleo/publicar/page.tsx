import type { Metadata } from "next";
import { Breadcrumb } from "@/components/Breadcrumb";
import { JobPostForm } from "@/components/employment/JobPostForm";
import { Building2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Publicar Plaza Vacante | Portal para Empresas Asociadas · CCA",
  description: "Canal exclusivo para empresas agremiadas a la Cámara de Comercio de Alajuela: publique sus ofertas laborales y reciba candidatos locales calificados.",
};

export default function PublicarEmpleoPage() {
  return (
    <main className="flex-1 py-8 sm:py-12 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Breadcrumb
          items={[
            { label: "Bolsa de Empleo", href: "/empleo" },
            { label: "Publicar Vacante" },
          ]}
        />

        <div className="space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/5 border border-brand/20 text-xs font-semibold text-brand tracking-wide uppercase">
            <Building2 className="w-3.5 h-3.5" />
            <span>Canal Corporativo para Empresas Asociadas</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-ink tracking-tight leading-[1.15]">
            Publicación de puestos y captación de talento local
          </h1>
          <p className="text-base sm:text-lg text-ink-muted leading-relaxed">
            Aproveche la red de intermediación de la Cámara para encontrar personal calificado en Alajuela, El Coyol y los cantones de Occidente sin costos de agencia.
          </p>
        </div>

        <JobPostForm />
      </div>
    </main>
  );
}

