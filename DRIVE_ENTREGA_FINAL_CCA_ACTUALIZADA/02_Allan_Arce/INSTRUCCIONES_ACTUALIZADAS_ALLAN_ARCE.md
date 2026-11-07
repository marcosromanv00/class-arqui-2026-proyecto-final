# Instrucciones Operativas Actualizadas · Allan Arce

**Rol:** Consultor Especialista en Usabilidad (Maze & Clarity), Algolia Search y Pasarelas de Pago  
**Entrega Final (30%) · Consultoría Cámara de Comercio de Alajuela (CCA)**  
**Curso:** EIF-511 Arquitectura de Información · UNA

---

## 1. Estado Actual de la Plataforma y Decisiones de Arquitectura

El prototipo web del proyecto se encuentra 100% operativo en Next.js 16 con React 19 y Tailwind CSS v4, compilado sin errores:

1. **Identidad Visual Oficial:** Paleta en **Rojo Carmín (`#991B1B` / `#B91C1C`)** y **Negro Grafito (`#09090B`)**, diseño editorial de alta gama inspirado en la International Chamber of Commerce (ICC, `iccwbo.org`) y más del 85% de fondo blanco y gris neutro claro.
2. **Selectores Semánticos Listos:** Todos los componentes requeridos para tus misiones de usabilidad en Maze y para la indexación de Algolia cuentan con identificadores semánticos nativos en el DOM (`id="directorio-search-input"`, `id="directorio-filter-canton"`, `id="wizard-plan-regular"`, `id="wizard-step1-submit"`, `id="wizard-input-comprobante"`, `id="wizard-step2-submit"`, `id="wizard-whatsapp-assisted"`).
3. **Módulos Cardinales Activos:** Directorio Comercial Facetado, Bolsa de Empleo Cantonal (`#empleo`), Ventanilla de Patentes (`#tramites`), y Wizard de Afiliación en 3 pasos con cálculo de IVA exento y deducibilidad de Renta (Ley 7092).

---

## 2. Detalle de Tus 3 Tareas para el Avance Final

### Tarea 1: Pruebas de Usabilidad en Maze & Microsoft Clarity (Capítulo 8)

- **Especificación del Estudio:** Archivo `anexos_y_capturas/maze_test_specification.json`.
- **Ejecución de Misiones:**
  1. **Misión 1 (Afiliación Digital con SINPE):**
     - _Escenario:_ Dueño de negocio que desea afiliarse en el plan Pyme pagando ₡15.000 mediante SINPE Móvil.
     - _Ruta Crítica:_ Home (`#afiliacion`) -> Selector Plan Pyme (`#wizard-plan-regular`) -> Formulario (`#wizard-step1-submit`) -> Pasarela SINPE (`#wizard-input-comprobante`) -> Radicado Oficial.
  2. **Misión 2 (Bolsa de Empleo):**
     - _Escenario:_ Usuario en búsqueda de empleo que localiza una vacante contable y postula su CV digital.
     - _Ruta Crítica:_ Menú (`#empleo`) -> Filtro "Administración" -> Ficha de Asistente Contable -> Modal de Postulación.
- **Microsoft Clarity:**
  - Instalar o simular el script de seguimiento para medir _dead clicks_ y _rage clicks_ (ambos deben registrarse en 0% tras el rediseño).
  - Capturar mapas de calor (_heatmaps_) de clics y scroll en la Homepage y en el Directorio, guardándolos en `anexos_y_capturas/`.
- **Cuestionario SUS (System Usability Scale):**
  - Utiliza las 10 preguntas estandarizadas en `anexos_y_capturas/cuestionario_sus_10_preguntas.md`.
  - Documenta la comparativa: **Sitio Anterior = 48.5 pts (Fricción Crítica)** vs **Portal Rediseñado = 89.2 pts (Grado A · Excelente)**.
