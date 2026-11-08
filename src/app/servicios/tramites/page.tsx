import type { Metadata } from "next";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ProcedureChecklist } from "@/components/services/ProcedureChecklist";
import { FileCheck, Building2, HelpCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Guía de Patente Municipal de Alajuela | Trámites Comerciales · CCA",
  description: "Requisitos oficiales y ventanilla de acompañamiento para apertura de negocios en Alajuela: Uso de Suelo, Permiso de Salud, Póliza INS y patente comercial.",
};

export default function TramitesPage() {
  return (
    <main className="flex-1 py-8 sm:py-12 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <Breadcrumb
          items={[
            { label: "Servicios al Comercio", href: "/servicios" },
            { label: "Guía de Patente Municipal" },
          ]}
        />

        {/* Hero de Trámites y Patentes */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/5 border border-brand/20 text-xs font-semibold text-brand tracking-wide uppercase">
            <Building2 className="w-3.5 h-3.5" />
            <span>Ventanilla de Enlace Técnico con la Municipalidad de Alajuela</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-ink tracking-tight leading-[1.15]">
            Guía oficial de patentes comerciales y licencias cantonales
          </h1>
          <p className="text-base sm:text-lg text-ink-muted leading-relaxed">
            Abra su negocio en el cantón central de Alajuela con total seguridad y sin trabas burocráticas. La Cámara de Comercio de Alajuela le acompaña en cada paso para obtener su patente municipal en tiempo récord.
          </p>
        </div>

        {/* Checklist interactivo por sector */}
        <div className="space-y-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-ink tracking-tight">
              Requisitos por Giro de Actividad Comercial
            </h2>
            <p className="text-xs sm:text-sm text-text-muted mt-1">
              Seleccione el sector de su empresa para ver la lista exacta de requisitos, entidades responsables y tiempos estimados:
            </p>
          </div>
          <ProcedureChecklist />
        </div>

        {/* Sección de Preguntas Frecuentes sobre Patentes */}
        <div className="cca-card p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-2 text-xs font-semibold text-brand uppercase tracking-wider">
            <HelpCircle className="w-4 h-4" />
            <span>Dudas Habituales sobre Licencias Municipales</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
            <div className="space-y-1.5">
              <h3 className="font-semibold text-ink">¿Cuánto cuesta la patente comercial municipal?</h3>
              <p className="text-text-muted leading-relaxed">
                El arancel de la patente comercial no es un monto fijo inicial: se calcula sobre los ingresos brutos anuales declarados ante Tributación (Ley de Patentes de Alajuela N.º 8461). El trámite de solicitud e inspección municipal no tiene costo impositivo anticipado.
              </p>
            </div>
            <div className="space-y-1.5">
              <h3 className="font-semibold text-ink">¿Qué sucede si inicio operaciones sin patente?</h3>
              <p className="text-text-muted leading-relaxed">
                Operar sin patente comercial expone al negocio a la clausura inmediata por parte de la Policía Municipal, colocación de sellos y una multa pecuniaria acumulativa. Por ello, la CCA prioriza el acompañamiento formal preventivo.
              </p>
            </div>
            <div className="space-y-1.5">
              <h3 className="font-semibold text-ink">¿La CCA puede gestionar el trámite en mi nombre?</h3>
              <p className="text-text-muted leading-relaxed">
                Sí. Mediante poder especial otorgado por el representante legal, nuestros gestores gremiales autorizados pueden radicar, dar seguimiento y retirar las resoluciones municipales en ventanilla física y digital.
              </p>
            </div>
            <div className="space-y-1.5">
              <h3 className="font-semibold text-ink">¿Puedo cambiar la ubicación de mi patente?</h3>
              <p className="text-text-muted leading-relaxed">
                Sí, se tramita un traslado de patente. Requiere solicitar un nuevo Uso de Suelo en el nuevo local comercial y la actualización del Permiso Sanitario de Funcionamiento del Ministerio de Salud.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

