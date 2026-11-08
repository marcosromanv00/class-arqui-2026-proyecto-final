"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  DIRECTORY_DATA,
  FacetName,
  Filters,
  SearchResult,
  searchAlgolia,
  searchLocal,
} from "@/lib/directorio";
import { MerchantCard } from "@/components/MerchantCard";
import { BUSCAR_EVENT } from "@/components/HeroSearch";
import { corregirLocal, type Correccion } from "@/lib/corrector";
import { Search, Filter, Briefcase, Zap, WifiOff } from "lucide-react";

const PAGE_SIZE = 12;

/** Opciones de faceta ordenadas por cantidad; incluye la seleccionada aunque tenga 0 resultados */
function facetOptions(counts: Record<string, number>, selected?: string) {
  const entries = Object.entries(counts).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "es"));
  if (selected && !counts[selected]) entries.unshift([selected, 0]);
  return entries;
}

function FacetChips({
  id,
  label,
  counts,
  selected,
  onSelect,
  dark,
}: {
  id: string;
  label: string;
  counts: Record<string, number>;
  selected?: string;
  onSelect: (v?: string) => void;
  dark?: boolean;
}) {
  const on = dark ? "bg-ink text-white border-ink" : "bg-brand text-white border-brand";
  const off = "bg-surface text-ink-muted border-border hover:border-border-strong hover:text-ink";
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
      <span className="flex items-center gap-1.5 font-semibold text-ink uppercase tracking-wider text-[11px]">
        {!dark && <Filter className="w-3.5 h-3.5 text-text-muted" />} {label}:
      </span>
      <div id={id} className="flex flex-wrap gap-1.5">
        <button onClick={() => onSelect(undefined)} className={`px-3 py-1 rounded-full border text-xs font-medium transition-colors ${!selected ? on : off}`}>
          Todos
        </button>
        {facetOptions(counts, selected).map(([value, n]) => (
          <button
            key={value}
            onClick={() => onSelect(selected === value ? undefined : value)}
            className={`px-3 py-1 rounded-full border text-xs font-medium transition-colors ${selected === value ? on : off}`}
          >
            {value} <span className="opacity-60 font-normal">({n})</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/**
 * Directorio de los 171 asociados reales con búsqueda Algolia (Cap. 9).
 * variant="home": sección de la página principal con cabecera propia.
 * variant="page": dentro de /directorio (la página ya tiene título); lee ?q= de la URL.
 */
export function DirectorySection({ variant = "home" }: { variant?: "home" | "page" }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<Filters>({});
  const [visible, setVisible] = useState(PAGE_SIZE);
  // Render inicial con datos locales (171 registros); Algolia toma el control al montar
  const [result, setResult] = useState<SearchResult>(() => searchLocal("", {}));
  const [correccion, setCorreccion] = useState<Correccion | null>(null);

  // Consulta inicial desde la URL (/directorio?q=...), enviada por el buscador del Hero
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("q");
    if (q) setSearchQuery(q);
  }, []);

  // Búsquedas enviadas por evento cuando el directorio está en la misma página
  useEffect(() => {
    const onBuscar = (e: Event) => {
      setSearchQuery((e as CustomEvent<string>).detail ?? "");
      setVisible(PAGE_SIZE);
    };
    window.addEventListener(BUSCAR_EVENT, onBuscar);
    return () => window.removeEventListener(BUSCAR_EVENT, onBuscar);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      try {
        let r = await searchAlgolia(searchQuery, filters, controller.signal);
        let c: Correccion | null = null;
        // Solo si Algolia no encontró nada: corregir la escritura (Azure OpenAI o local) y reintentar en Algolia
        if (r.nbHits === 0 && searchQuery.trim()) {
          c = await fetch("/api/corregir", {
            method: "POST",
            signal: controller.signal,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ q: searchQuery }),
          })
            .then((res) => (res.ok ? res.json() : { correccion: null }))
            .then((d) => d.correccion as Correccion | null)
            .catch((e) => {
              if ((e as Error).name === "AbortError") throw e;
              return corregirLocal(searchQuery);
            });
          if (c) {
            const r2 = await searchAlgolia(c.corregida, filters, controller.signal);
            if (r2.nbHits > 0) r = r2;
            else c = null;
          }
        }
        setResult(r);
        setCorreccion(c);
      } catch (err) {
        if ((err as Error).name === "AbortError") return;
        // Sin conexión o Algolia caído: el directorio sigue funcionando con búsqueda local
        let r = searchLocal(searchQuery, filters);
        let c = r.nbHits === 0 && searchQuery.trim() ? corregirLocal(searchQuery) : null;
        if (c) {
          const r2 = searchLocal(c.corregida, filters);
          if (r2.nbHits > 0) r = r2;
          else c = null;
        }
        setResult(r);
        setCorreccion(c);
      }
    }, 150);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [searchQuery, filters]);

  const updateQuery = (q: string) => {
    setSearchQuery(q);
    setVisible(PAGE_SIZE);
  };

  const setFacet = (facet: FacetName) => (value?: string) => {
    setVisible(PAGE_SIZE);
    setFilters((prev) => {
      const next = { ...prev, [facet]: value };
      if (facet === "canton") delete next.district; // el distrito depende del cantón
      return next;
    });
  };

  const resetAll = () => {
    updateQuery("");
    setFilters({});
  };

  const shown = useMemo(() => result.hits.slice(0, visible), [result.hits, visible]);

  const contador = (
    <div className="flex flex-col items-start md:items-end gap-1.5">
      <div id="directorio-results-count" className="text-xs text-ink-muted font-medium bg-surface-muted border border-border rounded-full px-3.5 py-1.5">
        Mostrando <span className="text-brand font-semibold">{result.nbHits}</span> de {DIRECTORY_DATA.length} comercios certificados
      </div>
      <div id="directorio-search-engine" className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-text-muted">
        {result.engine === "algolia" ? (
          <>
            <Zap className="w-3 h-3 text-brand" /> Algolia · {result.processingTimeMS} ms
          </>
        ) : (
          <>
            <WifiOff className="w-3 h-3" /> Búsqueda local (sin conexión al motor)
          </>
        )}
      </div>
    </div>
  );

  const contenido = (
    <>
      {variant === "home" ? (
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-border pb-8 mb-10 gap-6">
          <div>
            <p className="text-xs uppercase font-semibold tracking-widest text-brand mb-2">Directorio de Confianza Comercial</p>
            <h2 className="text-3xl sm:text-4xl font-semibold text-ink tracking-tight">Comercios y Servicios Verificados</h2>
            <p className="mt-2 text-sm text-ink-muted max-w-xl leading-relaxed">
              Consulte las {DIRECTORY_DATA.length} empresas certificadas del directorio oficial de la Cámara, con búsqueda tolerante a
              errores de escritura, filtros por ubicación y sector, y contacto directo.
            </p>
          </div>
          {contador}
        </div>
      ) : (
        <div className="flex justify-end mb-4">{contador}</div>
      )}

      {/* Barra de Búsqueda y Filtros Facetados */}
      <div className="cca-card p-5 sm:p-6 mb-8 space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 text-text-muted absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            id="directorio-search-input"
            type="search"
            value={searchQuery}
            onChange={(e) => updateQuery(e.target.value)}
            placeholder="Escriba lo que busca (ej: taller para mi carro, farmacia, ferretería en Alajuela)..."
            className="w-full pl-11 pr-4 py-3 rounded-lg text-sm bg-surface border border-border focus:border-brand focus:outline-none text-ink placeholder:text-text-muted"
          />
        </div>

        {correccion && (
          <p id="directorio-correccion" className="text-xs text-ink-muted">
            Mostrando resultados para{" "}
            <button onClick={() => updateQuery(correccion.corregida)} className="font-semibold text-brand hover:underline" title="Usar la búsqueda corregida">
              {correccion.corregida}
            </button>{" "}
            · no hubo coincidencias para “{correccion.original}”
            <span className="ml-1.5 text-[10px] uppercase tracking-wider text-text-muted">
              (corrección {correccion.motor === "azure" ? "Azure OpenAI" : "local"})
            </span>
          </p>
        )}

        {/* Filtros facetados: cantón > distrito, y sector */}
        <div className="pt-3 border-t border-border text-xs space-y-3">
          <FacetChips id="directorio-filter-canton" label="Cantón" counts={result.facets.canton} selected={filters.canton} onSelect={setFacet("canton")} />
          {filters.canton && Object.keys(result.facets.district).length > 0 && (
            <FacetChips id="directorio-filter-district" label="Distrito" counts={result.facets.district} selected={filters.district} onSelect={setFacet("district")} />
          )}
          <FacetChips id="directorio-filter-category" label="Sector" counts={result.facets.sector} selected={filters.sector} onSelect={setFacet("sector")} dark />
        </div>
      </div>

      {/* Polijerarquía: Enlace cruzado con Bolsa de Empleo */}
      <div className="mb-8 p-4 rounded-xl bg-surface-muted border border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-2.5 text-ink">
          <div className="w-8 h-8 rounded-full bg-brand-subtle text-brand flex items-center justify-center shrink-0">
            <Briefcase className="w-4 h-4" />
          </div>
          <div>
            <span className="font-semibold text-ink">Bolsa de Empleo Cantonal vinculada:</span>
            <span className="text-ink-muted ml-1.5">Consulte vacantes publicadas por las empresas agremiadas en El Coyol y Alajuela Centro.</span>
          </div>
        </div>
        <Link href="/empleo" className="text-xs font-semibold text-brand hover:underline shrink-0">
          Ver vacantes abiertas →
        </Link>
      </div>

      {/* Cuadrícula de Comercios */}
      {result.nbHits === 0 ? (
        <div className="rounded-2xl border border-dashed border-border p-12 text-center">
          <p className="text-base font-semibold text-ink">No se encontraron comercios con esos criterios.</p>
          <p className="text-xs text-text-muted mt-1">Intente con otra palabra o restablezca los filtros de cantón y sector.</p>
          <button onClick={resetAll} className="btn-cca-secondary mt-4 px-4 py-2 text-xs font-semibold">
            Restablecer filtros
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {shown.map((merchant) => (
              <MerchantCard key={merchant.objectID} merchant={merchant} />
            ))}
          </div>
          {result.hits.length > visible && (
            <div className="mt-8 text-center">
              <button id="directorio-ver-mas" onClick={() => setVisible((v) => v + PAGE_SIZE)} className="btn-cca-secondary px-5 py-2.5 text-xs font-semibold">
                Ver más comercios ({result.hits.length - visible} restantes)
              </button>
            </div>
          )}
        </>
      )}

      <p className="mt-6 text-[10px] text-text-muted">
        Fuente: Directorio Oficial de Asociados, camaraalajuela.com. Los convenios mostrados son ilustrativos.
      </p>
    </>
  );

  if (variant === "page") return <div id="directorio">{contenido}</div>;

  return (
    <section id="directorio" className="border-b border-border bg-surface py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{contenido}</div>
    </section>
  );
}
