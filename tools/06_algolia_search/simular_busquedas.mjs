#!/usr/bin/env node
/**
 * Tráfico de PRUEBA para poblar Analytics de Algolia (no son usuarios reales).
 * Todas las consultas llevan analyticsTags ["simulacion-prueba"] para poder distinguirlas/filtrarlas
 * en el dashboard. Cada "usuario simulado" usa un userToken propio.
 *
 * Uso:  $env:ALGOLIA_APP_ID="..."; $env:ALGOLIA_SEARCH_KEY="..."; node simular_busquedas.mjs
 */
const APP_ID = process.env.ALGOLIA_APP_ID;
const KEY = process.env.ALGOLIA_SEARCH_KEY;
const INDEX = 'cca_directorio_comercial';
const TAG = process.argv[2] || 'simulacion-prueba'; // ej. "simulacion-post-sinonimos" para la medición posterior
if (!APP_ID || !KEY) { console.error('Defina ALGOLIA_APP_ID y ALGOLIA_SEARCH_KEY.'); process.exit(1); }

// Sesiones simuladas: [usuario, consultas tecleadas en orden, filtro opcional]
const SESIONES = [
  ['sim-esteban', ['tecnologia', 'software', 'desarrollo web']],
  ['sim-cliente-1', ['farmasia', 'farmacia']],
  ['sim-cliente-2', ['fereteria', 'ferreteria alajuela'], 'canton:Alajuela'],
  ['sim-cliente-3', ['soda', 'restaurante'], 'district:Alajuela'],
  ['sim-cliente-4', ['hotel aeropuerto', 'hotl']],
  ['sim-cliente-5', ['taller mecanico', 'repuestos']],
  ['sim-cliente-6', ['banco nasional', 'banco']],
  ['sim-cliente-7', ['biyares', 'billares']],
  ['sim-cliente-8', ['dos pinoz', 'leche']],
  ['sim-cliente-9', ['funeraria']],
  ['sim-cliente-10', ['panaderia', 'pasteleria']],
  ['sim-cliente-11', ['abogado', 'derecho']],
  ['sim-cliente-12', ['gimnasio', 'piscina']],
  ['sim-cliente-13', ['contador', 'asesoria contable']],
  ['sim-cliente-14', ['clinica santa fe']],
  ['sim-cliente-15', ['rent a car', 'alquiler carro']],
  ['sim-cliente-16', ['soda el parqe']],
  ['sim-cliente-17', ['veterinaria', 'cooperativa']],
  ['sim-cliente-18', ['hotel'], 'district:Río Segundo'],
];

const url = `https://${APP_ID}-dsn.algolia.net/1/indexes/${INDEX}/query`;
let total = 0, sinResultados = 0;
const filas = [];

for (const [user, consultas, filtro] of SESIONES) {
  for (const q of consultas) {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'X-Algolia-Application-Id': APP_ID,
        'X-Algolia-API-Key': KEY,
        'X-Algolia-UserToken': user,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: q, hitsPerPage: 3, attributesToRetrieve: ['name'],
        analytics: true, analyticsTags: [TAG],
        ...(filtro ? { facetFilters: [[filtro]] } : {})
      })
    });
    const d = await res.json();
    total++;
    if (!d.nbHits) sinResultados++;
    filas.push(`| ${user} | ${q} | ${filtro ?? ''} | ${d.nbHits ?? 'ERR ' + res.status} | ${d.hits?.[0]?.name ?? '—'} |`);
    await new Promise((ok) => setTimeout(ok, 300)); // ritmo humano aproximado
  }
}

console.log(`Simulación ${new Date().toISOString()} · tag analytics: ${TAG}\n`);
console.log('| Usuario simulado | Consulta | Filtro | Resultados | Primer resultado |');
console.log('|---|---|---|---|---|');
filas.forEach((f) => console.log(f));
console.log(`\nTotal: ${total} búsquedas · ${SESIONES.length} usuarios simulados · sin resultados: ${sinResultados} (${Math.round(100 * sinResultados / total)}%)`);
