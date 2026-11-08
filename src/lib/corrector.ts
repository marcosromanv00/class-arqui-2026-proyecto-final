/**
 * Corrección ortográfica de consultas sobre el VOCABULARIO CONTROLADO del directorio.
 *
 * Por qué existe: los sinónimos de Algolia no toleran errores de escritura
 * ("carrro" no activa el sinónimo "carro" → 0 resultados). Cuando Algolia devuelve 0,
 * se corrige cada palabra hacia el término válido más cercano y se reintenta la búsqueda.
 *
 * Solo puede corregir HACIA palabras que existen en el vocabulario (nombres, categorías,
 * sectores, ubicaciones y sinónimos), por lo que no inventa términos.
 */
import { DIRECTORY_DATA } from "./directorio";
import sinonimos from "../../tools/06_algolia_search/sinonimos_cca.json";

export const norm = (s = "") => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
const words = (s = "") => norm(s).split(/[^a-z0-9ñ]+/).filter((w) => w.length >= 3);

// Palabras vacías: nunca se corrigen (Algolia ya las ignora con removeStopWords)
const STOP = new Set(["para", "por", "con", "del", "las", "los", "una", "uno", "que", "donde", "busco", "quiero", "necesito", "cerca"]);

type Sinonimo = { synonyms: string[]; input?: string };

/** Frecuencia de cada término válido; sirve para desempatar entre candidatos */
function buildVocab() {
  const freq = new Map<string, number>();
  const add = (w: string, n = 1) => freq.set(w, (freq.get(w) ?? 0) + n);
  for (const m of DIRECTORY_DATA) {
    [m.name, m.sector, m.district, m.canton, ...m.categories].forEach((t) => words(t).forEach((w) => add(w)));
  }
  // Los términos de sinónimos pesan más: son el lenguaje del usuario
  for (const s of sinonimos as Sinonimo[]) {
    [...s.synonyms, s.input ?? ""].forEach((t) => words(t).forEach((w) => add(w, 5)));
  }
  return freq;
}

let VOCAB: Map<string, number> | null = null;
export const vocabulario = () => (VOCAB ??= buildVocab());

/** Distancia Damerau-Levenshtein (inserción, borrado, sustitución y transposición) */
function distancia(a: string, b: string) {
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const c = a[i - 1] === b[j - 1] ? 0 : 1;
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + c);
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
    }
  }
  return d[a.length][b.length];
}

/** Errores permitidos según el largo (mismo criterio que Algolia: 1 desde 4 letras, 2 desde 8) */
const maxErrores = (len: number) => (len >= 8 ? 2 : len >= 4 ? 1 : 0);

export interface Correccion {
  original: string;
  corregida: string;
  cambios: { de: string; a: string }[];
  motor: "local" | "azure";
}

/** Corrige palabra por palabra; devuelve null si no hubo nada que corregir */
export function corregirLocal(query: string): Correccion | null {
  const vocab = vocabulario();
  const cambios: Correccion["cambios"] = [];
  const tokens = norm(query).split(/\s+/).filter(Boolean);

  const corregidos = tokens.map((w) => {
    if (STOP.has(w) || vocab.has(w) || maxErrores(w.length) === 0) return w;
    let mejor: string | null = null;
    let mejorD = Infinity;
    let mejorF = 0;
    for (const [v, f] of vocab) {
      if (Math.abs(v.length - w.length) > 2) continue;
      const dd = distancia(w, v);
      if (dd <= maxErrores(w.length) && (dd < mejorD || (dd === mejorD && f > mejorF))) {
        mejor = v;
        mejorD = dd;
        mejorF = f;
      }
    }
    if (mejor) cambios.push({ de: w, a: mejor });
    return mejor ?? w;
  });

  if (!cambios.length) return null;
  return { original: query, corregida: corregidos.join(" "), cambios, motor: "local" };
}

/** Lista compacta de términos válidos (para darle contexto a Azure OpenAI) */
export const terminosClave = () =>
  [...vocabulario().entries()].filter(([, f]) => f >= 5).map(([w]) => w);
