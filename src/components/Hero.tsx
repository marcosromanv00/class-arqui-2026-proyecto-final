import { ArrowUpRight, Search } from "lucide-react";

export function Hero() {
  const highlights = [
    {
      title: "Diálogos del Comercio: Podcast",
      image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=600&q=80",
      href: "#publicaciones",
      alt: "Micrófono de podcast para entrevistas a empresarios de Alajuela"
    },
    {
      title: "Directorio Comercial Verificado",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80",
      href: "#directorio",
      alt: "Comercios, servicios y restaurantes en Alajuela"
    },
    {
      title: "Centro de Arbitraje & Mediación",
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80",
      href: "#servicios",
      alt: "Columnas clásicas que representan la justicia y el arbitraje mercantil"
    },
    {
      title: "Bolsa de Empleo & Zonas Francas",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80",
      href: "#empleo",
      alt: "Logística y operaciones en parques industriales de El Coyol"
    }
  ];

  return (
    <section className="bg-white pt-10 pb-16 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabecera del Hero estilo ICC: Título monumental a la izquierda + Buscador sutil a la derecha */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          <div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#09090b] tracking-tight leading-[1.05]">
              Por el comercio. <br />
              <span>Por Alajuela.</span>
            </h1>
          </div>

          {/* Buscador sutil superior derecho estilo ICC ("Find what you need") */}
          <div className="w-full lg:w-72 self-start lg:self-end">
            <p className="text-xs text-neutral-500 mb-1.5 font-medium">
              Encuentre lo que busca en la Cámara:
            </p>
            <form action="#directorio" className="relative">
              <input
                type="text"
                placeholder="Buscar afiliado o servicio..."
                className="w-full px-3 py-2 pr-8 text-xs bg-neutral-50 border border-neutral-300 focus:bg-white focus:border-black focus:outline-hidden"
              />
              <button
                type="submit"
                aria-label="Ejecutar búsqueda"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black"
              >
                <Search className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>

        {/* Fotografía Panorámica Monumental estilo ICC */}
        <div className="relative aspect-[21/9] sm:aspect-[24/9] w-full overflow-hidden border border-neutral-200 bg-neutral-900 mb-14">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=80"
            alt="Sede Central CCA y centro cívico comercial de Alajuela"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 text-white text-xs font-medium">
            Sede Central CCA · Costado Oeste del Museo Histórico Juan Santamaría · Alajuela Centro
          </div>
        </div>

        {/* Fila "Highlights" estilo ICC puro (4 imágenes con título debajo) */}
        <div>
          <h2 className="text-xs uppercase font-bold tracking-wider text-neutral-500 mb-4">
            Destacados
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {highlights.map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                className="group block"
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-neutral-100 border border-neutral-200 mb-2.5">
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <h3 className="text-xs sm:text-sm font-bold text-[#09090b] group-hover:text-[#991b1b] transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <ArrowUpRight className="w-3 h-3 text-neutral-400 group-hover:text-[#991b1b] shrink-0 transition-colors ml-1" />
                </div>
              </a>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
