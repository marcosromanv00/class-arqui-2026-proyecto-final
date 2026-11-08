# 9. Estrategia de Búsqueda y Relevancia (Algolia Cloud + Azure OpenAI)

**Consultor responsable:** Allan Arce

Buscar y navegar son dos formas complementarias de encontrar información. Al navegar, el usuario recorre una estructura que el sistema le propone. Al buscar, formula su necesidad con sus propias palabras (Rosenfeld, Morville y Arango, 2015). En el directorio de la Cámara de Comercio de Alajuela (CCA), la persona que necesita un proveedor ya sabe qué necesita ("una ferretería", "un abogado"); lo que no sabe es cómo lo clasificó la Cámara. Este capítulo documenta la estrategia que diseñamos para cerrar esa brecha: la implementamos sobre el **directorio oficial real** de la Cámara y la medimos con pruebas reproducibles. La estrategia tiene tres capas: Algolia como motor de búsqueda, un vocabulario controlado de sinónimos con búsqueda en texto libre, y un corrector ortográfico con Azure OpenAI que solo interviene cuando Algolia no encuentra nada.

---

## 9.1 Diagnóstico de la Recuperación de Información en la CCA

El 7 de noviembre de 2026 revisamos el directorio oficial de asociados publicado en `camaraalajuela.com/directorio-de-asociados/`. Además de los problemas del sitio anterior que se documentan en el Capítulo 3, encontramos los siguientes:

| Hallazgo | Evidencia | Impacto en la encontrabilidad |
|---|---|---|
| **Cifras inconsistentes** | El encabezado anuncia "173 Empresas Certificadas", pero el listado muestra "171 resultados encontrados". | Resta credibilidad al directorio como fuente oficial. |
| **Vocabulario sin control** | 64 categorías distintas, con errores ortográficos ("Constuctora"), duplicados ("Cooperativa" / "Cooperativas"; "Marketing" / "Marketing Digital"), uso irregular de mayúsculas ("taller", "gimnasio", "vinos") y 4 comercios sin categoría. | El usuario tiene que adivinar cuál de las 64 etiquetas usó la Cámara. |
| **Sin información geográfica** | Las fichas actuales no incluyen cantón, distrito ni dirección; esta última solo aparece en el directorio heredado (`directorio-asociados-old`), que sigue publicado. | No se puede buscar "cerca de mí" ni filtrar por zona. |
| **Dos directorios en paralelo** | El directorio nuevo y el heredado muestran conteos de categoría distintos (por ejemplo, Comercio 23 frente a 12) y el heredado contiene registros duplicados. | El usuario no sabe cuál de los dos es el vigente. |
| **Recuperación por coincidencia exacta** | El listado se ordena alfabéticamente y se filtra por categoría. No tiene tolerancia a errores de escritura ni sinónimos. | Basta una letra distinta, una tilde omitida o un término coloquial para que la búsqueda no encuentre nada. |

**Conclusión del diagnóstico:** el problema principal no es la ausencia de tecnología. El problema es que el vocabulario de la Cámara ("Derecho", "Rent a Car", "Natacion") no coincide con el de sus usuarios ("abogado", "alquiler de carro", "piscina"). Sin un sistema de búsqueda que traduzca un vocabulario al otro, los 171 asociados existen pero no se pueden encontrar.

**Evolución e integración del sistema de búsqueda:** En la primera versión del prototipo se disponía de una muestra sintética de 12 comercios locales cargados en memoria. No obstante, al implementar el motor de búsqueda en la nube con Algolia Cloud y auditar la base real de agremiados (Allan Arce), se extrajo e indexó el directorio oficial completo de 171 asociados certificados (`directorio_oficial_cca_171.xlsx`). Para que esta masa de datos no generara fricción ni búsquedas vacías, la arquitectura se ajustó integrando 52 grupos de sinónimos locales y un endpoint en `/api/corregir` con Azure OpenAI y corrector algorítmico local, reduciendo las consultas fallidas del 23% al 6% de forma cuantificada y sin dependencias bloqueantes.

---

## 9.2 Arquitectura del Motor Algolia Cloud

### 9.2.1 Cadena de datos (del sitio oficial al índice)

En lugar de un dataset de ejemplo, el índice se construyó con los **171 asociados reales** del directorio oficial:

