import { ArrowRight, ArrowDown } from "lucide-react";

const PILLAR_INDEX = [
  { code: "01", label: "Representación Gremial", href: "#manifiesto" },
  { code: "02", label: "Seguridad Jurídica", href: "#tramites" },
  { code: "03", label: "Desarrollo Territorial (16 Cantones)", href: "#directorio" },
];

const SECTORS = [
  "Comercio Detallista",
  "Zonas Francas",
  "Industria Médica",
  "Agroindustria",
  "Servicios Profesionales",
];

export function Hero() {
  return (
    <section id="inicio" className="bg-surface border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 py-12 lg:py-16 items-center">
          {/* Columna Izquierda: Tipografía Editorial y Bloque Tabular (Espresso System) */}
          <div className="lg:col-span-6 space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-ink tracking-tight leading-[1.08]">
              Por el comercio.{" "}
              <span className="block text-brand">Por Alajuela.</span>
            </h1>

            {/* Índice Tabular con Divisores Hairline (Referencia Espresso System) */}
            <div className="border-t border-border pt-1">
              <div className="grid grid-cols-2 border-b border-border">
                <a
                  href={PILLAR_INDEX[0].href}
                  className="py-3 pr-4 border-r border-border group flex items-baseline justify-between hover:text-brand transition-colors"
                >
                  <span className="text-xs sm:text-sm font-medium text-ink group-hover:text-brand">
                    {PILLAR_INDEX[0].label}
                  </span>
                  <span className="text-[11px] font-mono text-text-muted">
                    {PILLAR_INDEX[0].code}
                  </span>
                </a>
                <a
                  href={PILLAR_INDEX[1].href}
                  className="py-3 pl-4 group flex items-baseline justify-between hover:text-brand transition-colors"
                >
                  <span className="text-xs sm:text-sm font-medium text-ink group-hover:text-brand">
                    {PILLAR_INDEX[1].label}
                  </span>
                  <span className="text-[11px] font-mono text-text-muted">
                    {PILLAR_INDEX[1].code}
                  </span>
                </a>
              </div>
              <a
                href={PILLAR_INDEX[2].href}
                className="py-3 border-b border-border group flex items-baseline justify-between hover:text-brand transition-colors block"
              >
                <span className="text-xs sm:text-sm font-medium text-ink group-hover:text-brand">
                  {PILLAR_INDEX[2].label}
                </span>
                <span className="text-[11px] font-mono text-text-muted">
                  {PILLAR_INDEX[2].code}
                </span>
              </a>
            </div>

            <p className="text-sm sm:text-base text-ink-muted leading-relaxed max-w-xl">
              Defendemos y conectamos al sector productivo en los 16 cantones de la provincia.
              Más de 800 empresas unidas con personería gremial ininterrumpida desde 1983.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
              <a
                href="#afiliacion"
                className="btn-cca-primary px-5 py-3 text-xs sm:text-sm inline-flex items-center justify-center gap-2"
              >
                <span>Asociar mi empresa</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#directorio"
                className="btn-cca-secondary px-5 py-3 text-xs sm:text-sm inline-flex items-center justify-center"
              >
                Consultar directorio oficial
              </a>
            </div>
          </div>

          {/* Columna Derecha: Composición Arquitectónica y Fotográfica Editorial */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-4/3 w-full rounded-lg overflow-hidden border border-border bg-surface-muted shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=1200&q=80"
                alt="Actividad comercial cotidiana en el cantón central de Alajuela"
                className="w-full h-full object-cover"
              />
              {/* Overlay y Coordenadas Arquitectónicas Reales */}
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent flex flex-col justify-end p-6 text-surface">
                <span className="text-[11px] font-mono tracking-wider uppercase text-amber-300">
                  Alajuela Centro · Costado Oeste Museo Juan Santamaría
                </span>
                <p className="text-sm font-medium text-white mt-1">
                  Sede Central de la Cámara de Comercio de Alajuela
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Barra Inferior Horizontal de Sectores (Estilo Ticker Espresso System) */}
        <div className="border-t border-border py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-text-muted">
            <span className="font-semibold text-ink">Sectores:</span>
            {SECTORS.map((sector) => (
              <span key={sector} className="hover:text-ink transition-colors">
                {sector}
              </span>
            ))}
          </div>

          <a
            href="#manifiesto"
            aria-label="Ir a la siguiente sección"
            className="w-8 h-8 rounded-full border border-border hover:border-ink flex items-center justify-center text-text-muted hover:text-ink transition-colors shrink-0 self-end sm:self-auto"
          >
            <ArrowDown className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
