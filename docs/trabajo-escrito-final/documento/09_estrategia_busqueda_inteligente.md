# 9. Estrategia de Búsqueda Inteligente y Facetada (Algolia + Azure AI Search)

## 9.1 El Rol de la Búsqueda en la Arquitectura de Información

Tal como señalan Rosenfeld, Morville y Arango (2015), buscar y navegar son dos caras inseparables de una misma experiencia: **navegar recorre una estructura propuesta por el sistema**, mientras que **buscar expresa una necesidad formulada directamente en el vocabulario del usuario**.

En el sitio web anterior de la Cámara, la búsqueda no existía en términos funcionales; el usuario dependía exclusivamente de desplazarse por listas estáticas. Para resolver este déficit, durante las Semanas 8 y 10 se diseñó una estrategia integral de búsqueda inteligente articulando los modelos de **Algolia** (búsqueda instantánea en cliente con tolerancia a errores) y **Azure AI Search** (recuperación semántica basada en lenguaje natural para la bolsa de empleo y reglamentos gremiales).

---

## 9.2 Atención a los Cuatro Comportamientos de Búsqueda

Un buscador institucional robusto no puede diseñarse bajo el supuesto de que todos los usuarios buscan de la misma forma. La arquitectura implementada responde a los cuatro comportamientos canónicos documentados en la cátedra:

1. **Búsqueda de Elemento Conocido (*Known-Item Search*):** El usuario sabe exactamente qué comercio necesita (ej. escribe *"Ferretería El Candado"* o *"Bufete Valverde"*). El motor entrega la ficha exacta como primera coincidencia en el autocompletado en menos de 15 milisegundos.
2. **Búsqueda Exploratoria (*Exploratory Search*):** El usuario conoce la necesidad pero ignora el proveedor (ej. busca *"taller para reparar frenos en El Coyol"*). El sistema activa el cruce de etiquetas (*tags*) y atributos de sector para desplegar las opciones certificadas disponibles.
3. **Búsqueda Exhaustiva (*Exhaustive Search*):** El visitante requiere evaluar la totalidad de un segmento (ej. *"Todos los comercios del sector Alimentos en el distrito de Tambor"*). Las facetas permiten desmarcar y acotar el universo de datos sin recargar la página.
4. **Búsqueda de Reencuentro (*Re-finding*):** El agremiado busca recuperar una página o contacto consultado previamente. La persistencia de URLs semánticas limpias (ej. `/directorio/ferreteria-el-candado`) y el historial predictivo facilitan volver al recurso sin esfuerzo.

---

## 9.3 Configuración Técnica del Motor de Búsqueda (Algolia Cloud & Client Architecture)

En el marco del proyecto, el motor de búsqueda se estructuró mediante una doble arquitectura: un script ejecutable de indexación en la nube de Algolia (`implementaciones_reales/06_algolia_search/index_algolia.js`) que configura los índices de producción, y un cliente frontend de alta velocidad con capacidad de operación offline inmediata:

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

## 9.4 Búsqueda Híbrida y Semántica con Azure AI Search

Para la Bolsa de Empleo y la consulta de reglamentos gremiales, se modeló una arquitectura basada en **Azure AI Search**. A diferencia de la búsqueda por palabras clave exactas (*lexical search*), este motor procesa la consulta mediante representaciones vectoriales (*embeddings*), permitiendo responder a intenciones complejas como:
> *"Requisitos para solicitar permiso municipal de rótulos comerciales en el centro de Alajuela"*

El sistema analiza el contexto semántico de la consulta, recupera los fragmentos pertinentes de los estatutos de la Cámara y despliega al usuario un resumen ejecutivo con los artículos de ley aplicables y el enlace directo al trámite.

*(Nota: El diagrama de flujo del pipeline de búsqueda se detalla en la Figura 4 del Visualizador de Figuras del proyecto).*
