# 14. Conclusiones de Consultoría y Hoja de Ruta Tecnológica

## 14.1 Conclusiones del Proceso de Consultoría

El proceso de reingeniería integral de la Arquitectura de Información para el portal web de la Cámara de Comercio de Alajuela (CCA) demostró que la AI no es un mero ejercicio estético o decorativo, sino una disciplina científica de ingeniería de interacción orientada a resolver las asimetrías de información entre las instituciones y la ciudadanía. De acuerdo con los principios de diseño centrado en el ser humano estandarizados en la norma **ISO 9241-210** (ISO, 2022), la adecuación de un sistema interactivo depende de la comprensión profunda de los usuarios, sus tareas y sus entornos operativos reales.

A partir de la ejecución metodológica a lo largo de las 14 semanas del curso EIF-511, el equipo consultor arriba a las siguientes conclusiones cardinales:

1. **La contrastación empírica transforma supuestos en certezas:** La ampliación del estudio de Card Sorting en Optimal Workshop de una muestra simulada preliminar (N=2) a una muestra estratificada de **N=18 comerciantes y profesionales reales de Alajuela** evidenció que los modelos mentales no son homogéneos. Reveló la necesidad imperiosa de adoptar **polijerarquía** en trámites municipales, bolsa de empleo y convenios, evitando que un tercio de los usuarios quedara desorientado en un árbol monojerárquico rígido.
2. **La encontrabilidad como pilar de la propuesta de valor gremial:** Conforme postula Morville (2022) en su teoría de la encontrabilidad ambiental (*Ambient Findability*), un servicio digital que no puede ser localizado de forma intuitiva simplemente no existe para el usuario. La erradicación de los 4 clics ciegos anteriores y la implementación de búsqueda facetada en Algolia redujo el tiempo de localización de un comercio de más de 2 minutos a menos de 19 segundos.
3. **El poder del desacoplamiento arquitectónico:** La separación de la capa de datos en un Headless CMS (Strapi) y la interfaz en Next.js garantiza a la Cámara una plataforma moderna, escalable, inmune a ataques masivos sobre WordPress y preparada para distribuir contenido multicanal.
4. **La recuperación de la identidad y la eliminación del "AI Slop":** La restauración de la paleta oficial en Rojo Carmín (`#991B1B`) y Negro Grafito (`#09090B`), junto con el estándar editorial inspirado en la International Chamber of Commerce (ICC), erradicó los elementos genéricos predeterminados para proyectar seriedad y arraigo en la historia comercial alajuelense.

---

## 14.2 Hoja de Ruta Tecnológica Recomendada (2026 - 2027)

Para consolidar la transformación digital de la Cámara, se recomienda ejecutar las siguientes fases progresivas:

#### Tabla 14.1. *Cronograma y hoja de ruta tecnológica para la evolución del portal de la CCA*

| Fase de Implementación | Horizonte Temporal | Hitos Técnicos y Entregables | Impacto en la Experiencia Gremial |
| :--- | :--- | :--- | :--- |
| **Fase 1: Puesta en Producción** | Trimestre I - 2027 | Despliegue del portal Next.js en Vercel, migración de la base de datos de comercios a Strapi Cloud e indexación final en Algolia. | Reducción inmediata de quejas ciudadanas y reactivación de la Bolsa de Empleo. |
| **Fase 2: Autogestión Empresarial** | Trimestre II - 2027 | Activación del portal de autoservicio para agremiados al día, permitiendo editar su catálogo, ofertas laborales y promociones. | Autonomía operativa y disminución de carga administrativa en la sede física. |
| **Fase 3: Asistente RAG Omnicanal** | Trimestre III - 2027 | Integración del motor RAG de IA desarrollado en Python con la API oficial de WhatsApp Business (Meta). | Atención automatizada 24/7 de consultas legales, cuotas y patentes municipales. |
| **Fase 4: Observatorio Económico** | Trimestre IV - 2027 | Tablero interactivo de datos provinciales en Power BI embebido para la toma de decisiones del sector comercial. | Posicionamiento de la Cámara como líder técnico y estadístico en Alajuela. |

---

---

## 14.5 Referencias Bibliográficas del Capítulo (Normativa APA 7 — Literatura 2022–2026)

* International Organization for Standardization [ISO]. (2022). *ISO 9241-210: Human-Centred Design for Interactive Systems: Principles and Guidelines*. Geneva: ISO. https://www.iso.org/standard/77520.html
* Morville, P. (2022). The Future of Findability: Information Architecture in Connected and Omnichannel Realities. *Journal of Information Architecture*, 6(2), 1-18.
* Norman, D. A. (2023). *Design for a Better World: Meaningful, Sustainable, Humanity-Centered*. MIT Press. https://doi.org/10.7551/mitpress/14995.001.0001
