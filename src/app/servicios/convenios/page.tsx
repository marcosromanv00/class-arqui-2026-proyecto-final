import type { Metadata } from "next";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CONVENIOS_CATALOG } from "@/lib/data";
import { ConveniosCalculator } from "@/components/services/ConveniosCalculator";
import { Award, ShieldCheck, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Convenios Comerciales y Alianzas | Descuentos para Afiliados · CCA",
  description: "Acceda a más de 40 convenios institucionales en Alajuela: BAC Credomatic, Hospital Metropolitano, seguros INS, combustible y tecnología con tarifas preferenciales.",
};

export default function ConveniosPage() {
  return (
    <main className="flex-1 py-8 sm:py-12 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <Breadcrumb
          items={[
            { label: "Servicios al Comercio", href: "/servicios" },
            { label: "Convenios Comerciales" },
          ]}
        />

        {/* Hero de Convenios */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/5 border border-brand/20 text-xs font-semibold text-brand tracking-wide uppercase">
            <Award className="w-3.5 h-3.5" />
            <span>Alianzas Estratégicas Oficiales</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-ink tracking-tight leading-[1.15]">
            Tarifas preferenciales y retorno directo para su negocio
          </h1>
          <p className="text-base sm:text-lg text-ink-muted leading-relaxed">
            La fuerza colectiva de más de 800 empresas nos permite negociar acuerdos corporativos de gran escala con bancos, aseguradoras, centros médicos y proveedores logísticos.
          </p>
        </div>

        {/* Calculadora Interactiva de ROI */}
        <ConveniosCalculator />

        {/* Catálogo Detallado de Convenios */}
        <div className="space-y-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-ink tracking-tight">
              Catálogo Oficial de Convenios Activos
            </h2>
            <p className="text-xs sm:text-sm text-text-muted mt-1">
              Presentando su certificación o carnet digital de afiliado activo en cualquiera de estas entidades:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CONVENIOS_CATALOG.map((conv) => (
              <div key={conv.id} className="cca-card p-6 flex flex-col justify-between hover:border-brand/40 transition-colors">
                <div>
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-border">
                    <span className="text-[11px] font-mono font-medium text-brand uppercase">
                      {conv.category}
                    </span>
                    <ShieldCheck className="w-4 h-4 text-text-muted" />
                  </div>
                  <h3 className="font-semibold text-ink text-base">
                    {conv.partner}
                  </h3>
                  <div className="mt-2 p-2.5 rounded bg-brand/5 border border-brand/20 text-xs font-semibold text-brand">
                    {conv.discount}
                  </div>
                  <p className="text-xs text-text-muted mt-3 leading-relaxed">
                    {conv.description}
                  </p>
                  <p className="text-xs font-medium text-ink mt-2">
                    💡 ROI: <span className="text-text-muted font-normal">{conv.roiEjemplo}</span>
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-border text-[11px] text-text-muted">
                  <strong>Términos:</strong> {conv.terms}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Banner de Enlace a Directorio de Descuentos entre Socios */}
        <div className="rounded-2xl border border-border bg-ink text-surface p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1 max-w-xl">
            <h3 className="text-lg sm:text-xl font-semibold text-white">
              ¿Ofrece su comercio un descuento exclusivo a la comunidad gremial?
            </h3>
            <p className="text-xs sm:text-sm text-stone-300">
              Incorpore su beneficio en el Directorio Comercial Oficial para ganar clientes entre las más de 800 empresas asociadas de Alajuela.
            </p>
          </div>
          <Link
            href="/contacto?asunto=proponer-convenio"
            className="btn-cca-primary px-5 py-2.5 text-xs font-semibold shrink-0 inline-flex items-center gap-2"
          >
            <span>Proponer Convenio Comercial</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </main>
  );
}

