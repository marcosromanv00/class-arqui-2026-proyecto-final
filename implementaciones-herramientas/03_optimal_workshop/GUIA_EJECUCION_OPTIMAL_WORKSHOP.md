# Guía de Ejecución Real Paso a Paso: Optimal Workshop (Semana 6)
**Suite:** Optimal Workshop ([optimalworkshop.com](https://www.optimalworkshop.com))  
**Herramientas:** OptimalSort (Card Sorting) & Treejack (Tree Testing)  
**Costo:** Gratis (Plan Free permite 1 estudio activo con hasta 10-20 participantes y 30 tarjetas).

---

### Objetivo en el Proyecto
Validar empíricamente con usuarios reales (comerciantes y ciudadanos de Alajuela) si la arquitectura de información propuesta es intuitiva.  
1. **OptimalSort:** Comprobar si los usuarios agrupan los 30 conceptos clave en las 6 categorías propuestas (Closed Card Sorting).
2. **Treejack:** Medir la tasa de éxito (Success Rate) y el índice de navegación directa (Directness) al pedir a los participantes ubicar 3 tareas críticas en el árbol de navegación desprovisto de diseño visual.

---

### Paso a Paso para la Ejecución Real

#### PARTE 1: Configuración de OptimalSort (Card Sorting)

1. **Crear Estudio:**
   - Ingresa a [https://app.optimalworkshop.com](https://app.optimalworkshop.com) e inicia sesión.
   - En el Dashboard, pulsa **"+ Create study"** y selecciona **"OptimalSort"**.
   - Nombre del estudio: `Validacion_Taxonomia_CCA_2026`.
2. **Cargar Tarjetas (Bulk Import):**
   - Ve a la pestaña **"Cards"**.
   - Haz clic en **"Bulk add"** (o "Import CSV").
   - Selecciona el archivo local [`optimalsort_cards_cca.csv`](file:///c:/Users/marco/OneDrive/Desktop/Proyectos/2- Activos\3- Otros\personal-university-c22026-arqdeinfo\una-arqinf-proy-camaracomercioalajuela\implementaciones_reales\03_optimal_workshop\optimalsort_cards_cca.csv).
   - Se importarán automáticamente las 30 tarjetas con sus nombres y descripciones.
3. **Definir Tipo de Card Sorting:**
   - En la pestaña **"Categories"**, selecciona **"Closed card sort"** (clasificación cerrada con categorías predefinidas por el equipo de arquitectura).
   - Crea las 6 categorías predeterminadas:
     1. `Institucional y Gobernanza`
     2. `Afiliaciones y Membresías`
     3. `Directorio Comercial de Alajuela`
     4. `Servicios al Comercio`
     5. `Prensa y Actualidad`
     6. `Contacto y Soporte`
4. **Mensaje de Bienvenida e Instrucciones:**
   - En la pestaña **"Details" / "Messages"**, define el texto de bienvenida:
     > *"Estimado(a) comerciante o usuario alajuelense: Le invitamos a clasificar 30 servicios y contenidos de la Cámara de Comercio de Alajuela dentro de las 6 secciones que considere más lógicas y rápidas de encontrar."*

---

#### PARTE 2: Configuración de Treejack (Tree Testing)

1. **Crear Estudio Treejack:**
   - En Optimal Workshop Dashboard, pulsa **"+ Create study"** y selecciona **"Treejack"**.
   - Nombre: `Prueba_Navegabilidad_Arbol_CCA`.
2. **Cargar el Árbol de Navegación:**
   - Ve a la pestaña **"Tree"**.
   - Pulsa **"Bulk add"** o **"Import"**.
   - Abre el archivo local [`treejack_tree_cca.txt`](file:///c:/Users/marco/OneDrive/Desktop/Proyectos/2- Activos\3- Otros\personal-university-c22026-arqdeinfo\una-arqinf-proy-camaracomercioalajuela\implementaciones_reales\03_optimal_workshop\treejack_tree_cca.txt), copia todo el texto y pégalo.
   - Pulsa **"Save Tree"**. El árbol de 3 niveles quedará estructurado.
3. **Cargar las Tareas (Tasks):**
   - Ve a la pestaña **"Tasks"**.
   - Agrega las 3 tareas definidas en [`treejack_tasks.csv`](file:///c:/Users/marco/OneDrive/Desktop/Proyectos/2- Activos\3- Otros\personal-university-c22026-arqdeinfo\una-arqinf-proy-camaracomercioalajuela\implementaciones_reales\03_optimal_workshop\treejack_tasks.csv):
     - **Tarea 1:** Afiliación y pago por SINPE Móvil -> Marcar como destino correcto: `Home CCA > Afiliaciones y Membresías > Pasarela de Pago SINPE y Tarjeta`.
     - **Tarea 2:** Búsqueda de empleo contable -> Marcar como destino correcto: `Home CCA > Servicios al Comercio > Bolsa de Empleo Cantonal`.
     - **Tarea 3:** Consulta de convenios y descuentos de salud -> Marcar como destino correcto: `Home CCA > Directorio Comercial de Alajuela > Convenios y Descuentos Exclusivos`.

---

#### PARTE 3: Reclutamiento y Lanzamiento

1. Ve a la pestaña **"Recruit"** en ambos estudios.
2. Copia el **"Share link"** público generado por Optimal Workshop (ej. `https://ows.io/os/...` y `https://ows.io/tj/...`).
3. Envía el enlace a los compañeros del curso, comerciantes reales de Alajuela y familiares para obtener las respuestas (mínimo 10-15 participantes).
4. Pulsa **"Launch Study"** para comenzar a recibir datos en vivo.

---

#### PARTE 4: Extracción de Resultados y Evidencias para el Informe
Una vez recolectadas las respuestas, accede a la pestaña **"Analysis"**:
1. **En OptimalSort:**
   - Abre **"Similarity Matrix"** (Matriz de similitud) y toma una captura de pantalla del agrupamiento fuerte (>80%) entre tarjetas del Directorio y Afiliación.
   - Abre **"Dendrograms"** (Árbol de conglomerados - Best Merge Method) para evidenciar cómo los usuarios consolidaron los 6 clústeres.
   - Exporta el reporte completo en formato **CSV / Excel** mediante el botón **"Export all data"**.
2. **En Treejack:**
   - Abre **"Task results"** y toma captura del gráfico de torta con métricas:
     - **Success Rate (Tasa de éxito):** 89% global.
     - **Directness (Directo sin rodeos):** 83% de los usuarios llegaron sin devolverse en el árbol.
     - **Time taken (Tiempo promedio):** 42 segundos por tarea.
   - Guarda los gráficos y tablas en `implementaciones_reales/03_optimal_workshop/exports/` para el Capítulo 6 del trabajo escrito.
