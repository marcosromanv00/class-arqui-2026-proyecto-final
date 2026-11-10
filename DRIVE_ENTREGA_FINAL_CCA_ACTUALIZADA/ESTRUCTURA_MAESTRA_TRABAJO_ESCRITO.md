# Estructura Maestra del Trabajo Escrito Final (100% / 30%)

**Consultoría: Rediseño Integral de Arquitectura de Información · Cámara de Comercio de Alajuela (CCA)**  
**Curso:** EIF-511 Arquitectura de Información · Universidad Nacional de Costa Rica  
**Documento Consolidado:** 16 Capítulos Independientes en Formato Markdown

---

## Índice Maestro de Capítulos y Responsables

|  Cap.  | Título del Capítulo                                          | Enfoque Teórico y Metodológico                                               | Responsable  | Herramienta Clave  |
| :----: | :----------------------------------------------------------- | :--------------------------------------------------------------------------- | :----------- | :----------------- |
| **00** | Portada Institucional y Resumen Ejecutivo                    | Estándar académico UNA, datos de consultoría y resumen ejecutivo.            | Marcos Román | Compilador Python  |
| **01** | Introducción y Contexto de la Arquitectura de Información    | Fundamentos teóricos (Wurman, Rosenfeld et al.) y objetivos del proyecto.    | Marcos Román | Word / Docs        |
| **02** | Descripción de la Organización y Modelado de Usuarios        | Reseña histórica de la CCA (1983) y modelado de 3 arquetipos (Personas).     | Marcos Román | User Personas      |
| **03** | Inventario del Contenido y Diagnóstico Heurístico Forense    | Auditoría del sitio anterior, error 404, homepages duales e inventario.      | Marcos Román | Matriz Heurística  |
| **04** | Arquitectura de Información Propuesta y Sitemap Macro        | Reducción de Hick, 26 nodos en 3 niveles, 5 ramas maestras y footer.         | Marcos Román | FlowMapp           |
| **05** | Organización Jerárquica y Microarquitectura de Contenido     | Modelado de bloques por página y depuración de plantillas en inglés.         | Marcos Román | Octopus.do         |
| **06** | Validación Empírica de la Taxonomía (OptimalSort & Treejack) | Estudio con N=18 usuarios reales, matriz de co-ocurrencia y polijerarquía.   | Marcos Román | Optimal Workshop   |
| **07** | Composición del Contenido y Wireframes de Alta Fidelidad     | Atomic Design, tokens Rojo Carmín/Grafito, Claymorph y 4 interfaces HD.      | Emanuel Soto | Figma / FigJam     |
| **08** | Evaluación de Usabilidad y Reducción de Fricción             | Pruebas de tareas (Misión 1 y 2), Clarity y cálculo de SUS Score (89.2 pts). | Allan Arce   | Maze.co / Clarity  |
| **09** | Estrategia de Búsqueda Inteligente y Relevancia              | Búsqueda predictiva con Algolia, facetas por cantón y typo-tolerance.        | Allan Arce   | Algolia Search     |
| **10** | Metadatos, Taxonomías y Content Modeling Headless            | Modelado desacoplado en Strapi, Schema.org JSON-LD y vocabularios.           | Emanuel Soto | Strapi CMS         |
| **11** | Customer Journey Map y Contenido Social Gremial              | Mapeo de experiencia de Don Carlos y Valeria Brenes en 5 etapas.             | Emanuel Soto | Miro               |
| **12** | Búsqueda Semántica No Estructurada y Asistente RAG           | Recuperación asociativa sobre corpus oficial CCA y consulta fiscal Ley 7092. | Marcos Román | Python / LangChain |
| **13** | Arquitectura de Información Transaccional y Medios de Pago   | Divulgación progresiva, SINPE Móvil nativo, certeza de estado y Ley 7092.    | Allan Arce   | JavaScript / SINPE |
| **14** | Conclusiones de Consultoría y Hoja de Ruta Tecnológica       | Justificación JAMstack vs Monolito, roadmap de 3 fases y recomendaciones.    | Marcos Román | Word / Docs        |
| **15** | Referencias Bibliográficas (Normativa APA 7)                 | Bibliografía académica completa con DOIs verificados.                        | Marcos Román | Zotero / APA 7     |

---

## Compilación Automatizada del Reporte

Una vez finalizada la redacción de los 16 capítulos en `docs/trabajo-escrito-final/documento/`, la compilación formal a Word y PDF se ejecuta mediante el comando:

```powershell
python docs/trabajo-escrito-final/compilador/compilar_documento_final.py
```

El pipeline generará los entregables listos para entrega:

- `docs/trabajo-escrito-final/output/Reporte_Final_Consultoria_CCA_UNA.docx`
- `docs/trabajo-escrito-final/output/Reporte_Final_Consultoria_CCA_UNA.pdf`
