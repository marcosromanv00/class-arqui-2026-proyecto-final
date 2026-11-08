# Resultados reales · Búsqueda Algolia sobre el directorio oficial CCA

## Dataset indexado
- **Fuente:** directorio oficial de asociados, https://camaraalajuela.com/directorio-de-asociados/, guardado el 2026-11-07.
- **Registros:** 171 comercios reales. El sitio muestra "171 resultados encontrados", aunque su encabezado dice "173 Empresas Certificadas".
- **Cadena de procesamiento:**
  1. `extraer_directorio_oficial.py` genera el Excel.
  2. Revisión manual de cantón y distrito, con una fuente por fila.
  3. `xlsx_a_algolia.py` genera `cca_directorio_oficial.json`.
  4. `index_algolia.js` sube los datos al índice.
- **Índice:** `cca_directorio_comercial` (App ID `ORLXCRY17B`), Task ID 88200754445, validación 171/171 registros íntegros.
- **Ubicación:**
  - Cantón: 171/171. Alajuela 163, Poás 2, fuera de la provincia 6.
  - Distrito: 155/171.
  - Dirección de referencia: 171/171.
- **Verificación de la revisión geográfica:** se comprobó una muestra de 7 direcciones contra la fuente citada y las 7 están respaldadas por el directorio oficial vigente o por el heredado (`directorio-asociados-old`). En 2 de ellas el distrito se infirió a partir del punto de referencia porque la fuente no nombra el distrito.

## Configuración de relevancia
| Parámetro | Valor | Justificación |
|---|---|---|
| `searchableAttributes` | name > categories > sector > district, canton | Primero lo que el usuario nombra (comercio), luego qué es (categoría original, más específica que el sector) y después dónde está. **Actualización 2026-11-08:** se quitó `address` porque las direcciones por señas generaban falsos positivos (ver `resultados_sinonimos_antes_despues.md`) |
| Sinónimos | 28 grupos (`sinonimos_cca.json`) | Vocabulario controlado: conecta términos de uso ("abogado") con las categorías oficiales ("Derecho") |
| `attributesForFaceting` | searchable(sector), searchable(district), canton, filterOnly(province) | Facetas temática y geográfica combinables |
| `customRanking` | desc(profileScore) | El sitio oficial no publica convenios ni un sello de verificación por comercio. Se prioriza la ficha más completa (teléfono, web, Facebook y dirección; puntaje de 0 a 4) |
| Tolerancia ortográfica | 1 error desde 4 letras, 2 errores desde 8 letras; `ignorePlurals` y `removeStopWords` en español | Valores de Algolia, ajustados al idioma |

## Pruebas (2026-11-08T05:01:52Z, `probar_typos.mjs`, 5 repeticiones)
| Consulta | Tipo de error / prueba | Resultados | Top 3 | Algolia 1ª ejecución (ms) | Ida y vuelta mediana (ms) |
|---|---|---|---|---|---|
| fereteria | falta una 'r' y la tilde | 11 | Grupo Diasa; Distribuidora Fama de Alajuela; La Casa del Zinc | 6 | 84 |
| farmasia | 's' por 'c' (ejemplo del enunciado) | 2 | Farmacias Santa Lucía; Farmacias Chavarría | 4 | 83 |
| restaurat | letra faltante (ejemplo del enunciado) | 10 | Restaurante el Sabor de la Montaña; Pollos del Este; Popeyes Alajuela | 13 | 87 |
| dos pinoz | 'z' por 's' | 3 | Dos Pinos; Durman by aliaxis Centroamérica; PRAXAIR | 6 | 79 |
| clinica santa fe | sin tilde | 1 | Clínica Santa Fe – Alajuela | 5 | 80 |
| banco nasional | 's' por 'c' | 1 | Banco Nacional de Costa Rica | 3 | 81 |
| funerraria | letra duplicada | 5 | Funeraria Jardines del Recuerdo; Funeraria camposanto La Piedad; Funeraria Divina Miscericordia | 7 | 83 |
| panaderia | sin tilde | 3 | Panadería Alberto Leandro e Hijos S.A.; Panadería y Pastelería Trigo Miel; Sabor & Pan | 6 | 83 |
| biyares | 'y' por 'll' (2 errores) | **0** | — | 4 | 79 |
| hotl aeropuerto | letra faltante | 4 | Hotel Aeropuerto; Explobus S.A; Puerta a Puerta | 3 | 85 |
| soda | término correcto | 1 | Soda los Arcos Cayuga | 6 | 84 |
| soda el parqe | ejemplo del enunciado | **0** | — | 6 | 83 |
| (vacía) | faceta: distrito = Río Segundo | 11 | Hotel Marriott Courtyard San Jose Airport Alajuela; Hotel Holiday Inn Express; Fiesta Casino Alajuela | 5 | 82 |
| restaurante | faceta: sector Alimentos y Gastronomía + distrito Alajuela | 6 | Pollos del Este; Popeyes Alajuela; Marisqueria y Pizzeria Italiana | 12 | 86 |

**Resumen de tiempos:**
- `processingTimeMS` en la 1ª ejecución (sin caché): mediana 6 ms, máximo 13 ms; las 14 consultas quedaron por debajo de 15 ms.
- Ida y vuelta desde Costa Rica, incluida la red: de 79 a 87 ms.

## Lectura para el Capítulo 9
- **Tolerancia ortográfica:** 9 de las 10 consultas con errores de escritura recuperaron el comercio correcto como primer resultado.
- **Límite encontrado ("biyares"):** escribir "y" en lugar de "ll" (yeísmo) cuenta como 2 errores, y Algolia solo tolera 2 en palabras de 8 letras o más. Se mitiga con sinónimos (por ejemplo, billar ↔ biyar) o bajando `minWordSizefor2Typos`. Queda como recomendación.
- **"soda el parqe" devuelve 0:** la "Soda El Parque" era un comercio ficticio del prototipo y no existe en el directorio real. Para la demostración en vivo se recomienda "farmasia" o "fereteria".
- **Ajuste por evidencia:** en la primera configuración, el sector "Construcción y Ferretería" empataba con la categoría "Ferreteria", y "fereteria" devolvía primero un quebrador. Al darle más prioridad a la categoría original sobre el sector, las ferreterías pasaron al primer lugar.
- **Hallazgo de AI (faceta geográfica):** 163 de los 171 asociados están en el cantón Alajuela, así que filtrar por cantón casi no segmenta. La faceta útil es el **distrito**: Alajuela centro, San José, Río Segundo, Desamparados, San Antonio, Guácima, etc.
- **Caché de Algolia:** las repeticiones de una misma consulta devuelven siempre el mismo `processingTimeMS` porque el resultado sale de caché. Por eso se reporta la primera ejecución de cada corrida, forzada sin caché.
