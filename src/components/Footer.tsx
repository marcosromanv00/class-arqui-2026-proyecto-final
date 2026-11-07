import { Building2, Mail, Phone, MapPin, Shield, ExternalLink, MessageSquare } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#09090b] text-white pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabecera del Footer con Identidad Institucional Oficial */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-12 border-b border-slate-800/80 gap-6">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 bg-[#991b1b] text-white font-black rounded-xl flex items-center justify-center text-base shadow-[0_4px_12px_rgba(153,27,27,0.4)]">
              CCA
            </div>
            <div>
              <p className="font-extrabold text-sm uppercase tracking-tight text-white">
                Cámara de Comercio de Alajuela
              </p>
              <p className="text-[11px] text-slate-400 tracking-widest uppercase mt-0.5">
                Costa Rica · Personería Jurídica Fundada en 1983
              </p>
            </div>
          </div>

          <div className="text-xs text-slate-400 max-w-md leading-relaxed">
            Órgano representativo del sector comercial, industrial, turístico y de servicios de la provincia de Alajuela. Sede oficial en Plaza Tomás Guardia.
          </div>
        </div>

        {/* 4 Columnas del Footer Canónico (Anti-slop: estructuración formal y sobria) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 py-12 border-b border-slate-800/80 text-xs">
          
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
              Sede Central & Contacto
            </h4>
            <div className="text-slate-400 space-y-2 leading-relaxed">
              <p className="flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
                Costado Oeste del Museo Histórico Juan Santamaría, Plaza Tomás Guardia, Alajuela Centro.
              </p>
              <p className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-red-400 shrink-0" />
                +(506) 2441-8118 / 2441-2090
              </p>
              <p className="flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-red-400 shrink-0" />
                WhatsApp: +(506) 8703-0792
              </p>
              <p className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-red-400 shrink-0" />
                direccion@camaraalajuela.com
              </p>
            </div>
          </div>

          <div className="space-y-2.5">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
              Arquitectura del Portal
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#directorio" className="hover:text-white transition-colors">Directorio Comercial Verificado</a></li>
              <li><a href="#empleo" className="hover:text-white transition-colors">Bolsa de Empleo Cantonal (/oferentes/)</a></li>
              <li><a href="#tramites" className="hover:text-white transition-colors">Ventanilla de Patentes Comerciales</a></li>
              <li><a href="#servicios" className="hover:text-white transition-colors">Centro de Arbitraje & Mediación</a></li>
              <li><a href="#publicaciones" className="hover:text-white transition-colors">Informes Trimestrales de Comercio</a></li>
              <li><a href="#afiliacion" className="hover:text-white transition-colors">Wizard de Afiliación Digital SINPE</a></li>
            </ul>
          </div>

          <div className="space-y-2.5">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
              Marco Jurídico & Normativa
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#afiliacion" className="hover:text-white transition-colors">Deducibilidad de Renta (Art. 8 Ley 7092)</a></li>
              <li><a href="#servicios" className="hover:text-white transition-colors">Reglamento de Arbitraje Gremial CCA</a></li>
              <li><a href="#tramites" className="hover:text-white transition-colors">Requisitos de Apertura Comercial</a></li>
              <li><a href="#afiliacion" className="hover:text-white transition-colors">Términos de la Membresía Digital</a></li>
              <li><a href="#directorio" className="hover:text-white transition-colors">Política Anti-Replay en Pasarela SINPE</a></li>
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
              <p className="text-slate-500 pt-1 leading-relaxed">
                Consultores: Marcos Román Valverde (Coord.), Emanuel Soto, Allan Arce.
              </p>
              <div className="pt-2">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-red-300 uppercase tracking-widest bg-red-950/70 border border-red-800/80 px-2.5 py-1 rounded-md">
                  <Shield className="w-3 h-3 text-red-400" /> Entrega Final 100% · Turnkey
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Pie de Copyright y Accesibilidad */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-4">
          <p>© 2026 Cámara de Comercio de Alajuela (CCA). Fundada en 1983. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <span className="hover:text-slate-400 transition-colors cursor-pointer">Privacidad de Datos</span>
            <span className="hover:text-slate-400 transition-colors cursor-pointer">Accesibilidad WCAG 2.1 AA</span>
            <span className="hover:text-slate-400 transition-colors cursor-pointer">Sitemap FlowMapp</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
