"use client";

import Link from "next/link";
import { Mail, Phone, MapPin, ArrowUp, MessageSquare } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-[#fafaf8] text-ink pt-14 pb-10 border-t border-border-strong">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabecera del pie: Emblema Neoclásico y Propósito Gremial */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-10 border-b border-border gap-6">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full border border-brand/20 bg-brand/5 flex items-center justify-center text-brand shrink-0">
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
            <div className="border-l border-border pl-3.5">
              <p className="font-serif font-semibold text-lg tracking-tight text-ink">
                Cámara de Comercio de Alajuela
              </p>
              <p className="text-xs text-text-muted mt-0.5">
                Organización Gremial del Sector Productivo · Fundada en 1983
              </p>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-ink-muted max-w-md leading-relaxed">
            Representación gremial, certeza jurídica y desarrollo económico para el comercio,
            la industria y los servicios en los 16 cantones de la provincia de Alajuela.
          </p>
        </div>

        {/* 4 Columnas Tradicionales de Navegación y Acreditación */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 py-10 border-b border-border text-xs sm:text-sm">
          {/* Columna 1: Sede Central */}
          <div className="space-y-3">
            <h3 className="font-semibold text-ink text-sm uppercase tracking-wider text-[12px]">
              Sede Central
            </h3>
            <div className="text-ink-muted space-y-2.5 leading-relaxed text-xs">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-brand shrink-0 mt-0.5" />
                <span>
                  Plaza Tomás Guardia, Costado Oeste del Museo Juan Santamaría, Alajuela Centro.
                </span>
              </p>
              <p className="flex items-center gap-2 font-mono">
                <Phone className="w-4 h-4 text-brand shrink-0" />
                <a href="tel:+50624418118" className="hover:text-brand transition-colors">
                  +(506) 2441-8118 / 2441-2090
                </a>
              </p>
              <p className="flex items-center gap-2 font-mono">
                <Mail className="w-4 h-4 text-brand shrink-0" />
                <a href="mailto:direccion@camaraalajuela.com" className="hover:text-brand transition-colors break-all">
                  direccion@camaraalajuela.com
                </a>
              </p>
            </div>
          </div>

          {/* Columna 2: Servicios al Comercio */}
          <div className="space-y-2.5">
            <h3 className="font-semibold text-ink text-sm uppercase tracking-wider text-[12px]">
              Servicios al Comercio
            </h3>
            <ul className="space-y-2 text-xs text-ink-muted">
              <li><Link href="/servicios/arbitraje" className="hover:text-brand transition-colors">Centro de Arbitraje Mercantil (Ley 7727)</Link></li>
              <li><Link href="/servicios/tramites" className="hover:text-brand transition-colors">Guía de Trámites y Patente Municipal</Link></li>
              <li><Link href="/servicios/convenios" className="hover:text-brand transition-colors">Convenios y Descuentos Comerciales</Link></li>
              <li><Link href="/afiliarse" className="hover:text-brand transition-colors">Planes y Tarifas de Afiliación</Link></li>
              <li><Link href="/afiliarse" className="hover:text-brand transition-colors">Formulario de Afiliación Digital (SINPE)</Link></li>
            </ul>
          </div>

          {/* Columna 3: Institucional y Directorio */}
          <div className="space-y-2.5">
            <h3 className="font-semibold text-ink text-sm uppercase tracking-wider text-[12px]">
              Institucional y Directorio
            </h3>
            <ul className="space-y-2 text-xs text-ink-muted">
              <li><Link href="/directorio" className="hover:text-brand transition-colors">Directorio Comercial (16 Cantones)</Link></li>
              <li><Link href="/empleo" className="hover:text-brand transition-colors">Bolsa de Empleo Cantonal</Link></li>
              <li><Link href="/la-camara" className="hover:text-brand transition-colors">Quiénes Somos (Misión, Visión, Valores)</Link></li>
              <li><Link href="/la-camara#junta" className="hover:text-brand transition-colors">Junta Directiva y Liderazgo</Link></li>
              <li><Link href="/la-camara#estatutos" className="hover:text-brand transition-colors">Estatutos y Transparencia Legal</Link></li>
            </ul>
          </div>

          {/* Columna 4: Contacto y Soporte */}
          <div className="space-y-3">
            <h3 className="font-semibold text-ink text-sm uppercase tracking-wider text-[12px]">
              Contacto y Soporte
            </h3>
            <p className="text-xs text-ink-muted leading-relaxed">
              Lunes a viernes de 8:00 a. m. a 5:00 p. m. en jornada continua.
            </p>
            <div className="space-y-1.5 text-xs text-ink-muted pt-1">
              <p><Link href="/faq" className="hover:text-brand transition-colors underline underline-offset-4">Preguntas Frecuentes (FAQ)</Link></p>
              <p><Link href="/contacto" className="hover:text-brand transition-colors underline underline-offset-4">Buzón de Consultas y Asesoría</Link></p>
            </div>
            <div className="pt-1">
              <a
                href="https://wa.me/50687030792"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/80 px-2.5 py-1.5 rounded-md transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                <span>WhatsApp (+506 8703-0792)</span>
              </a>
            </div>
          </div>
        </div>

        {/* Colophon & Botón de Volver Arriba */}
        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-text-muted gap-4">
          <p>© 2026 Cámara de Comercio de Alajuela · Fundada en 1983. Todos los derechos reservados.</p>
          <button
            type="button"
            onClick={scrollToTop}
            className="text-ink hover:text-brand transition-colors inline-flex items-center gap-1.5 font-medium underline underline-offset-4 cursor-pointer"
          >
            <span>Volver arriba</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
