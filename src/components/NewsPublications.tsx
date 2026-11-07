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
    <section id="publicaciones" className="border-b border-slate-200 bg-slate-50/40 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabecera de Publicaciones */}
        <div className="flex items-end justify-between border-b border-slate-200 pb-8 mb-10">
          <div>
            <p className="text-xs uppercase font-extrabold tracking-widest text-sky-600 mb-2">
              Investigación & Prensa
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
              Últimas publicaciones e informes
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Documentos de valor gremial, estudios económicos y guías normativas para la toma de decisiones empresariales.
            </p>
          </div>
          <span className="hidden sm:inline-flex items-center gap-1 text-xs font-bold text-slate-900 hover:text-sky-600 cursor-pointer">
            Ver archivo histórico <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </div>

        {/* Retícula estilo ICC: Tarjeta Azul Gigante a la izquierda + tarjetas apiladas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Tarjeta Azul Monumental estilo ICC */}
          <div className="lg:col-span-5 bg-sky-600 text-white p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden group">
            <div className="space-y-4">
              <span className="text-[11px] font-extrabold uppercase tracking-widest bg-white/20 text-white px-2.5 py-1 inline-block">
                Informe Destacado
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-snug">
                Informe Trimestral de Inteligencia Comercial Alajuela 2026
              </h3>
              <p className="text-sm text-sky-100 leading-relaxed font-normal">
                Auditoría detallada de la balanza comercial provincial, empleo formal y dinamismo en zonas francas.
              </p>
            </div>

            <div className="mt-12 pt-6 border-t border-sky-400/40 flex items-center justify-between">
              <span className="text-xs text-sky-200 font-mono">Edición Noviembre 2026 · PDF 4.2 MB</span>
              <button className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white text-slate-950 text-xs font-bold hover:bg-slate-100 transition-colors">
                <Download className="w-3.5 h-3.5" /> Descargar
              </button>
            </div>
          </div>

          {/* Grilla 2x2 de Publicaciones estilo ICC */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {publications.slice(1).map((pub, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200 hover:border-slate-950 transition-colors p-6 flex flex-col justify-between group shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] mb-2 text-slate-400">
                    <span className="font-bold text-sky-600 uppercase tracking-widest text-[10px]">
                      {pub.category}
                    </span>
                    <span className="font-mono text-[10px]">{pub.date}</span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-950 leading-snug group-hover:text-sky-600 transition-colors">
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
                  <a href="#afiliacion" className="font-bold text-slate-900 group-hover:text-sky-600 transition-colors flex items-center gap-0.5">
                    Consultar <ArrowUpRight className="w-3 h-3" />
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

