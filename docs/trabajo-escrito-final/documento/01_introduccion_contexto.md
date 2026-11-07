# 1. Introducción y Marco Teórico de la Arquitectura de Información

## 1.1 La Necesidad de una Arquitectura de Información Deliberada

La información en entornos digitales no adquiere valor por su simple abundancia, sino por la facilidad con la que las personas pueden encontrarla, comprenderla y convertirla en decisiones útiles. Cuando Richard Saul Wurman acuñó en 1975 el término *Information Architecture*, advirtió que el mayor reto de la sociedad tecnológica no sería generar más datos, sino estructurar la complejidad para evitar la sobrecarga cognitiva y la ansiedad informacional.

Cuatro décadas después, Rosenfeld, Morville y Arango (2015) consolidaron la definición moderna de la disciplina: el diseño estructural de entornos de información compartida que articula de manera interdependiente cuatro sistemas fundamentales:
1. **Sistemas de Organización:** Determinan cómo se agrupan y categorizan los contenidos (mediante esquemas exactos y ambiguos).
2. **Sistemas de Etiquetado:** Establecen la forma en que se nombran y representan los destinos y las acciones mediante un vocabulario comprensible.
3. **Sistemas de Navegación:** Proveen rutas y mecanismos visuales para que el usuario responda en todo momento a tres preguntas críticas: *¿Dónde estoy?*, *¿Qué hay aquí?* y *¿Adónde puedo ir?*.
4. **Sistemas de Búsqueda:** Permiten al usuario formular directamente su necesidad en palabras propias cuando la estructura exploratoria resulta insuficiente.

Si estos cuatro sistemas operan de forma improvisada, el sitio web se convierte en una barrera que expulsa a sus visitantes mediante altas tasas de rebote y desconfianza institucional. Por el contrario, una buena arquitectura de información pasa casi inadvertida: el usuario completa su objetivo de forma intuitiva, sin necesidad de adivinar la estructura interna ni los organigramas de la organización que diseñó la página.

## 1.2 El Contexto Académico y el Enfoque de Consultoría Profesional

El presente proyecto se desarrolló dentro del curso **EIF-511 Arquitectura de Información** del plan de Licenciatura en Informática con Énfasis en Sistemas Web de la Universidad Nacional de Costa Rica. Bajo la premisa pedagógica del aprendizaje basado en proyectos reales, el equipo asumió el rol de una empresa consultora externa contratada para diagnosticar, rediseñar y validar la presencia digital de la **Cámara de Comercio de Alajuela (CCA)**.

A diferencia de un ejercicio puramente estético o cosmético de rediseño web, la consultoría abordó el problema desde la raíz estructural:
* Analizó los modelos mentales y los hábitos de búsqueda de los comerciantes y ciudadanos alajuelenses.
* Aplicó herramientas científicas de la industria (FlowMapp, Octopus.do, Optimal Workshop, Figma, Maze, Microsoft Clarity, Algolia, Strapi y Miro).
* Conectó la teoría clásica con las demandas contemporáneas del desarrollo web moderno: arquitecturas desacopladas (JAMstack), modelos de lenguaje asistidos por RAG (Inteligencia Artificial Generativa) y estándares de accesibilidad universal WCAG 2.1 nivel AA.

## 1.3 Objetivos del Proyecto Integrador

### Objetivo General
Diseñar, justificar empíricamente y prototipar una propuesta integral de Arquitectura de Información para el portal digital de la Cámara de Comercio de Alajuela, transformando una plataforma rezagada en un ecosistema accesible, rápido y orientado a la conversión gremial y la visibilidad de los comercios locales.

### Objetivos Específicos
1. **Auditar y diagnosticar** las patologías de navegación, duplicidad de URLs y abandono de contenidos en la plataforma web preexistente de la Cámara.
2. **Estructurar un nuevo modelo taxonómico** en tres niveles de profundidad utilizando esquemas híbridos validados en herramientas especializadas de sitemaps (FlowMapp) y microarquitectura modular (Octopus.do).
3. **Someter la propuesta a validación empírica con usuarios** mediante estudios de Card Sorting abierto y Tree Testing en la suite Optimal Workshop.
4. **Componer visualmente las pantallas cardinales** bajo la metodología de Atomic Design en Figma, clasificándolas según las tipologías canónicas de Rosenfeld (navegación, funcional y contenido).
5. **Formular e implementar una estrategia de búsqueda inteligente y facetada** integrando tecnologías líderes en indexación y recuperación en milisegundos (Algolia Cloud y Azure AI Search) para optimizar el descubrimiento del directorio de afiliados y la bolsa de empleo.
6. **Definir esquemas de metadatos estructurados y vocabularios controlados** compatibles con CMS desacoplados (Strapi) y estándares Schema.org para maximizar el posicionamiento en motores de búsqueda.
7. **Integrar mecanismos de interacción social y asistencia contextual basada en Inteligencia Artificial (RAG)**, fundamentando las decisiones de diseño mediante un Customer Journey Map completo y evaluando críticamente los límites éticos y riesgos de sesgo.
8. **Diseñar la arquitectura transaccional de e-commerce** para la autogestión de afiliaciones y cobro recurrente de membresías mediante canales de pago locales (SINPE Móvil y BAC Credomatic).
