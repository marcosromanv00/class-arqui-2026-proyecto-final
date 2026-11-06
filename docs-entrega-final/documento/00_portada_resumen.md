# UNIVERSIDAD NACIONAL DE COSTA RICA
## FACULTAD DE CIENCIAS EXACTAS Y NATURALES
### ESCUELA DE INFORMÁTICA
**Licenciatura en Informática con Énfasis en Sistemas Web**  
**Curso:** Arquitectura de Información (EIF-511) — II Ciclo Lectivo 2026  
**Docente:** MSc. Cynthia Bolaños Espinoza  

---

# DISEÑO Y REESTRUCTURACIÓN INTEGRAL DE LA ARQUITECTURA DE INFORMACIÓN PARA EL PORTAL DIGITAL DE LA CÁMARA DE COMERCIO DE ALAJUELA

## Entregable 2: Proyecto Integrador Final (30%)
### Consolidado Metodológico, Tecnológico y Resultados de Consultoría Aplicada (Semanas 1 a 14)

**Equipo Consultor / Estudiantes:**  
1. Marcos Román Valverde (Coordinador) — Cédula: 305290253 — Correo: marcosromanv00@gmail.com  
2. Emanuel Soto  
3. Allan Arce  

*Heredia, Costa Rica — Octubre, 2026*

---

## Resumen Ejecutivo

Este documento consolida el Proyecto Integrador Final (30%) de la consultoría en Arquitectura de Información (AI) para la Cámara de Comercio, Industria, Turismo y Servicios de Alajuela (CCA). La Cámara, fundada en 1983, representa el motor gremial del cantón central y de los parques industriales de la provincia; no obstante, su presencia digital anterior padecía de patologías estructurales severas: coexistencia desarticulada de dos páginas de inicio (`/` y `/home`), enlaces rotos en la bolsa de empleo (`/oferentes/`), noticias desiertas, fuga de tráfico hacia un dominio secundario abandonado (`camara-alajuela.com` con error 404) y un directorio empresarial que obligaba al usuario a realizar entre tres y cuatro clics ciegos sin posibilidad de búsqueda facetada.

Para solucionar esta problemática, el equipo consultor ejecutó un proceso progresivo y científico articulando las diez metodologías y herramientas evaluadas a lo largo del curso EIF-511:
1. **Diagnóstico Heurístico & Inventario:** Auditoría forense del sitio WordPress previo y unificación canónica 301.
2. **Sistemas de Organización (FlowMapp):** Modelado del sitemap maestro con 26 nodos informativos en 3 niveles de profundidad y 5 ramas principales.
3. **Organización Jerárquica y Etiquetado (Octopus.do):** Definición modular de bloques de contenido en español y depuración de plantillas residuales en inglés.
4. **Validación Empírica de la Taxonomía (OptimalSort + Treejack de Optimal Workshop):** Pruebas de Card Sorting Abierto que validaron los núcleos estables de contenido y revelaron la categoría emergente utilitaria "Footer"; acompañadas de pruebas de Tree Testing que alcanzaron un 92% de éxito directo en tareas críticas.
5. **Composición de Contenido & Atomic Design (Figma + FigJam):** Clasificación canónica de Rosenfeld en páginas de navegación, funcionales y de contenido, especificando wireframes de alta fidelidad y prototipos navegables.
6. **Evaluación de Usabilidad y Fricción (Maze + Microsoft Clarity):** Detección y erradicación de clics de frustración (*rage clicks* y *dead clicks*), elevando el System Usability Scale (SUS) proyectado de 48 a 89 puntos.
7. **Sistemas de Búsqueda Inteligente (Algolia + Azure AI Search):** Configuración de un motor de búsqueda instantáneo con tolerancia a errores tipográficos, mapeo de sinónimos comerciales costarricenses y filtrado facetado por sector y distrito.
8. **Metadatos y Modelado de Contenido (Strapi + Schema.org):** Arquitectura Headless CMS desacoplada y marcado JSON-LD estructurado para SEO local y accesibilidad universal.
9. **Customer Journey Map y Contenido Social (Miro):** Mapeo de la experiencia de comerciantes y emprendedores, incorporando distintivos de afiliados verificados y mecanismos de recomendación con moderación gremial anti-spam.
10. **Inteligencia Artificial Generativa & E-Commerce Gremial:** Diseño del Asistente Virtual Institucional ("Asistente CCA") basado en recuperación contextual (RAG) para asistir en normativas de patentes municipales y trámites de afiliación, junto con una pasarela de pago transaccional en línea (SINPE Móvil y BAC Credomatic).

Como complemento práctico, se construyó el prototipo funcional interactivo del portal (revamp) validado mediante una suite de 15 pruebas unitarias automatizadas y pipeline de CI/CD, demostrando cómo una arquitectura de información científicamente diseñada transforma una plataforma en desuso en un canal de alta conversión gremial y valor público.
