import { ShieldCheck, Sparkles, CheckCircle2 } from "lucide-react";

export function AffiliationValueProps() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase font-bold tracking-widest text-[#991b1b] mb-2">
          Afiliación Digital Instantánea · SINPE Móvil
        </p>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#09090b] tracking-tight leading-tight">
          Únase a la red de comercio más influyente de Alajuela
        </h2>
        <p className="mt-4 text-sm text-neutral-600 leading-relaxed">
          Modernizamos la afiliación gremial: formalice su membresía en 3 sencillos pasos digitales con radicado inmediato y verificación directa.
        </p>
      </div>

      {/* Deducibilidad Fiscal Ley 7092 */}
      <div className="p-4 bg-neutral-50 border border-neutral-200 text-xs text-neutral-800 space-y-1.5">
        <span className="font-bold uppercase tracking-wide text-[#991b1b] flex items-center gap-1.5 text-[11px]">
          <ShieldCheck className="w-4 h-4 text-[#991b1b]" /> Beneficio Fiscal Ley 7092
        </span>
        <p className="leading-relaxed text-neutral-600">
          El 100% de la cuota asociativa es deducible como gasto operativo del Impuesto sobre la Renta (Artículo 8 de la Ley de Impuesto sobre la Renta de Costa Rica, Formulario D-101).
        </p>
      </div>

      {/* Retorno de Inversión (ROI) Estimado */}
      <div className="bg-white border border-neutral-200 p-5 space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-[#09090b] uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-[#991b1b]" />
          <span>Retorno Estimado de la Membresía:</span>
        </div>
        
        <div className="space-y-2 text-xs text-neutral-600">
          <div className="flex justify-between items-center py-1 border-b border-neutral-100">
            <span>Ahorro en convenios comerciales y salud:</span>
            <span className="font-mono font-bold text-neutral-900">~₡35.000/mes</span>
          </div>
          <div className="flex justify-between items-center py-1 border-b border-neutral-100">
            <span>Descuentos en suministros de oficina:</span>
            <span className="font-mono font-bold text-neutral-900">~₡20.000/mes</span>
          </div>
          <div className="flex justify-between items-center py-1 border-b border-neutral-100">
            <span>Asesoría legal y arbitraje gremial:</span>
            <span className="font-mono font-bold text-[#991b1b]">Incluido (₡0)</span>
          </div>
          <div className="flex justify-between items-center pt-2 font-bold text-[#09090b] border-t border-neutral-200">
            <span>Retorno Neto Estimado vs Cuota:</span>
            <span className="font-mono text-[#991b1b] text-sm">+360% ROI</span>
          </div>
        </div>
      </div>

      {/* Beneficios directos */}
      <div className="space-y-2.5 pt-1 text-xs text-neutral-700">
        <div className="flex items-start gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-[#991b1b] shrink-0 mt-0.5" />
          <span>Inclusión en el Directorio Comercial Verificado y mapa cantonal</span>
        </div>
        <div className="flex items-start gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-[#991b1b] shrink-0 mt-0.5" />
          <span>Publicación gratuita de vacantes en la Bolsa de Empleo</span>
        </div>
        <div className="flex items-start gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-[#991b1b] shrink-0 mt-0.5" />
          <span>Acceso al Centro de Arbitraje y Mediación Mercantil CCA</span>
        </div>
      </div>
    </div>
  );
}

