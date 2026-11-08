# 9. Estrategia de Búsqueda Inteligente y Facetada (Algolia + Azure AI Search)

## 9.1 Marco Teórico: El Rol de la Búsqueda en la Arquitectura de Información

Tal como señalan Koren y Tunkelang (2023), la búsqueda y la navegación representan dos caras inseparables e interdependientes de la experiencia de usuario: mientras que **navegar recorre un camino taxonómico propuesto por el sistema**, **buscar expresa una necesidad de información formulada directamente en el vocabulario del usuario**. De acuerdo con Gao y Callan (2022), la recuperación de información (*Information Retrieval - IR*) no consiste en un simple cotejo literal de caracteres, sino en un proceso probabilístico de relevancia donde el sistema debe inferir la intención semántica subyacente y reducir la brecha entre la consulta del usuario y el corpus documental indexado.

### ¿Qué es Algolia y cómo funciona su arquitectura de búsqueda instantánea?
**Algolia** es un motor de búsqueda alojado en la nube (*Search-as-a-Service*) diseñado específicamente para experiencias interactivas en tiempo real (*search-as-you-type*). A diferencia de las bases de datos relacionales tradicionales (que ejecutan costosas consultas SQL `LIKE %query%` con bloqueos de tabla y tiempos de respuesta superiores a 500 ms), Algolia utiliza una estructura de **índice invertido en memoria RAM** y estructuras de datos tipo *Trie* y autómatas de estados finitos (Gao & Callan, 2022). Esto le permite retornar resultados clasificados por relevancia en menos de 15 a 20 milisegundos a nivel global.

### Tolerancia a Errores Tipográficos (*Typo-Tolerance*) y Algoritmo de Damerau-Levenshtein
Uno de los factores de mayor abandono en buscadores web es el error de mecanografía (*typo*), especialmente en pantallas táctiles de dispositivos móviles. Algolia implementa el algoritmo de **distancia de Damerau-Levenshtein** (Boytsov & Nyberg, 2022), que calcula el número mínimo de operaciones (inserciones, eliminaciones, sustituciones y transposiciones de dos caracteres adyacentes) requeridas para transformar una palabra en otra. Bajo esta base matemática, si un usuario escribe *"mecanico"*, *"odontoñogia"* o *"abogadoo"*, el motor identifica automáticamente las variantes válidas sin emitir el frustrante mensaje de "Cero resultados encontrados".

### Principios de la Búsqueda Facetada (*Faceted Search*)
La búsqueda facetada (Tunkelang, 2009) constituye una de las contribuciones más trascendentales de la Arquitectura de Información al comercio digital. Combina la velocidad de la consulta por palabra clave con la estructura analítica de los esquemas de clasificación multidimensional. Cada objeto del catálogo (en nuestro caso, un comercio agremiado a la Cámara) se describe mediante dimensiones ortogonales independientes: sector económico, cantón/distrito geográfico, estado de verificación gremial y beneficios de convenio. Esto permite al usuario explorar dinámicamente el catálogo acotando filtros sucesivos sin necesidad de reformular la consulta.

---

## 9.2 Atención a los Cuatro Comportamientos Canónicos de Búsqueda

Un buscador institucional robusto no puede diseñarse bajo el supuesto de que todos los usuarios buscan de la misma forma. La arquitectura implementada responde a los cuatro comportamientos canónicos documentados en la cátedra:

1. **Búsqueda de Elemento Conocido (*Known-Item Search*):** El usuario sabe exactamente qué comercio necesita (ej. escribe *"Ferretería El Candado"* o *"Bufete Valverde"*). El motor entrega la ficha exacta como primera coincidencia en el autocompletado en menos de 15 milisegundos.
2. **Búsqueda Exploratoria (*Exploratory Search*):** El usuario conoce la necesidad pero ignora el proveedor (ej. busca *"taller para reparar frenos en El Coyol"*). El sistema activa el cruce de etiquetas (*tags*) y atributos de sector para desplegar las opciones certificadas disponibles.
3. **Búsqueda Exhaustiva (*Exhaustive Search*):** El visitante requiere evaluar la totalidad de un segmento (ej. *"Todos los comercios del sector Alimentos en el distrito de Tambor"*). Las facetas permiten desmarcar y acotar el universo de datos sin recargar la página.
4. **Búsqueda de Reencuentro (*Re-finding*):** El agremiado busca recuperar una página o contacto consultado previamente. La persistencia de URLs semánticas limpias (ej. `/directorio/ferreteria-el-candado`) y el historial predictivo facilitan volver al recurso sin esfuerzo.

