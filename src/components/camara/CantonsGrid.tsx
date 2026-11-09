import { CANTONS_ALAJUELA } from "@/lib/data";
import { MapPin } from "lucide-react";

export function CantonsGrid() {
  return (
    <section id="cifras" className="py-12 border-b border-border scroll-mt-24">
      <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-brand tracking-wider uppercase">
        <MapPin className="w-3.5 h-3.5" />
        <span>Despliegue Cantonal</span>
      </div>
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-semibold text-ink tracking-tight">
            Presencia y Representación en los 16 Cantones
          </h2>
          <p className="text-sm text-ink-muted max-w-2xl mt-1">
            La Cámara de Comercio de Alajuela es el único gremio con delegaciones y asociados activos en la totalidad del territorio provincial.
          </p>
        </div>
        <div className="text-xs text-text-muted bg-surface-muted border border-border px-3 py-2 rounded">
          Total Provincial: <span className="font-semibold text-brand">840+ empresas asociadas</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {CANTONS_ALAJUELA.map((canton) => (
          <div
            key={canton.name}
            className="p-4 rounded-xl bg-surface border border-border hover:border-brand/40 transition-all shadow-[0_1px_2px_rgba(0,0,0,0.02)] flex flex-col justify-between"
          >
            <div>
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="font-semibold text-ink text-sm">
                  {canton.name}
                </h3>
                <span className="text-[10px] font-mono font-semibold text-brand bg-brand/5 border border-brand/20 px-1.5 py-0.5 rounded shrink-0">
                  {canton.afiliados} socios
                </span>
              </div>
              <p className="text-[11px] text-text-muted mt-1">
                Cabecera: <span className="text-ink font-medium">{canton.cabecera}</span>
              </p>
              <p className="text-xs text-ink-muted mt-2 leading-relaxed">
                {canton.actividadPrincipal}
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-border/70 text-[10px] font-mono text-text-muted uppercase tracking-wider">
              Jurisdicción Gremial Activa
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

