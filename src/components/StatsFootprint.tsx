const STATS = [
  {
    figure: "1983",
    label: "Año de fundación",
    detail: "Más de 4 décadas de gestión gremial continua en la provincia.",
    source: "Personería Oficial",
  },
  {
    figure: "16",
    label: "Cantones cubiertos",
    detail: "Desde Alajuela central y Occidente hasta la Zona Norte.",
    source: "Alcance Territorial",
  },
  {
    figure: "+840",
    label: "Empresas en padrón",
    detail: "Comercios, industrias de precisión, gastronomía y servicios.",
    source: "Padrón Activo 2026",
  },
  {
    figure: "Art. 8",
    label: "Cuota 100% deducible",
    detail: "La membresía califica como gasto de operación en renta (Ley 7092).",
    source: "Tributación Directa",
  },
];

export function StatsFootprint() {
  return (
    <section
      id="estadisticas"
      aria-label="Indicadores institucionales"
      className="bg-surface py-12 lg:py-16 border-b border-border"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-6 border-b border-border">
          <h2 className="text-xl sm:text-2xl font-semibold text-ink tracking-tight">
            Alcance y respaldo en cifras
          </h2>
          <span className="text-xs font-mono text-text-muted">
            Indicadores auditables del gremio
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-border pt-6">
          {STATS.map((item) => (
            <div
              key={item.label}
              className="py-4 sm:py-0 sm:px-6 first:pl-0 last:pr-0 flex flex-col justify-between"
            >
              <div>
                <span className="text-3xl sm:text-4xl font-semibold text-ink font-mono tracking-tight">
                  {item.figure}
                </span>
                <h3 className="mt-2 text-sm font-semibold text-ink">
                  {item.label}
                </h3>
                <p className="mt-1 text-xs text-ink-muted leading-relaxed">
                  {item.detail}
                </p>
              </div>
              <span className="mt-4 pt-2 border-t border-border/60 text-[11px] font-mono text-text-muted block">
                Fuente: {item.source}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
