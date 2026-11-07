# Instrucciones Operativas Actualizadas · Emanuel Soto
**Rol:** Consultor Especialista en Diseño de Interfaz (UI), Headless CMS y Experiencia de Usuario  
**Entrega Final (30%) · Consultoría Cámara de Comercio de Alajuela (CCA)**  
**Curso:** EIF-511 Arquitectura de Información · UNA  

---

## 1. Estado Actual de la Plataforma y Decisiones de Arquitectura

El prototipo del proyecto ha completado su fase de reingeniería de Arquitectura de Información y cuenta con las siguientes características que deben reflejarse en tus entregables:
1. **Restauración de la Paleta Oficial:** Se eliminaron los acentos azules genéricos. La paleta institucional oficial es **Rojo Carmín (`#991B1B` / `#B91C1C`)** y **Negro Grafito (`#09090B`)**.
2. **Estilo Táctil Claymorphic ("Claymorph"):** Tarjetas blancas con bisel interior reflectivo (`inset 0 2px 4px rgba(255, 255, 255, 0.95)`), bordes suaves y elevación táctil. El 80% de los fondos son blancos (`#FFFFFF`) y pizarra tenue (`#F8FAFC`).
3. **Servicios Históricos Rescatados del Sitio Anterior:**
   - **Bolsa de Empleo Cantonal (`#empleo`):** Reactivación de la sección rota `/oferentes/` del WordPress anterior. Ahora incluye catálogo de vacantes activas en El Coyol y Alajuela Centro con modal de postulación digital.
   - **Trámites de Patentes y Arbitraje (`#tramites` y `#servicios`):** Rescate del repositorio huérfano de `/documentos/` con la guía de 5 pasos para abrir un negocio formal en Alajuela.
   - **Directorio Comercial:** Búsqueda facetada por distrito y sector con ROI de convenios y botón directo a WhatsApp.

---

## 2. Detalle de Tus 3 Tareas para el Avance Final

### Tarea 1: Prototipo Figma de Alta Fidelidad & Wireframes Atómicos (Capítulo 7)
* **Tokens de Diseño:** En tu carpeta `anexos_y_capturas/` tienes el archivo [`design_tokens_cca.tokens.json`](file:///c:/Users/marco/OneDrive/Desktop/arqui-2026-proyecto-final/DRIVE_ENTREGA_FINAL_CCA/01_Emanuel_Soto/anexos_y_capturas/design_tokens_cca.tokens.json).
  1. Abre el archivo de Figma: [Prototipo UX/UI CCA en Figma](https://www.figma.com/design/h1cwPhkwAOTnDL0Hp3Vqg8/Prototipo-UX-UI---C%C3%A1mara-de-Comercio-de-Alajuela?node-id=20-297&t=32u9KsQuGYp766H5-0).
  2. Ejecuta el plugin **"Tokens Studio for Figma"** e importa este archivo JSON. Los colores se actualizarán automáticamente a Rojo Carmín (`#991B1B`), Negro Grafito (`#09090B`) y sombras Claymorph.
* **Capturas Requeridas para Subsanar el Feedback de Avance 1 (-0.5 pts):**
  Exporta en alta resolución (PNG, 2x) las siguientes 4 pantallas y colócalas en tu carpeta `anexos_y_capturas/`:
  - `figura_wireframe_home_cca.png`: Homepage con Header único, Hero con buscador y destacados 4x1.
  - `figura_wireframe_directorio_cca.png`: Directorio con facetas por cantón/sector y tarjetas de comercio con convenio.
  - `figura_wireframe_empleo_cca.png`: Bolsa de Empleo con vacantes de El Coyol y modal de postulación de CV.
  - `figura_wireframe_afiliacion_sinpe.png`: Wizard de 3 pasos con cálculo de arancel deducible (Ley 7092) y pasarela SINPE.
* **Redacción del Capítulo 7:**
  - Redacta el capítulo en `capitulos_redactados/capitulo_07_composicion_contenido_wireframes.md`.
  - Explica la metodología de *Atomic Design* (Átomos, Moléculas, Organismos, Plantillas) y justifica el diseño Claymorphic conforme a Rosenfeld et al. (2015) y Nielsen.

---

### Tarea 2: Strapi Headless CMS y Modelado de Contenido (Capítulo 10)
* **Objetivo:** Demostrar cómo se desacopla la capa de contenido de la capa de presentación mediante un CMS headless.
* **Esquemas JSON de Contenido:**
  - En la carpeta de herramientas del proyecto (`tools/07_strapi_headless_cms/schemas/`) dispones de los modelos:
    - `merchant.json`: Nombre, sector, cantón, distrito, teléfono, whatsapp, convenio, ahorroEstimado.
    - `job-vacancy.json`: Puesto, empresa, tipo, rango salarial, requisitos y categoría.
    - `municipal-procedure.json`: Patente comercial, requisitos de salud, uso de suelo e INS.
* **Pasos de Ejecución:**
  1. Inicia tu instancia local de Strapi o revisa los esquemas JSON.
  2. Ejecuta el script de carga: `node tools/07_strapi_headless_cms/seed_strapi.js`.
  3. Toma 2 capturas de pantalla del panel de administración de Strapi (Content Manager) y del endpoint REST/GraphQL (`/api/merchants`).
  4. Redacta el Capítulo 10 en `capitulos_redactados/capitulo_10_metadatos_taxonomias_cms.md`, detallando el modelo de metadatos Schema.org JSON-LD y vocabularios controlados.

---

### Tarea 3: Customer Journey Map en Miro (Capítulo 11)
* **Objetivo:** Mapear la experiencia de usuario y los puntos de contacto (*touchpoints*) antes, durante y después del rediseño.
* **Insumo Base:** Archivo `anexos_y_capturas/customer_journey_map_matrix.json`.
* **Arquetipos a Ilustrar en Miro:**
  1. **Don Carlos Alvarado (52 años, Comerciante Tradicional de Alajuela Centro):**
     - *Etapas:* Descubrimiento -> Consulta de Convenios -> Afiliación con soporte WhatsApp -> Publicación de vacante en Bolsa de Empleo.
     - *Puntos de dolor resueltos:* Ya no tiene que trasladarse a la sede física a dejar un formulario en papel; ahora valida su pago SINPE por WhatsApp con asistencia personal.
  2. **Licda. Valeria Brenes (29 años, Emprendedora Digital de La Guácima):**
     - *Etapas:* Búsqueda en Google -> Exploración del Directorio -> Cálculo de ROI en Wizard -> Afiliación 100% digital en 3 minutos.
* **Entregables:**
  - Exporta el tablero de Miro en PNG de alta resolución a `anexos_y_capturas/figura_customer_journey_map_miro.png`.
  - Redacta el Capítulo 11 en `capitulos_redactados/capitulo_11_customer_journey_contenido_social.md`.

---

## 3. Diapositivas para la Presentación PPT (Defensa de 20 minutos)

Prepara tus 4 diapositivas en `presentacion_ppt/`:
- **Slide 1 (Capítulo 7):** Composición visual, tokens Rojo Carmín y wireframes interactivos en Figma.
- **Slide 2 (Capítulo 7 cont.):** Arquitectura Atómica y diseño responsive (Desktop 1440px vs Mobile 375px).
- **Slide 3 (Capítulo 10):** Content Modeling desacoplado en Strapi y distribución multicanal.
- **Slide 4 (Capítulo 11):** Customer Journey Map en Miro y erradicación de puntos de dolor gremiales.
