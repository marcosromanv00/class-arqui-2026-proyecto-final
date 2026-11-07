import { ArrowUpRight, ArrowRight } from "lucide-react";

export function NewsPublications() {
  const secondaryPublications = [
    {
      title: "Guía Práctica para la Deducibilidad Fiscal de Cuotas (Ley 7092)",
      category: "Marco Tributario",
      date: "Octubre 2026",
      href: "#afiliacion"
    },
    {
      title: "Reglamento del Centro de Mediación y Arbitraje Mercantil CCA",
      category: "Resolución de Disputas",
      date: "Septiembre 2026",
      href: "#servicios"
    },
    {
      title: "Plan de Conectividad Logística Aeropuerto Juan Santamaría y El Coyol",
      category: "Infraestructura & Zonas Francas",
      date: "Agosto 2026",
      href: "#empleo"
    },
    {
      title: "Manual de Formalización Rápida y Patentes para Nuevos Emprendimientos",
      category: "Desarrollo Pyme",
      date: "Julio 2026",
      href: "#tramites"
    }
  ];

  return (
    <section id="publicaciones" className="bg-white py-16 sm:py-20 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabecera estilo ICC */}
        <div className="flex items-end justify-between mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#09090b] tracking-tight">
            Últimas publicaciones e informes
          </h2>
          <a
            href="#publicaciones"
            className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-neutral-600 hover:text-black transition-colors"
          >
            <span>Ver todo</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Retícula estilo ICC: Tarjeta Grande Roja a la izquierda con foto + Grilla 2x2 a la derecha */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Tarjeta Grande a la izquierda (5 columnas) */}
          <div className="lg:col-span-5 bg-[#991b1b] text-white flex flex-col justify-between overflow-hidden group">
            <div className="p-8 sm:p-10 space-y-4">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-red-200">
                Informe Trimestral de Inteligencia
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight leading-snug">
                Informe Trimestral de Inteligencia Comercial Alajuela 2026
              </h3>
              <p className="text-xs text-red-100 font-mono pt-2">
                Noviembre 2026 · Edición Provincial
              </p>
            </div>

            {/* Fotografía inferior integrada idéntica a ICC */}
            <div className="aspect-[16/10] w-full overflow-hidden bg-neutral-900">
              <img
                src="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1000&q=80"
                alt="Presentación del informe trimestral en la Cámara de Comercio de Alajuela"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>
          </div>

          {/* Grilla 2x2 a la derecha (7 columnas) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {secondaryPublications.map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                className="p-6 bg-neutral-50 border border-neutral-200 hover:border-neutral-900 transition-colors flex flex-col justify-between h-56 sm:h-64 group"
              >
                <div>
                  <span className="text-[11px] font-medium text-neutral-500 uppercase tracking-wider block mb-2">
                    {item.category}
                  </span>
                  <h4 className="text-base sm:text-lg font-bold text-[#09090b] group-hover:text-[#991b1b] transition-colors leading-snug">
                    {item.title}
                  </h4>
                </div>

                <div className="flex items-center justify-between text-xs text-neutral-400 font-mono border-t border-neutral-200/80 pt-3">
                  <span>{item.date}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-[#991b1b] transition-colors" />
                </div>
              </a>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