| Etapa | Herramienta | Resultado |
|---|---|---|
| 1. Extracción | `extraer_directorio_oficial.py`, que lee la página oficial guardada desde el navegador | 171 registros con nombre, categorías originales, teléfonos, sitio web, Facebook y ficha oficial. Los correos se excluyeron a propósito. |
| 2. Normalización | Mapeo de las 64 categorías originales a 12 sectores (vocabulario controlado) | Facetas legibles sin perder la categoría original. |
| 3. Curaduría geográfica | Revisión manual en Excel, con una fuente citada por cada fila | Cantón 171/171, distrito 155/171 (los 16 restantes quedan vacíos para no adivinar) y dirección de referencia 171/171. |
| 4. Conversión | `xlsx_a_algolia.py` | `cca_directorio_oficial.json`, listo para indexar. |
| 5. Indexación | `index_algolia.js`, que vacía el índice, aplica la configuración y carga los registros en lote | Índice `cca_directorio_comercial` con 171 registros (Figuras 9.1 y 9.2). |

Para controlar la calidad de la curaduría geográfica, verificamos una muestra de 7 direcciones contra su fuente. Las 7 coinciden con el directorio oficial vigente o con el heredado. En 2 casos el distrito se infirió a partir del punto de referencia (por ejemplo, "calle Carbonal" corresponde a San Isidro), porque la fuente no nombra el distrito.

### 9.2.2 Integración con el portal

El directorio del prototipo (Next.js) consulta Algolia directamente desde el navegador con una **llave de solo búsqueda**, que es pública por diseño; comprobamos que el servidor rechaza cualquier intento de escritura con esa llave (HTTP 403). Cada pulsación de teclado envía una sola petición con varias consultas: una con todos los filtros activos y una por faceta sin su propio filtro. Así, los contadores de cada opción ("Alajuela (163)", "Salud y Bienestar (10)") siempre muestran las alternativas disponibles (**faceta disyuntiva**).

El buscador de la portada (Hero) y el del directorio comparten la misma búsqueda: lo que se escribe arriba se envía al directorio, la página baja hasta los resultados y la consulta se ejecuta en Algolia.

**Continuidad del servicio:** si Algolia no responde, el directorio pasa automáticamente a una búsqueda local sobre los mismos 171 registros. Esa búsqueda ignora tildes y mayúsculas, pero no tiene sinónimos ni tolerancia propia a errores de escritura; sí aplica el corrector local de la sección 9.4.4. La interfaz indica qué motor está activo ("Algolia · 5 ms" o "Búsqueda local").

**Sincronización:** con la red de prueba, la recarga completa del índice (vaciar, configurar y cargar 171 registros) tardó entre 15 y 18 segundos. La sincronización automática con el CMS Strapi (Capítulo 10) queda como **propuesta**: cada vez que se publique o edite un comercio en Strapi, un webhook actualizaría ese registro en Algolia.

> Los convenios de descuento que muestran las fichas del prototipo son **ilustrativos**: el sitio oficial no publica convenios por comercio. La interfaz los rotula como tales para no atribuir ofertas inexistentes a empresas reales.

---

## 9.3 Configuración de Relevancia y Ponderación

| Parámetro | Configuración final | Justificación de Arquitectura de Información |
|---|---|---|
| `searchableAttributes` (en orden de prioridad) | 1) `name` · 2) `categories` · 3) `sector` · 4) `district, canton` | Primero se busca en el nombre del comercio (búsqueda de un comercio conocido), luego en qué es y por último en dónde está. |
| `attributesForFaceting` | `searchable(sector)`, `searchable(district)`, `canton`, `filterOnly(province)` | Una faceta temática y una faceta geográfica jerárquica (cantón → distrito) que se pueden combinar (Figura 9.4). |
| `customRanking` | `desc(profileScore)` | El sitio oficial no publica convenios ni distingue niveles de verificación: los 171 figuran como "certificadas". Por eso, en caso de empate, se prioriza la ficha más completa (teléfono, sitio web, Facebook y dirección; puntaje de 0 a 4), que es la que permite contactar al comercio. |
| Tolerancia a errores de escritura | 1 error desde 4 letras; 2 errores desde 8 letras | Son los umbrales de Algolia: tolerar errores en palabras más cortas generaría demasiadas coincidencias falsas. |
| Idioma | `ignorePlurals: es`, `removeStopWords: es`, `queryLanguages: es` | "Ferreterías" encuentra "Ferreteria"; palabras como "de" o "la" no afectan el resultado. |
| Sinónimos | 52 grupos (29 bidireccionales y 23 unidireccionales) | Vocabulario controlado; se detalla en la sección 9.4.2. |
| `removeWordsIfNoResults` | `allOptional` | Búsqueda en texto libre: si ningún comercio contiene todas las palabras de una frase, el motor reintenta con las palabras como opcionales (sección 9.4.3). |

