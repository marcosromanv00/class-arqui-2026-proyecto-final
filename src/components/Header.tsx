"use client";

import Link from "next/link";
import { useState } from "react";
import { Search, ChevronDown, Menu, X, ArrowUpRight } from "lucide-react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo CCA con estilo editorial tipo ICC */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 bg-slate-950 text-white rounded-none flex items-center justify-center font-bold text-lg tracking-tight group-hover:bg-sky-600 transition-colors">
              CCA
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-base tracking-tight text-slate-950 uppercase leading-none">
                Cámara de Comercio
              </span>
              <span className="text-xs text-slate-500 font-medium tracking-widest uppercase mt-0.5">
                Alajuela · Costa Rica
              </span>
            </div>
          </Link>

          {/* Navegación Desktop */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-700">
            <div className="relative group cursor-pointer py-2">
              <span className="flex items-center gap-1 group-hover:text-slate-950 transition-colors">
                Institucional <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-950 transition-transform group-hover:rotate-180" />
              </span>
              <div className="absolute top-full left-0 w-64 bg-white border border-slate-200 shadow-xl opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all p-3 space-y-1">
                <Link href="#impacto" className="block px-3 py-2 text-xs hover:bg-slate-50 text-slate-700 hover:text-slate-950 font-medium">
                  Voz Gremial & Representación
                </Link>
                <Link href="#pilares" className="block px-3 py-2 text-xs hover:bg-slate-50 text-slate-700 hover:text-slate-950 font-medium">
                  Pilares de Actuación
                </Link>
                <Link href="#estadisticas" className="block px-3 py-2 text-xs hover:bg-slate-50 text-slate-700 hover:text-slate-950 font-medium">
                  Impacto en Cifras
                </Link>
              </div>
            </div>

            <Link href="#directorio" className="hover:text-slate-950 transition-colors">
              Directorio de Comercios
            </Link>

            <Link href="#servicios" className="hover:text-slate-950 transition-colors">
              Servicios & Arbitraje
            </Link>

            <Link href="#publicaciones" className="hover:text-slate-950 transition-colors">
              Publicaciones & Prensa
            </Link>
          </nav>

          {/* Acciones principales */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="#directorio"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-slate-950 px-3 py-2 rounded border border-slate-200 hover:border-slate-300 transition-colors"
            >
              <Search className="w-3.5 h-3.5 text-slate-400" />
              Buscar comercio
            </a>

            <a
              href="#afiliacion"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-slate-950 hover:bg-sky-600 px-4 py-2.5 transition-colors uppercase tracking-wider"
            >
              Afiliarse <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Botón Móvil */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-950"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Menú Móvil Desplegable */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-6 space-y-4">
          <div className="space-y-1">
            <Link
              href="#impacto"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50"
            >
              Institucional
            </Link>
            <Link
              href="#directorio"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50"
            >
              Directorio de Comercios
            </Link>
            <Link
              href="#servicios"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50"
            >
              Servicios & Arbitraje
            </Link>
            <Link
              href="#publicaciones"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50"
            >
              Publicaciones & Prensa
            </Link>
          </div>
          <div className="pt-2 flex flex-col gap-2">
            <a
              href="#afiliacion"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 bg-slate-950 text-white font-semibold text-xs uppercase tracking-wider"
            >
              Afiliar mi empresa
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
