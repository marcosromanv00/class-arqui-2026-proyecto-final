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
    <section id="directorio" className="bg-surface py-14 lg:py-20 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 mb-8 border-b border-border gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold text-ink tracking-tight">
              Directorio comercial de asociados
            </h2>
            <p className="mt-1 text-sm text-ink-muted">
              Consulte comercios y empresas afiliadas en los 16 cantones de Alajuela.
            </p>
          </div>
          <div className="flex items-center gap-2 self-start md:self-auto">
            <a
              href="#empleo"
              className="text-xs text-brand hover:underline font-medium border border-brand/20 bg-brand/5 px-2.5 py-1.5 rounded"
            >
              Ver vacantes laborales de asociados →
            </a>
            <div className="text-xs text-text-muted bg-surface-muted border border-border px-3 py-1.5 rounded">
              <span className="font-semibold text-ink">{visibleMerchants.length}</span> de{" "}
              <span className="font-semibold text-ink">{filteredMerchants.length}</span> asociados
            </div>
          </div>
        </div>

        {/* Buscador y Filtros Rápidos */}
        <div className="bg-surface-muted border border-border rounded-lg p-4 sm:p-5 mb-8 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por comercio, actividad comercial, distrito o convenio..."
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-surface border border-border rounded-md text-ink focus:border-brand focus:outline-hidden"
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-border text-xs">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-ink font-semibold mr-1">Cantón:</span>
              {CANTONS.map((canton) => (
                <button
                  key={canton}
                  type="button"
                  onClick={() => setSelectedCanton(canton)}
                  className={`px-2.5 py-1 rounded text-xs transition-colors ${
                    selectedCanton === canton
                      ? "bg-ink text-surface font-medium"
                      : "bg-surface text-ink-muted border border-border hover:border-ink"
                  }`}
                >
                  {canton}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-ink font-semibold mr-1">Sector:</span>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2.5 py-1 rounded text-xs transition-colors ${
                    selectedCategory === cat
                      ? "bg-brand text-surface font-medium"
                      : "bg-surface text-ink-muted border border-border hover:border-brand"
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
          <div className="bg-surface-muted border border-border rounded-lg p-8 text-center space-y-2">
            <p className="text-sm font-semibold text-ink">
              No se encontraron comercios con esos criterios.
            </p>
            <p className="text-xs text-text-muted">
              Intente ampliar el cantón o cambiar el término de búsqueda.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="btn-cca-secondary px-3.5 py-1.5 text-xs inline-flex items-center gap-1.5 mt-2"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restablecer filtros</span>
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {visibleMerchants.map((merchant) => (
                <MerchantCard key={merchant.id} merchant={merchant} />
              ))}
            </div>

            {!isFiltered && filteredMerchants.length > 6 && (
              <div className="mt-8 pt-5 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-xs text-text-muted">
                  Mostrando {visibleMerchants.length} de {filteredMerchants.length} empresas en la vista resumida.
                </span>
                <button
                  type="button"
                  onClick={() => setShowAll(!showAll)}
                  className="btn-cca-secondary px-4 py-2 text-xs"
                >
                  {showAll
                    ? "Ver resumen (6 comercios)"
                    : `Ver los ${filteredMerchants.length} asociados`}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
