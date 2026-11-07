"use client";

import Link from "next/link";
import { useState } from "react";
import { Search, ChevronDown, Menu, X, ArrowUpRight } from "lucide-react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo CCA estilo ICC puro */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-[#09090b] text-white flex items-center justify-center font-bold text-base tracking-tight group-hover:bg-[#991b1b] transition-colors">
              CCA
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm tracking-tight text-[#09090b] uppercase leading-tight">
                Cámara de Comercio
              </span>
              <span className="text-[11px] text-neutral-500 font-normal tracking-wider uppercase">
                Alajuela · Costa Rica · 1983
              </span>
            </div>
          </Link>

          {/* Navegación Desktop estilo ICC */}
          <nav className="hidden lg:flex items-center gap-7 text-[13px] font-medium text-neutral-700">
            <div className="relative group cursor-pointer py-2">
              <span className="flex items-center gap-1 group-hover:text-black transition-colors">
                Institucional <ChevronDown className="w-3.5 h-3.5 text-neutral-400 group-hover:text-black transition-transform group-hover:rotate-180" />
              </span>
              <div className="absolute top-full left-0 w-56 bg-white border border-neutral-200 shadow-lg opacity-0 translate-y-1 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all p-2 space-y-0.5">
                <Link href="#manifiesto" className="block px-3 py-2 text-xs hover:bg-neutral-50 text-neutral-700 hover:text-black">
                  Voz de la Economía Cantonal
                </Link>
                <Link href="#estadisticas" className="block px-3 py-2 text-xs hover:bg-neutral-50 text-neutral-700 hover:text-black">
                  Nuestro Impacto en Cifras
                </Link>
                <Link href="#servicios" className="block px-3 py-2 text-xs hover:bg-neutral-50 text-neutral-700 hover:text-black">
                  Pilares de Actuación
                </Link>
              </div>
            </div>

            <Link href="#directorio" className="hover:text-black transition-colors">
              Directorio Comercial
            </Link>

            <Link href="#servicios" className="hover:text-black transition-colors">
              Servicios & Arbitraje
            </Link>

            <Link href="#publicaciones" className="hover:text-black transition-colors">
              Publicaciones & Informes
            </Link>

            <Link href="#contacto" className="hover:text-black transition-colors">
              Contacto
            </Link>
          </nav>

          {/* Acciones principales estilo ICC */}
          <div className="hidden sm:flex items-center gap-4">
            <a
              href="#directorio"
              id="header-search-btn"
              className="inline-flex items-center gap-1.5 text-xs text-neutral-600 hover:text-black transition-colors py-2"
            >
              <Search className="w-3.5 h-3.5 text-neutral-400" />
              <span>Buscar</span>
            </a>

            <a
              href="#afiliacion"
              id="header-affiliate-cta"
              className="btn-icc-primary px-4 py-2.5 text-xs inline-flex items-center gap-1.5"
            >
              <span>Afiliarse</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Botón Móvil */}
          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-neutral-800 hover:text-black"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Menú Móvil Desplegable */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-neutral-200 bg-white px-4 pt-3 pb-6 space-y-4">
          <div className="space-y-1">
            <Link
              href="#manifiesto"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-medium text-neutral-800 hover:bg-neutral-50"
            >
              Institucional (Historia 1983)
            </Link>
            <Link
              href="#directorio"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-medium text-neutral-800 hover:bg-neutral-50"
            >
              Directorio Comercial
            </Link>
            <Link
              href="#servicios"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-medium text-neutral-800 hover:bg-neutral-50"
            >
              Servicios & Arbitraje
            </Link>
            <Link
              href="#publicaciones"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-medium text-neutral-800 hover:bg-neutral-50"
            >
              Publicaciones & Informes
            </Link>
            <Link
              href="#contacto"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-medium text-neutral-800 hover:bg-neutral-50"
            >
              Contacto
            </Link>
          </div>
          <div className="pt-2">
            <a
              href="#afiliacion"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-icc-primary w-full text-center py-2.5 block text-xs"
            >
              Afiliar mi empresa
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
