import { ArrowUpRight, FileText, Download } from "lucide-react";

export function NewsPublications() {
  const publications = [
    {
      title: "Informe Trimestral del Comercio Alajuelense 2026",
      category: "Economía & Mercado",
      date: "Noviembre 2026",
      description: "Análisis del impacto de la inflación, tasas de interés bancarias y perspectivas de crecimiento para pymes del cantón central y Occidente.",
      isPrimary: true
    },
    {
      title: "Guía Práctica para la Deducibilidad Fiscal de Cuotas (Ley 7092)",
      category: "Marco Tributario",
      date: "Octubre 2026",
      description: "Instructivo paso a paso para contadores y gerentes financieros sobre la aplicación del Artículo 8 en declaraciones D-101.",
      isPrimary: false
    },
    {
      title: "Reglamento del Centro de Mediación y Arbitraje Mercantil CCA",
      category: "Resolución de Disputas",
      date: "Septiembre 2026",
      description: "Estatuto oficial de procedimientos rápidos de conciliación para evitar litigios judiciales onerosos entre comerciantes.",
      isPrimary: false
    },
    {
      title: "Plan Estratégico de Conectividad Logística Aeropuerto Juan Santamaría",
      category: "Infraestructura & Exportación",
      date: "Agosto 2026",
      description: "Propuesta de la Cámara para agilizar el desalmacenaje aduanal y el flujo de mercancías hacia zonas francas de El Coyol.",
      isPrimary: false
    },
    {
      title: "Manual de Formalización Rápida de Nuevos Emprendimientos",
      category: "Desarrollo Pyme",
      date: "Julio 2026",
      description: "Hoja de ruta simplificada para permisos municipales de salud, pólizas del INS y registro en el Ministerio de Hacienda.",
      isPrimary: false
    }
  ];

  return (
    <section id="publicaciones" className="border-b border-slate-200/80 bg-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabecera de Publicaciones */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-200/80 pb-8 mb-10 gap-4">
          <div>
            <p className="text-xs uppercase font-bold tracking-widest text-[#991b1b] mb-2">
              Investigación Gremial & Prensa
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#09090b] tracking-tight">
              Últimas publicaciones e informes
            </h2>
            <p className="mt-2 text-sm text-slate-600 max-w-xl leading-relaxed">
              Documentos de valor gremial, estudios económicos de la provincia y guías normativas para la toma de decisiones empresariales.
            </p>
          </div>
          <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-800 hover:text-[#991b1b] cursor-pointer">
            Ver archivo histórico <ArrowUpRight className="w-3.5 h-3.5 text-[#991b1b]" />
          </span>
        </div>

        {/* Retícula Editorial: Tarjeta Monumental en Grafito a la izquierda + tarjetas apiladas en blanco */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Tarjeta Destacada en Negro Grafito con Acentos Carmín (Contraste Sobrio) */}
          <div className="lg:col-span-5 bg-[#09090b] text-white rounded-2xl p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden group shadow-md border border-slate-800">
            <div className="space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-widest bg-[#991b1b] text-white px-2.5 py-1 rounded-md inline-block shadow-xs">
                Informe Trimestral Destacado
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-snug">
                Informe Trimestral de Inteligencia Comercial Alajuela 2026
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                Auditoría técnica de la balanza comercial provincial, dinamismo en parques de El Coyol y perspectivas de inversión para pymes de los 16 cantones.
              </p>
            </div>

            <div className="mt-10 pt-6 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-mono">Edición Noviembre 2026 · PDF 4.2 MB</span>
              <button className="clay-button-secondary inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-900 bg-white hover:bg-slate-100 transition-all rounded-lg">
                <Download className="w-3.5 h-3.5 text-[#991b1b]" /> 
                <span>Descargar</span>
              </button>
            </div>
          </div>

          {/* Grilla 2x2 de Publicaciones en Claymorph Cards Blancas */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {publications.slice(1).map((pub, idx) => (
              <div
                key={idx}
                className="clay-card rounded-2xl bg-white border border-slate-200/90 hover:border-red-300 transition-all p-6 flex flex-col justify-between group shadow-2xs"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] mb-2.5 text-slate-400">
                    <span className="font-bold text-[#991b1b] uppercase tracking-wider text-[10px] bg-red-50 px-2 py-0.5 rounded border border-red-100">
                      {pub.category}
                    </span>
                    <span className="font-mono text-[10px] text-slate-500">{pub.date}</span>
                  </div>

                  <h4 className="text-sm font-bold text-[#09090b] leading-snug group-hover:text-[#991b1b] transition-colors">
                    {pub.title}
                  </h4>

                  <p className="mt-2 text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {pub.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500">
                    <FileText className="w-3.5 h-3.5 text-slate-400" /> Documento Oficial
                  </span>
                  <a href="#tramites" className="font-bold text-slate-900 group-hover:text-[#991b1b] transition-colors flex items-center gap-0.5">
                    <span>Consultar</span>
                    <ArrowUpRight className="w-3 h-3 text-[#991b1b]" />
                  </a>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
