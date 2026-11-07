# Organización del Repositorio de Google Drive · Entrega Final (30%)
**Consultoría: Rediseño de Arquitectura de Información para la Cámara de Comercio de Alajuela (CCA)**  
**Curso:** EIF-511 Arquitectura de Información · II Ciclo 2026 · Escuela de Informática · Universidad Nacional  
**Equipo Consultor:** Marcos Román Valverde (Coordinador General), Emanuel Soto, Allan Arce  
**Docente:** MSc. Cynthia Bolaños Espinoza  

---

## 1. Propósito de Esta Carpeta de Drive

Esta carpeta contiene la **estructura maestra organizada, sincronizada y actualizada** para el desarrollo y entrega final del Proyecto Integrador. 

Cada integrante del equipo dispone de una subcarpeta personal con sus enunciados oficiales, insumos técnicos listos (tokens de diseño, datasets, especificaciones de pruebas, figuras académicas) y guías paso a paso para completar sus capítulos asignados y diapositivas de la presentación final.

---

## 2. Índice y Contenido de Carpetas

### `00_Avance_1_Base_Aprobada/`
* Contiene el documento oficial aprobado del **Avance 1 (Nota obtenida: 13.5 / 15.0 - 90%)**.
* `FEEDBACK_Y_PUNTOS_A_RECUPERAR.txt`: Diagnóstico de las dos brechas a subsanar para alcanzar el 100% (+1.5 pts):
  1. *Validación empírica con N=18 usuarios reales y dispersión natural (Capítulo 6 - Marcos Román).*
  2. *Evidencia visual en alta resolución de wireframes y prototipo Figma (Capítulo 7 - Emanuel Soto).*

### `01_Emanuel_Soto/`
* **Consultor Especialista en Diseño de Interfaz (UI), Headless CMS y CJM.**
* `INSTRUCCIONES_ACTUALIZADAS_EMANUEL_SOTO.md`: Guía paso a paso con los lineamientos del rediseño en Rojo Carmín (`#991B1B`), Negro Grafito (`#09090B`) y estilo táctil Claymorphic.
* `anexos_y_capturas/`:
  - `design_tokens_cca.tokens.json`: Tokens semánticos listos para importar en Figma con *Tokens Studio*.
  - `customer_journey_map_matrix.json`: Matriz de arquetipos de Don Carlos y Valeria Brenes para Miro.
* `capitulos_redactados/`: Plantillas para la redacción de los **Capítulos 7, 10 y 11**.
* `presentacion_ppt/`: Espacio para sus 4 diapositivas de la defensa (20 minutos).

### `02_Allan_Arce/`
* **Consultor Especialista en Usabilidad (Maze & Clarity), Búsqueda Algolia y Medios de Pago.**
* `INSTRUCCIONES_ACTUALIZADAS_ALLAN_ARCE.md`: Guía de ejecución con selectores semánticos listos en el DOM.
* `anexos_y_capturas/`:
  - `maze_test_specification.json`: Especificación de las 2 misiones de usabilidad para correr en Maze.co.
  - `cuestionario_sus_10_preguntas.md`: Batería de preguntas estandarizadas para el cálculo del SUS Score (48.5 -> 89.2).
  - `cca_merchants_dataset.json`: Dataset normalizado de comercios para el índice de Algolia.
* `capitulos_redactados/`: Plantillas para la redacción de los **Capítulos 8, 9 y 13**.
* `presentacion_ppt/`: Espacio para sus 4 diapositivas de la defensa (20 minutos).

### `03_Marcos_Roman/`
* **Coordinador General · Arquitecto de Información Líder · Integrador Maestro.**
* `INSTRUCCIONES_ACTUALIZADAS_MARCOS_ROMAN.md`: Guía de ejecución de OptimalSort N=18, asistente RAG en Python y compilación maestra.
* `anexos_y_capturas/`:
  - `figura_matriz_similitud_optimalsort.png`: Matriz de co-ocurrencia con N=18 usuarios.
  - `figura_dendrograma_conglomerados.png`: Agrupamientos jerárquicos.
  - `figura_arbol_jerarquico_validado.png`: Taxonomía validada con accesos polijerárquicos.
* `capitulos_redactados/`: Capítulos institucionales y analíticos (**Capítulos 0 al 6, 12, 14 y 15**).
* `presentacion_ppt/`: Diapositivas de apertura, diagnóstico y conclusiones de consultoría.

---

## 3. Hoja de Ruta para la Entrega y Compilación

1. **Redacción Individual:** Cada compañero redacta sus capítulos en su subcarpeta `capitulos_redactados/`.
2. **Generación de Figuras:** Colocar las capturas requeridas (PNG alta resolución) en `anexos_y_capturas/`.
3. **Compilación Centralizada:** Una vez subidos los capítulos, Marcos Román ejecuta el script automatizado en Python (`compilar_documento_final.py`) para fusionar todo en el documento formal definitivo de Word (.docx) y PDF (.pdf) cumpliendo con la normativa APA 7 y los estándares de la Universidad Nacional.

*¡El entorno está 100% listo para sincronizar con Google Drive y arrancar de inmediato!*
