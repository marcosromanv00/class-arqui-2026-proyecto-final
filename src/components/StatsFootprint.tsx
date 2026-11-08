import { Building2, MapPin, Users, Award } from "lucide-react";

const STATS = [
  {
    icon: Building2,
    figure: "+42 Años",
    label: "Trayectoria Gremial",
    detail: "Fundada en 1983 con personería jurídica continua al servicio del comercio alajuelense.",
    source: "Registro Histórico CCA",
  },
  {
    icon: MapPin,
    figure: "16 Cantones",
    label: "Cobertura Provincial",
    detail: "Desde el cantón central y Occidente hasta la Zona Norte y el corredor industrial de El Coyol.",
    source: "Ámbito Territorial",
  },
  {
    icon: Users,
    figure: "+840 Empresas",
    label: "Red de Asociados",
    detail: "Comercios minoristas, industrias de precisión, gastronomía, agroindustria y firmas profesionales.",
    source: "Padrón Oficial Activo",
  },
  {
    icon: Award,
    figure: "100% Deducible",
    label: "Beneficio Tributario",
    detail: "La membresía califica legalmente como gasto operativo deducible en la declaración D-101.",
    source: "Art. 8 · Ley N.° 7092",
  },
];

export function StatsFootprint() {
  return (
    <section
      id="estadisticas"
      aria-label="Indicadores institucionales de impacto"
      className="bg-surface py-16 border-b border-border"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 mb-8 border-b border-border gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-brand font-semibold">
              Impacto y Cobertura Verificable
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-ink tracking-tight mt-1">
              La fuerza de nuestro gremio en números
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-text-muted max-w-md">
            Indicadores auditables que respaldan la representatividad y solidez
            de la Cámara ante el sector público y privado.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="p-6 bg-surface-muted border border-border rounded-lg flex flex-col justify-between hover:border-brand/40 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-serif text-3xl sm:text-4xl font-semibold text-ink tracking-tight">
                      {item.figure}
                    </span>
                    <div className="w-8 h-8 rounded-md bg-surface border border-border flex items-center justify-center text-brand">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="text-sm font-semibold text-ink">
                    {item.label}
                  </h3>
                  <p className="text-xs text-ink-muted mt-2 leading-relaxed">
                    {item.detail}
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-border/80">
                  <span className="text-[11px] font-mono text-text-muted">
                    Fuente: {item.source}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