**Dos ajustes basados en evidencia:**

1. **La categoría original pesa más que el sector.** En la primera configuración, ambos campos tenían la misma prioridad, y la búsqueda "fereteria" devolvía primero un quebrador y una empresa de policarbonato, porque los dos pertenecen al sector "Construcción y Ferretería". Al dar más prioridad a la categoría original ("Ferreteria"), las ferreterías pasaron a los primeros lugares: Grupo Diasa, Distribuidora Fama y La Casa del Zinc.
2. **La dirección dejó de ser buscable.** En Costa Rica las direcciones se escriben por señas ("200 m sur de la funeraria", "costado del cementerio"). Mientras la dirección era buscable, la consulta "funeraria" devolvía **14 comercios**, de los cuales **11 eran falsos positivos**: comercios que solo usan una funeraria como punto de referencia. Al quitar `address` de los campos buscables, el resultado bajó a las **3 funerarias reales**. La dirección sigue visible en la ficha; la ubicación se busca por distrito y cantón.

---

## 9.4 Tolerancia Ortográfica y Búsqueda Predictiva

### 9.4.1 Tolerancia a errores de escritura

Algolia tolera errores de escritura midiendo la **distancia de edición** entre lo que el usuario escribió y los términos del índice: cuántas letras hay que insertar, borrar, cambiar o intercambiar para que coincidan. Esto es especialmente útil en el celular, donde es común omitir tildes, saltarse letras o invertirlas. La búsqueda se ejecuta mientras el usuario escribe (*as-you-type*), así que el usuario ve resultados desde la primera letra y corrige sobre la marcha.

### 9.4.2 Vocabulario controlado y anillo de sinónimos

La tolerancia a errores resuelve las faltas de escritura, pero no las **diferencias de vocabulario**. Rosenfeld, Morville y Arango (2015) proponen los vocabularios controlados y los anillos de sinónimos para conectar los términos de los usuarios con los términos de la organización. Para medir esta brecha corrimos una **simulación de 35 búsquedas típicas de 19 usuarios simulados** (tráfico de prueba, no de usuarios reales):

| Búsqueda del usuario | Término oficial de la CCA | Sin sinónimos | 28 sinónimos | 52 sinónimos + texto libre |
|---|---|---|---|---|
| abogado | Derecho | 0 resultados | Lic. José Adrián Vargas Solís | Lic. José Adrián Vargas Solís |
| alquiler carro | Rent a Car | 0 | Natural Car rental | Natural Car rental |
| taller mecanico | Automotriz, taller | 0 | Taller Hermanos Arguedas | Taller Hermanos Arguedas |
| piscina | Natacion | 0 | MACOS Academia de Natación | MACOS Academia de Natación |
| biyares | Billares | 0 | Billares Aguilar Hnos., Billares Punis | Billares Aguilar Hnos. |
| soda el parqe | (no existe) | 0 | 0 | 3 sodas (coincidencia parcial) |
| **Búsquedas sin resultados (35 en total)** | | **8 (23%)** | **3 (9%)** | **2 (6%)** |

El vocabulario se amplió en dos rondas. La primera (28 grupos) cubrió los casos detectados en la simulación. La segunda (52 grupos) agregó **necesidades** que el usuario expresa con palabras que no aparecen en ninguna ficha, como "carro", "vehículo", "llanta", "aceite", "medicamentos", "cemento" o "fiesta". Cada grupo apunta solo a categorías o nombres que existen en los 171 registros, y su justificación queda registrada en el campo `_motivo` de `sinonimos_cca.json`. Incluye **costarriquenismos**, como "bomba" (gasolinera), "pulpería" (abarrotes) y "lavacar", y traduce **anglicismos** de las categorías oficiales, como "Rent a Car", "Marketing" y "Catering Service". Los sinónimos unidireccionales se usan cuando la relación no es simétrica: "carro" debe encontrar talleres, lavacar y repuestos, pero buscar "taller" no debe tratarse como "carro".

