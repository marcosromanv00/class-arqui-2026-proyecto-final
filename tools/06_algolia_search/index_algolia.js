#!/usr/bin/env node
/**
 * Script de Indexación y Configuración para Algolia Search Engine
 * Proyecto: Cámara de Comercio de Alajuela (CCA) - EIF-511 UNA
 *
 * Dataset: directorio oficial de asociados CCA (171 registros reales), generado con
 *   extraer_directorio_oficial.py -> revisión manual en Excel -> xlsx_a_algolia.py
 *
 * Uso:
 *   node index_algolia.js --appId=TU_APP_ID --apiKey=TU_ADMIN_KEY [--dataset=archivo.json] [--indexName=...]
 *   (o variables de entorno ALGOLIA_APP_ID / ALGOLIA_ADMIN_KEY)
 *
 * Sin credenciales: solo valida el dataset y muestra la configuración.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const args = process.argv.slice(2).reduce((acc, arg) => {
  const [key, ...rest] = arg.replace(/^--/, '').split('=');
  acc[key] = rest.join('=') || true;
  return acc;
}, {});

const APP_ID = args.appId || process.env.ALGOLIA_APP_ID;
const API_KEY = args.apiKey || process.env.ALGOLIA_ADMIN_KEY;
const INDEX_NAME = args.indexName || 'cca_directorio_comercial';
const datasetPath = path.resolve(__dirname, args.dataset || 'cca_directorio_oficial.json');

if (!fs.existsSync(datasetPath)) {
  console.error(`❌ Error: No se encontró el dataset en ${datasetPath}`);
  process.exit(1);
}
const merchants = JSON.parse(fs.readFileSync(datasetPath, 'utf-8'));

console.log('='.repeat(70));
console.log('🔍 INDEXADOR ALGOLIA - DIRECTORIO OFICIAL CÁMARA DE COMERCIO DE ALAJUELA');
console.log('='.repeat(70));
console.log(`📦 Dataset: ${path.basename(datasetPath)} · ${merchants.length} registros`);

// --- Validación real de integridad ---
const problems = [];
const seen = new Set();
for (const m of merchants) {
  const id = m.objectID ?? '(sin objectID)';
  if (typeof m.objectID !== 'string' || !m.objectID) problems.push(`${id}: objectID inválido`);
  if (typeof m.name !== 'string' || !m.name.trim()) problems.push(`${id}: nombre vacío`);
  if (typeof m.sector !== 'string') problems.push(`${id}: sector ausente`);
  if (!Array.isArray(m.categories)) problems.push(`${id}: categories no es lista`);
  if (seen.has(id)) problems.push(`${id}: objectID duplicado`);
  seen.add(id);
}
const count = (f) => merchants.filter(f).length;
console.log(`🧪 Validación: ${merchants.length - new Set(problems.map((p) => p.split(':')[0])).size}/${merchants.length} registros íntegros`);
console.log(`   Con cantón: ${count((m) => m.canton)} · con distrito: ${count((m) => m.district)} · con dirección: ${count((m) => m.address)}`);
console.log(`   Sin clasificar (sin categoría en el sitio oficial): ${count((m) => m.sector === 'Sin clasificar')}`);
problems.forEach((p) => console.log(`   ⚠️  ${p}`));
if (problems.length) {
  console.error('❌ Corrija el dataset antes de indexar.');
  process.exit(1);
}

// --- Configuración de relevancia (Arquitectura de Información) ---
// Precedencia: Nombre > Categoría original > Sector normalizado > Ubicación
// (la categoría original es más específica: "Ferreteria" debe pesar más que el sector "Construcción y Ferretería")
// La dirección NO es buscable: en Costa Rica se escribe por señas ("200 m sur de la funeraria"),
// lo que generaba falsos positivos (ej. "funeraria" devolvía 11 comercios cercanos a una funeraria).
const indexSettings = {
  searchableAttributes: [
    'name',
    'categories',
    'sector',
    'district,canton'
  ],
  attributesForFaceting: [
    'searchable(sector)',
    'searchable(district)',
    'canton',
    'filterOnly(province)'
  ],
  // Sin datos de convenio en el sitio oficial: se prioriza la completitud de la ficha (tel, web, FB, dirección)
  customRanking: ['desc(profileScore)'],
  typoTolerance: true,
  minWordSizefor1Typo: 4,
  minWordSizefor2Typos: 8,
  ignorePlurals: ['es'],
  removeStopWords: ['es'],
  queryLanguages: ['es'],
  // Búsqueda en texto libre ("busco un taller para mi carro"): si ningún comercio tiene TODAS las
  // palabras, Algolia reintenta con las palabras opcionales y ordena por cuántas coinciden.
  removeWordsIfNoResults: 'allOptional',
  attributesToHighlight: ['name', 'sector', 'categories', 'district'],
  highlightPreTag: '<mark>',
  highlightPostTag: '</mark>'
};

async function call(method, urlPath, body) {
  const res = await fetch(`https://${APP_ID}.algolia.net/1/indexes/${INDEX_NAME}${urlPath}`, {
    method,
    headers: {
      'X-Algolia-Application-Id': APP_ID,
      'X-Algolia-API-Key': API_KEY,
      'Content-Type': 'application/json'
    },
    body: body ? JSON.stringify(body) : undefined
  });
  if (!res.ok) throw new Error(`${method} ${urlPath} (${res.status}): ${await res.text()}`);
  return res.json();
}

async function waitTask(taskID) {
  for (let i = 0; i < 240; i++) {
    const r = await fetch(`https://${APP_ID}.algolia.net/1/indexes/${INDEX_NAME}/task/${taskID}`, {
      headers: { 'X-Algolia-Application-Id': APP_ID, 'X-Algolia-API-Key': API_KEY }
    }).then((x) => x.json());
    if (r.status === 'published') return;
    await new Promise((ok) => setTimeout(ok, 500));
  }
  throw new Error(`La tarea ${taskID} no terminó a tiempo`);
}

async function main() {
  if (!APP_ID || !API_KEY) {
    console.log('\nℹ️ Sin credenciales: solo validación local.');
    console.log('   searchableAttributes:', indexSettings.searchableAttributes.join(' > '));
    console.log('   attributesForFaceting:', indexSettings.attributesForFaceting.join(', '));
    console.log('   customRanking:', indexSettings.customRanking.join(', '));
    return;
  }

  console.log(`\n🚀 Conectando con Algolia (App ID: ${APP_ID}) · índice '${INDEX_NAME}'`);
  try {
    const t0 = performance.now();
    console.log('🧹 1. Vaciando el índice (elimina registros previos)...');
    await waitTask((await call('POST', '/clear')).taskID);

    console.log('⚙️  2. Aplicando configuración de relevancia...');
    await waitTask((await call('PUT', '/settings', indexSettings)).taskID);

    console.log(`📤 3. Enviando ${merchants.length} registros en lote...`);
    const batch = await call('POST', '/batch', {
      requests: merchants.map((body) => ({ action: 'addObject', body }))
    });
    await waitTask(batch.taskID);

    const check = await call('POST', '/query', { query: '', hitsPerPage: 0, facets: ['canton', 'sector'] });
    console.log(`   ✅ Publicado. Registros en el índice: ${check.nbHits} (Task ID ${batch.taskID})`);
    console.log('   Facetas cantón:', JSON.stringify(check.facets?.canton));
    console.log(`⏱️  Tiempo total de sincronización: ${Math.round(performance.now() - t0)} ms`);
  } catch (error) {
    console.error(`\n❌ Error durante la indexación: ${error.message}`);
    process.exit(1);
  }
}

main();
