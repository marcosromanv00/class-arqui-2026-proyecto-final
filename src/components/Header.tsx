"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { ChevronDown, ArrowUpRight, Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { label: "Nosotros", href: "#manifiesto" },
  { label: "Servicios", href: "#servicios" },
  { label: "Directorio", href: "#directorio" },
  { label: "Empleo", href: "#empleo" },
  { label: "Observatorio", href: "#publicaciones" },
  { label: "Contacto", href: "#contacto" },
];

const ECOSYSTEM_ACTIONS = [
  { index: "01", title: "Asociar mi empresa", subtitle: "Incorporación gremial", href: "#afiliacion" },
  { index: "02", title: "Consultar directorio", subtitle: "+840 comercios verificados", href: "#directorio" },
  { index: "03", title: "Patentes y arbitraje", subtitle: "Ventanilla única y mediación", href: "#tramites" },
  { index: "04", title: "Bolsa de empleo", subtitle: "Vacantes activas en Alajuela", href: "#empleo" },
];

export function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setDropdownOpen(false);
    };
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setDropdownOpen(false); setMobileMenuOpen(false); }
    };
    document.addEventListener("mousedown", onOutside);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("mousedown", onOutside);
      document.removeEventListener("keydown", handleEscape);
    };
    function handleEscape(e: KeyboardEvent) { onEscape(e); }
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-surface/95 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="#inicio" className="flex items-center gap-3 group shrink-0">
            <div className="w-10 h-10 rounded-full border border-ink/20 flex items-center justify-center text-ink group-hover:border-brand group-hover:text-brand transition-colors bg-surface-muted/50">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 21h18" /><path d="M4 18h16" /><path d="M6 18V9" /><path d="M10 18V9" /><path d="M14 18V9" /><path d="M18 18V9" /><path d="M3 9h18L12 3 3 9z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-sm tracking-tight text-ink uppercase leading-none">Cámara de Comercio</span>
              <span className="text-[11px] text-text-muted tracking-wider uppercase mt-1 leading-none">Alajuela · 1983</span>
            </div>
          </Link>

          <nav aria-label="Navegación principal" className="hidden lg:flex items-center gap-7 text-sm font-medium text-ink-muted">
            {NAV_ITEMS.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-brand transition-colors">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:block relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setDropdownOpen((prev) => !prev)}
              aria-expanded={dropdownOpen}
              className="px-4 py-2 rounded-full border border-border bg-surface hover:bg-surface-muted text-ink text-xs font-medium inline-flex items-center gap-2 transition-colors"
            >
              <span>Gestiones y Afiliación</span>
              <ChevronDown className={`w-3.5 h-3.5 text-text-muted transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 top-full pt-3 w-88 z-50">
                <div className="bg-surface border border-border rounded-xl p-2 shadow-xl grid grid-cols-2 gap-2">
                  {ECOSYSTEM_ACTIONS.map((action) => (
                    <a
                      key={action.index}
                      href={action.href}
                      onClick={() => setDropdownOpen(false)}
                      className="group p-4 rounded-lg bg-surface-muted/60 hover:bg-surface hover:border-border border border-transparent flex flex-col justify-between min-h-24 transition-all"
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="font-mono text-xs font-semibold text-text-muted group-hover:text-brand">{action.index}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-text-muted group-hover:text-brand group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                      <div className="mt-3">
                        <p className="text-xs font-semibold text-ink group-hover:text-brand leading-snug">{action.title}</p>
                        <p className="text-[11px] text-text-muted mt-0.5 leading-tight">{action.subtitle}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex lg:hidden items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-ink hover:bg-surface-muted rounded-md"
              aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <nav className="lg:hidden border-t border-border bg-surface px-4 py-4 space-y-3 shadow-lg">
          <ul className="space-y-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link href={item.href} onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-sm font-medium text-ink hover:bg-surface-muted rounded-md">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="pt-3 border-t border-border grid grid-cols-2 gap-2">
            {ECOSYSTEM_ACTIONS.map((action) => (
              <a key={action.index} href={action.href} onClick={() => setMobileMenuOpen(false)} className="p-3 rounded-lg bg-surface-muted border border-border flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-brand font-semibold">{action.index}</span>
                  <ArrowUpRight className="w-3 h-3 text-text-muted" />
                </div>
                <div className="mt-2">
                  <p className="text-xs font-semibold text-ink">{action.title}</p>
                </div>
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