Prueba de la segunda ronda (12 consultas, antes y después):

| Consulta | Antes | Después | Primeros resultados |
|---|---|---|---|
| carro | 3 irrelevantes (Corporación Arrocera, Los Manantiales: falsos positivos por tolerancia a errores) | 23 | Grúas Rago, Taller Hermanos Arguedas, Lubricentro El Arroyo |
| vehiculo | 0 | 21 | Grúas Rago, Taller Hermanos Arguedas |
| cambio de aceite | 0 | 21 | Lubricentro El Arroyo |
| medicamentos | 0 | 2 | Farmacias Santa Lucía, Farmacias Chavarría |
| cemento | 0 | 11 | Grupo Diasa, Distribuidora Fama, La Casa del Zinc |
| **Consultas sin resultados (12)** | **8** | **0** | |

**Hallazgo cultural: el yeísmo.** En Costa Rica "ll" y "y" se pronuncian igual, así que es frecuente escribir "biyares". Para el motor eso cuenta como dos errores en una palabra de 7 letras, que supera el umbral de tolerancia. Un sinónimo unidireccional (biyares → billares) lo resuelve.

**Lo que no se forzó:**
- **"leche"** sigue sin resultados: Dos Pinos no tiene productos registrados en sus datos, solo sus categorías ("Alimentos", "Industria"). Asociar "leche" a un comercio específico mediante un sinónimo sería forzar el resultado. Recomendamos enriquecer cada ficha con palabras clave de productos y servicios mediante el campo `palabras_clave_tags` del modelo de contenido en Strapi (Capítulo 10).
- **"veterinaria"** devuelve 0 resultados porque no hay asociados de ese tipo; en este caso, 0 es la respuesta correcta. **"soda el parqe"** tampoco existe: con la búsqueda en texto libre ahora muestra otras 3 sodas. Es una coincidencia parcial y la reportamos así, no como un acierto.

### 9.4.3 Búsqueda en texto libre

Los usuarios no siempre escriben palabras clave; también escriben frases como "busco un taller para mi carro". Algolia ya ignora las palabras vacías del español ("un", "para", "mi"), pero por defecto exige que **todas** las palabras restantes coincidan, y "busco" no aparece en ninguna ficha: la frase devolvía 0 resultados. Con `removeWordsIfNoResults: allOptional`, si ninguna ficha contiene todas las palabras, el motor vuelve a buscar con las palabras como opcionales y ordena por cuántas coinciden. La misma frase devuelve ahora **24 resultados, con Taller Hermanos Arguedas en primer lugar**. El buscador invita a este uso con el texto de ejemplo "Escriba lo que busca (ej: taller para mi carro, farmacia, ferretería en Alajuela)".

### 9.4.4 Corrección ortográfica asistida por IA (Azure OpenAI)

**El problema.** Las pruebas revelaron una limitación de Algolia: **los sinónimos no toleran errores de escritura**. La tolerancia se aplica sobre los datos de los comercios ("farmasia" encuentra las farmacias), pero un sinónimo solo se activa si la palabra llega bien escrita. Por eso "carrro", "vehicullo" y "medicamentoz" devolvían 0 resultados aunque "carro", "vehiculo" y "medicamentos" sí tienen sinónimo.

**La solución.** Agregamos una capa de corrección que **reescribe la consulta, pero no reemplaza al motor**:

```
Usuario escribe "carrro"
   → Algolia: 0 resultados
   → /api/corregir: Azure OpenAI corrige "carrro" → "carro"
   → Algolia de nuevo con "carro" → 23 resultados
   → El portal muestra: "Mostrando resultados para carro · no hubo coincidencias para 'carrro'"
```

