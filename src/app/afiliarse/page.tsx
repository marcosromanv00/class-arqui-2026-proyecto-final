import type { Metadata } from "next";
import { Breadcrumb } from "@/components/Breadcrumb";
import { AffiliationWizard } from "@/components/AffiliationWizard";
import { ShieldCheck, CheckCircle2, FileText, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Afiliación Digital Empresarial | Membresía 100% Deducible de Renta · CCA",
  description: "Asocie su empresa a la Cámara de Comercio de Alajuela en 4 minutos. Cuota deducible del Impuesto sobre la Renta (Art. 8 Ley 7092), SINPE Móvil y beneficios inmediatos.",
};

export default function AfiliarsePage() {
  return (
    <main className="flex-1 py-8 sm:py-12 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <Breadcrumb items={[{ label: "Afiliación Digital" }]} />

        {/* Hero de Afiliación */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/5 border border-brand/20 text-xs font-semibold text-brand tracking-wide uppercase">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Afiliación Gremial Digital · Beneficio Fiscal Ley 7092</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-ink tracking-tight leading-[1.15]">
            Asocie su empresa y fortalezca la representatividad de Alajuela
          </h1>
          <p className="text-base sm:text-lg text-ink-muted leading-relaxed">
            Forme parte de la red empresarial más influyente de la provincia. Su cuota mensual es 100% deducible de impuestos y le brinda acceso inmediato al Centro de Arbitraje, bolsa de empleo y más de 40 convenios con ahorro comprobable.
          </p>
        </div>

        {/* Wizard de Afiliación con Selectores Oficiales de Usabilidad */}
        <div className="rounded-2xl border border-border bg-surface shadow-2xs overflow-hidden">
          <AffiliationWizard />
        </div>

        {/* Escudo Jurídico y Tributario */}
        <div className="cca-card p-6 sm:p-8 space-y-4 border-l-4 border-l-brand">
          <div className="flex items-center gap-2 text-xs font-semibold text-brand uppercase tracking-wider">
            <FileText className="w-4 h-4" />
            <span>Respaldo Tributario Oficial · Ley de Impuesto sobre la Renta N.º 7092</span>
          </div>
          <h3 className="text-lg font-semibold text-ink">
            Deducibilidad Total de la Cuota Gremial en su Declaración Anual
          </h3>
          <p className="text-xs sm:text-sm text-ink-muted leading-relaxed max-w-3xl">
            De conformidad con el <strong>Artículo 8, inciso i) de la Ley N.º 7092</strong>, las sumas pagadas en concepto de cuotas a cámaras, asociaciones y federaciones gremiales legalmente reconocidas por el Estado costarricense son <em>gastos fiscalmente deducibles</em> de la renta bruta para personas físicas y jurídicas con actividad lucrativa (formulario D-101 de la Dirección General de Tributación).
          </p>
          <div className="pt-2 text-xs text-text-muted flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-brand" />
            <span>La Cámara de Comercio de Alajuela emite factura electrónica timbrada exenta de IVA mensualmente.</span>
          </div>
        </div>
      </div>
    </main>
  );
}

