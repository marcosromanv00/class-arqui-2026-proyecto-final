import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function Hero() {
  return (
    <section className="border-b border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
        
        {/* Título Monumental Tipo ICC */}
        <div className="max-w-4xl">
          <p className="text-xs uppercase font-extrabold tracking-widest text-sky-600 mb-3">
            Plataforma Institucional Oficial
          </p>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-slate-950 tracking-tight leading-[1.08]">
            Por el comercio. <br />
            <span className="text-slate-900">Por Alajuela.</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-2xl font-normal leading-relaxed">
            Representamos la fuerza productiva de los 16 cantones de la provincia. 
            Conectamos a comerciantes, defendemos sus derechos y brindamos seguridad jurídica.
          </p>
        </div>

        {/* Banner Fotográfico Editorial estilo ICC */}
        <div className="mt-12 relative overflow-hidden border border-slate-200 aspect-[21/9] bg-slate-900">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-85 scale-105 hover:scale-100 transition-transform duration-700"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=80')"
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/40 to-transparent" />
          
          <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 max-w-md text-white">
            <span className="inline-block text-[11px] font-bold uppercase tracking-widest bg-sky-500 text-slate-950 px-2.5 py-1 mb-2">
              Sede Central
            </span>
            <p className="text-xl sm:text-2xl font-bold leading-tight">
              Edificio Gremial Alajuela Centro
            </p>
            <p className="text-xs text-slate-300 mt-1">
              Más de 4 décadas liderando el desarrollo socioeconómico de la provincia.
            </p>
          </div>
        </div>

        {/* Destacados / Highlights cuadrícula 4 columnas */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="group border border-slate-200 p-5 hover:border-slate-950 transition-colors bg-slate-50/50 hover:bg-white flex flex-col justify-between h-44">
            <div>
              <span className="text-[11px] font-bold text-sky-600 uppercase tracking-widest">
                Arbitraje
              </span>
              <h3 className="text-base font-bold text-slate-950 mt-1.5 leading-snug group-hover:text-sky-600 transition-colors">
                Centro de Mediación y Conciliación Gremial
              </h3>
            </div>
            <a href="#servicios" className="inline-flex items-center gap-1 text-xs font-semibold text-slate-900 group-hover:translate-x-0.5 transition-transform">
              Conocer reglamento <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="group border border-slate-200 p-5 hover:border-slate-950 transition-colors bg-slate-50/50 hover:bg-white flex flex-col justify-between h-44">
            <div>
              <span className="text-[11px] font-bold text-sky-600 uppercase tracking-widest">
                Directorio
              </span>
              <h3 className="text-base font-bold text-slate-950 mt-1.5 leading-snug group-hover:text-sky-600 transition-colors">
                Directorio de Comercios y Servicios Verificados
              </h3>
            </div>
            <a href="#directorio" className="inline-flex items-center gap-1 text-xs font-semibold text-slate-900 group-hover:translate-x-0.5 transition-transform">
              Explorar afiliados <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="group border border-slate-200 p-5 hover:border-slate-950 transition-colors bg-slate-50/50 hover:bg-white flex flex-col justify-between h-44">
            <div>
              <span className="text-[11px] font-bold text-sky-600 uppercase tracking-widest">
                Tributario
              </span>
              <h3 className="text-base font-bold text-slate-950 mt-1.5 leading-snug group-hover:text-sky-600 transition-colors">
                Deducibilidad del 100% bajo la Ley 7092
              </h3>
            </div>
            <a href="#afiliacion" className="inline-flex items-center gap-1 text-xs font-semibold text-slate-900 group-hover:translate-x-0.5 transition-transform">
              Ver marco legal <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="group border border-slate-200 p-5 hover:border-slate-950 transition-colors bg-slate-50/50 hover:bg-white flex flex-col justify-between h-44">
            <div>
              <span className="text-[11px] font-bold text-sky-600 uppercase tracking-widest">
                Convenios
              </span>
              <h3 className="text-base font-bold text-slate-950 mt-1.5 leading-snug group-hover:text-sky-600 transition-colors">
                Red de Descuentos Médicos y Comerciales
              </h3>
            </div>
            <a href="#directorio" className="inline-flex items-center gap-1 text-xs font-semibold text-slate-900 group-hover:translate-x-0.5 transition-transform">
              Ver convenios activos <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