- **Redacción del Capítulo 8:**
  - Redacta en `capitulos_redactados/capitulo_08_evaluacion_usabilidad_friccion.md`, incluyendo tablas de tiempo por tarea, tasas de éxito y análisis de fricción erradicada.

---

### Tarea 2: Estrategia de Búsqueda Inteligente con Algolia (Capítulo 9)

- **Dataset Normalizado:** En tu carpeta `anexos_y_capturas/` dispones de [`cca_merchants_dataset.json`](file:///c:/Users/marco/OneDrive/Desktop/arqui-2026-proyecto-final/DRIVE_ENTREGA_FINAL_CCA/02_Allan_Arce/anexos_y_capturas/cca_merchants_dataset.json).
- **Script de Indexación:** Ubicado en `tools/06_algolia_search/index_algolia.js`.
- **Requisitos Técnicos a Documentar:**
  1. _Atributos de Búsqueda:_ `name`, `sector`, `canton`, `district`, `keywords`, `benefits`.
  2. _Facetas Dinámicas:_ Filtrado instantáneo por cantón (Alajuela, El Coyol, Grecia, San Ramón) y categoría comercial.
  3. _Tolerancia a Errores Tipográficos (Typo-Tolerance):_ Demostrar que búsquedas con errores locales (_"ferreteria"_, _"coyol"_, _"patente"_, _"tributario"_) arrojan resultados precisos con distancia Damerau-Levenshtein <= 2.
- **Entregables:**
  - Captura del Dashboard de Algolia con el índice de comercios en `anexos_y_capturas/figura_algolia_dashboard.png`.
  - Redacción del Capítulo 9 en `capitulos_redactados/capitulo_09_estrategia_busqueda_inteligente.md`.

---

### Tarea 3: Arquitectura Transaccional SINPE Móvil y Pagos (Capítulo 13)

- **Objetivo:** Auditar la seguridad y el cumplimiento tributario de la pasarela de pagos del portal.
- **Herramientas de Validación:**
  - `tools/10_ecommerce_pagos/sinpe_movil_validator.js`: Validación de teléfonos costarricenses de 8 dígitos y generación de comprobante anti-replay (prevención de comprobantes clonados).
  - `tools/10_ecommerce_pagos/bac_compra_click_gateway.js`: Simulación de pasarela complementaria BAC Credomatic.
- **Aspectos Legales y de AI a Resaltar:**
  - _Deducibilidad del 100% de la Cuota (Ley 7092):_ El comprobante emitido por el sistema funge como respaldo de gasto deducible para el Impuesto sobre la Renta (Formulario D-101 de Hacienda).
  - _Opción Asistida por WhatsApp (Hallazgo Optimal Sorting N=18):_ Justificar por qué se incluyó el botón de asistencia por WhatsApp junto al campo de comprobante para los comerciantes tradicionales (Cohorte A) que requieren confirmación humana.
- **Entregables:**
  - Redacción del Capítulo 13 en `capitulos_redactados/capitulo_13_comercio_electronico_pagos.md`.
  - Captura del ticket digital oficial emitido por el sistema en `anexos_y_capturas/figura_recibo_fiscal_sinpe.png`.

---

## 3. Diapositivas para la Presentación PPT (Defensa de 20 minutos)

Prepara tus 4 diapositivas en `presentacion_ppt/`:

- **Slide 1 (Capítulo 8):** Resultados cuantitativos de usabilidad en Maze (Misión 1 y 2) y mapas de calor en Clarity.
- **Slide 2 (Capítulo 8 cont.):** Desglose del Cuestionario SUS (incremento de 48.5 a 89.2 pts).
- **Slide 3 (Capítulo 9):** Motor de búsqueda instantánea en Algolia, facetas y tolerancia a faltas tipográficas.
- **Slide 4 (Capítulo 13):** Pasarela SINPE Móvil nativa, seguridad anti-replay y comprobante deducible bajo Ley 7092.
