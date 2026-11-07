import { PILLARS_DATA } from "@/lib/data";
import { Scale, Globe, FileCheck, Lightbulb, ArrowUpRight } from "lucide-react";

export function ServicesPillars() {
  const iconMap: Record<string, React.ReactNode> = {
    Scale: <Scale className="w-6 h-6 text-slate-900" />,
    Globe: <Globe className="w-6 h-6 text-slate-900" />,
    FileCheck: <FileCheck className="w-6 h-6 text-slate-900" />,
    Lightbulb: <Lightbulb className="w-6 h-6 text-slate-900" />
  };

  return (
    <section id="servicios" className="border-b border-slate-200 bg-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabecera Editorial estilo ICC */}
        <div className="max-w-3xl border-b border-slate-200 pb-8 mb-12">
          <p className="text-xs uppercase font-extrabold tracking-widest text-sky-600 mb-2">
            Servicios Gremiales Corporativos
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight">
            Hacemos que el comercio funcione para todos, en cada cantón
          </h2>
          <p className="mt-4 text-slate-600 text-sm leading-relaxed">
            Nuestros cuatro pilares institucionales aseguran certidumbre jurídica, competitividad y crecimiento para micro, pequeñas y grandes empresas.
          </p>
        </div>

        {/* 4 Cajas de Servicios Estilo ICC */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PILLARS_DATA.map((pillar, idx) => (
            <div
              key={idx}
              className="border border-slate-200 p-6 bg-slate-50/40 hover:bg-white hover:border-slate-950 transition-all flex flex-col justify-between group h-80"
            >
              <div>
                <div className="w-12 h-12 bg-white border border-slate-200 flex items-center justify-center mb-6 group-hover:border-slate-950 transition-colors">
                  {iconMap[pillar.icon]}
                </div>
                
                <h3 className="text-base font-extrabold text-slate-950 leading-snug group-hover:text-sky-600 transition-colors">
                  {pillar.title}
                </h3>
                
                <p className="text-[11px] font-semibold text-sky-700 uppercase tracking-wider mt-1">
                  {pillar.tagline}
                </p>

                <p className="mt-3 text-xs text-slate-600 leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200/80">
                <a
                  href="#afiliacion"
                  className="inline-flex items-center gap-1 text-xs font-bold text-slate-950 hover:text-sky-600 transition-colors"
                >
                  Solicitar servicio <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

