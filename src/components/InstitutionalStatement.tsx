import { ArrowRight } from "lucide-react";

export function InstitutionalStatement() {
  return (
    <section id="manifiesto" className="bg-white py-16 sm:py-20 border-b border-neutral-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#09090b] tracking-tight leading-snug">
          La Cámara de Comercio de Alajuela es la voz colectiva de la{" "}
          <span className="text-[#991b1b]">economía cantonal</span>.
        </h2>

        <p className="mt-6 text-sm sm:text-base text-neutral-600 leading-relaxed font-normal max-w-2xl mx-auto">
          Desde su fundación en 1983, la institución articula a micro, pequeñas y grandes empresas en los 16 cantones de la provincia. Velamos por la certidumbre jurídica, la resolución ágil de controversias y la competitividad del sector productivo.
        </p>

        <div className="mt-6">
          <a
            href="#afiliacion"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#09090b] hover:text-[#991b1b] transition-colors"
          >
            <span>Conocer más sobre la Cámara y su personería</span>
            <ArrowRight className="w-4 h-4 text-[#991b1b]" />
          </a>
        </div>

      </div>
    </section>
  );
}

