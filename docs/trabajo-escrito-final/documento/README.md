# Manual de Mantenimiento y Estructura del Documento Escrito
## Proyecto Integrador Final (30%) · Consultoría Cámara de Comercio de Alajuela (CCA)
**Curso:** EIF-511 Arquitectura de Información · Universidad Nacional de Costa Rica (UNA)

---

## 1. Estructura Modular del Reporte Ejecutivo (~30 Páginas)

El documento escrito está organizado en **12 bloques estructurales** (con 6 submódulos independientes para las herramientas del Avance 2 en `09_avance_2/`):

1. `01_portada.md` *(y generación formal en `compilar_documento_final.py`)*: Portada institucional UNA, autores y metadatos del curso.
2. `02_indice.md`: Índice general de contenidos sincronizado con las secciones del reporte.
3. `03_resumen_ejecutivo.md`: Síntesis ejecutiva del diagnóstico, subsanaciones, herramientas de Avance 2 y viabilidad a costo $0/mes.
4. `04_objetivos.md`: Objetivo general y 6 objetivos específicos medibles.
5. `05_dominio_y_objeto_estudio.md`: Contexto institucional de la CCA (1983) y matriz de los 3 arquetipos de usuario.
6. `06_enfoque_arquitectura_informacion.md`: Enfoque de consultoría en Arquitectura de Información y rol del prototipo como laboratorio empírico de validación.
7. `07_resumen_avance_1.md`: Diagnóstico heurístico del sitio previo, sitemap macro de 26 nodos en FlowMapp y bloques en Octopus.do.
8. `08_subsanaciones_avance_1_feedback.md`: Subsanación de observaciones docentes (+1.5 pts): estudio real en Optimal Workshop (N=18) con polijerarquía y las 4 pantallas de alta fidelidad en Figma con tokens de Atomic Design.
9. `09_avance_2/`: Seis herramientas evaluadas bajo la ficha metodológica de 7 puntos (*¿Qué es? / Costos y capa gratuita / Alternativas Open Code / Principios de AI / Demostración en nuestro dominio / Ajustes y justificación / Evidencias*):
   - `01_maze_y_clarity.md`: Pruebas de misiones en Maze, telemetría en Microsoft Clarity y cálculo de SUS (89.5 pts).
   - `02_algolia_search.md`: Indexación de los 171 asociados reales, 52 grupos de sinónimos, ajuste de atributos buscables y corrector ortográfico.
   - `03_strapi_cms.md`: Modelado headless en Strapi v5.61, listas cerradas de 16 cantones y vigencia automática de vacantes.
   - `04_miro_cjm.md`: Matriz de 25 cuadrantes del Customer Journey Map en Miro, curva de satisfacción (−2 a +2) y estrategia social omnicanal.
   - `05_asistente_rag_ia.md`: Asistente institucional RAG en Python con similitud coseno por bigramas sobre el corpus legal de la CCA.
   - `06_ecommerce_sinpe.md`: Pasarela transaccional de 3 pasos con SINPE Móvil (`8703-0792`), BAC Compra-Click, protección anti-replay y deducibilidad fiscal (Art. 8, Ley 7092).
10. `10_decisiones_finales.md`: Matriz de Decisiones de Arquitectura y Matriz de Viabilidad Financiera ($0.00/mes).
11. `11_conclusiones_recomendaciones.md`: Conclusiones estratégicas y Hoja de Ruta en 3 fases para la Junta Directiva.
12. `12_referencias_bibliograficas.md`: Bibliografía académica consolidada bajo normativa APA 7 con DOIs verificados.

> **Respaldo Histórico:** La versión extensa previa de 95 páginas se conserva íntegra en `docs/trabajo-escrito-final/historico_95_paginas/`.

---

## 2. Compilación Automatizada a Word (.docx) y PDF

Para compilar los capítulos en orden y generar los entregables oficiales en escala de grises:

```powershell
python docs/trabajo-escrito-final/compilador/compilar_documento_final.py --pdf
```

Los documentos generados se guardan en:
- `docs/trabajo-escrito-final/output/Reporte_Final_Consultoria_CCA_UNA.docx`
- `docs/trabajo-escrito-final/output/Reporte_Final_Consultoria_CCA_UNA.pdf`