| Decisión de diseño | Justificación |
|---|---|
| El corrector solo interviene cuando Algolia devuelve 0 resultados | Las búsquedas que ya funcionan no pagan la latencia ni el costo de la IA. |
| La búsqueda la sigue haciendo Algolia | La IA no elige qué comercios mostrar, así que no puede inventar comercios ni alterar el orden de relevancia. |
| Al modelo se le entrega el vocabulario controlado como contexto | Se le indica que corrija hacia términos válidos del directorio, no hacia cualquier palabra. |
| La llave de Azure vive solo en el servidor (ruta API de Next.js y `.env.local`) | La llave nunca llega al navegador, a diferencia de la llave pública de solo búsqueda de Algolia. |
| Respaldo: corrector local | Si Azure no responde o no está configurado, un corrector por distancia de edición (Damerau-Levenshtein) sobre el mismo vocabulario hace la corrección sin servicios externos. |

**Implementación:** recurso de Azure AI Foundry con el modelo `gpt-5-mini` (suscripción Azure for Students), consumido desde la API v1 de Azure OpenAI con razonamiento mínimo. La interfaz indica qué corrector actuó ("corrección Azure OpenAI" o "corrección local").

**Medición (12 consultas mal escritas, 2026-11-08):**

| Consulta | Algolia directo | Corrector local | Azure OpenAI | Resultados tras la corrección |
|---|---|---|---|---|
| carrro | 0 | carro | carro | 23 |
| vehicullo | 0 | vehiculo | vehiculo | 21 |
| medicamentoz | 0 | medicamentos | medicamentos | 2 |
| busco un carrro | 0 | busco un carro | busco un carro | 23 |
| lavadoo | 0 | lavado | lavado | 1 (Industrias Quicke, lavacar) |
| cementto | 0 | cemento | cemento | 11 |
| herramientaz | 0 | herramientas | herramienta | 11 (mismos resultados por `ignorePlurals`) |
| peluqeria | 0 | peluqueria | peluqueria | 2 |
| yanta (llanta) | 3 irrelevantes | sin cambio | sin cambio | — |
| leche, veterinaria | 0 | sin cambio | sin cambio | 0 (no hay afiliados de ese tipo) |
| **Tiempo de corrección** | | instantáneo | 1,26–2,61 s (unos 1,5 s típico) | |

**Lectura crítica de los resultados.** En este directorio los dos correctores producen la **misma corrección efectiva**. Azure no superó al corrector local, y agrega alrededor de 1,5 s de espera y un costo por consulta. Tiene sentido: el vocabulario es pequeño (171 fichas y 52 grupos de sinónimos) y está controlado, justo el escenario donde un algoritmo de distancia de edición alcanza. Ninguno de los dos corrigió "yanta", y además el corrector no llega a activarse: Algolia devuelve 3 resultados que no tienen nada que ver ("Santa" por tolerancia a errores), y el disparador solo detecta cuando hay 0 resultados, no cuando los resultados son malos. Dejamos Azure implementado porque la arquitectura ya admite consultas más complejas que el corrector local no puede resolver, pero **no le atribuimos una mejora que no medimos**.

---

## 9.5 Evidencia de Indexación y Pruebas de Rendimiento

![Índice cca_directorio_comercial con 171 registros en el dashboard de Algolia](figuras/figura_9_1_algolia_indice_171.png)
*Figura 9.1. Índice de producción con los 171 asociados reales.*

![Ejecución de index_algolia.js con validación 171/171](figuras/figura_9_2_terminal_indexacion.png)
*Figura 9.2. Ejecución del script de indexación: validación de integridad 171/171 y configuración aplicada.*

![Searchable attributes en Algolia](figuras/figura_9_3_searchable_attributes.png)
*Figura 9.3. Orden de prioridad de los atributos buscables. Esta captura corresponde a una configuración anterior, en la que `address` todavía era buscable (ver 9.3, ajuste 2).*

![Atributos de facetado en Algolia](figuras/figura_9_4_facetas.png)
*Figura 9.4. Facetas configuradas: cantón, distrito, sector y provincia (solo filtro).*

### 9.5.1 Pruebas de tolerancia a errores de escritura

Las pruebas se ejecutaron con `probar_typos.mjs` el 2026-11-08 a las 06:28 UTC, con la configuración de relevancia de la sección 9.3 y la primera ronda de 28 sinónimos (tiempos de esa corrida):

