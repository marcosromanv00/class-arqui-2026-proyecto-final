import { ArrowRight } from "lucide-react";

export function HumanBanner() {
  return (
    <section className="bg-[#f9fafb] border-b border-neutral-200 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Fotografía de Comerciante / Empresaria Real */}
          <div className="lg:col-span-6 relative aspect-16/10 overflow-hidden bg-neutral-200">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80"
              alt="Empresaria y comerciante agremiada de la Cámara de Comercio de Alajuela"
              className="w-full h-full object-cover object-top"
            />
            {/* Marca de agua institucional sutil */}
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-xs px-3 py-1.5 text-[11px] font-bold text-[#09090b]">
              Por el comercio. Por Alajuela.
            </div>
          </div>

          {/* Declaración de Identidad estilo ICC */}
          <div className="lg:col-span-6 lg:pl-6 space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#09090b] tracking-tight leading-[1.1]">
              Somos la organización gremial de Alajuela.
            </h2>
            <p className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#991b1b] tracking-tight leading-[1.1]">
              Somos su Cámara.
            </p>
            <p className="mt-4 text-sm text-neutral-600 leading-relaxed max-w-lg">
              Desde 1983 defendemos la libre iniciativa comercial, facilitamos la formalización tributaria y municipal, y conectamos a más de 840 empresarios en los 16 cantones de la provincia.
            </p>
            <div className="pt-4">
              <a
                href="#afiliacion"
                className="inline-flex items-center gap-2 text-xs font-bold text-[#09090b] hover:text-[#991b1b] transition-colors"
              >
                <span>Únase a la Cámara de Comercio</span>
                <ArrowRight className="w-4 h-4 text-[#991b1b]" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

