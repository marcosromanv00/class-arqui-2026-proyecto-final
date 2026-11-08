"use client";

import { useState, useMemo } from "react";
import { MERCHANTS_DATA } from "@/lib/data";
import { MerchantCard } from "@/components/MerchantCard";
import { Search, RotateCcw } from "lucide-react";

const CANTONS = ["Todos", "Alajuela", "San Ramón", "Grecia", "Atenas", "Naranjo", "Poás"];
const CATEGORIES = ["Todos", "Gastronomía", "Servicios", "Comercio", "Tecnología", "Salud"];

export function DirectorySection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCanton, setSelectedCanton] = useState<string>("Todos");
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");
  const [showAll, setShowAll] = useState(false);

  const filteredMerchants = useMemo(() => {
    return MERCHANTS_DATA.filter((m) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        m.name.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q) ||
        m.convenioDescuento.toLowerCase().includes(q) ||
        m.district.toLowerCase().includes(q);
      const matchesCanton = selectedCanton === "Todos" || m.canton === selectedCanton;
      const matchesCategory = selectedCategory === "Todos" || m.category === selectedCategory;
      return matchesSearch && matchesCanton && matchesCategory;
    });
  }, [searchQuery, selectedCanton, selectedCategory]);

  const isFiltered = searchQuery.trim() !== "" || selectedCanton !== "Todos" || selectedCategory !== "Todos";
  const visibleMerchants = isFiltered || showAll ? filteredMerchants : filteredMerchants.slice(0, 6);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCanton("Todos");
    setSelectedCategory("Todos");
  };

  return (
    <section id="directorio" className="bg-surface py-16 lg:py-24 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 mb-8 border-b border-border gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-brand font-semibold">
              Red Empresarial de Alajuela
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-semibold text-ink tracking-tight mt-1">
              Directorio oficial de comercios y asociados
            </h2>
          </div>
          <div className="text-xs text-text-muted bg-surface-muted border border-border px-3.5 py-2 rounded-md shrink-0">
            Mostrando <span className="font-semibold text-ink">{visibleMerchants.length}</span> de{" "}
            <span className="font-semibold text-ink">{filteredMerchants.length}</span> comercios verificados
          </div>
        </div>

        {/* Panel de Búsqueda y Filtros */}
        <div className="bg-surface-muted border border-border rounded-xl p-5 sm:p-6 mb-8 space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por nombre, actividad comercial, distrito o convenio..."
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-surface border border-border rounded-lg text-ink focus:border-brand focus:outline-hidden transition-colors"
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 border-t border-border text-xs">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-ink font-medium mr-1">Cantón:</span>
              {CANTONS.map((canton) => (
                <button
                  key={canton}
                  type="button"
                  onClick={() => setSelectedCanton(canton)}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                    selectedCanton === canton
                      ? "bg-ink text-surface shadow-xs"
                      : "bg-surface text-ink-muted border border-border hover:border-border-strong"
                  }`}
                >
                  {canton}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-ink font-medium mr-1">Sector:</span>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                    selectedCategory === cat
                      ? "bg-brand text-surface shadow-xs"
                      : "bg-surface text-ink-muted border border-border hover:border-border-strong"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Resultados */}
        {filteredMerchants.length === 0 ? (
          <div className="bg-surface-muted border border-border rounded-xl p-10 text-center space-y-3">
            <p className="text-base font-semibold text-ink">
              No se encontraron empresas asociadas con esos filtros.
            </p>
            <p className="text-xs sm:text-sm text-text-muted">
              Pruebe cambiando el cantón o el término de búsqueda.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="btn-cca-secondary px-4 py-2 text-xs inline-flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restablecer filtros</span>
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {visibleMerchants.map((merchant) => (
                <MerchantCard key={merchant.id} merchant={merchant} />
              ))}
            </div>

            {!isFiltered && filteredMerchants.length > 6 && (
              <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs text-text-muted">
                  Viendo {visibleMerchants.length} de {filteredMerchants.length} registros del padrón.
                </span>
                <button
                  type="button"
                  onClick={() => setShowAll(!showAll)}
                  className="btn-cca-secondary px-5 py-2 text-xs sm:text-sm"
                >
                  {showAll
                    ? "Ver resumen (6 comercios)"
                    : `Ver todos los asociados (${filteredMerchants.length})`}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
