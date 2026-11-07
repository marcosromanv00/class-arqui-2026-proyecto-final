import { STATS_DATA } from "@/lib/data";

export function StatsFootprint() {
  return (
    <section id="estadisticas" className="border-b border-slate-200/80 bg-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado de Sección sobrio y autoritativo */}
        <div className="border-b border-slate-200/80 pb-8 mb-12">
          <p className="text-xs uppercase font-bold tracking-widest text-[#991b1b] mb-2">
            Métricas de Desempeño & Huella Cantonal
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#09090b] tracking-tight">
            Nuestro impacto en Alajuela
          </h2>
          <p className="mt-2.5 text-slate-600 text-sm max-w-2xl leading-relaxed">
            Cifras reales auditadas que sustentan la reingeniería de la arquitectura de información y el valor gremial de la institución en la provincia.
          </p>
        </div>

        {/* Retícula de Estadísticas en Cajas Táctiles Claymorphic */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {STATS_DATA.map((item, idx) => (
            <div
              key={idx}
              className="clay-card relative p-7 bg-white rounded-2xl border border-slate-200/90 group flex flex-col justify-between h-56 transition-all"
            >
              {/* Esquina curva decorativa suave estilo Claymorph con acento carmín */}
              <div className="absolute top-0 right-0 w-9 h-9 overflow-hidden rounded-tr-2xl">
                <div className="w-9 h-9 rounded-bl-full bg-red-100/70 group-hover:bg-[#991b1b] transition-colors" />
              </div>

              <div>
                <p className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#09090b] group-hover:text-[#991b1b] transition-colors font-mono">
                  {item.number}
                </p>
                <h3 className="text-base font-bold text-slate-900 mt-2.5 leading-snug">
                  {item.label}
                </h3>
              </div>

              <p className="text-xs text-slate-500 font-medium leading-relaxed border-t border-slate-100 pt-3">
                {item.detail}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
