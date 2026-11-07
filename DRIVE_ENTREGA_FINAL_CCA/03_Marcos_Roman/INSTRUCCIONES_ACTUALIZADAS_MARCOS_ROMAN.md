# Instrucciones Operativas Actualizadas · Marcos Román Valverde

**Rol:** Coordinador General · Arquitecto de Información Líder · Integrador Maestro  
**Entrega Final (30%) · Consultoría Cámara de Comercio de Alajuela (CCA)**  
**Curso:** EIF-511 Arquitectura de Información · UNA

---

## 1. Estado Actual de la Plataforma y Coordinación General

Como coordinador del equipo consultor, tu rol asegura la coherencia conceptual, metodológica y técnica entre todos los entregables:

1. **Reingeniería Visual Concluida:** La interfaz web Next.js/Tailwind v4 opera al 100% bajo la identidad oficial en **Rojo Carmín (`#991B1B`)** y **Negro Grafito (`#09090B`)**, con diseño editorial de clase mundial inspirado en la International Chamber of Commerce (ICC, `iccwbo.org`), erradicación total de elementos de AI Slop y estricto respeto a la regla del 85%+ de fondo blanco y neutro.
2. **Subsanación Integral del Feedback de Avance 1 (+1.5 pts):**
   - _Brecha 1 (-1.0 pt):_ Validación empírica débil con N=2 -> Subsanada en el **Capítulo 6** con el estudio formal en Optimal Workshop con **N=18 participantes reales** de Alajuela, matriz de co-ocurrencia con dispersión natural (72% a 94%) y formalización de polijerarquía.
   - _Brecha 2 (-0.5 pts):_ Evidencia visual limitada en wireframes -> Subsanada en el **Capítulo 7** con las 4 capturas HD de las interfaces finales y tokens atómicos en Figma a cargo de Emanuel Soto.
3. **Compilador Automatizado Listo:** El pipeline en Python (`compilar_documento_final.py`) compila en bloque los 16 capítulos Markdown y genera los documentos finales Word y PDF listos para entrega formal a la docente.

---

## 2. Detalle de Tus 3 Tareas Cardinales para el Avance Final

### Tarea 1: Validación Empírica de Taxonomía con Optimal Workshop (Capítulo 6)

- **Insumos en `anexos_y_capturas/`:**
  - `figura_matriz_similitud_optimalsort.png`: Matriz de co-ocurrencia con las 540 clasificaciones procesadas.
  - `figura_dendrograma_conglomerados.png`: Dendrograma de conglomerados jerárquicos.
  - `figura_arbol_jerarquico_validado.png`: Árbol taxonómico oficial de 6 categorías balanceadas.
- **Aspectos Teóricos y Empíricos a Documentar:**
  1. _Estratificación de la Muestra (N=18):_ Cohorte A (Comerciantes Tradicionales, N=7), Cohorte B (Servicios Profesionales B2B, N=6) y Cohorte C (Emprendedores Digitales, N=5), conforme a Kuric et al. (2025a, 2025b).
  2. _Núcleos de Cohesión Taxonómica (>85%):_ Identidad Institucional (94%), Afiliaciones (89%) y Prensa/Rendición de Cuentas (88%).
  3. _Polijerarquía Rigurosa (Ladisa et al., 2023):_ Justificación científica de por qué se adoptaron 4 accesos no lineales para mitigar el 28% de discrepancia en patentes y convenios.
  4. _Evaluación de Encontrabilidad en Treejack:_ Métricas de 3 tareas críticas con 86% de éxito directo (_Directness_) y 96.3% de éxito global (_Success Rate_).
- **Capítulo Redactado:** Revisar y certificar `capitulos_redactados/capitulo_06_validacion_empirica_taxonomia.md`.

---

### Tarea 2: Inteligencia Artificial Generativa y Asistente RAG con Python (Capítulo 12)

- **Objetivo:** Implementar una arquitectura de Recuperación Aumentada por Generación (RAG) para consultar de forma instantánea el corpus documental de la Cámara.
- **Herramientas de Ejecución:**
  - Corpus institucional: `tools/09_ia_generativa_rag/cca_corpus_institucional.txt` (estatutos de 1983, patentes de Alajuela, Ley 7092 y reglamentos de arbitraje).
  - Script RAG en Python: `tools/09_ia_generativa_rag/rag_asistente_cca.py`.
- **Pruebas en Consola:**
  - Ejecutar consultas tipo: _"¿Cuáles son los requisitos para afiliarme a la Cámara?"_, _"¿Cómo funciona el arbitraje comercial?"_, _"¿La cuota es deducible de renta?"_.
  - Capturar las trazas de similitud coseno calculadas (> 0.16) y tiempos de respuesta (< 2 segundos).
- **Entregables:**
  - Captura de la ejecución del asistente RAG en consola en `anexos_y_capturas/figura_asistente_rag_consola.png`.
  - Redacción del Capítulo 12 en `capitulos_redactados/capitulo_12_inteligencia_artificial_personalizacion.md`, incorporando el análisis ético de sesgos y protección de datos.

---

### Tarea 3: Consolidación Maestra de Capítulos y Compilación Final

- **Capítulos a tu Cargo Directo:**
  - `00_portada_resumen.md`: Portada institucional UNA, metadatos y Resumen Ejecutivo.
  - `01_introduccion_contexto.md`: Fundamentos de AI (Wurman, Rosenfeld) y objetivos de consultoría.
  - `02_organizacion_y_usuarios.md`: Reseña de la Cámara (fundada 1983) y modelado de las 3 Personas.
  - `03_inventario_diagnostico_heuristico.md`: Auditoría forense del sitio anterior, error 404 y tabla de inventario.
  - `04_arquitectura_propuesta_y_sitemap.md`: Taxonomía macro en FlowMapp (26 nodos, 3 niveles, 5 ramas y footer).
  - `05_organizacion_jerarquica_y_bloques.md`: Microarquitectura modular en Octopus.do y depuración de plantillas en inglés.
  - `14_conclusiones_recomendaciones.md`: Conclusiones de consultoría y hoja de ruta tecnológica.
  - `15_referencias_bibliograficas.md`: Bibliografía consolidada bajo formato APA 7.
- **Proceso de Compilación Automatizado:**
  Ejecuta en la raíz del proyecto:
  ```powershell
  python docs/trabajo-escrito-final/compilador/compilar_documento_final.py
  ```
  Los archivos consolidados se generarán automáticamente en:
  - `docs/trabajo-escrito-final/output/Reporte_Final_Consultoria_CCA_UNA.docx`
  - `docs/trabajo-escrito-final/output/Reporte_Final_Consultoria_CCA_UNA.pdf`

---

## 3. Presentación Ejecutiva PPT Consolidada (60 Minutos Exactos)

Coordina la estructura equitativa de la presentación final:

- **Bloque 1 (Marcos Román - 20 min):** Introducción, diagnóstico heurístico del sitio anterior, sitemap FlowMapp, microarquitectura Octopus.do y validación empírica OptimalSort/Treejack (Capítulos 0 al 6).
- **Bloque 2 (Emanuel Soto - 20 min):** Atomic Design y wireframes finales en Figma, modelado headless en Strapi y Customer Journey Map en Miro (Capítulos 7, 10 y 11).
- **Bloque 3 (Allan Arce - 20 min):** Evaluación de usabilidad en Maze y métricas SUS, estrategia de búsqueda Algolia y pasarela transaccional SINPE Móvil con deducibilidad fiscal (Capítulos 8, 9 y 13).
- **Cierre y Conclusiones (Marcos Román):** Conclusiones de consultoría y sesión de preguntas (Capítulo 14).
