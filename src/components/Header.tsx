"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Phone, MessageSquare, ArrowRight, ShieldCheck } from "lucide-react";

const NAV_ITEMS = [
  { label: "Institucional", href: "#manifiesto" },
  { label: "Servicios & Trámites", href: "#servicios" },
  { label: "Directorio Empresarial", href: "#directorio" },
  { label: "Bolsa de Empleo", href: "#empleo" },
  { label: "Observatorio Económico", href: "#publicaciones" },
  { label: "Sede & Contacto", href: "#contacto" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 16);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-200 bg-surface/95 backdrop-blur-md border-b ${
        scrolled ? "border-border shadow-xs" : "border-border/60"
      }`}
    >
      {/* Barra superior de enlace institucional rápido */}
      <div className="bg-ink text-surface text-xs py-1.5 px-4 sm:px-6 lg:px-8 border-b border-ink/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="font-medium tracking-wide">
              Personería Gremial Oficial · Fundada en 1983 · Provincia de Alajuela
            </span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-stone-300">
            <span className="flex items-center gap-1.5">
              <Phone className="w-3 h-3 text-amber-400" />
              <span>Central: (506) 2441-8118</span>
            </span>
            <a
              href="https://wa.me/50687030792"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <MessageSquare className="w-3 h-3 text-emerald-400" />
              <span>Atención WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Navegación principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logotipo / Escudo Oficial de la Cámara */}
          <Link
            href="#inicio"
            className="flex items-center gap-3.5 group focus-visible:outline-2 focus-visible:outline-brand shrink-0"
          >
            <div className="w-11 h-11 rounded-md bg-ink text-surface flex items-center justify-center border border-ink/20 shadow-xs group-hover:bg-brand transition-colors">
              <svg
                className="w-6 h-6 text-surface"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 2L3 7v6c0 5.25 3.75 10.15 9 11.25 5.25-1.1 9-6 9-11.25V7l-9-5z" />
                <path d="M9 12h6" />
                <path d="M12 9v6" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg font-semibold tracking-tight text-ink leading-tight">
                Cámara de Comercio de Alajuela
              </span>
              <span className="text-xs text-text-muted font-normal tracking-wide">
                Representación y Competitividad Empresarial
              </span>
            </div>
          </Link>

          {/* Menú de enlaces desktop */}
          <nav aria-label="Navegación principal" className="hidden xl:flex items-center gap-6 text-sm font-medium text-ink-muted">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="py-1 hover:text-brand transition-colors focus-visible:outline-2 focus-visible:outline-brand"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Botones de acción desktop */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="#directorio"
              className="btn-cca-secondary px-3.5 py-2 text-xs sm:text-sm font-medium inline-flex items-center"
            >
              Directorio
            </a>
            <a
              href="#afiliacion"
              className="btn-cca-primary px-4 py-2 text-xs sm:text-sm font-medium inline-flex items-center gap-1.5"
            >
              <span>Afiliar mi empresa</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Botón menú móvil */}
          <div className="flex xl:hidden items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-ink hover:bg-surface-muted rounded-md focus-visible:outline-2 focus-visible:outline-brand"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menú desplegable móvil */}
      {mobileMenuOpen && (
        <nav
          aria-label="Navegación móvil"
          className="xl:hidden border-t border-border bg-surface px-4 py-5 space-y-4 shadow-lg animate-in fade-in"
        >
          <ul className="space-y-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 text-sm font-medium text-ink hover:bg-surface-muted rounded-md"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="pt-3 border-t border-border flex flex-col gap-2">
            <a
              href="#afiliacion"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-cca-primary w-full py-2.5 text-center text-sm font-medium flex items-center justify-center gap-2"
            >
              <span>Afiliar mi empresa a la Cámara</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="tel:+50624418118"
              className="btn-cca-secondary w-full py-2.5 text-center text-sm font-medium flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-brand" />
              <span>Llamar a la Central: (506) 2441-8118</span>
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
