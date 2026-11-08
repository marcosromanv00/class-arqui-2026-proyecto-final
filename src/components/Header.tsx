"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { ChevronDown, ArrowUpRight, Menu, X, ArrowRight } from "lucide-react";
import { OPTIMAL_NAV } from "@/lib/nav";

export function Header() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setActiveMenu(null);
    };
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setActiveMenu(null); setMobileMenuOpen(false); }
    };
    document.addEventListener("mousedown", onOutside);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onOutside);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-surface/95 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20" ref={navRef}>
          {/* Logo Neoclásico Geométrico de Línea Fina */}
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

          {/* Navegación Validada en Optimal Workshop */}
          <nav aria-label="Navegación principal" className="hidden lg:flex items-center gap-6 text-sm font-medium text-ink-muted">
            {OPTIMAL_NAV.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.subitems && setActiveMenu(item.label)}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <div className="flex items-center gap-1">
                  <Link href={item.href} className="py-2 hover:text-brand transition-colors">
                    {item.label}
                  </Link>
                  {item.subitems && (
                    <button
                      type="button"
                      aria-label={`Ver submenú de ${item.label}`}
                      onClick={() => setActiveMenu(activeMenu === item.label ? null : item.label)}
                      className="text-text-muted hover:text-ink p-0.5"
                    >
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-150 ${activeMenu === item.label ? "rotate-180" : ""}`} />
                    </button>
                  )}
                </div>

                {/* Submenú Flotante con Descripciones Escaneables */}
                {item.subitems && activeMenu === item.label && (
                  <div className="absolute left-0 top-full pt-1.5 w-72 z-50 animate-in fade-in slide-in-from-top-1">
                    <div className="bg-surface border border-border rounded-xl p-2 shadow-xl space-y-1">
                      {item.subitems.map((sub) => (
                        <a
                          key={sub.label}
                          href={sub.href}
                          onClick={() => setActiveMenu(null)}
                          className="group p-2.5 rounded-lg hover:bg-surface-muted flex flex-col transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-ink group-hover:text-brand">{sub.label}</span>
                            <ArrowUpRight className="w-3.5 h-3.5 text-text-muted group-hover:text-brand group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </div>
                          <span className="text-[11px] text-text-muted mt-0.5">{sub.desc}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Magnético Atractivo y de Alto Contraste */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="#afiliacion"
              id="header-affiliate-cta"
              className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-ink text-surface text-xs font-semibold hover:bg-brand transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5"
            >
              <span>Afiliar mi Empresa</span>
              <div className="w-5 h-5 rounded-full bg-surface/20 flex items-center justify-center text-surface group-hover:bg-surface group-hover:text-brand transition-colors">
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </a>
          </div>

          {/* Botón Menú Móvil */}
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

      {/* Menú Desplegable Móvil */}
      {mobileMenuOpen && (
        <nav className="lg:hidden border-t border-border bg-surface px-4 py-4 space-y-3 shadow-lg max-h-[80vh] overflow-y-auto">
          {OPTIMAL_NAV.map((item) => (
            <div key={item.label} className="border-b border-border/60 pb-2">
              <Link
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-semibold text-ink hover:text-brand py-1"
              >
                {item.label}
              </Link>
              {item.subitems && (
                <div className="pl-3 mt-1 space-y-1">
                  {item.subitems.map((sub) => (
                    <a
                      key={sub.label}
                      href={sub.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-xs text-text-muted hover:text-brand py-1"
                    >
                      • {sub.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="pt-2">
            <a
              href="#afiliacion"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-cca-primary w-full py-2.5 text-center text-xs font-semibold flex items-center justify-center gap-2"
            >
              <span>Afiliar mi Empresa a la Cámara</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
