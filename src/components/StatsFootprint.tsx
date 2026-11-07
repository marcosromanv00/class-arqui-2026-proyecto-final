import { STATS_DATA } from "@/lib/data";

export function StatsFootprint() {
  return (
    <section id="estadisticas" className="border-b border-slate-200 bg-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Título de Sección estilo ICC */}
        <div className="border-b border-slate-200 pb-8 mb-12">
          <p className="text-xs uppercase font-extrabold tracking-widest text-sky-600 mb-2">
            Métricas de Desempeño
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
            Nuestro impacto en Alajuela
          </h2>
          <p className="mt-3 text-slate-600 text-sm max-w-2xl">
            Cifras reales auditadas que sustentan la reingeniería de la arquitectura de información y el valor gremial.
          </p>
        </div>

        {/* Retícula de Estadísticas idéntica a ICC (cajas con esquina acentuada) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {STATS_DATA.map((item, idx) => (
            <div
              key={idx}
              className="relative p-8 bg-slate-50 border border-slate-200 hover:border-slate-950 transition-colors group flex flex-col justify-between h-56"
            >
              {/* Esquina curva decorativa estilo ICC */}
              <div className="absolute top-0 right-0 w-8 h-8 overflow-hidden">
                <div className="w-8 h-8 rounded-bl-full bg-sky-500/20 group-hover:bg-sky-500 transition-colors" />
              </div>

              <div>
                <p className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950 group-hover:text-sky-600 transition-colors font-mono">
                  {item.number}
                </p>
                <h3 className="text-base font-bold text-slate-900 mt-2 leading-snug">
                  {item.label}
                </h3>
              </div>

              <p className="text-xs text-slate-500 font-medium leading-relaxed border-t border-slate-200/80 pt-3">
                {item.detail}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

