import Link from "next/link";
import { ArrowRight, ArrowDown } from "lucide-react";

const PILLAR_INDEX = [
  { code: "01", label: "Defensa e Incidencia Municipal", href: "/la-camara" },
  { code: "02", label: "Arbitraje y Seguridad Jurídica", href: "/servicios/arbitraje" },
  { code: "03", label: "Red Cantonal (16 Cantones)", href: "/directorio" },
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
          {/* Columna Izquierda: H1 de Autoridad y Bloque Tabular */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-ink tracking-tight leading-[1.12]">
              El gremio que defiende, conecta y hace crecer a las empresas de{" "}
              <span className="text-brand">Alajuela</span>.
            </h1>

            {/* Índice Tabular con Divisores Hairline */}
            <div className="border-t border-border pt-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 border-b border-border">
                <Link
                  href={PILLAR_INDEX[0].href}
                  className="py-3 pr-4 sm:border-r border-b sm:border-b-0 border-border group flex items-baseline justify-between hover:text-brand transition-colors"
                >
                  <span className="text-xs sm:text-sm font-medium text-ink group-hover:text-brand">
                    {PILLAR_INDEX[0].label}
                  </span>
                  <span className="text-[11px] font-mono text-text-muted">
                    {PILLAR_INDEX[0].code}
                  </span>
                </Link>
                <Link
                  href={PILLAR_INDEX[1].href}
                  className="py-3 sm:pl-4 group flex items-baseline justify-between hover:text-brand transition-colors"
                >
                  <span className="text-xs sm:text-sm font-medium text-ink group-hover:text-brand">
                    {PILLAR_INDEX[1].label}
                  </span>
                  <span className="text-[11px] font-mono text-text-muted">
                    {PILLAR_INDEX[1].code}
                  </span>
                </Link>
              </div>
              <Link
                href={PILLAR_INDEX[2].href}
                className="py-3 border-b border-border group flex items-baseline justify-between hover:text-brand transition-colors block"
              >
                <span className="text-xs sm:text-sm font-medium text-ink group-hover:text-brand">
                  {PILLAR_INDEX[2].label}
                </span>
                <span className="text-[11px] font-mono text-text-muted">
                  {PILLAR_INDEX[2].code}
                </span>
              </Link>
            </div>

            <p className="text-sm sm:text-base text-ink-muted leading-relaxed max-w-xl">
              Respaldamos a más de 800 empresas ante gobiernos locales y el Estado.
              Acceda a mediación mercantil ágil, orientación técnica en patentes y una bolsa de empleo activa con beneficio tributario (Art. 8 Ley 7092).
            </p>

            {/* CTAs de Alto Impacto */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
              <Link
                href="/afiliarse"
                className="group relative inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-brand text-white font-medium text-xs sm:text-sm hover:bg-brand-hover transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5"
              >
                <span>Asociar mi empresa (Deducción 100%)</span>
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-white group-hover:bg-white group-hover:text-brand transition-colors">
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
              <Link
                href="/directorio"
                className="btn-cca-secondary px-5 py-3 rounded-full text-xs sm:text-sm inline-flex items-center justify-center"
              >
                Consultar directorio oficial
              </Link>
            </div>
          </div>

          {/* Columna Derecha: Composición Visual Documental de la Sede */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-4/3 w-full rounded-xl overflow-hidden border border-border bg-surface-muted shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=1200&q=80"
                alt="Comercio y actividad productiva en Alajuela Centro"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent flex flex-col justify-end p-5 text-surface">
                <span className="text-[11px] font-mono tracking-wider uppercase text-amber-300">
                  Sede Central · Plaza Tomás Guardia
                </span>
                <p className="text-sm font-medium text-white mt-0.5">
                  Costado Oeste del Museo Histórico Cultural Juan Santamaría
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Ticker Horizontal de Sectores Representados */}
        <div className="border-t border-border py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-text-muted">
            <span className="font-semibold text-ink">Sectores representados:</span>
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
