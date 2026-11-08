import { ArrowRight, Search, Scale, FileText, Briefcase, ShieldCheck } from "lucide-react";

const HERO_PILLARS = [
  {
    icon: Search,
    title: "Directorio Empresarial",
    desc: "+840 empresas verificadas por cantón y giro de negocio.",
    href: "#directorio",
  },
  {
    icon: Scale,
    title: "Arbitraje y Mediación",
    desc: "Resolución ágil de conflictos comerciales con valor legal.",
    href: "#tramites",
  },
  {
    icon: FileText,
    title: "Trámites y Patentes",
    desc: "Acompañamiento en permisos municipales y uso de suelo.",
    href: "#tramites",
  },
  {
    icon: Briefcase,
    title: "Bolsa de Empleo",
    desc: "Talento calificado para el comercio y zonas francas.",
    href: "#empleo",
  },
];

export function Hero() {
  return (
    <section id="inicio" className="bg-surface border-b border-border relative overflow-hidden">
      {/* Luz ambiental sutil de fondo */}
      <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 rounded-full bg-brand/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Columna Izquierda: Mensaje Institucional de Autoridad */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-muted border border-border text-xs text-ink-muted">
              <ShieldCheck className="w-3.5 h-3.5 text-brand" />
              <span>Gremio Oficial del Sector Productivo · 16 Cantones</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-5xl font-semibold text-ink tracking-tight leading-tight">
              Certeza jurídica, representación y crecimiento para las empresas de{" "}
              <span className="italic text-brand">Alajuela</span>.
            </h1>

            <p className="text-base sm:text-lg text-ink-muted leading-relaxed max-w-2xl">
              Desde 1983 representamos a más de 800 empresas ante gobiernos locales y el Estado.
              Protegemos sus derechos comerciales, agilizamos trámites municipales y resolvemos
              disputas con fuerza de cosa juzgada para que su negocio prospere con solidez.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <a
                href="#afiliacion"
                className="btn-cca-primary px-6 py-3.5 text-sm font-medium inline-flex items-center justify-center gap-2"
              >
                <span>Asociar mi empresa</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#directorio"
                className="btn-cca-secondary px-6 py-3.5 text-sm font-medium inline-flex items-center justify-center"
              >
                Consultar directorio oficial
              </a>
            </div>

            {/* Menciones de respaldo legal verificables */}
            <div className="pt-4 border-t border-border flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-text-muted">
              <span>✓ Cuota 100% deducible de Renta (Art. 8 Ley 7092)</span>
              <span>✓ Personería jurídica formal desde 1983</span>
              <span>✓ Cobertura provincial completa</span>
            </div>
          </div>

          {/* Columna Derecha: Tarjeta Fotográfica Representativa con Scrim */}
          <div className="lg:col-span-5">
            <div className="cca-card overflow-hidden p-2 bg-surface">
              <div className="relative aspect-4/3 w-full rounded-md overflow-hidden bg-slate-900">
                <img
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80"
                  alt="Distrito comercial e industrial de la provincia de Alajuela"
                  className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent flex flex-col justify-end p-6 text-surface">
                  <span className="text-xs uppercase tracking-wider text-amber-300 font-mono">
                    Provincia de Alajuela · Sede Central
                  </span>
                  <p className="font-serif text-lg font-medium text-white mt-1 leading-snug">
                    El corazón logístico, comercial e industrial de Costa Rica
                  </p>
                  <p className="text-xs text-slate-200 mt-1 leading-relaxed">
                    Articulamos desde el comercio del cantón central hasta los parques industriales y zonas francas de Occidente.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Barra de Accesos Prioritarios Directos */}
        <div className="mt-12 pt-8 border-t border-border grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {HERO_PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <a
                key={pillar.title}
                href={pillar.href}
                className="cca-card p-5 group flex flex-col justify-between hover:border-brand/40 transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-md bg-surface-muted flex items-center justify-center text-brand group-hover:bg-brand group-hover:text-surface transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                  <ArrowRight className="w-4 h-4 text-text-muted group-hover:text-brand group-hover:translate-x-0.5 transition-transform" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-ink group-hover:text-brand transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-text-muted mt-1 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
