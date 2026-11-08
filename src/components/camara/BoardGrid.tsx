import { BOARD_MEMBERS } from "@/lib/data";
import { Users2, Shield } from "lucide-react";

export function BoardGrid() {
  return (
    <section id="junta" className="py-12 border-b border-border scroll-mt-24">
      <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-brand tracking-wider uppercase">
        <Users2 className="w-3.5 h-3.5" />
        <span>Gobernanza Institucional</span>
      </div>
      <h2 className="text-2xl sm:text-3xl font-semibold text-ink tracking-tight mb-3">
        Junta Directiva Período 2025 – 2027
      </h2>
      <p className="text-sm text-ink-muted max-w-2xl mb-8">
        Líderes empresariales elegidos democráticamente en Asamblea General, con representación paritaria entre comercio tradicional, pymes cantonales y zonas francas.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {BOARD_MEMBERS.map((member) => (
          <div key={member.name} className="cca-card p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-border">
                <span className="text-xs font-semibold text-brand uppercase tracking-wider">
                  {member.role}
                </span>
                <Shield className="w-4 h-4 text-text-muted" />
              </div>
              <h3 className="font-semibold text-ink text-base">
                {member.name}
              </h3>
              <p className="text-xs font-medium text-ink-muted mt-0.5">
                {member.company}
              </p>
              <span className="inline-block px-2 py-0.5 bg-surface-muted text-text-muted text-[11px] rounded mt-2 border border-border">
                {member.sector}
              </span>
              <p className="text-xs text-text-muted mt-3 leading-relaxed">
                {member.bio}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-[11px] text-text-muted">
              <span>Periodo Estatutario</span>
              <span className="font-mono text-ink">2025 – 2027</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

