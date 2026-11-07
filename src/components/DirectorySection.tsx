"use client";

import { useState, useMemo } from "react";
import { MERCHANTS_DATA } from "@/lib/data";
import { MerchantCard } from "@/components/MerchantCard";
import { Search, Filter, Briefcase } from "lucide-react";

export function DirectorySection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCanton, setSelectedCanton] = useState<string>("Todos");
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");

  const cantons = ["Todos", "Alajuela", "San Ramón", "Grecia", "Atenas", "Naranjo", "Poás"];
  const categories = ["Todos", "Gastronomía", "Servicios", "Comercio", "Tecnología", "Salud"];

  const filteredMerchants = useMemo(() => {
    return MERCHANTS_DATA.filter((m) => {
      const matchesSearch =
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.convenioDescuento.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.district.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCanton = selectedCanton === "Todos" || m.canton === selectedCanton;
      const matchesCategory = selectedCategory === "Todos" || m.category === selectedCategory;

      return matchesSearch && matchesCanton && matchesCategory;
    });
  }, [searchQuery, selectedCanton, selectedCategory]);

  return (
    <section id="directorio" className="border-b border-neutral-200 bg-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabecera Editorial Estilo ICC */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-neutral-200 pb-8 mb-10 gap-6">
          <div>
            <p className="text-xs uppercase font-bold tracking-widest text-[#991b1b] mb-2">
              Directorio de Confianza Comercial
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#09090b] tracking-tight">
              Comercios y Servicios Verificados
            </h2>
            <p className="mt-2 text-sm text-neutral-600 max-w-xl leading-relaxed">
              Consulte empresas formalmente afiliadas a la Cámara en los 16 cantones de Alajuela con convenios de ahorro gremial y contacto directo.
            </p>
          </div>

          <div 
            id="directorio-results-count"
            className="text-xs text-neutral-600 font-semibold bg-neutral-100 px-3.5 py-2 self-start md:self-end"
          >
            Mostrando <span className="text-[#991b1b] font-bold">{filteredMerchants.length}</span> de {MERCHANTS_DATA.length} comercios auditados
          </div>
        </div>

        {/* Barra de Búsqueda y Filtros Facetados */}
        <div className="bg-[#f9fafb] border border-neutral-200 p-6 mb-8 space-y-4">
          
          {/* Buscador de texto predictivo */}
          <div className="relative">
            <Search className="w-4 h-4 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              id="directorio-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por nombre, producto, distrito o convenio (ej: café, fiscal, óptica, ferretería)..."
              className="w-full pl-11 pr-4 py-3 text-sm bg-white border border-neutral-300 focus:border-[#991b1b] focus:outline-hidden text-neutral-900"
            />
          </div>

          {/* Filtros por Categoría y Cantón */}
          <div className="flex flex-wrap items-center gap-4 pt-3 border-t border-neutral-200 text-xs">
            <span className="flex items-center gap-1.5 font-bold text-neutral-700 uppercase tracking-wider text-[11px]">
              <Filter className="w-3.5 h-3.5 text-neutral-400" /> Cantón:
            </span>
            <div id="directorio-filter-canton" className="flex flex-wrap gap-1">
              {cantons.map((canton) => (
                <button
                  key={canton}
                  onClick={() => setSelectedCanton(canton)}
                  className={`px-3 py-1 text-xs font-semibold transition-all ${
                    selectedCanton === canton
                      ? "bg-[#991b1b] text-white"
                      : "bg-white text-neutral-700 border border-neutral-200 hover:bg-neutral-100"
                  }`}
                >
                  {canton}
                </button>
              ))}
            </div>

            <div className="w-full md:w-auto h-px md:h-4 bg-neutral-300 hidden md:block" />

            <span className="flex items-center gap-1.5 font-bold text-neutral-700 uppercase tracking-wider text-[11px]">
              Sector:
            </span>
            <div id="directorio-filter-category" className="flex flex-wrap gap-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 text-xs font-semibold transition-all ${
                    selectedCategory === cat
                      ? "bg-[#09090b] text-white"
                      : "bg-white text-neutral-700 border border-neutral-200 hover:bg-neutral-100"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Polijerarquía: Enlace cruzado con Bolsa de Empleo */}
        <div className="mb-8 p-4 bg-neutral-50 border border-neutral-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2.5 text-neutral-800">
            <div className="w-8 h-8 bg-neutral-200 text-[#991b1b] flex items-center justify-center shrink-0">
              <Briefcase className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-[#09090b]">Bolsa de Empleo Cantonal vinculada:</span>
              <span className="text-neutral-600 ml-1.5">Consulte vacantes publicadas por las empresas agremiadas en El Coyol y Alajuela Centro.</span>
            </div>
          </div>
          <a
            href="#empleo"
            className="text-xs font-bold text-[#991b1b] hover:underline shrink-0"
          >
            Ver vacantes abiertas →
          </a>
        </div>

        {/* Cuadrícula de Comercios */}
        {filteredMerchants.length === 0 ? (
          <div className="bg-[#f9fafb] border border-neutral-200 p-12 text-center">
            <p className="text-base font-bold text-[#09090b]">No se encontraron comercios con esos criterios.</p>
            <p className="text-xs text-neutral-500 mt-1">Intente restablecer los filtros de cantón o sector.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCanton("Todos");
                setSelectedCategory("Todos");
              }}
              className="mt-4 px-4 py-2 text-xs font-bold bg-[#09090b] text-white hover:bg-neutral-800"
            >
              Restablecer filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMerchants.map((merchant) => (
              <MerchantCard key={merchant.id} merchant={merchant} />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
