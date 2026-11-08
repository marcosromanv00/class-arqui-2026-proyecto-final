import { Award, FileText, CheckCircle2, ShieldCheck } from "lucide-react";

export function AffiliationValueProps() {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl sm:text-3xl font-semibold text-ink tracking-tight leading-snug">
          Asocie su empresa a la Cámara de Comercio
        </h2>
        <p className="mt-2 text-sm text-ink-muted leading-relaxed">
          Abierto para personas físicas con actividad lucrativa y personas jurídicas en los 16 cantones de Alajuela.
        </p>
      </div>

      {/* Deducibilidad Fiscal Ley 7092 */}
      <div className="p-4 bg-surface border border-border rounded-lg space-y-1.5">
        <div className="flex items-center gap-2 text-ink font-semibold text-xs sm:text-sm">
          <Award className="w-4 h-4 text-brand shrink-0" />
          <span>Gasto 100% deducible de Renta (Art. 8 Ley 7092)</span>
        </div>
        <p className="text-xs text-ink-muted leading-relaxed">
          La cuota asociativa se deduce como gasto de operación en la declaración anual D-101 ante Tributación Directa.
        </p>
      </div>

      {/* Requisitos de Ingreso */}
      <div className="p-4 bg-surface border border-border rounded-lg space-y-2">
        <div className="flex items-center gap-1.5 text-xs text-ink font-semibold">
          <FileText className="w-3.5 h-3.5 text-brand shrink-0" />
          <span>Requisitos básicos de ingreso:</span>
        </div>
        <ul className="space-y-1.5 text-xs text-ink-muted">
          <li className="flex items-start gap-2">
            <span className="font-mono text-brand font-bold">1.</span>
            <span>Cédula jurídica vigente o cédula de identidad de comerciante.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-mono text-brand font-bold">2.</span>
            <span>Actividad comercial demostrable en la provincia de Alajuela.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-mono text-brand font-bold">3.</span>
            <span>
              Patente comercial al día o en proceso.{" "}
              <a href="#tramites" className="text-brand underline hover:text-brand-hover">
                Consulte aquí la guía de patente municipal
              </a>
              .
            </span>
          </li>
        </ul>
      </div>

      {/* Beneficios directos */}
      <div className="space-y-1.5 pt-1 text-xs text-ink-muted">
        <p className="font-semibold text-ink text-xs">
          Beneficios incluidos con su membresía:
        </p>
        <div className="flex items-start gap-2">
          <CheckCircle2 className="w-3.5 h-3.5 text-brand shrink-0 mt-0.5" />
          <span>Ficha verificada en el Directorio Comercial oficial.</span>
        </div>
        <div className="flex items-start gap-2">
          <CheckCircle2 className="w-3.5 h-3.5 text-brand shrink-0 mt-0.5" />
          <span>Publicación de ofertas en la Bolsa de Empleo provincial.</span>
        </div>
        <div className="flex items-start gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-brand shrink-0 mt-0.5" />
          <span>Arancel preferencial en mediación y arbitraje mercantil.</span>
        </div>
      </div>
    </div>
  );
}
