#!/usr/bin/env node
/**
 * Carga el anillo de sinónimos (vocabulario controlado) en Algolia.
 * Fuente: sinonimos_cca.json (cada grupo documenta su "_motivo"; ese campo no se envía).
 * Reemplaza los sinónimos existentes del índice.
 *
 * Uso:  $env:ALGOLIA_APP_ID="..."; $env:ALGOLIA_ADMIN_KEY="..."; node cargar_sinonimos.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const APP_ID = process.env.ALGOLIA_APP_ID;
const KEY = process.env.ALGOLIA_ADMIN_KEY;
const INDEX = process.env.ALGOLIA_INDEX || 'cca_directorio_comercial';
if (!APP_ID || !KEY) { console.error('Defina ALGOLIA_APP_ID y ALGOLIA_ADMIN_KEY.'); process.exit(1); }

const grupos = JSON.parse(fs.readFileSync(path.join(__dirname, 'sinonimos_cca.json'), 'utf-8'));
const payload = grupos.map(({ _motivo, ...s }) => s);
const headers = { 'X-Algolia-Application-Id': APP_ID, 'X-Algolia-API-Key': KEY, 'Content-Type': 'application/json' };
const base = `https://${APP_ID}.algolia.net/1/indexes/${INDEX}`;

const res = await fetch(`${base}/synonyms/batch?replaceExistingSynonyms=true`, {
  method: 'POST', headers, body: JSON.stringify(payload)
});
if (!res.ok) { console.error(`❌ ${res.status}: ${await res.text()}`); process.exit(1); }
const { taskID } = await res.json();

for (let i = 0; i < 240; i++) {
  const t = await fetch(`${base}/task/${taskID}`, { headers }).then((r) => r.json());
  if (t.status === 'published') break;
  await new Promise((ok) => setTimeout(ok, 500));
}

const check = await fetch(`${base}/synonyms/search`, { method: 'POST', headers, body: JSON.stringify({ query: '', hitsPerPage: 1 }) })
  .then((r) => r.json());
const bidir = payload.filter((s) => s.type === 'synonym').length;
console.log(`✅ Sinónimos publicados en '${INDEX}': ${check.nbHits} grupos (${bidir} bidireccionales, ${payload.length - bidir} unidireccionales) · Task ${taskID}`);
