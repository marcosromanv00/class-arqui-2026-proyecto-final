import type { Metadata } from "next";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ArbitrajeForm } from "@/components/services/ArbitrajeForm";
import { Scale, CheckCircle2, Clock, ShieldCheck, FileText, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Centro de Conciliación y Arbitraje Mercantil | Ley 7727 · Cámara de Comercio de Alajuela",
  description: "Resolución alterna de conflictos mercantiles en Alajuela. Sentencias vinculantes en 15 a 30 días con fuerza de cosa juzgada, sin litigios judiciales lentos.",
};

export default function ArbitrajePage() {
  return (
    <main className="flex-1 py-8 sm:py-12 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <Breadcrumb
          items={[
            { label: "Servicios al Comercio", href: "/servicios" },
            { label: "Centro de Arbitraje" },
          ]}
        />

        {/* Hero del Centro de Arbitraje */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/5 border border-brand/20 text-xs font-semibold text-brand tracking-wide uppercase">
            <Scale className="w-3.5 h-3.5" />
            <span>Centro Autorizado por el Ministerio de Justicia y Paz · Ley 7727</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-ink tracking-tight leading-[1.15]">
            Seguridad jurídica y resolución expedita de controversias mercantiles
          </h1>
          <p className="text-base sm:text-lg text-ink-muted leading-relaxed">
            Desde 1998, el Centro de Arbitraje y Mediación de la Cámara de Comercio de Alajuela brinda a los empresarios una vía privada, técnica y vinculante para resolver disputas contractuales en semanas, protegiendo las relaciones comerciales y el flujo de caja.
          </p>
        </div>

        {/* Comparativa: Vía Judicial vs Centro CCA */}
        <div className="cca-card p-6 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-ink tracking-tight mb-2">
            Comparativa de Eficiencia: Vía Judicial Ordinaria vs Arbitraje CCA
          </h2>
          <p className="text-xs sm:text-sm text-text-muted mb-6">
            Análisis de resolución procesal para disputas mercantiles en la provincia de Alajuela:
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm text-left border-collapse">
              <thead>
                <tr className="border-b border-border bg-surface-muted/60">
                  <th className="py-3 px-4 font-semibold text-ink">Dimensión Procesal</th>
                  <th className="py-3 px-4 font-semibold text-text-muted">Tribunales Civiles del Poder Judicial</th>
                  <th className="py-3 px-4 font-semibold text-brand">Centro de Arbitraje CCA (Ley 7727)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr>
                  <td className="py-3.5 px-4 font-medium text-ink">Tiempo de Resolución</td>
                  <td className="py-3.5 px-4 text-text-muted">3 a 5 años en primera y segunda instancia</td>
                  <td className="py-3.5 px-4 font-semibold text-brand">15 a 30 días hábiles en promedio</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-medium text-ink">Efecto Jurídico del Fallo</td>
                  <td className="py-3.5 px-4 text-text-muted">Sentencia judicial sujeta a apelaciones múltiples</td>
                  <td className="py-3.5 px-4 font-semibold text-brand">Cosa juzgada material (Inapelable y ejecutoria)</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-medium text-ink">Confidencialidad</td>
                  <td className="py-3.5 px-4 text-text-muted">Expediente público con riesgo reputacional</td>
                  <td className="py-3.5 px-4 font-semibold text-brand">100% confidencial en recinto privado gremial</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-medium text-ink">Especialidad de los Jueces</td>
                  <td className="py-3.5 px-4 text-text-muted">Jueces civiles generalistas</td>
                  <td className="py-3.5 px-4 font-semibold text-brand">Árbitros especializados en usos y costumbres del comercio</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 4 Etapas del Proceso */}
        <div className="space-y-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-ink tracking-tight">
            Etapas del Procedimiento Arbitral
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="cca-card p-5">
              <span className="text-xs font-mono font-bold text-brand">01 / Radicación</span>
              <h3 className="font-semibold text-ink text-sm mt-1 mb-1.5">Solicitud Formal</h3>
              <p className="text-xs text-text-muted leading-relaxed">
                Presentación de la controversia mediante formulario físico o digital con copia del contrato mercantil.
              </p>
            </div>
            <div className="cca-card p-5">
              <span className="text-xs font-mono font-bold text-brand">02 / Notificación</span>
              <h3 className="font-semibold text-ink text-sm mt-1 mb-1.5">Convocatoria a Partes</h3>
              <p className="text-xs text-text-muted leading-relaxed">
                Notificación formal a la contraparte en un plazo de 3 días hábiles fijando fecha de audiencia privada.
              </p>
            </div>
            <div className="cca-card p-5">
              <span className="text-xs font-mono font-bold text-brand">03 / Audiencia</span>
              <h3 className="font-semibold text-ink text-sm mt-1 mb-1.5">Sesión de Mediación</h3>
              <p className="text-xs text-text-muted leading-relaxed">
                Diálogo asistido por un abogado mediador neutral en la sala de audiencias de la sede gremial de la CCA.
              </p>
            </div>
            <div className="cca-card p-5">
              <span className="text-xs font-mono font-bold text-brand">04 / Resolución</span>
              <h3 className="font-semibold text-ink text-sm mt-1 mb-1.5">Acuerdo o Laudo</h3>
              <p className="text-xs text-text-muted leading-relaxed">
                Suscripción del acta de conciliación con carácter vinculante idéntico a una sentencia judicial firme.
              </p>
            </div>
          </div>
        </div>

        {/* Formulario Interactivo */}
        <ArbitrajeForm />
      </div>
    </main>
  );
}

