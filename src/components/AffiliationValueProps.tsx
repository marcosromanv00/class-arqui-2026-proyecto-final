import { ShieldCheck, CheckCircle2, FileText, Award } from "lucide-react";

export function AffiliationValueProps() {
  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs font-mono uppercase tracking-wider text-brand font-semibold">
          Membresía Empresarial
        </span>
        <h2 className="font-serif text-2xl sm:text-4xl font-semibold text-ink tracking-tight mt-1 leading-snug">
          Respaldo, representación y beneficios tangibles para su empresa
        </h2>
        <p className="mt-3 text-sm sm:text-base text-ink-muted leading-relaxed">
          La afiliación a la Cámara está abierta para personas físicas con actividad lucrativa y personas jurídicas de los 16 cantones de la provincia de Alajuela.
        </p>
      </div>

      {/* Deducibilidad Fiscal Ley 7092 */}
      <div className="p-5 bg-surface border border-border rounded-xl shadow-xs space-y-2">
        <div className="flex items-center gap-2 text-ink font-semibold text-sm">
          <Award className="w-4 h-4 text-brand shrink-0" />
          <span>Gasto 100% deducible de Renta (Art. 8 Ley N.° 7092)</span>
        </div>
        <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
          Las cuotas de afiliación gremial son deducibles en la declaración anual D-101 ante la Dirección General de Tributación, reduciendo el costo real de su membresía.
        </p>
      </div>

      {/* Requisitos Básicos */}
      <div className="p-5 bg-surface border border-border rounded-xl shadow-xs space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-ink font-semibold">
          <FileText className="w-4 h-4 text-brand shrink-0" />
          <span>Requisitos sencillos de ingreso</span>
        </div>
        <ul className="space-y-2 text-xs sm:text-sm text-ink-muted">
          <li className="flex items-start gap-2.5">
            <span className="font-mono text-brand font-bold">01.</span>
            <span>Cédula jurídica vigente o documento de identidad de comerciante.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="font-mono text-brand font-bold">02.</span>
            <span>Actividad económica demostrable en la provincia de Alajuela.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="font-mono text-brand font-bold">03.</span>
            <span>Patente comercial al día o en proceso de formalización asistida.</span>
          </li>
        </ul>
      </div>

      {/* Beneficios directos inmediatos */}
      <div className="space-y-2 pt-1 text-xs sm:text-sm text-ink-muted">
        <p className="font-semibold text-ink text-sm">
          Beneficios activos desde el primer día:
        </p>
        <div className="flex items-start gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-brand shrink-0 mt-0.5" />
          <span>Perfil oficial verificado en el Directorio Empresarial provincial.</span>
        </div>
        <div className="flex items-start gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-brand shrink-0 mt-0.5" />
          <span>Publicaciones libres en la Bolsa de Empleo provincial.</span>
        </div>
        <div className="flex items-start gap-2.5">
          <ShieldCheck className="w-4 h-4 text-brand shrink-0 mt-0.5" />
          <span>Arancel preferencial en el Centro de Mediación y Arbitraje Mercantil.</span>
        </div>
      </div>
    </div>
  );
}
