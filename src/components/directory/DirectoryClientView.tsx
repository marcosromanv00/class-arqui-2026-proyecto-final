"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { MERCHANTS_DATA, Merchant } from "@/lib/data";
import { MerchantCard } from "@/components/MerchantCard";
import { Search, RotateCcw, Building, MapPin, Tag, ShieldCheck, Phone, MessageSquare, ExternalLink, X } from "lucide-react";

const CANTONS = ["Todos", "Alajuela", "San Ramón", "Grecia", "Atenas", "Naranjo", "Poás", "Sarchí"];
const CATEGORIES = ["Todos", "Construcción", "Automotriz", "Servicios", "Salud", "Comercio", "Tecnología", "Gastronomía", "Agroindustria"];

export function DirectoryClientView() {
  const searchParams = useSearchParams();
  const initialConvenioOnly = searchParams.get("convenio") === "true";

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCanton, setSelectedCanton] = useState<string>("Todos");
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");
  const [onlyConvenios, setOnlyConvenios] = useState(initialConvenioOnly);
  const [selectedMerchant, setSelectedMerchant] = useState<Merchant | null>(null);

  /*
   * Hook de Integración: Algolia InstantSearch / Strapi Headless CMS
   * Allan Arce / Emanuel Soto
   */
  const filteredMerchants = useMemo(() => {
    return MERCHANTS_DATA.filter((m) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        q === "" ||
        m.name.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q) ||
        m.convenioDescuento.toLowerCase().includes(q) ||
        m.district.toLowerCase().includes(q) ||
        (m.keywords && m.keywords.some((k) => k.toLowerCase().includes(q)));

      const matchesCanton = selectedCanton === "Todos" || m.canton.toLowerCase().includes(selectedCanton.toLowerCase());
      const matchesCategory = selectedCategory === "Todos" || m.category === selectedCategory;
      const matchesConvenio = !onlyConvenios || (m.convenioDescuento && m.convenioDescuento.trim() !== "");

      return matchesSearch && matchesCanton && matchesCategory && matchesConvenio;
    });
  }, [searchQuery, selectedCanton, selectedCategory, onlyConvenios]);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCanton("Todos");
    setSelectedCategory("Todos");
    setOnlyConvenios(false);
  };

  const isFiltered = searchQuery.trim() !== "" || selectedCanton !== "Todos" || selectedCategory !== "Todos" || onlyConvenios;

  return (
    <div className="space-y-8">
      {/* Barra de Filtros Facetados con Selectores de Usabilidad (Maze & Algolia) */}
      <div className="cca-card p-5 sm:p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Input de Búsqueda Instantánea con ID estándar */}
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-text-muted" />
            <input
              id="directorio-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por comercio, producto o palabra clave (ej. ferretería, coyol, bufete)..."
              className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-border bg-surface text-xs sm:text-sm text-ink placeholder:text-text-muted focus:border-brand focus:outline-none"
            />
          </div>

          {/* Selector de Cantón con ID estándar para Maze */}
          <div className="md:col-span-3">
            <select
              id="directorio-filter-canton"
              value={selectedCanton}
              onChange={(e) => setSelectedCanton(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg border border-border bg-surface text-xs sm:text-sm text-ink focus:border-brand focus:outline-none"
            >
              {CANTONS.map((c) => (
                <option key={c} value={c}>
                  {c === "Todos" ? "Todos los cantones" : `Cantón: ${c}`}
                </option>
              ))}
            </select>
          </div>

          {/* Selector de Sector Económico */}
          <div className="md:col-span-3">
            <select
              id="directorio-filter-category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg border border-border bg-surface text-xs sm:text-sm text-ink focus:border-brand focus:outline-none"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === "Todos" ? "Todos los sectores" : `Sector: ${cat}`}
                </option>
              ))}
            </select>
          </div>

          {/* Reset Filters */}
          <div className="md:col-span-1 flex items-center">
            {isFiltered && (
              <button
                type="button"
                onClick={resetFilters}
                className="w-full py-2.5 px-2 rounded-lg border border-border bg-surface-muted hover:bg-surface text-xs text-text-muted hover:text-ink flex items-center justify-center gap-1 transition-colors"
                title="Restablecer filtros"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="md:hidden">Limpiar</span>
              </button>
            )}
          </div>
        </div>

        {/* Toggle de Convenios con Descuento */}
        <div className="flex flex-wrap items-center justify-between pt-2 border-t border-border text-xs gap-3">
          <label className="flex items-center gap-2 cursor-pointer font-medium text-ink select-none">
            <input
              type="checkbox"
              checked={onlyConvenios}
              onChange={(e) => setOnlyConvenios(e.target.checked)}
              className="rounded border-border text-brand focus:ring-brand accent-brand w-4 h-4"
            />
            <span>Mostrar únicamente comercios con Convenio / Descuento para socios CCA</span>
          </label>

          <span className="text-text-muted">
            Mostrando <strong className="text-ink">{filteredMerchants.length}</strong> comercios certificados
          </span>
        </div>
      </div>

      {/* Grid de Comercios */}
      {filteredMerchants.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border p-12 text-center space-y-3">
          <Building className="w-8 h-8 text-text-muted mx-auto" />
          <h3 className="text-base font-semibold text-ink">
            No se encontraron comercios con los filtros seleccionados
          </h3>
          <p className="text-xs text-text-muted max-w-md mx-auto">
            Pruebe ampliando el cantón o buscando un término más general como &ldquo;salud&rdquo;, &ldquo;materiales&rdquo; o &ldquo;abogado&rdquo;.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="btn-cca-secondary px-4 py-2 text-xs font-semibold inline-block mt-2"
          >
            Restablecer todos los filtros
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMerchants.map((merchant) => (
            <div
              key={merchant.id}
              onClick={() => setSelectedMerchant(merchant)}
              className="cursor-pointer"
            >
              <MerchantCard merchant={merchant} />
            </div>
          ))}
        </div>
      )}

      {/* Modal Ficha Detallada del Comercio Afiliado */}
      {selectedMerchant && (
        <div className="fixed inset-0 z-50 bg-ink/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface rounded-2xl border border-border shadow-2xl max-w-lg w-full p-6 sm:p-8 space-y-6 animate-in fade-in zoom-in-95">
            <div className="flex items-start justify-between pb-4 border-b border-border">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-brand/5 text-brand text-[11px] font-semibold border border-brand/20">
                    {selectedMerchant.category}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] text-emerald-800 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Socio Verificado</span>
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-ink mt-1">
                  {selectedMerchant.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedMerchant(null)}
                className="p-1 rounded text-text-muted hover:text-ink hover:bg-surface-muted"
                aria-label="Cerrar ficha"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
              {selectedMerchant.description}
            </p>

            {/* Beneficio para Socios */}
            {selectedMerchant.convenioDescuento && (
              <div className="p-4 rounded-xl bg-brand/5 border border-brand/20 space-y-1">
                <span className="text-[11px] font-semibold text-brand uppercase tracking-wider">
                  Convenio Exclusivo para Afiliados
                </span>
                <p className="text-xs font-medium text-ink">
                  {selectedMerchant.convenioDescuento}
                </p>
                <p className="text-[11px] text-brand">
                  💡 Ahorro estimado: {selectedMerchant.ahorroEstimado}
                </p>
              </div>
            )}

            {/* Datos de Contacto y Ubicación */}
            <div className="space-y-2 text-xs text-text-muted">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-brand shrink-0 mt-0.5" />
                <span>{selectedMerchant.address}, {selectedMerchant.district}, {selectedMerchant.canton}.</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand shrink-0" />
                <a href={`tel:${selectedMerchant.phone}`} className="hover:text-ink transition-colors font-mono">
                  {selectedMerchant.phone}
                </a>
              </p>
            </div>

            {/* Botones de Acción Rápida */}
            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-border">
              <a
                href={`https://wa.me/${selectedMerchant.whatsapp}?text=Hola,%20los%20contacto%20desde%20el%20Directorio%20Oficial%20de%20la%20C%C3%A1mara%20de%20Comercio%20de%20Alajuela.`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cca-primary py-2.5 text-center text-xs font-semibold flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
              <button
                type="button"
                onClick={() => setSelectedMerchant(null)}
                className="btn-cca-secondary py-2.5 text-xs font-semibold"
              >
                Cerrar Ficha
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
