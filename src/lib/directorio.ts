/**
 * Directorio oficial de asociados CCA (171 registros reales) + búsqueda Algolia.
 *
 * Datos: tools/06_algolia_search/cca_directorio_oficial.json (copiado a src/lib/directorio_cca.json).
 * Convenios: ILUSTRATIVOS (convenioIlustrativo = true); el sitio oficial no publica convenios por comercio.
 *
 * La Search-Only API Key es pública por diseño (solo permite buscar), por eso puede ir en el código.
 * Se puede sobreescribir con NEXT_PUBLIC_ALGOLIA_APP_ID / NEXT_PUBLIC_ALGOLIA_SEARCH_KEY.
 */
import rawData from "./directorio_cca.json";

export interface DirectoryMerchant {
  objectID: string;
  name: string;
  sector: string;
  categories: string[];
  canton?: string;
  district?: string;
  province?: string;
  address?: string;
  phones: string[];
  web?: string;
  facebook?: string;
  ficha?: string;
  description?: string;
  convenio?: string;
  ahorroEstimado?: string;
  convenioIlustrativo: boolean;
  whatsapp?: string;
  verified: boolean;
  profileScore: number;
  /** Nombre con <mark> de Algolia (HTML escapado por Algolia) */
  highlightedName?: string;
}

export const DIRECTORY_DATA = rawData as DirectoryMerchant[];

export const ALGOLIA = {
  appId: process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || "ORLXCRY17B",
  searchKey: process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY || "aaeddd6477f0942d4bf33ccf4386292c",
  index: "cca_directorio_comercial",
};

export type FacetName = "canton" | "district" | "sector";
export type Filters = Partial<Record<FacetName, string>>;
export type FacetCounts = Record<FacetName, Record<string, number>>;

export interface SearchResult {
  hits: DirectoryMerchant[];
  nbHits: number;
  facets: FacetCounts;
  engine: "algolia" | "local";
  processingTimeMS?: number;
}

const FACETS: FacetName[] = ["canton", "district", "sector"];

const facetFilters = (filters: Filters, except?: FacetName) =>
  FACETS.filter((f) => f !== except && filters[f]).map((f) => [`${f}:${filters[f]}`]);

/**
 * Búsqueda facetada disyuntiva en una sola llamada (multi-query):
 *  - consulta principal con todos los filtros
 *  - una consulta por faceta sin su propio filtro, para que los conteos muestren las alternativas
 */
export async function searchAlgolia(query: string, filters: Filters, signal?: AbortSignal): Promise<SearchResult> {
  const base = { query, hitsPerPage: 200, highlightPreTag: "<mark>", highlightPostTag: "</mark>" };
  const requests = [
    { indexName: ALGOLIA.index, params: { ...base, facetFilters: facetFilters(filters) } },
    ...FACETS.map((f) => ({
      indexName: ALGOLIA.index,
      params: { query, hitsPerPage: 0, facets: [f], facetFilters: facetFilters(filters, f) },
    })),
  ].map((r) => ({ indexName: r.indexName, params: new URLSearchParams(
    Object.entries(r.params).map(([k, v]) => [k, typeof v === "string" || typeof v === "number" ? String(v) : JSON.stringify(v)])
  ).toString() }));

  const res = await fetch(`https://${ALGOLIA.appId}-dsn.algolia.net/1/indexes/*/queries`, {
    method: "POST",
    signal,
    headers: {
      "X-Algolia-Application-Id": ALGOLIA.appId,
      "X-Algolia-API-Key": ALGOLIA.searchKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ requests }),
  });
  if (!res.ok) throw new Error(`Algolia ${res.status}`);
  const { results } = await res.json();
  const [main, ...facetResults] = results;

  const facets = Object.fromEntries(
    FACETS.map((f, i) => [f, facetResults[i]?.facets?.[f] ?? {}])
  ) as FacetCounts;

  return {
    hits: main.hits.map((h: DirectoryMerchant & { _highlightResult?: { name?: { value: string } } }) => ({
      ...h,
      highlightedName: h._highlightResult?.name?.value,
    })),
    nbHits: main.nbHits,
    facets,
    engine: "algolia",
    processingTimeMS: main.processingTimeMS,
  };
}

/** Respaldo sin conexión: coincidencia por subcadena sin tildes (sin tolerancia a errores). */
const norm = (s = "") => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

export function searchLocal(query: string, filters: Filters): SearchResult {
  const terms = norm(query).split(/\s+/).filter(Boolean);
  const textMatch = DIRECTORY_DATA.filter((m) => {
    const hay = norm([m.name, m.sector, m.categories.join(" "), m.district, m.canton, m.address].join(" "));
    return terms.every((t) => hay.includes(t));
  });
  const passes = (m: DirectoryMerchant, except?: FacetName) =>
    FACETS.every((f) => f === except || !filters[f] || m[f] === filters[f]);

  const facets = Object.fromEntries(
    FACETS.map((f) => {
      const counts: Record<string, number> = {};
      textMatch.filter((m) => passes(m, f)).forEach((m) => {
        const v = m[f];
        if (v) counts[v] = (counts[v] ?? 0) + 1;
      });
      return [f, counts];
    })
  ) as FacetCounts;

  const hits = textMatch.filter((m) => passes(m)).sort((a, b) => b.profileScore - a.profileScore);
  return { hits, nbHits: hits.length, facets, engine: "local" };
}
