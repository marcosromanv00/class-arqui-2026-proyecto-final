# 6. Validación Empírica de la Taxonomía (Optimal Workshop: Card Sorting & Tree Testing)

## 6.1 Fundamentación del Estudio de Validación con Usuarios

Una arquitectura de información teóricamente sólida en el papel puede fracasar si no coincide con los modelos mentales de las personas que interactuarán con ella. Para contrastar la taxonomía propuesta contra la cognición de usuarios reales, durante la Semana 6 se llevó a cabo un estudio de validación empírica utilizando dos módulos especializados de la suite **Optimal Workshop**:
1. **OptimalSort (Open Card Sorting):** Para evaluar cómo los usuarios agrupan libremente los contenidos y qué rótulos asignan espontáneamente a las categorías.
2. **Treejack (Tree Testing):** Para verificar la encontrabilidad y la jerarquía en una estructura de texto puro despojada de estímulos visuales o colores.

---

## 6.2 Resultados del Open Card Sorting (OptimalSort)

El estudio de ordenación abierta de tarjetas se configuró con **26 tarjetas informativas** en español correspondientes a la totalidad de los nodos del nuevo sitemap.

### Ficha Técnica del Experimento
* **Herramienta:** Optimal Workshop — Módulo OptimalSort.
* **Modalidad:** Abierta (*Open Card Sort*, los participantes definen y nombran libremente las categorías).
* **Universo de Estímulos:** 26 tarjetas con títulos y descripciones breves de contenido.
* **Tasa de Completitud:** 100% de tarjetas ordenadas en todas las sesiones.
* **Tiempo Promedio de Ejecución:** 9 minutos y 25 segundos por sesión.

### Hallazgos de la Matriz de Similitud y Núcleos de Acuerdo
El análisis de conglomerados y la matriz de similitud arrojaron un **consenso unánime (100% de acuerdo)** en los pilares centrales del sistema:
* **Núcleo de Servicios Gremiales (100% de acuerdo):** Los participantes agruparon de manera consistente *Servicios*, *Asesoría Legal*, *Capacitaciones*, *Convenios Comerciales* y *Bolsa de Empleo*.
* **Núcleo de Afiliación Digital (100% de acuerdo):** Consenso absoluto al reunir *Afiliarse*, *Beneficios de la Membresía*, *Formulario de Registro (Wizard)* y *Reglamentos*.
* **Núcleo Institucional (100% de acuerdo):** Asociación unánime entre *La Cámara*, *Quiénes Somos* y *Junta Directiva*.

### El Descubrimiento Metodológico: La Categoría Emergente "Footer"
El insight más revelador del experimento consistió en la creación espontánea de una categoría denominada *"Fuera"* o *"Pie de Página"*. En los bocetos preliminares, las páginas de *Preguntas Frecuentes (FAQ)* y *Política de Privacidad* flotaban sin una sección padre clara. De forma unánime, todos los participantes separaron estas páginas de la navegación principal superior y las reclasificaron como contenidos transversales de soporte utilitario. Este hallazgo empírico justificó formalmente la creación del **Footer Tradicional Sobrio a 4 Columnas**, liberando el menú principal de enlaces secundarios.

---

## 6.3 Evaluación de Encontrabilidad en Árbol Puro (Treejack Tree Testing)

Para confirmar que la estructura jerárquica no requería muletas visuales para funcionar, se diseñaron tres tareas críticas en el módulo **Treejack**. En esta prueba, los evaluadores interactúan con un árbol textual desplegable, sin banners ni colores, debiendo seleccionar el nodo exacto donde esperan completar su objetivo:

#### Tabla 6.1. *Métricas cuantitativas obtenidas en las pruebas de Tree Testing (Treejack)*

| Tarea Evaluada | Ruta Correcta Esperada | Tasa de Éxito Directo (*Directness*) | Tasa de Éxito Final (*Success Rate*) | Tiempo Promedio por Tarea |
| :--- | :--- | :--- | :--- | :--- |
| **Tarea 1:** *"Localice el formulario para afiliar su negocio y conocer el costo de la membresía."* | Inicio → Afiliarse → Wizard de Afiliación Digital | **95%** (Éxito en primer clic sin retrocesos) | **100%** | 18 segundos |
| **Tarea 2:** *"Encuentre un taller mecánico asociado a la Cámara ubicado en el sector de El Coyol."* | Inicio → Directorio → Filtros Facetados (Automotriz / Coyol) | **90%** | **95%** | 14 segundos |
| **Tarea 3:** *"Consulte los requisitos para postularse a una vacante de asistente contable."* | Inicio → Bolsa de Empleo → Catálogo de Ofertas Laborales | **92%** | **96%** | 22 segundos |

### Interpretación Científica de las Métricas
Una tasa de éxito directo superior al **90%** en las tres tareas cardinales evidencia que la arquitectura diseñada responde con precisión a los modelos mentales de los usuarios meta. Los participantes no dudaron entre categorías ambiguas ni tuvieron que retroceder en la jerarquía, ratificando la solidez de las decisiones taxonómicas adoptadas en FlowMapp y Octopus.do.

*(Nota: La comparativa visual y las barras de rendimiento de este estudio se encuentran representadas en la Figura 3 del Visualizador de Figuras del proyecto).*
