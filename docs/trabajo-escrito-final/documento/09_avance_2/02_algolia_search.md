## 7.2 Búsqueda Predictiva Inteligente y Tolerancia Tipográfica (Algolia Search)

### ¿Qué es? ¿Qué hace? ¿Cómo podría implementarse en nuestro proyecto?
**Algolia** es un motor de búsqueda como servicio (*Search-as-a-Service*) basado en índices invertidos en memoria que resuelve consultas en milisegundos mientras el usuario escribe (*search-as-you-type*), aplicando distancia de edición de Levenshtein para tolerar errores ortográficos, anillos de sinónimos y filtrado facetado disyuntivo.

En el proyecto se implementó sobre el padrón oficial real de la Cámara (`src/lib/directorio.ts`), conectando tanto el buscador central de la portada como el Directorio Comercial al índice en la nube `cca_directorio_comercial`, acompañado de una capa de respaldo local y un corrector ortográfico en `/api/corregir` con **Azure OpenAI (`gpt-5-mini`)** y algoritmo local Damerau-Levenshtein (`src/lib/corrector.ts`) que actúa cuando una consulta con sinónimo mal escrito devuelve cero resultados.

### Costos, planes y alcance de capa gratuita
- **Algolia Build Plan (Capa Gratuita Perpetua):** Incluye **10.000 solicitudes de búsqueda al mes y hasta 10.000 registros indexados** sin costo ($0.00/mes). Con 171 comercios reales indexados y una proyección de ~2.500 búsquedas mensuales, la Cámara opera holgadamente dentro del umbral gratuito.
- **Capa de Corrección Ortográfica:** Se evaluó bajo suscripción *Azure for Students* y se integró un corrector algorítmico local sin costo por consulta que iguala su efectividad sobre el vocabulario controlado de la CCA.

### Alternativas Open Code
- **MeiliSearch:** Motor de búsqueda open source en Rust con tolerancia nativa a errores tipográficos, sinónimos y facetas instantáneas, autoalojable mediante Docker bajo licencia MIT.
- **Typesense:** Alternativa de código abierto en C++ optimizada para baja latencia en memoria y búsqueda geográfica sin costos de licencia.

### Principios de Arquitectura de Información relacionados
1. **Sistemas de Búsqueda y Relevancia Ponderada (Rosenfeld et al., 2015):** Jerarquización de atributos para priorizar coincidencias exactas de nombre y oficio sobre agrupadores generales.
2. **Vocabularios Controlados y Anillos de Sinónimos:** Puente semántico entre el lenguaje coloquial del ciudadano costarricense (*"abogado"*, *"carro"*, *"pulpería"*, *"biyares"*) y la terminología institucional (*"Derecho"*, *"Automotriz"*, *"Abarrotes"*, *"Billares"*).
3. **Navegación Facetada Disyuntiva (Koren & Tunkelang, 2023):** Combinación simultánea de facetas temáticas (sector) y geográficas jerárquicas (cantón → distrito) manteniendo visibles los conteos de opciones alternativas.

### Demostración de aplicación en nuestro dominio
Al auditar el directorio oficial vigente (`camaraalajuela.com/directorio-de-asociados/`), se detectó que anunciaba 173 empresas pero listaba 171, empleaba **64 categorías sin control** (con errores como *"Constuctora"*, duplicados como *"Cooperativa"* / *"Cooperativas"* y anglicismos como *"Rent a Car"*), carecía de datos de cantón o distrito y operaba por coincidencia exacta. Se incluyó esta información en una cadena de datos reproducible (`tools/06_algolia_search/`) buscando normalizar el padrón y medir la reducción de búsquedas fallidas:
1. **Extracción y curaduría (`extraer_directorio_oficial.py` y `xlsx_a_algolia.py`):** Se extrajeron los **171 asociados reales**, se normalizaron las 64 etiquetas en **12 sectores controlados** y se curó manualmente la ubicación geográfica con fuente verificada (cantón en 171/171 registros y distrito en 155/171).
2. **Indexación y configuración (`index_algolia.js` y `cargar_sinonimos.mjs`):** Se cargó el índice con `customRanking: desc(profileScore)` (priorizando fichas con datos de contacto completos), `ignorePlurals: es`, `removeStopWords: es`, `removeWordsIfNoResults: allOptional` (para frases en texto libre como *"busco un taller para mi carro"*) y **52 grupos de sinónimos** (29 bidireccionales y 23 unidireccionales).

