import { Building2, Mail, Phone, MapPin, Shield, ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-950 text-white pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabecera del Footer idéntica a ICC: Logo blanco minimalista + texto institucional */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-12 border-b border-slate-800/80 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white text-slate-950 font-black flex items-center justify-center text-base">
              CCA
            </div>
            <div>
              <p className="font-extrabold text-sm uppercase tracking-tight text-white">
                Cámara de Comercio de Alajuela
              </p>
              <p className="text-[11px] text-slate-400 tracking-widest uppercase">
                Costa Rica · Fundada en 1983
              </p>
            </div>
          </div>

          <div className="text-xs text-slate-400 max-w-md">
            Órgano representativo del sector comercial, industrial, turístico y de servicios de la provincia de Alajuela.
          </div>
        </div>

        {/* 4 Columnas del Footer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 py-12 border-b border-slate-800/80 text-xs">
          
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
              Sede Central
            </h4>
            <div className="text-slate-400 space-y-2 leading-relaxed">
              <p className="flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                Costado Oeste del Parque Central de Alajuela, Edificio Cámara de Comercio.
              </p>
              <p className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                +506 2441-2090
              </p>
              <p className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                info@camaraalajuela.com
              </p>
            </div>
          </div>

          <div className="space-y-2.5">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
              Arquitectura del Portal
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#directorio" className="hover:text-white transition-colors">Directorio de Comercios</a></li>
              <li><a href="#servicios" className="hover:text-white transition-colors">Centro de Arbitraje & Mediación</a></li>
              <li><a href="#estadisticas" className="hover:text-white transition-colors">Métricas de Impacto Cantonal</a></li>
              <li><a href="#publicaciones" className="hover:text-white transition-colors">Informes Económicos</a></li>
              <li><a href="#afiliacion" className="hover:text-white transition-colors">Afiliación Digital SINPE</a></li>
            </ul>
          </div>

          <div className="space-y-2.5">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
              Marco Jurídico & Normativo
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#afiliacion" className="hover:text-white transition-colors">Deducibilidad Fiscal (Ley 7092)</a></li>
              <li><a href="#servicios" className="hover:text-white transition-colors">Reglamento de Arbitraje Gremial</a></li>
              <li><a href="#afiliacion" className="hover:text-white transition-colors">Términos de Afiliación Digital</a></li>
              <li><a href="#directorio" className="hover:text-white transition-colors">Política de Comercios Verificados</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
              Consultoría Académica UNA
            </h4>
            <div className="text-slate-400 space-y-1.5">
              <p className="text-[11px] text-slate-300 font-semibold">
                EIF-511 Arquitectura de Información
              </p>
              <p>Escuela de Informática · Universidad Nacional</p>
              <p className="text-slate-500 pt-1">
                Consultores: Marcos Román (Coord.), Emanuel Soto, Allan Arce.
              </p>
              <div className="pt-2">
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-sky-400 uppercase tracking-widest bg-sky-950/60 border border-sky-800/80 px-2 py-0.5">
                  <Shield className="w-3 h-3" /> Entrega Final 100%
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Pie de Copyright estilo ICC */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-4">
          <p>© 2026 Cámara de Comercio de Alajuela (CCA). Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <span className="hover:text-slate-400 transition-colors cursor-pointer">Privacidad</span>
            <span className="hover:text-slate-400 transition-colors cursor-pointer">Accesibilidad WCAG 2.1</span>
            <span className="hover:text-slate-400 transition-colors cursor-pointer">Sitemap</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