| Consulta | Tipo de error | Primer resultado | Tiempo en Algolia (ms) |
|---|---|---|---|
| fereteria | Falta una "r" y la tilde | Grupo Diasa (ferretería) | 5 |
| farmasia | "s" en lugar de "c" | Farmacias Santa Lucía | 3 |
| restaurat | Falta una letra | Restaurante el Sabor de la Montaña | 3 |
| dos pinoz | "z" en lugar de "s" | Dos Pinos | 5 |
| clinica santa fe | Sin tilde | Clínica Santa Fe – Alajuela | 4 |
| banco nasional | "s" en lugar de "c" | Banco Nacional de Costa Rica | 3 |
| funerraria | Letra duplicada | Funeraria Jardines del Recuerdo | 24 |
| panaderia | Sin tilde | Panadería Alberto Leandro e Hijos S.A. | 7 |
| biyares | "y" en lugar de "ll" (2 errores) | Billares Aguilar Hnos. | 4 |
| hotl aeropuerto | Falta una letra | Hotel Aeropuerto | 8 |
| *(sin texto)* + distrito Río Segundo | Prueba de faceta | 11 comercios del distrito | 5 |
| restaurante + sector Alimentos + distrito Alajuela | Facetas combinadas | Pollos del Este (6 resultados) | 6 |

**Resultados:**
- Las **10 consultas con errores de escritura** recuperaron el comercio correcto como **primer resultado**. Después de cargar los 52 sinónimos y la búsqueda en texto libre, repetimos las 12 consultas y obtuvimos el mismo primer resultado en todas.
- **Tiempo de procesamiento en Algolia:** mediana de 4,5 ms; **13 de 14 consultas por debajo de 15 ms**; máximo de 24 ms ("funerraria").
- **Tiempo total percibido** desde un equipo en Costa Rica, incluyendo la red: entre 76 y 89 ms. Este es el tiempo que realmente experimenta el usuario, y aun así es imperceptible.

### 9.5.2 Comparación con el sitio actual

| Variable | Directorio oficial actual | Propuesta implementada |
|---|---|---|
| Búsqueda por texto | Sin tolerancia a errores ni sinónimos | Búsqueda mientras se escribe, con tolerancia a errores, 52 grupos de sinónimos y frases en texto libre |
| Errores de escritura | Una letra distinta no encuentra nada | 10/10 consultas con errores recuperan el comercio correcto; los errores sobre sinónimos ("carrro") los corrige la capa de IA o el corrector local |
| Diferencias de vocabulario | Hay que adivinar cuál de las 64 categorías usó la Cámara | Búsquedas sin resultados en la simulación: de 8 (23%) a 2 (6%) |
| Filtrado geográfico | No existe (no hay cantón ni distrito) | Facetas cantón → distrito (155/171 registros con distrito) |
| Clasificación | 64 categorías inconsistentes | 12 sectores normalizados, conservando la categoría original |

### 9.5.3 Limitaciones y criterio de la evidencia

- **Tráfico simulado.** Las 35 búsquedas de la sección 9.4 son una simulación etiquetada (`simulacion-prueba`, `simulacion-post-sinonimos-v2` y `simulacion-sinonimos-v3-texto-libre`), no uso real. La tasa real de búsquedas sin resultados solo se conocerá en producción, y Algolia Analytics queda configurado para medirla.
- **Panel de Analytics.** Al momento de la captura, el panel mostraba 0 búsquedas porque su rango de fechas usa la hora UTC y procesa los datos con retraso. Por eso las cifras se obtuvieron directamente de la API de Analytics; la respuesta completa está en `evidencias/algolia_analytics_api.json`.
- **Caché del motor.** Algolia guarda en caché las consultas repetidas y devuelve el mismo tiempo en cada repetición. Por eso se reporta el tiempo de la primera ejecución de cada corrida, forzada sin caché.
- **Datos de contacto.** Teléfonos, sitios web y ubicaciones provienen del directorio oficial y pueden estar desactualizados. Cada ficha enlaza a su fuente oficial.
- **Ruido de los sinónimos amplios.** "taxi" → transporte trae a Cootaxa en primer lugar, pero también otros 20 comercios del sector "Automotriz y Transporte". "peluquería" → estética incluye un centro odontológico que el sitio oficial clasificó como "Estética", lo que es un problema de los datos de origen.
- **Azure en suscripción de estudiante.** La suscripción Azure for Students solo permite crear recursos en ciertas regiones (la creación en la primera región elegida fue rechazada por política: `RequestDisallowedByAzure`). Los tiempos de Azure son de una sola corrida y dependen de la región y de la red.
- **Muestra de corrección pequeña.** La comparación entre el corrector local y Azure se hizo con 12 consultas elegidas por el equipo; no es una evaluación estadística.

