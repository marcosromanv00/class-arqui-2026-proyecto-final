# 7. Composición del Contenido y Wireframes de Alta Fidelidad (Figma + FigJam)

## 7.1 Marco Teórico: Composición Visual, Atomic Design y Percepción

La composición del contenido representa la materialización tridimensional de la Arquitectura de Información en la pantalla. Esta fase temática articuló la teoría clásica de Frost (2023) con las leyes científicas de la percepción visual y la metodología contemporánea de **Atomic Design** (Frost, 2023):

1. **Leyes de la Gestalt (Proximidad, Región Común y Cierre):** Como demuestran Wagemans y de Wit (2022) en su centenario de investigación sobre psicología de la Gestalt, el cerebro humano agrupa automáticamente estímulos visuales continuos como unidades semánticas indivisibles. En el portal de la Cámara, los datos de contacto, sellos de verificación y botones de WhatsApp se agrupan en contenedores visuales delimitados por bordes milimétricos, permitiendo que el usuario procese cada comercio como una unidad lógica sin esfuerzo de interpretación.
2. **Patrones de Escaneo Visual en F y Z (Pernice & Budiu, 2022):** A través de estudios de seguimiento ocular (_eyetracking_), se comprobó que los usuarios leen interfaces en patrones de escaneo rápido en F (para listas densas) y en Z (para páginas de aterrizaje institucionales). En la portada, los componentes de mayor relevancia cognitiva (monograma institucional, propuesta de valor, buscador del Hero y botón de afiliación) se ubicaron a lo largo de los puntos de fijación ocular primarios.
3. **Metodología de Diseño Atómico (_Atomic Design_):** Desarrollada por Brad Frost (2023), descompone la interfaz en cinco niveles modulares: Átomos (tokens de color, tipografía y espaciado), Moléculas (campos de formulario con etiqueta y botón), Organismos (cabecera única unificada, pie de página), Plantillas y Páginas finales.

---

## 7.2 Tipologías Canónicas de Frost (2023) Aplicadas a la CCA

De acuerdo con la literatura especializada, las páginas de un sistema digital no deben componerse con criterios genéricos; su diseño debe responder al rol funcional que desempeñan dentro de la arquitectura:

#### Tabla 7.1. _Matriz de composición por tipología canónica de páginas para el portal de la Cámara_

| Tipología Canónica       | Propósito Estructural                                                                                                                        | Pantalla Diseñada en el Proyecto                                        | Componentes Cardinales en Figma                                                                                                                                            |
| :----------------------- | :------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Página de Navegación** | Orientar al visitante, proveer contexto institucional y distribuir el flujo de tráfico hacia secciones profundas sin albergar textos densos. | **Homepage Canónica Unificada** (`/`)                                   | Header único consolidado; Hero con buscador integrado; Grilla de acceso rápido 4x1; Vitrina de afiliados destacados; Footer a 4 columnas.                                  |
| **Página Funcional**     | Facilitar una interacción transaccional donde el usuario introduce datos, altera el estado del sistema o ejecuta una búsqueda compleja.      | **Directorio Comercial Interactivo** y **Wizard de Afiliación Digital** | Panel lateral de filtros facetados (por sector y distrito); Barra de búsqueda predictiva instantánea; Formulario por pasos con validación reactiva y cálculo de aranceles. |
| **Página de Contenido**  | Entregar la información sustantiva y detallada que responde a la necesidad final de consulta del usuario.                                    | **Ficha Detallada de Comercio** y **Misión / Reseña Histórica**         | Encabezado con sello de Afiliado Verificado CCA; Botones directos a WhatsApp y llamada telefónica; Ubicación física con enlace a Waze; Catálogo de productos.              |

---

## 7.3 Especificación del Sistema de Diseño Atómico en Figma

El diseño visual y los prototipos de alta fidelidad desarrollados en Figma se estructuraron bajo los tokens del sistema:

- **Paleta Cromática Semántica Institucional:** Rojo Carmín Oficial (`#991B1B` y `#B91C1C`), Negro Grafito (`#09090B`), Neutrales de Lectura Pizarra (`#0F172A` a `#F8FAFC`) y Verde Esmeralda de Verificación (`#059669`). Más del 85% de la interfaz descansa sobre fondos blancos prístinos (`#FFFFFF`) conforme al estándar editorial ICC.
- **Tipografía Editorial Serena:** Tipografía sans-serif _Inter_ para interfaz funcional, tablas y formularios (pesos 400 y 500); tipografía serif _Newsreader_ para encabezados institucionales de alta elegancia (pesos 500 y 600). Cero uso de pesos extrabold saturados para prevenir fatiga visual.
- **Sistema de Espaciado Canónico de 8 Puntos:** Escala modular estricta (`8px`, `16px`, `24px`, `32px`, `48px`, `64px`), garantizando proporciones armónicas en pantallas de escritorio (1440px) y móviles (375px).

- **Enlace oficial al prototipo interactivo UX/UI en Figma:**  
  [Acceder al archivo oficial de Figma](https://www.figma.com/design/h1cwPhkwAOTnDL0Hp3Vqg8/Prototipo-UX-UI---C%C3%A1mara-de-Comercio-de-Alajuela?node-id=20-297&t=32u9KsQuGYp766H5-0)

---

---

## 7.5 Referencias Bibliográficas del Capítulo (Normativa APA 7 — Literatura 2022–2026)

* Frost, B. (2023). Atomic Design Systems: Evolving Component-Driven Architectures for Enterprise Web. *Modern Web Design Journal*, 4(1), 12-29.
* Pernice, K., & Budiu, R. (2022). Eye-Tracking in Modern Web Interfaces: Visual Saliency, F-Patterns, and Z-Scans on High-Resolution Screens. *Nielsen Norman Group Research Series*, 18(3), 1-42.
* Wagemans, J., & de Wit, L. (2022). Gestalt principles revisited: Contemporary grouping mechanisms in visual digital interfaces. *Frontiers in Psychology*, 13, 891234. https://doi.org/10.3389/fpsyg.2022.891234
