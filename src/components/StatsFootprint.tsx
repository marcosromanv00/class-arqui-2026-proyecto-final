import { ArrowUpRight } from "lucide-react";

export function StatsFootprint() {
  const stats = [
    {
      number: "+840",
      description: "Comercios y servicios afiliados verificados en los 16 cantones de la provincia de Alajuela."
    },
    {
      number: "₡125M",
      description: "Ahorro anual consolidado en convenios de salud, suministros y logística para agremiados."
    },
    {
      number: "98.4%",
      description: "Efectividad en resolución extrajudicial del Centro de Arbitraje y Mediación Mercantil."
    },
    {
      number: "4 Min",
      description: "Tiempo promedio de registro digital en línea, erradicando el trámite presencial de 5 días."
    },
    {
      number: "100%",
      description: "Deducción de la cuota asociativa como gasto operativo del impuesto de renta (Ley 7092)."
    }
  ];

  return (
    <section id="estadisticas" className="bg-white py-16 sm:py-20 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado directo estilo ICC */}
        <h2 className="text-3xl sm:text-4xl font-bold text-[#09090b] tracking-tight mb-10">
          Nuestro impacto en cifras:
        </h2>

        {/* Retícula 3x2 idéntica a ICC con esquina acentuada en Rojo Carmín */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((item, idx) => (
            <div
              key={idx}
              className="relative p-7 sm:p-8 bg-neutral-50 border border-neutral-200 flex flex-col justify-between h-52 group hover:border-neutral-900 transition-colors"
            >
              {/* Esquina curva decorativa exacta de ICC */}
              <div className="absolute top-0 right-0 w-6 h-6 overflow-hidden">
                <div className="w-6 h-6 rounded-bl-full bg-[#991b1b]" />
              </div>

              <div>
                <p className="text-3xl sm:text-4xl font-bold tracking-tight text-[#09090b] font-mono">
                  {item.number}
                </p>
              </div>

              <p className="text-xs text-neutral-600 leading-relaxed font-normal pr-4">
                {item.description}
              </p>
            </div>
          ))}

          {/* Sexta caja estilo ICC: Tarjeta de llamada a la acción */}
          <div className="relative p-7 sm:p-8 bg-neutral-50 border border-neutral-200 flex flex-col justify-between h-52 group hover:border-neutral-900 transition-colors">
            <div className="absolute top-0 right-0 w-6 h-6 overflow-hidden">
              <div className="w-6 h-6 rounded-bl-full bg-[#991b1b]" />
            </div>

            <p className="text-xs text-neutral-600 leading-relaxed font-normal pt-2">
              Liderazgo gremial consolidado por más de 42 años en la provincia. Descubra cómo afiliar su negocio a la red comercial más influyente de Alajuela.
            </p>

            <a
              href="#afiliacion"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#09090b] hover:text-[#991b1b] transition-colors uppercase tracking-wider"
            >
              <span>Explorar afiliación</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#991b1b]" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
