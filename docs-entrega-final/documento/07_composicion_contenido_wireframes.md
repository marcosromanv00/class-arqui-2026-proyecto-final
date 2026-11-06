# 7. Composición del Contenido y Wireframes de Alta Fidelidad (Figma + FigJam)

## 7.1 Fundamentación Teórica de la Composición Visual del Contenido

La composición del contenido representa la materialización tridimensional de la Arquitectura de Información en la pantalla. Esta fase temática, liderada por nuestro equipo de trabajo durante la Semana 7 del curso, articuló la teoría clásica de Rosenfeld, Morville y Arango (2015) con las leyes científicas de la percepción visual y la metodología contemporánea de **Atomic Design** (Frost, 2016):

1. **Leyes de la Gestalt (Proximidad y Región Común):** Los elementos relacionados (ej. datos de contacto, sellos de verificación y botones de WhatsApp) se agrupan en contenedores visuales delimitados por bordes tenues y fondos contrastantes, permitiendo que el cerebro humano procese cada comercio como una unidad lógica indivisible sin esfuerzo de interpretación.
2. **Patrones de Escaneo Visual en F y Z (Nielsen & Pernice, 2010):** En la página de inicio, los componentes de mayor relevancia cognitiva (monograma institucional, propuesta de valor, barra de búsqueda en el Hero y botón de afiliación) se ubicaron a lo largo de los puntos de fijación ocular primarios de la pantalla.
3. **Divulgación Progresiva en Formularios Transaccionales:** La afiliación se descompuso en un flujo guiado por etapas (*Wizard*), reduciendo drásticamente la tasa de abandono en comparación con los formularios monolíticos convencionales.

---

## 7.2 Tipologías Canónicas de Rosenfeld et al. (2015) Aplicadas a la CCA

De acuerdo con la literatura especializada, las páginas de un sistema digital no deben componerse con criterios genéricos; su diseño debe responder al rol funcional que desempeñan dentro de la arquitectura:

#### Tabla 7.1. *Matriz de composición por tipología canónica de páginas para el portal de la Cámara*

| Tipología Canónica | Propósito Estructural | Pantalla Diseñada en el Proyecto | Componentes Cardinales en Figma |
| :--- | :--- | :--- | :--- |
| **Página de Navegación** | Orientar al visitante, proveer contexto institucional y distribuir el flujo de tráfico hacia secciones profundas sin albergar textos densos. | **Homepage Canónica Unificada** (`/`) | Header único consolidado; Hero con scrim y buscador integrado; Grilla de acceso rápido 4x1; Vitrina de afiliados destacados; Footer a 4 columnas. |
| **Página Funcional** | Facilitar una interacción transaccional donde el usuario introduce datos, altera el estado del sistema o ejecuta una búsqueda compleja. | **Directorio Comercial Interactivo** y **Wizard de Afiliación Digital** | Panel lateral de filtros facetados (por sector y distrito); Barra de búsqueda predictiva instantánea; Formulario por pasos con validación reactiva y cálculo de aranceles. |
| **Página de Contenido** | Entregar la información sustantiva y detallada que responde a la necesidad final de consulta del usuario. | **Ficha Detallada de Comercio** y **Misión / Reseña Histórica** | Encabezado con sello de Afiliado Verificado CCA; Botones directos a WhatsApp y llamada telefónica; Ubicación física con enlace a Waze; Catálogo de productos. |

---

## 7.3 Especificación del Sistema de Diseño Atómico (Atomic Design)

El diseño visual y los prototipos de alta fidelidad desarrollados en Figma se estructuraron bajo cinco niveles de abstracción modular:

### 1. Átomos (Tokens de Diseño)
* **Paleta Cromática Semántica:** Azul Marino Institucional (`#0f223a` y `#081325`), Azul de Enlace Accesible (`#2563eb`), Neutrales de Lectura Pizarra (`#0f172a` a `#f8fafc`) y Verde Esmeralda de Éxito para Certificaciones (`#059669`).
* **Tipografía Serena (Sin Obesidad Tipográfica):** Familia sans-serif *Inter* para interfaz, tablas y formularios (pesos 400 y 500); familia serif *Newsreader* para encabezados institucionales de alta elegancia (peso 500 y 600 máximo). Cero uso de pesos extrabold (800) para evitar fatiga visual.
* **Sistema de Espaciado Modular:** Escala basada en la grilla canónica de 8 puntos (`8px`, `16px`, `24px`, `32px`, `48px`, `64px`), garantizando proporciones rítmicas predecibles.

### 2. Moléculas
* Botones accesibles con área táctil superior a 44 píxeles y variantes de estado (*Default, Hover, Active, Disabled*).
* Campos de formulario con etiquetas flotantes descriptivas, textos de ayuda contextual y validación en cliente.
* Fichas de previsualización de comercio con monograma, nombre, distrito, categoría y distintivo de verificación.

### 3. Organismos
* **Header Único Consolidado:** Agrupa marca institucional, navegación primaria de 5 enlaces y llamada a la acción clave, erradicando franjas accesorias (*top-bars*) que restan espacio útil.
* **Buscador Instantáneo en Hero:** Campo de entrada con botón de acción directa y autocompletado predictivo.
* **Pie de Página Tradicional:** Estructura autoritativa a cuatro columnas con datos de personería, logística real, horarios y colophon legal.

### 4. Plantillas y Páginas
* Maquetación completa de los wireframes navegables responsivos en versión de escritorio (*Desktop* 1440px) y versión adaptativa móvil (*Mobile* 375px).

* **Enlace oficial al prototipo interactivo UX/UI en Figma:**  
  [Acceder al archivo oficial de Figma](https://www.figma.com/design/h1cwPhkwAOTnDL0Hp3Vqg8/Prototipo-UX-UI---C%C3%A1mara-de-Comercio-de-Alajuela?node-id=20-297&t=32u9KsQuGYp766H5-0)