**Tabla 6.**  
*Evolución de resultados en simulación de 35 búsquedas típicas y pruebas de errores tipográficos*

| Consulta Evaluada | Categoría Oficial CCA | Sin Sinónimos | Con 52 Sinónimos + Texto Libre | Tiempo Algolia |
| :--- | :--- | :--- | :--- | :--- |
| `abogado` / `alquiler carro` | Derecho / Rent a Car | 0 resultados | Lic. José Adrián Vargas / Natural Car Rental | 4 ms |
| `piscina` / `biyares` (yeísmo) | Natacion / Billares | 0 resultados | MACOS Academia / Billares Aguilar Hnos. | 4 ms |
| `fereteria` / `farmasia` (typos) | Ferreteria / Farmacia | 0 en sitio actual | Grupo Diasa / Farmacias Santa Lucía | 3–5 ms |
| `carro` / `cambio de aceite` | Automotriz / Lubricentro | 3 irrelevantes / 0 | 23 y 21 resultados (Grúas Rago, El Arroyo) | 5 ms |
| **Tasa de búsquedas vacías** | **Sobre 35 consultas** | **8 fallidas (23%)** | **2 fallidas (6% — rubros no afiliados)** | **Mediana: 4.5 ms** |

![Figura 7.1. Índice de producción en Algolia con los 171 comercios reales asociados](figuras/figura_9_1_algolia_indice_171.png)

### Ajustes para un mejor resultado y justificación
Una vez recopilados los datos de las corridas experimentales, se implementaron tres ajustes decisivos en el sistema:
1. **Prioridad de la categoría original sobre el sector (`name > categories > sector > district, canton`):** Inicialmente ambos campos tenían igual peso y buscar *"fereteria"* mostraba primero un quebrador y una empresa de policarbonato del sector *Construcción y Ferretería*. Al priorizar `categories`, las ferreterías reales (*Grupo Diasa*, *Distribuidora Fama* y *La Casa del Zinc*) pasaron a los primeros lugares.
2. **Exclusión de `address` de los atributos buscables:** En Costa Rica las direcciones se redactan por señas de referencia (*"200 m sur de la funeraria"*). Cuando `address` era buscable, la consulta *"funeraria"* devolvía **14 comercios, de los cuales 11 eran falsos positivos** que solo la mencionaban como punto de referencia. Al retirar `address` de `searchableAttributes`, el resultado se depuró a las **3 funerarias reales**, conservando la dirección visible en la ficha y delegando la búsqueda espacial a las facetas de cantón y distrito.
3. **Corrector ortográfico para sinónimos mal escritos (`/api/corregir`):** Se descubrió que Algolia aplica tolerancia tipográfica sobre los registros pero no sobre la activación de sinónimos (por lo que *"carrro"*, *"vehicullo"* o *"medicamentoz"* daban 0 resultados). Se implementó una capa que interviene únicamente cuando Algolia devuelve 0 resultados, reescribiendo la consulta hacia el vocabulario controlado mediante Azure OpenAI o el corrector Damerau-Levenshtein local y reintentando la búsqueda en Algolia (recuperando 23, 21 y 2 comercios respectivamente).

![Figura 7.2. Configuración de facetas temáticas y geográficas en Algolia](figuras/figura_9_4_facetas.png)

### Evidencias
Las 10 consultas con errores ortográficos (`probar_typos.mjs`) recuperaron el comercio correcto en primer lugar con una mediana de **4.5 ms** en el motor (76–89 ms incluyendo red en Costa Rica), reduciendo las búsquedas sin resultados del **23% al 6%**. Todos los scripts y bitácoras son reproducibles en `tools/06_algolia_search/`.

![Figura 7.3. Analítica real en Algolia con consultas ortográficas de usuarios («fereteria», «farmasia», «biyares», «dos pinoz»)](figuras/figura_9_5_algolia_analytics_queries.png)
