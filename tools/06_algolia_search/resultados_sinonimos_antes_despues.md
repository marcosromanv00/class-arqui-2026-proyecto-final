# Vocabulario controlado: antes y después de los sinónimos

**Tipo de evidencia:** tráfico de **prueba simulado**, no de usuarios reales. Son 35 búsquedas de 19 usuarios simulados, generadas con `simular_busquedas.mjs`. Cada medición lleva su etiqueta en Algolia Analytics para poder filtrarla:
- `simulacion-prueba`: antes de los sinónimos (2026-11-08T06:18Z).
- `simulacion-post-sinonimos-v2`: después de los sinónimos y del ajuste de la dirección (2026-11-08T06:28Z).

Las tablas completas de cada medición están en `resultados_simulacion_busquedas.md` y `resultados_simulacion_post_sinonimos.md`.

## Resultado global
| Métrica | Antes | Después |
|---|---|---|
| Búsquedas sin resultados | 8 de 35 (**23%**) | 3 de 35 (**9%**) |
| Sin resultados por falta de vocabulario | 6 | 1 ("leche") |
| Sin resultados porque el comercio no existe | 2 ("veterinaria", "soda el parqe") | 2 (resultado correcto) |

## Casos resueltos
| Búsqueda del usuario | Término en el directorio oficial | Antes | Después | Tipo de sinónimo |
|---|---|---|---|---|
| abogado | Derecho | 0 | 1 · Lic. José Adrián Vargas Solís | Bidireccional |
| alquiler carro | Rent a Car | 0 | 1 · Natural Car rental | Bidireccional |
| taller mecanico | Automotriz, taller | 0 | 1 · Taller Hermanos Arguedas | Unidireccional (mecánico → automotriz, taller) |
| piscina | Natacion | 0 | 1 · MACOS Academia de Natación | Bidireccional |
| biyares | Billares | 0 | 2 · Billares Aguilar Hnos., Billares Punis | Unidireccional (corrección del yeísmo) |

## Ajuste por efecto secundario: la dirección deja de ser buscable
Con los sinónimos cargados, "funeraria" pasó de 5 a 14 resultados y "contador" de 13 a 14. La causa es que en Costa Rica las direcciones se escriben por señas ("200 m sur de la funeraria", "costado del cementerio"). Al buscar dentro de la dirección, el sinónimo cementerio ↔ funeraria traía todos los comercios que usan esos lugares como referencia.

**Decisión:** se quitó `address` de `searchableAttributes`. La dirección sigue visible en la ficha; la ubicación se busca por distrito y cantón.

| Búsqueda | Con dirección buscable | Sin dirección buscable |
|---|---|---|
| funeraria | 14 (11 falsos positivos) | 3 (las 3 funerarias) |
| contador | 14 | 2 |
| hotel aeropuerto | 4 | 1 · Hotel Aeropuerto |
| dos pinoz | 3 | 1 · Dos Pinos |

## Sin resolver (recomendaciones)
- **"leche" → 0:** Dos Pinos no tiene en sus datos ningún producto, solo sus categorías ("Alimentos", "Industria"). Un sinónimo no lo resuelve sin forzar resultados. Se recomienda enriquecer cada ficha con **palabras clave de productos y servicios** a través del CMS (ver Cap. 10, metadatos en Strapi).
- **"veterinaria" y "soda el parqe" → 0:** son correctos, porque no hay asociados de ese tipo con ese nombre. Se recomienda que la página sin resultados sugiera categorías cercanas o invite a afiliar nuevos comercios.

## Sinónimos cargados
Son 28 grupos: 21 bidireccionales y 7 unidireccionales. Están en `sinonimos_cca.json`; cada grupo documenta su motivo en el campo `_motivo`, y se cargan con `cargar_sinonimos.mjs`. Incluyen costarriquenismos como "bomba" (gasolinera) y "pulpería" (abarrotes), y anglicismos de las categorías oficiales como "Rent a Car" y "Marketing".

## Regresión de las pruebas de tolerancia ortográfica
Se repitieron las pruebas de `probar_typos.mjs` después de los cambios (2026-11-08T06:28:53Z):
- No hubo regresiones.
- "biyares" pasó de 0 a 2 resultados correctos.
- "hotl aeropuerto" y "dos pinoz" ahora devuelven solo el comercio correcto.
- `processingTimeMS` en la 1ª ejecución: mediana 4,5 ms, máximo 24 ms ("funerraria"); 13 de 14 consultas por debajo de 15 ms.
