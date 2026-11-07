import { ArrowUpRight, Search, Building2, ShieldCheck, Scale, Briefcase } from "lucide-react";

export function Hero() {
  return (
    <section className="border-b border-slate-200/80 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
        
        {/* Título y Propuesta de Valor (Leyes de Anti-Slop: tipografía serena y alto contraste) */}
        <div className="max-w-4xl">
          <p className="text-xs uppercase font-bold tracking-widest text-[#991b1b] mb-3">
            Plataforma Institucional Oficial · Fundada en 1983
          </p>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-[#09090b] tracking-tight leading-[1.06]">
            Por el comercio. <br />
            <span className="text-[#991b1b]">Por Alajuela.</span>
          </h1>
          <p className="mt-5 text-base sm:text-lg text-slate-600 max-w-2xl font-normal leading-relaxed">
            Representamos la fuerza productiva de los 16 cantones de la provincia. Conectamos comercios verificados, impulsamos la bolsa de empleo cantonal y brindamos seguridad jurídica con deducción fiscal del 100% (Ley 7092).
          </p>
        </div>

        {/* Buscador Rápido Integrado del Hero (Sitemap FlowMapp Canónico) */}
        <div className="mt-8 max-w-2xl">
          <form 
            action="#directorio" 
            className="clay-card p-2 rounded-2xl flex flex-col sm:flex-row items-center gap-2 border border-slate-200"
          >
            <div className="relative flex-1 w-full flex items-center pl-3">
              <Search className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="text"
                name="q"
                placeholder="Buscar comercio, servicio o vacante (ej: ferretería, contabilidad, El Coyol)..."
                className="w-full px-3 py-2 text-sm bg-transparent border-0 focus:outline-hidden text-slate-900 placeholder:text-slate-400"
              />
            </div>
            <button
              type="submit"
              className="clay-button-primary w-full sm:w-auto px-5 py-2.5 text-xs uppercase tracking-wider font-semibold whitespace-nowrap"
            >
              Explorar Directorio
            </button>
          </form>
          <div className="flex flex-wrap items-center gap-2 mt-3 text-xs text-slate-500">
            <span className="font-medium text-slate-400">Accesos rápidos:</span>
            <a href="#directorio" className="hover:text-[#991b1b] hover:underline">Ferreterías</a>
            <span>·</span>
            <a href="#directorio" className="hover:text-[#991b1b] hover:underline">Asesoría Tributaria</a>
            <span>·</span>
            <a href="#empleo" className="text-[#991b1b] font-medium hover:underline flex items-center gap-1">
              <Briefcase className="w-3 h-3" /> Bolsa de Empleo
            </a>
            <span>·</span>
            <a href="#tramites" className="hover:text-[#991b1b] hover:underline">Guía Patentes</a>
          </div>
        </div>

        {/* Banner Fotográfico Editorial con Estilo Claymorphic Frame */}
        <div className="mt-12 relative overflow-hidden rounded-2xl border border-slate-200/90 aspect-[21/9] bg-slate-950 shadow-[0_12px_30px_-8px_rgba(0,0,0,0.12)]">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-80 scale-105 hover:scale-100 transition-transform duration-700"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=80')"
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/45 to-transparent" />
          
          <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 max-w-lg text-white">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest bg-[#991b1b] text-white px-3 py-1 rounded-full mb-2 shadow-[0_2px_8px_rgba(153,27,27,0.4)]">
              <Building2 className="w-3 h-3" /> Sede Central Alajuela
            </div>
            <p className="text-xl sm:text-2xl font-bold leading-tight">
              Edificio Gremial · Plaza Tomás Guardia
            </p>
            <p className="text-xs text-slate-300 mt-1 max-w-md">
              Costado oeste del Museo Histórico Juan Santamaría. Cuatro décadas impulsando la competitividad de las empresas alajuelenses.
            </p>
          </div>
        </div>

        {/* 4 Destacados Canónicos en Tarjetas Táctiles Claymorph (80% blanco) */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          <div className="clay-card p-5 bg-white flex flex-col justify-between h-48 border border-slate-200">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-[#991b1b] uppercase tracking-wider">
                  Resolución
                </span>
                <Scale className="w-4 h-4 text-slate-400" />
              </div>
              <h3 className="text-base font-bold text-[#09090b] mt-2 leading-snug">
                Centro de Mediación y Arbitraje Gremial
              </h3>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                Resolución ágil de disputas mercantiles sin demoras judiciales.
              </p>
            </div>
            <a href="#servicios" className="inline-flex items-center gap-1 text-xs font-semibold text-[#991b1b] hover:text-[#7f1d1d] transition-colors">
              Conocer reglamento <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="clay-card p-5 bg-white flex flex-col justify-between h-48 border border-slate-200">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-[#991b1b] uppercase tracking-wider">
                  Comercio Local
                </span>
                <Building2 className="w-4 h-4 text-slate-400" />
              </div>
              <h3 className="text-base font-bold text-[#09090b] mt-2 leading-snug">
                Directorio Comercial con Sello de Verificación
              </h3>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                Filtre por distrito y contacte de inmediato vía WhatsApp.
              </p>
            </div>
            <a href="#directorio" className="inline-flex items-center gap-1 text-xs font-semibold text-[#991b1b] hover:text-[#7f1d1d] transition-colors">
              Explorar afiliados <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="clay-card p-5 bg-white flex flex-col justify-between h-48 border border-slate-200">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-[#991b1b] uppercase tracking-wider">
                  Tributario
                </span>
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
              </div>
              <h3 className="text-base font-bold text-[#09090b] mt-2 leading-snug">
                100% Deducible de Renta (Ley Costarricense 7092)
              </h3>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                La cuota gremial es deducible como gasto operativo del D-101.
              </p>
            </div>
            <a href="#afiliacion" className="inline-flex items-center gap-1 text-xs font-semibold text-[#991b1b] hover:text-[#7f1d1d] transition-colors">
              Ver marco legal <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="clay-card p-5 bg-white flex flex-col justify-between h-48 border border-slate-200">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-[#991b1b] uppercase tracking-wider">
                  Oportunidad
                </span>
                <Briefcase className="w-4 h-4 text-slate-400" />
              </div>
              <h3 className="text-base font-bold text-[#09090b] mt-2 leading-snug">
                Bolsa de Empleo Cantonal & Pasantías
              </h3>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                Vacantes activas en El Coyol, Alajuela Centro y zonas francas.
              </p>
            </div>
            <a href="#empleo" className="inline-flex items-center gap-1 text-xs font-semibold text-[#991b1b] hover:text-[#7f1d1d] transition-colors">
              Ver puestos activos <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