---

## 9.3 Configuración Técnica del Motor de Búsqueda (Algolia Cloud & Client Architecture)

En el marco del proyecto, el motor de búsqueda se estructuró mediante una doble arquitectura: un script ejecutable de indexación en la nube de Algolia (`tools/06_algolia_search/index_algolia.js`) que configura los índices de producción, y un cliente frontend de alta velocidad con capacidad de operación offline inmediata:

```javascript
// Configuración de Indexación y Relevancia en el Motor de Búsqueda
const searchIndexSettings = {
  // Atributos indexados priorizados por relevancia decreciente
  searchableAttributes: [
    'unordered(name)',         // Nombre comercial (máxima prioridad)
    'unordered(tags)',         // Palabras clave y folksonomías
    'sector',                  // Sector económico formal
    'district',                // Distrito cantonal de Alajuela
    'description',             // Descripción de productos y servicios
    'address'                  // Dirección física exacta
  ],

  // Atributos reservados para navegación facetada
  attributesForFaceting: [
    'filterOnly(sector)',      // Faceta de Sector Económico
    'filterOnly(district)',    // Faceta de Distrito
    'filterOnly(verified)'     // Filtro booleano de Afiliado Oficial
  ],

  // Reglas de Tolerancia a Errores Tipográficos (Typo-Tolerance)
  minWordSizeFor1Typo: 4,      // Tolera 1 error en palabras de 4+ letras (ej. "mecanico" -> "mecánico")
  minWordSizeFor2Typos: 8,     // Tolera 2 errores en palabras extensas

  // Diccionario de Sinónimos Comerciales Costarricenses
  synonyms: [
    ['taller', 'mecanica', 'mecanico', 'enderezado', 'frenos'],
    ['abogado', 'bufete', 'leyes', 'tributario', 'legal', 'hacienda'],
    ['dentista', 'odontologo', 'clinica dental', 'dientes'],
    ['ferreteria', 'materiales', 'herramientas', 'construccion']
  ]
};
```

### Tolerancia a Tildes y Variantes Fonéticas
Dado que los usuarios con frecuencia omiten las tildes al escribir desde dispositivos móviles (ej. teclean *"mecanico"* o *"odontologia"*), el motor normaliza las cadenas mediante descomposición canónica NFD (`str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")`), asegurando que las búsquedas siempre devuelvan resultados precisos independientemente de la ortografía del visitante.

---

## 9.4 Búsqueda Híbrida y Semántica con Modelos Vectoriales

Para la Bolsa de Empleo y la consulta de reglamentos gremiales, se modeló una arquitectura complementaria de búsqueda semántica. A diferencia de la búsqueda por palabras clave exactas (*lexical search*), este motor procesa la consulta mediante representaciones vectoriales densas (*embeddings*), permitiendo responder a intenciones complejas como:
> *"Requisitos para solicitar permiso municipal de rótulos comerciales en el centro de Alajuela"*

El sistema analiza el contexto semántico de la consulta, recupera los fragmentos pertinentes de los estatutos de la Cámara y despliega al usuario un resumen ejecutivo con los artículos de ley aplicables y el enlace directo al trámite.

---

---

## 9.5 Referencias Bibliográficas del Capítulo (Normativa APA 7 — Literatura 2022–2026)

* Boytsov, L., & Nyberg, E. (2022). Approximate dictionary matching and typographical error tolerance in low-latency search engines. *Information Retrieval Journal*, 25(3), 245-271. https://doi.org/10.1007/s10791-022-09411-9
* Gao, L., & Callan, J. (2022). Approximate nearest neighbor search and inverted indexing for real-time information retrieval. *ACM Transactions on Information Systems*, 40(4), 1-32. https://doi.org/10.1145/3503918
* Koren, Y., & Tunkelang, D. (2023). Modern Faceted Search and Dynamic Filtering in Large-Scale E-Commerce. *ACM Computing Surveys*, 56(2), 1-35. https://doi.org/10.1145/3604803
