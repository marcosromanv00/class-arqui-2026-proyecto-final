#!/usr/bin/env node
/**
 * Construye el Customer Journey Map de la CCA en Miro (REST API v2)
 * 5 etapas × 5 carriles + curva de satisfacción, a partir de cjm_tablero_miro.json
 *
 * Uso: MIRO_TOKEN=tu_token node crear_tablero_miro.js
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const API = 'https://api.miro.com/v2';
const TOKEN = process.env.MIRO_TOKEN;
const cjm = JSON.parse(fs.readFileSync(path.join(__dirname, 'cjm_tablero_miro.json'), 'utf-8'));

// Layout (board units, positions are item centers)
const LABEL_X = 260, LABEL_W = 500;
const STAGE_W = 860, STAGE_GAP = 40, FIRST_STAGE_LEFT = 580;
const colX = (i) => FIRST_STAGE_LEFT + STAGE_W / 2 + i * (STAGE_W + STAGE_GAP);
const RIGHT_EDGE = FIRST_STAGE_LEFT + 5 * STAGE_W + 4 * STAGE_GAP;
const ROW_H = 440, ROW_PITCH = 460;
const ROWS = { acciones: 220, touchpoints: 680, pensamientos: 1140, curva: 1620, dolor: 2120, oportunidades: 2580 };
const CURVE_UNIT = 100; // px per Likert point
const NAVY = '#112B46', RED = '#B42318', GREEN = '#18744F', INK = '#152331', LINE = '#DFE5E8';

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

async function call(boardId, kind, body) {
  const url = boardId ? `${API}/boards/${boardId}/${kind}` : `${API}/${kind}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`${kind} → ${res.status}: ${await res.text()}`);
  return res.json();
}

const shape = (b, { x, y, w, h, html, fill = '#FFFFFF', color = INK, size = 28, border = LINE, kind = 'round_rectangle', align = 'center' }) =>
  call(b, 'shapes', {
    data: html ? { shape: kind, content: html } : { shape: kind },
    style: { fillColor: fill, color, fontSize: String(size), fontFamily: 'open_sans', textAlign: align, textAlignVertical: 'middle', borderColor: border, borderWidth: '2', borderOpacity: '1.0', fillOpacity: '1.0' },
    position: { x, y, origin: 'center' },
    geometry: { width: w, height: h },
  });

const text = (b, { x, y, w, html, size = 28, color = INK, align = 'left' }) =>
  call(b, 'texts', {
    data: { content: html },
    style: { fontSize: String(size), color, fontFamily: 'open_sans', textAlign: align },
    position: { x, y, origin: 'center' },
    geometry: { width: w },
  });

const sticky = (b, { x, y, html, fill }) =>
  call(b, 'sticky_notes', {
    data: { content: html, shape: 'rectangle' },
    style: { fillColor: fill, textAlign: 'left', textAlignVertical: 'top' },
    position: { x, y, origin: 'center' },
    geometry: { width: 620 },
  });

const connect = (b, a, z, color) =>
  call(b, 'connectors', {
    startItem: { id: a }, endItem: { id: z }, shape: 'curved',
    style: { strokeColor: color, strokeWidth: '6', startStrokeCap: 'none', endStrokeCap: 'none' },
  });

async function build() {
  const board = await call(null, 'boards', { name: cjm.board_name, description: cjm.goal });
  try {
    await fill(board);
  } catch (e) {
    // Never leave a half-built board behind
    await fetch(`${API}/boards/${board.id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${TOKEN}` } });
    throw new Error(`${e.message}\n   (el tablero incompleto se eliminó)`);
  }
}

async function fill(board) {
  const b = board.id;
  let count = 0;
  const add = async (p) => { const r = await p; count++; return r; };

  // Title, goal and personas
  await add(text(b, { x: RIGHT_EDGE / 2, y: -680, w: 4000, html: `<p><strong>${esc(cjm.title)}</strong></p>`, size: 80, align: 'center' }));
  await add(text(b, { x: RIGHT_EDGE / 2, y: -570, w: 4000, html: `<p>${esc(cjm.goal)}</p>`, size: 44, align: 'center' }));
  const pw = (RIGHT_EDGE - 2 * 60) / 3;
  for (const [i, p] of cjm.personas.entries()) {
    await add(shape(b, { x: pw / 2 + i * (pw + 60), y: -340, w: pw, h: 260, size: 40,
      html: `<p><strong>${esc(p.name)}</strong></p><p>${esc(p.profile)}</p>` }));
  }

  // Stage headers
  for (const [i, s] of cjm.stages.entries()) {
    await add(shape(b, { x: colX(i), y: -80, w: STAGE_W, h: 130, fill: NAVY, color: '#FFFFFF', border: NAVY, size: 40, html: `<p><strong>${esc(s)}</strong></p>` }));
  }

  // Lanes: label + 5 sticky notes
  for (const lane of cjm.lanes) {
    const y = ROWS[lane.key];
    await add(shape(b, { x: LABEL_X, y, w: LABEL_W, h: ROW_H, fill: '#F3F4F6', size: 44, html: `<p><strong>${esc(lane.label)}</strong></p>` }));
    for (const [i, cell] of lane.cells.entries()) {
      await add(sticky(b, { x: colX(i), y, html: `<p>${esc(cell)}</p>`, fill: lane.color }));
    }
  }

  // Emotion curve lane
  const cy = ROWS.curva, curveH = 2 * ROW_PITCH - ROW_H + 20;
  await add(shape(b, { x: LABEL_X, y: cy, w: LABEL_W, h: curveH, fill: '#F3F4F6', size: 36,
    html: `<p><strong>Curva de satisfacción</strong></p><p>${esc(cjm.emotion_curve.scale)}</p>` }));
  await add(text(b, { x: LABEL_X, y: cy + 160, w: 460, html: `<p><strong>● ${esc(cjm.emotion_curve.current.label)}</strong></p>`, size: 32, color: RED }));
  await add(text(b, { x: LABEL_X, y: cy + 210, w: 460, html: `<p><strong>● ${esc(cjm.emotion_curve.redesigned.label)}</strong></p>`, size: 32, color: GREEN }));
  await add(shape(b, { x: (FIRST_STAGE_LEFT + RIGHT_EDGE) / 2, y: cy, w: RIGHT_EDGE - FIRST_STAGE_LEFT, h: 8, kind: 'rectangle', fill: '#9CA3AF', border: '#9CA3AF', html: '' }));
  for (const v of [2, 1, 0, -1, -2]) {
    await add(text(b, { x: FIRST_STAGE_LEFT + 40, y: cy - v * CURVE_UNIT, w: 80, html: `<p>${v > 0 ? '+' : ''}${v}</p>`, size: 30, color: '#5D6973', align: 'center' }));
  }
  for (const [series, color] of [[cjm.emotion_curve.current, RED], [cjm.emotion_curve.redesigned, GREEN]]) {
    const dots = [];
    for (const [i, v] of series.values.entries()) {
      const dot = await add(shape(b, { x: colX(i), y: cy - v * CURVE_UNIT, w: 44, h: 44, kind: 'circle', fill: color, border: color, html: '' }));
      dots.push(dot.id);
      await add(text(b, { x: colX(i) + 40, y: cy - v * CURVE_UNIT - 45, w: 80, html: `<p><strong>${v > 0 ? '+' : ''}${v}</strong></p>`, size: 34, color }));
    }
    for (let i = 0; i < dots.length - 1; i++) await add(connect(b, dots[i], dots[i + 1], color));
  }

  console.log(`\n✅ Tablero creado con ${count} elementos.`);
  console.log(`   Abrir en Miro: ${board.viewLink}`);
}

console.log('='.repeat(70));
console.log('🗺️  CUSTOMER JOURNEY MAP CCA → MIRO');
console.log('='.repeat(70));
console.log(`Etapas: ${cjm.stages.length} · Carriles: ${cjm.lanes.length} · Post-its: ${cjm.lanes.reduce((n, l) => n + l.cells.length, 0)}`);

if (!TOKEN) {
  console.log('\nℹ️ Falta MIRO_TOKEN. Ejecute: MIRO_TOKEN=tu_token node crear_tablero_miro.js');
} else {
  build().catch((e) => { console.error(`\n❌ ${e.message}`); process.exit(1); });
}
