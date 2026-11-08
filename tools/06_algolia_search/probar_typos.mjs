#!/usr/bin/env node
/**
 * Pruebas reales de tolerancia ortográfica y facetas contra el índice Algolia (Cap. 9.4 / 9.5).
 * Uso:
 *   $env:ALGOLIA_APP_ID="..."; $env:ALGOLIA_SEARCH_KEY="..."; node probar_typos.mjs [repeticiones]
 * Cada consulta se ejecuta N veces (por defecto 5) y se reporta la MEDIANA de:
 *   - processingTimeMS: tiempo de procesamiento en el servidor de Algolia
 *   - ida y vuelta: medido desde este equipo (incluye red)
 */
const APP_ID = process.env.ALGOLIA_APP_ID;
const KEY = process.env.ALGOLIA_SEARCH_KEY || process.env.ALGOLIA_ADMIN_KEY;
const INDEX = process.env.ALGOLIA_INDEX || 'cca_directorio_comercial';
const REPS = Number(process.argv[2]) || 5;
const RUN_ID = `run-${Date.now()}`;

if (!APP_ID || !KEY) {
  console.error('Defina ALGOLIA_APP_ID y ALGOLIA_SEARCH_KEY.');
  process.exit(1);
}

const QUERIES = [
  { q: 'fereteria', nota: "falta una 'r' y la tilde" },
  { q: 'farmasia', nota: "'s' por 'c' (ejemplo del enunciado)" },
  { q: 'restaurat', nota: 'letra faltante (ejemplo del enunciado)' },
  { q: 'dos pinoz', nota: "'z' por 's'" },
  { q: 'clinica santa fe', nota: 'sin tilde' },
  { q: 'banco nasional', nota: "'s' por 'c'" },
  { q: 'funerraria', nota: 'letra duplicada' },
  { q: 'panaderia', nota: 'sin tilde' },
  { q: 'biyares', nota: "'y' por 'll' (2 errores)" },
  { q: 'hotl aeropuerto', nota: 'letra faltante' },
  { q: 'soda', nota: 'término correcto' },
  { q: 'soda el parqe', nota: 'ejemplo del enunciado (no existe en el directorio real)' },
  { q: '', nota: 'faceta: distrito = Río Segundo', filters: 'district:"Río Segundo"' },
  { q: 'restaurante', nota: 'faceta: sector Alimentos y Gastronomía + distrito Alajuela', filters: 'sector:"Alimentos y Gastronomía" AND district:"Alajuela"' }
];

const url = `https://${APP_ID}-dsn.algolia.net/1/indexes/${INDEX}/query`;
const headers = { 'X-Algolia-Application-Id': APP_ID, 'X-Algolia-API-Key': KEY, 'Content-Type': 'application/json' };
const median = (a) => { const s = [...a].sort((x, y) => x - y); const m = s.length >> 1; return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2; };

// Calentamiento: la primera conexión TLS no representa el uso normal
await fetch(url, { method: 'POST', headers, body: JSON.stringify({ query: 'a', hitsPerPage: 1 }) });

console.log(`Índice: ${INDEX} · ${REPS} repeticiones por consulta · ${new Date().toISOString()}\n`);
console.log('| Consulta | Tipo de error / prueba | Resultados | Top 3 | Algolia 1ª ejecución (ms) | Algolia mediana (ms) [mín–máx] | Ida y vuelta mediana (ms) |');
console.log('|---|---|---|---|---|---|---|');

const allProc = [];
for (const { q, nota, filters } of QUERIES) {
  const proc = [], rtt = [];
  let data, first;
  for (let i = 0; i < REPS; i++) {
    const t0 = performance.now();
    const res = await fetch(url, {
      method: 'POST', headers,
      // analyticsTags único por corrida: evita que la 1ª ejecución salga de la caché de corridas anteriores
      body: JSON.stringify({ query: q, hitsPerPage: 3, attributesToRetrieve: ['name'], filters, analyticsTags: [RUN_ID] })
    });
    rtt.push(performance.now() - t0);
    if (!res.ok) { console.log(`| ${q} | ${nota} | ERROR ${res.status} | | | |`); break; }
    data = await res.json();
    if (i === 0) first = data.processingTimeMS;
    proc.push(data.processingTimeMS);
  }
  if (!data) continue;
  allProc.push(first);
  const top = data.hits.map((h) => h.name).join('; ') || '—';
  console.log(`| ${q || '(vacía)'} | ${nota} | ${data.nbHits} | ${top} | ${first} | ${median(proc)} [${Math.min(...proc)}–${Math.max(...proc)}] | ${Math.round(median(rtt))} |`);
}
console.log(`\nprocessingTimeMS (1ª ejecución, sin caché): mediana ${median(allProc)} ms · máx ${Math.max(...allProc)} ms · ${allProc.filter((x) => x < 15).length}/${allProc.length} consultas < 15 ms`);
console.log('Nota: las repeticiones devuelven el mismo processingTimeMS porque Algolia cachea resultados; la 1ª ejecución es la medición representativa.');