**Archivos reproducibles** (en `tools/06_algolia_search/`): `extraer_directorio_oficial.py`, `xlsx_a_algolia.py`, `index_algolia.js`, `cargar_sinonimos.mjs`, `sinonimos_cca.json`, `probar_typos.mjs`, `simular_busquedas.mjs`, `resultados_pruebas_typos.md`, `resultados_sinonimos_antes_despues.md`, `resultados_sinonimos_v2_texto_libre.md`, `resultados_simulacion_v3_texto_libre.md` y `resultados_corrector_ortografico.md`. Código del portal: `src/lib/directorio.ts` (Algolia), `src/lib/corrector.ts` (corrector local) y `src/app/api/corregir/route.ts` (Azure OpenAI).

---

## 9.6 Alcance de la IA y Evolución Propuesta

### 9.6.1 Por qué no se usó búsqueda semántica ni RAG en el directorio

En la planificación se consideró usar Azure AI Search con búsqueda semántica (vectores) para todo el directorio. No lo implementamos, y la evidencia de este capítulo respalda esa decisión:

1. **El problema medido era de vocabulario, no de comprensión.** Los usuarios escriben "abogado", "carro" o "pulpería"; la Cámara clasifica como "Derecho", "Automotriz" o "Abarrotes". Los sinónimos y el texto libre bajaron las búsquedas sin resultados de 23% a 6%.
2. **Lo que todavía falla no lo resuelve la IA.** Las 2 búsquedas sin resultados ("leche" y "veterinaria") son productos o tipos de comercio que no existen entre los afiliados. Ningún motor semántico puede encontrar lo que no está en el directorio.
3. **Los datos son cortos y estructurados.** Cada ficha tiene nombre, categoría, sector y ubicación, y una descripción genérica ("Asociado certificado de la CCA · sector"). La búsqueda semántica aporta cuando hay texto rico que interpretar.
4. **Costo y complejidad desproporcionados.** Requeriría un segundo índice, generar y sincronizar embeddings y pagar por cada consulta, a cambio de una mejora que no pudimos demostrar. La medición de la sección 9.4.4 lo confirma a menor escala: aun para corregir palabras, Azure no superó al corrector local y agregó 1,5 s de espera.
5. **La conversación en lenguaje natural ya tiene su lugar.** Las preguntas abiertas sobre trámites, estatutos o la Ley 7092 corresponden al asistente RAG del Capítulo 12. El buscador del directorio resuelve otra tarea: encontrar un comercio rápido.

Por eso la IA se integró en el punto donde la medición mostró un vacío concreto (sinónimos mal escritos), detrás de Algolia y con un respaldo local.

### 9.6.2 Evolución propuesta

| Fase | Mejora | Condición que la justificaría |
|---|---|---|
| Corto plazo | Enriquecer cada ficha con palabras clave de productos y servicios desde Strapi (`palabras_clave_tags`, Capítulo 10) | Resuelve casos como "leche" sin IA: es un problema de contenido, no del motor. |
| Corto plazo | Detectar resultados de baja calidad, no solo los 0 resultados (por ejemplo, cuando todos los resultados llegan con errores de escritura), para activar el corrector en casos como "yanta" | Analytics de producción muestra búsquedas con resultados pero sin clics. |
| Mediano plazo | Usar Azure OpenAI para interpretar frases complejas y convertirlas en consulta más filtros ("dónde arreglo el carro en Poás" → `taller` + cantón Poás) | Analytics registra frases largas con 0 resultados o sin clics. |
| Largo plazo | Búsqueda híbrida (palabras clave + vectores) con Azure AI Search, y extender el índice a la bolsa de empleo | El directorio crece con más cantones y las fichas incorporan descripciones extensas. |
| Integración | El asistente RAG del Capítulo 12 podría usar Algolia como recuperador cuando la pregunta sea sobre comercios ("¿quién me remolca el carro?") | El asistente pasa a producción y tiene acceso al índice. |
