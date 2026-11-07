# Guía Maestra de Insumos y Entregables del Equipo Consultor CCA

**Proyecto Integrador (30%) · Consultoría Cámara de Comercio de Alajuela (CCA)**  
**Curso:** EIF-511 Arquitectura de Información · Universidad Nacional de Costa Rica (UNA)  
**Coordinador General:** Marcos Román Valverde  
**Consultores:** Emanuel Soto, Allan Arce  
**Fecha de Actualización:** Noviembre 2026

---

## 1. Resumen Ejecutivo del Estado del Proyecto ("Turnkey")

Tras la reingeniería integral de Arquitectura de Información basada en los hallazgos empíricos de **OptimalSort & Treejack (N=18)**, la plataforma web del proyecto ha sido consolidada bajo los siguientes estándares inviolables:

1. **Identidad Visual Oficial Restaurada:** Paleta Institucional en **Rojo Carmín (`#991B1B` / `#B91C1C`)** y **Negro Grafito (`#09090B`)**, erradicando los tonos azules genéricos ("AI slop") y preservando el 80% de fondos limpios en blanco (`#FFFFFF`) y pizarra suave (`#F8FAFC`).
2. **Estilo Táctil Claymorphic ("Claymorph"):** Tarjetas con elevación sutil, bisel interior reflectivo (`inset 0 2px 4px rgba(255, 255, 255, 0.95)`), esquinas redondeadas (`rounded-2xl`) y retroalimentación táctil (`active:scale-[0.98]`).
3. **Rescate del Alcance del Sitio Original:**
   - Reactivación funcional de la **Bolsa de Empleo Cantonal (`#empleo`)** que en el sitio anterior (`/oferentes/`) mostraba error de contenido vacío.
   - Ventanilla Digital de **Trámites y Guía de Patente Municipal de Alajuela (`#tramites`)**, rescatando el repositorio huérfano de `/documentos/`.
   - **Centro de Arbitraje y Mediación Mercantil**, eje neurálgico gremial desde la fundación en 1983.
   - **Directorio Comercial con Sello CCA y ROI de Convenios**, eliminando los 4 clics ciegos anteriores.
4. **Polijerarquía Validada:** 4 accesos cruzados implementados (enlace de patentes en checkout, retorno de convenios en directorio y membresías, validación SINPE asistida por WhatsApp y puente directorio-empleo).

---

## 2. Hoja de Ruta para Emanuel Soto (Figma, Strapi y Miro)

### Entregable 1: Figma Wireframes de Alta Fidelidad (Capítulo 7)

