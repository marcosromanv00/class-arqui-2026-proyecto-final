import { BOARD_MEMBERS } from "@/lib/data";
import { Users2 } from "lucide-react";

export function BoardGrid() {
  return (
    <section id="junta" className="py-12 border-b border-border scroll-mt-24">
      <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-brand tracking-wider uppercase font-mono">
        <Users2 className="w-3.5 h-3.5" />
        <span>Gobernanza Institucional</span>
      </div>
      <h2 className="text-2xl sm:text-3xl font-semibold text-ink tracking-tight mb-2">
        Junta Directiva Período 2025 – 2027
      </h2>
      <p className="text-sm text-ink-muted max-w-2xl mb-8 leading-relaxed">
        Líderes empresariales elegidos democráticamente en Asamblea General, con representación paritaria entre comercio tradicional, pymes cantonales y parques industriales.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {BOARD_MEMBERS.map((member) => (
          <div
            key={member.name}
            className="bg-surface border border-border rounded-xl p-6 flex flex-col justify-between hover:border-brand/40 hover:shadow-xs transition-all duration-200"
          >
            <div>
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-border">
                <span className="text-[11px] font-mono font-semibold text-brand uppercase tracking-wider">
                  {member.role}
                </span>
                <span className="text-[10px] font-mono font-medium text-text-muted bg-surface-muted px-2 py-0.5 rounded border border-border">
                  2025–2027
                </span>
              </div>
              <h3 className="font-serif font-semibold text-ink text-lg leading-snug">
                {member.name}
              </h3>
              <p className="text-xs font-medium text-ink-muted mt-0.5">
                {member.company}
              </p>
              <div className="mt-2.5">
                <span className="inline-block px-2 py-0.5 bg-brand/5 border border-brand/20 text-brand text-[10px] font-mono font-medium rounded uppercase tracking-wider">
                  {member.sector}
                </span>
              </div>
              <p className="text-xs text-ink-muted mt-3 leading-relaxed">
                {member.bio}
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-border/80 flex items-center justify-between text-[11px] text-text-muted font-mono">
              <span>Acreditación Gremial</span>
              <span className="text-ink font-semibold">Padrón Oficial</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

