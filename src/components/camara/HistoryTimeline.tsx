import { HISTORICAL_MILESTONES } from "@/lib/data";
import { Clock } from "lucide-react";

export function HistoryTimeline() {
  return (
    <section id="historia" className="py-12 border-b border-border scroll-mt-24">
      <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-brand tracking-wider uppercase">
        <Clock className="w-3.5 h-3.5" />
        <span>Memoria Histórica</span>
      </div>
      <h2 className="text-2xl sm:text-3xl font-semibold text-ink tracking-tight mb-3">
        Más de cuatro décadas al servicio del comercio alajuelense
      </h2>
      <p className="text-sm text-ink-muted max-w-2xl mb-10">
        Desde la conformación del primer comité de comerciantes en 1983 hasta la actual plataforma digital omnicanal de 2026.
      </p>

      <div className="relative border-l border-border pl-6 sm:pl-8 space-y-10 ml-3">
        {HISTORICAL_MILESTONES.map((m) => (
          <div key={m.year} className="relative group">
            <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-4 h-4 rounded-full border-2 border-brand bg-surface group-hover:bg-brand transition-colors" />
            <div className="inline-block px-2.5 py-0.5 rounded text-xs font-mono font-semibold text-brand bg-brand/5 border border-brand/20 mb-1.5">
              Año {m.year}
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-ink">
              {m.title}
            </h3>
            <p className="text-xs sm:text-sm text-ink-muted mt-1 max-w-2xl leading-relaxed">
              {m.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