- **Tokens de Diseño Actualizados:** Archivo local [`tools/04_figma_figjam/design_tokens_cca.tokens.json`](file:///c:/Users/marco/OneDrive/Desktop/arqui-2026-proyecto-final/tools/04_figma_figjam/design_tokens_cca.tokens.json).
  - Importar directamente con el plugin **"Tokens Studio for Figma"**.
  - Vincular `brand-primary` (`#991B1B`), `brand-graphite` (`#09090B`) y las sombras de elevación `clay_card` y `clay_button`.
- **Capturas para el Informe Escrito (Capítulo 7):**
  1. _Homepage Canónica:_ Header unificado, Hero con buscador rápido y 4 accesos destacados.
  2. _Directorio Facetado:_ Barra de búsqueda predictiva, filtros por cantón/sector y tarjetas de comercio con ROI.
  3. _Bolsa de Empleo Cantonal:_ Listado de vacantes de El Coyol y modal de postulación digital rápida.
  4. _Wizard de Afiliación SINPE:_ Flujo de 3 pasos con cálculo de cuota deducible (Ley 7092) y comprobante digital.
- **Lienzo Figma Oficial:** [Prototipo UX/UI CCA en Figma](https://www.figma.com/design/h1cwPhkwAOTnDL0Hp3Vqg8/Prototipo-UX-UI---C%C3%A1mara-de-Comercio-de-Alajuela?node-id=20-297&t=32u9KsQuGYp766H5-0).

### Entregable 2: Strapi Headless CMS (Capítulo 10)

- **Esquemas JSON de Contenido:** Ubicados en `tools/07_strapi_headless_cms/schemas/`:
  - `merchant.json`: Nombre, sector, cantón, distrito, teléfono, whatsapp, verified, convenio, ahorroEstimado.
  - `job-vacancy.json`: Puesto, empresa, tipo, rango salarial, requisitos y categoría ocupacional.
  - `municipal-procedure.json`: Patente comercial, requisitos de salud, uso de suelo e INS.
- **Script de Carga Masiva:** Ejecutar `node tools/07_strapi_headless_cms/seed_strapi.js` para poblar la base de datos de Strapi con los comercios auditados.

### Entregable 3: Customer Journey Map en Miro (Capítulo 11)

- **Matriz de Interacción:** Ubicada en `tools/08_miro_cjm/customer_journey_map_matrix.json`.
- **Arquetipos Modelados:**
  - _Don Carlos Alvarado (52 años, Comerciante Tradicional):_ Fricción previa (desconfianza en pasarelas desatendidas) -> Solución (botón asistido de WhatsApp y recibo oficial deducible).
  - _Licda. Valeria Brenes (29 años, Emprendedora Digital):_ Fricción previa (PDF manual para imprimir) -> Solución (Wizard digital en 3 minutos con SINPE).

---

## 3. Hoja de Ruta para Allan Arce (Maze, Algolia y SINPE)

### Entregable 1: Pruebas de Usabilidad en Maze y Microsoft Clarity (Capítulo 8)

- **Especificación de Tareas:** Archivo `tools/05_maze_y_clarity/maze_test_specification.json`.
- **Misiones Configuradas para Correr en Maze:**
  - _Misión 1 (Afiliación Digital):_ Desde `#afiliacion`, seleccionar Plan Pyme (`#wizard-plan-regular`), ingresar datos, transferir por SINPE y confirmar comprobante.
  - _Misión 2 (Bolsa de Empleo):_ Desde `#empleo`, filtrar por "Administración" y postularse al puesto de Asistente Contable.
- **Selectores Semánticos Listos en Código:**
  - `#header-affiliate-cta`, `#directorio-search-input`, `#directorio-filter-canton`, `#wizard-step1-submit`, `#wizard-input-comprobante`, `#wizard-step2-submit`.
- **Cuestionario SUS:** 10 preguntas estandarizadas en `tools/05_maze_y_clarity/cuestionario_sus_10_preguntas.md`.
  - Meta de validación: Incrementar el SUS Score de 48.5 (sitio anterior) a **89.2 (Excelente / Grado A)**.

### Entregable 2: Motor de Búsqueda Instantánea con Algolia (Capítulo 9)

- **Dataset Normalizado:** `tools/06_algolia_search/cca_merchants_dataset.json`.
- **Script de Indexación:** `tools/06_algolia_search/index_algolia.js`.
  - Atributos indexados: `name`, `sector`, `canton`, `district`, `keywords`, `benefits`.
  - Configuración de tolerancia a errores tipográficos (_typo-tolerance_) para términos alajuelenses (_ferreteria, coyol, patente, tributario_).

### Entregable 3: Arquitectura Transaccional SINPE Móvil & BAC (Capítulo 13)

- **Validador de Teléfonos y Comprobantes:** `tools/10_ecommerce_pagos/sinpe_movil_validator.js`.
- **Simulador de Pasarela BAC Compra-Click:** `tools/10_ecommerce_pagos/bac_compra_click_gateway.js`.
- **Reglas de Auditoría:** Verificación de formato de 8 dígitos costarricense (+506), prevención de comprobantes duplicados (_anti-replay attack_) y cálculo automático de exención/deducibilidad bajo el Artículo 8 de la Ley 7092.

---

## 4. Hoja de Ruta para Marcos Román Valverde (Coordinación y Documento)

### Entregables a Cargo:

1. **Validación Empírica Card Sorting (N=18) & Treejack:** Capítulo 6 formalizado con tablas de co-ocurrencia y justificación científica de polijerarquía.
2. **Asistente Virtual RAG con IA:** Script funcional `tools/09_ia_generativa_rag/rag_asistente_cca.py` indexando `cca_corpus_institucional.txt`.
3. **Consolidación Maestra de Capítulos:**
   - Auditoría de los 16 archivos Markdown en `docs/trabajo-escrito-final/documento/`.
   - Ejecución del compilador automatizado en Python:
     ```powershell
     python docs/trabajo-escrito-final/compilador/compilar_documento_final.py
     ```
   - Generación de los entregables impresos:
     - `docs/trabajo-escrito-final/output/Reporte_Final_Consultoria_CCA_UNA.docx`
     - `docs/trabajo-escrito-final/output/Reporte_Final_Consultoria_CCA_UNA.pdf`
4. **Presentación Ejecutiva PPT:** Diapositivas finales del proyecto articulando los 14 capítulos de consultoría.

---

## 5. Matriz de Comprobación y Calidad (Checklist 100%)

| Módulo / Requisito                  |  Estado   | Evidencia en el Código / Documentación                                            |
| :---------------------------------- | :-------: | :-------------------------------------------------------------------------------- |
| **Paleta Oficial Roja y Negra**     | Concluido | Carmín `#991B1B`, Grafito `#09090B`, cero azul genérico, 80% fondo blanco.        |
| **Estilo Claymorphic Táctil**       | Concluido | Clases `.clay-card`, `.clay-button-primary`, sombras táctiles en `globals.css`.   |
| **Bolsa de Empleo Cantonal**        | Concluido | Componente `EmploymentExchange.tsx` con vacantes de El Coyol y modal de CV.       |
| **Trámites y Guía de Patentes**     | Concluido | Ventanilla interactiva en `ServicesPillars.tsx` y descarga de checklist PDF.      |
| **Directorio Comercial con ROI**    | Concluido | Filtros facetados por cantón/sector, botones directos a WhatsApp e insignias CCA. |
| **Wizard SINPE + Soporte WhatsApp** | Concluido | 3 pasos, deducción Ley 7092, comprobante anti-replay y opción de chat asistido.   |
| **Tokens de Diseño para Figma**     | Concluido | Archivo `design_tokens_cca.tokens.json` con tokens semánticos y de elevación.     |
| **Compilación Exitosa Next.js**     | Concluido | `npm run build` ejecutado con éxito sin errores de TypeScript ni lint.            |

_¡Toda la base técnica, visual y metodológica ha sido entregada para que el equipo logre la calificación meta de 15.0 / 15.0 (100%) en la Entrega Final!_
