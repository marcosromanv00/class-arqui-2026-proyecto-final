#!/usr/bin/env node
/**
 * Script de Carga de Datos Iniciales (Seed) para Strapi Headless CMS
 * Cámara de Comercio de Alajuela (CCA)
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const API_TOKEN = process.env.STRAPI_API_TOKEN;

const datasetPath = path.join(__dirname, '../06_algolia_search/cca_merchants_dataset.json');
const rawData = fs.readFileSync(datasetPath, 'utf-8');
const merchants = JSON.parse(rawData);

console.log('='.repeat(70));
console.log('🌱 CARGADOR AUTOMÁTICO (SEED) - STRAPI HEADLESS CMS (CCA)');
console.log('='.repeat(70));
console.log(`URL de Conexión: ${STRAPI_URL}`);
console.log(`Total de Comercios a Cargar: ${merchants.length}`);

async function runSeed() {
  if (!API_TOKEN) {
    console.log('\nℹ️ Nota: No se suministró STRAPI_API_TOKEN.');
    console.log('   Para ejecutar contra una instancia viva de Strapi:');
    console.log('   STRAPI_API_TOKEN=tu_token node seed_strapi.js');
    console.log('\n📄 Ejemplo de Payload REST conforme con Strapi v4/v5 generado con éxito:');
    const samplePayload = {
      data: {
        nombre_comercial: merchants[0].name,
        cedula_juridica: "3101889900",
        sector_comercial: merchants[0].sector,
        canton: merchants[0].canton,
        distrito: merchants[0].district,
        direccion_exacta: merchants[0].address,
        telefono_fijo: merchants[0].phone,
        telefono_whatsapp: merchants[0].whatsapp,
        correo_contacto: "contacto@elcandadoalajuela.cr",
        afiliado_verificado: true,
        anos_afiliacion: merchants[0].yearsMember,
        beneficio_convenio_cca: merchants[0].benefits,
        descripcion_detallada: merchants[0].description
      }
    };
    console.log(JSON.stringify(samplePayload, null, 2));
    console.log('\n✅ Esquemas y datos de prueba listos para consumo.');
    return;
  }

  // Si hay token suministrado, consumir la API real
  for (const m of merchants) {
    const payload = {
      data: {
        nombre_comercial: m.name,
        cedula_juridica: "3101000000",
        sector_comercial: m.sector,
        canton: m.canton,
        distrito: m.district,
        direccion_exacta: m.address,
        telefono_fijo: m.phone,
        telefono_whatsapp: m.whatsapp,
        correo_contacto: `info@${m.objectID}.cr`,
        afiliado_verificado: m.verified,
        anos_afiliacion: m.yearsMember,
        beneficio_convenio_cca: m.benefits,
        descripcion_detallada: m.description
      }
    };

    try {
      const res = await fetch(`${STRAPI_URL}/api/comercios`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_TOKEN}`
        },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        console.log(`✅ Creado: ${m.name}`);
      } else {
        console.warn(`⚠️ Error al crear ${m.name}: ${res.status}`);
      }
    } catch (e) {
      console.error(`❌ Falló la conexión con Strapi: ${e.message}`);
      break;
    }
  }
}

runSeed();
