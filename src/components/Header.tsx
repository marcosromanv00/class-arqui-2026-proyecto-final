"use client";

import Link from "next/link";
import Image from "next/image";
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
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4" ref={navRef}>
          {/* Logo Oficial de la Cámara de Comercio de Alajuela */}
          <Link
            href="/"
            className="flex items-center group shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 rounded"
            aria-label="Cámara de Comercio de Alajuela - Inicio"
          >
            <Image
              src="/Logo-camara-hi.png"
              alt="Cámara de Comercio de Alajuela"
              width={227}
              height={48}
              priority
              className="h-12 w-auto object-contain group-hover:opacity-95 transition-opacity"
            />
          </Link>

          {/* Navegación Validada en Optimal Workshop */}
          <nav aria-label="Navegación principal" className="hidden lg:flex items-center gap-5 xl:gap-8 text-sm font-medium text-ink-muted">
            {OPTIMAL_NAV.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.subitems && setActiveMenu(item.label)}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <div className="flex items-center gap-1 group/item">
                  <Link
                    href={item.href}
                    className="py-2 hover:text-brand transition-colors whitespace-nowrap text-[13px] xl:text-sm font-medium tracking-tight"
                  >
                    <span>{item.shortLabel ?? item.label}</span>
                  </Link>
                  {item.subitems && (
                    <button
                      type="button"
                      aria-label={`Ver submenú de ${item.label}`}
                      onClick={() => setActiveMenu(activeMenu === item.label ? null : item.label)}
                      className="text-text-muted hover:text-ink p-0.5 group-hover/item:text-brand transition-colors"
                    >
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-150 ${activeMenu === item.label ? "rotate-180" : ""}`} />
                    </button>
                  )}
                </div>

                {/* Submenú Flotante con Taxonomía Oficial y Descripciones Escaneables */}
                {item.subitems && activeMenu === item.label && (
                  <div className="absolute left-0 top-full pt-1.5 w-84 z-50 animate-in fade-in slide-in-from-top-1">
                    <div className="bg-surface border border-border rounded-xl p-2 shadow-xl space-y-1">
                      <div className="px-2.5 py-1.5 border-b border-border/60 text-[10px] font-mono font-semibold text-brand tracking-wider uppercase">
                        {item.label}
                      </div>
                      {item.subitems.map((sub) => (
                        <Link
                          key={sub.label}
                          href={sub.href}
                          onClick={() => setActiveMenu(null)}
                          className="group p-2.5 rounded-lg hover:bg-surface-muted flex flex-col transition-colors"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs font-semibold text-ink group-hover:text-brand">{sub.label}</span>
                            <ArrowUpRight className="w-3.5 h-3.5 text-text-muted group-hover:text-brand group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
                          </div>
                          <span className="text-[11px] text-text-muted mt-0.5 leading-snug">{sub.desc}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Magnético Atractivo y de Alto Contraste */}
          <div className="hidden lg:flex items-center shrink-0">
            <Link
              href="/afiliarse"
              id="header-affiliate-cta"
              className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ink text-surface text-xs font-semibold hover:bg-brand transition-all duration-200 shadow-xs hover:shadow-md hover:-translate-y-0.5"
            >
              <span>Afiliar mi Empresa</span>
              <div className="w-5 h-5 rounded-full bg-surface/20 flex items-center justify-center text-surface group-hover:bg-surface group-hover:text-brand transition-colors">
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
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
                    <Link
                      key={sub.label}
                      href={sub.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-xs text-text-muted hover:text-brand py-1"
                    >
                      • {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="pt-2">
            <Link
              href="/afiliarse"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-cca-primary w-full py-2.5 text-center text-xs font-semibold flex items-center justify-center gap-2"
            >
              <span>Afiliar mi Empresa a la Cámara</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
