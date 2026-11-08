import Link from "next/link";
import { Mail, Phone, MapPin, ArrowUp } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-ink text-surface pt-16 pb-12 border-t border-ink/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabecera del pie: Emblema y Propósito Gremial */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-12 border-b border-stone-800 gap-6">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full border border-stone-700 bg-stone-900 flex items-center justify-center text-amber-400 shrink-0">
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M3 21h18" />
                <path d="M4 18h16" />
                <path d="M6 18V9" />
                <path d="M10 18V9" />
                <path d="M14 18V9" />
                <path d="M18 18V9" />
                <path d="M3 9h18L12 3 3 9z" />
              </svg>
            </div>
            <div className="border-l border-stone-700 pl-3.5">
              <p className="font-serif font-semibold text-lg tracking-tight text-white">
                Cámara de Comercio de Alajuela
              </p>
              <p className="text-xs text-stone-400 mt-0.5">
                Organización Gremial del Sector Productivo · Fundada en 1983
              </p>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-stone-300 max-w-md leading-relaxed">
            Representación, certeza jurídica y desarrollo económico para el comercio,
            la industria, el turismo y los servicios en los 16 cantones de Alajuela.
          </p>
        </div>

        {/* 4 Columnas Tradicionales de Navegación y Acreditación */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 py-12 border-b border-stone-800 text-xs sm:text-sm">
          <div className="space-y-3">
            <h3 className="font-semibold text-white text-sm">
              Sede Central
            </h3>
            <div className="text-stone-300 space-y-2.5 leading-relaxed">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  Plaza Tomás Guardia, Costado Oeste del Museo Histórico Cultural Juan Santamaría, Alajuela Centro.
                </span>
              </p>
              <p className="flex items-center gap-2 font-mono">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href="tel:+50624418118" className="hover:text-white transition-colors">
                  +(506) 2441-8118 / 2441-2090
                </a>
              </p>
              <p className="flex items-center gap-2 font-mono">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href="mailto:direccion@camaraalajuela.com" className="hover:text-white transition-colors break-all">
                  direccion@camaraalajuela.com
                </a>
              </p>
            </div>
          </div>

          <div className="space-y-2.5">
            <h3 className="font-semibold text-white text-sm">
              Servicios al Comercio
            </h3>
            <ul className="space-y-2 text-stone-300">
              <li><Link href="/servicios/arbitraje" className="hover:text-white transition-colors">Centro de Arbitraje y Mediación Mercantil</Link></li>
              <li><Link href="/servicios/tramites" className="hover:text-white transition-colors">Guía de Trámites y Patente Municipal</Link></li>
              <li><Link href="/servicios/convenios" className="hover:text-white transition-colors">Convenios y Descuentos Comerciales</Link></li>
              <li><Link href="/afiliarse" className="hover:text-white transition-colors">Planes y Tarifas de Afiliación</Link></li>
              <li><Link href="/afiliarse" className="hover:text-white transition-colors">Formulario de Afiliación Digital (SINPE)</Link></li>
            </ul>
          </div>

          <div className="space-y-2.5">
            <h3 className="font-semibold text-white text-sm">
              Institucional y Directorio
            </h3>
            <ul className="space-y-2 text-stone-300">
              <li><Link href="/directorio" className="hover:text-white transition-colors">Directorio Comercial de Alajuela</Link></li>
              <li><Link href="/empleo" className="hover:text-white transition-colors">Bolsa de Empleo Cantonal</Link></li>
              <li><Link href="/la-camara" className="hover:text-white transition-colors">Quiénes Somos (Misión, Visión, Valores)</Link></li>
              <li><Link href="/la-camara#junta" className="hover:text-white transition-colors">Junta Directiva y Liderazgo</Link></li>
              <li><Link href="/la-camara#estatutos" className="hover:text-white transition-colors">Estatutos y Transparencia Legal</Link></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-white text-sm">
              Contacto y Soporte
            </h3>
            <p className="text-stone-300 leading-relaxed">
              Lunes a viernes de 8:00 a. m. a 5:00 p. m. en jornada continua.
            </p>
            <div className="space-y-1.5 text-xs text-stone-300 pt-1">
              <p><Link href="/faq" className="hover:text-white transition-colors underline underline-offset-4">Preguntas Frecuentes (FAQ)</Link></p>
              <p><Link href="/contacto" className="hover:text-white transition-colors underline underline-offset-4">Buzón de Consultas y Denuncias</Link></p>
            </div>
            <div className="flex items-center gap-4 pt-2 text-stone-300">
              <a
                href="https://wa.me/50687030792"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors text-xs underline underline-offset-4 font-mono"
              >
                Canal Oficial de WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Colophon & Botón de Volver Arriba */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-stone-400 gap-4">
          <p>© 2026 Cámara de Comercio de Alajuela. Fundada en 1983. Todos los derechos reservados.</p>
          <Link
            href="/"
            className="text-stone-300 hover:text-white transition-colors inline-flex items-center gap-1.5 underline underline-offset-4"
          >
            <span>Volver al inicio</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
