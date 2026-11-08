# 7. Composición del Contenido y Wireframes a UI de Alta Fidelidad (Figma)

**Responsable:** Emanuel Soto · Consultor Especialista en Diseño de Interfaz y UI/UX

**Prototipo interactivo:** [Prototipo UX/UI · Cámara de Comercio de Alajuela (Figma)](https://www.figma.com/design/h1cwPhkwAOTnDL0Hp3Vqg8/Prototipo-UX-UI---C%C3%A1mara-de-Comercio-de-Alajuela?node-id=20-297&t=32u9KsQuGYp766H5-0)

---

## 7.1 Enfoque Metodológico de Composición

Rosenfeld et al. (2015) señalan que una arquitectura de información no se agota en el sitemap: cada página debe componerse según el papel que cumple dentro del sistema. Para el portal de la Cámara de Comercio de Alajuela (CCA) se adoptaron tres tipos de páginas, y cada pantalla del prototipo se diseñó a partir del tipo al que pertenece.

**Tabla 7.1**
_Tipos de páginas aplicados a las pantallas del prototipo de la CCA_

| Tipo de página | Propósito | Pantalla del prototipo | Decisiones de composición |
| :-- | :-- | :-- | :-- |
| **Navegación** | Orientar al visitante y distribuirlo hacia las secciones profundas sin cargarlo de texto. | 01 · Inicio | Encabezado único, buscador central en el hero, accesos rápidos por sector económico y bloque de afiliación con tres beneficios. |
| **Funcional** | Permitir que el usuario introduzca datos, filtre información o complete un trámite. | 03 · Directorio y 06–08 · Afiliación | Barra lateral de filtros facetados, conteo de resultados y formulario guiado por pasos con indicador de progreso. |
| **Contenido** | Entregar la información final que el usuario vino a buscar y facilitar la acción siguiente. | 05 · Ficha de comercio | Sello de afiliado verificado, datos de contacto agrupados y acciones directas a WhatsApp y Waze. |

Esta clasificación corrige la patología del sitio actual, donde anuncios de actividades cívicas, trámites gremiales y datos de comercios conviven en la misma página sin jerarquía. Al separar las páginas por función, cada pantalla tiene un único objetivo y una llamada a la acción dominante.

---

## 7.2 Sistema de Diseño Atómico y Tokens

El prototipo se construyó con la metodología de _Atomic Design_ (Frost, 2016), que organiza la interfaz en cinco niveles:

1. **Átomos:** los tokens de color, tipografía, espaciado y radio, definidos como variables de Figma (colecciones `CCA/Primitives`, `CCA/Color`, `CCA/Typography`, `CCA/Spacing` y `CCA/Radius`).
2. **Moléculas:** combinaciones mínimas de átomos con una función concreta, como el botón (`CCA/Button`, variantes Dorado, Azul y Claro), el campo de formulario con etiqueta (`CCA/Input Field`) y la opción seleccionable (`CCA/Company Option`).
3. **Organismos:** bloques completos y reutilizables, como el encabezado global (`CCA/HeaderF`, con estados abierto y cerrado del menú), el buscador global (`CCA/Global Search`), la tarjeta de sector (`CCA/Sector Card`) y la tarjeta de comercio (`CCA/Business Card`).
4. **Plantillas:** la disposición de organismos de cada tipo de página: encabezado, franja de título, filtros y resultados en el Directorio, o diálogo modal sobre la página en la Afiliación.
5. **Páginas:** las pantallas finales con contenido real de Alajuela, documentadas en la sección 7.4.

La paleta se separa en dos capas. Los **primitivos** guardan el valor del color y los **tokens semánticos** guardan su uso (por ejemplo, `color/bg/action` apunta a `gold`). Así, un cambio de marca se aplica en un solo lugar.

**Tabla 7.2**
_Paleta cromática institucional del prototipo (valores HSL)_

| Token semántico | Primitivo | HEX | HSL | Uso en la interfaz |
| :-- | :-- | :-- | :-- | :-- |
| `color/bg/header` · `color/text/brand` | navy | `#112B46` | hsl(211, 61%, 17%) | Azul institucional: franjas de título, monograma y títulos de marca. |
| `color/bg/blue` | blue | `#194F7D` | hsl(208, 67%, 29%) | Acciones secundarias (Ordenar, Atrás) y tarjetas de categoría. |
| `color/bg/action` | gold | `#DBA62F` | hsl(42, 70%, 52%) | Acento dorado: llamada a la acción principal (Afiliarme, Continuar). |
| `color/text/action` | gold-dark | `#B57D0D` | hsl(40, 87%, 38%) | Etiquetas destacadas sobre fondo oscuro. |
| `color/bg/surface` | paper | `#FFFFFF` | hsl(0, 0%, 100%) | Blanco puro de tarjetas, formularios y encabezado. |
| `color/bg/page` | cream | `#F7F3EA` | hsl(42, 45%, 94%) | Fondo cálido de bloques de resumen. |
| `color/text/default` | ink | `#152331` | hsl(210, 40%, 14%) | Texto principal. |
| `color/text/muted` | muted | `#5D6973` | hsl(207, 11%, 41%) | Texto de apoyo y descripciones. |
| `color/border/default` | line | `#DFE5E8` | hsl(200, 16%, 89%) | Bordes de 1 px que delimitan tarjetas. |
| `color/status/success` | green | `#18744F` | hsl(156, 66%, 27%) | Sello de afiliado verificado y confirmaciones. |

**Tabla 7.3**
_Escala tipográfica del prototipo_

| Estilo de texto | Familia | Peso | Tamaño | Uso |
| :-- | :-- | :-- | :-- | :-- |
| `CCA/Display/Hero` | Libre Baskerville | Bold | 72 px | Mensaje principal de la portada. |
| `CCA/Heading/H1` | Libre Baskerville | Bold | 54 px | Título de página. |
| `CCA/Heading/H2` | Libre Baskerville | Bold | 42 px | Título de sección. |
| `CCA/Heading/H3` | Libre Baskerville | Bold | 30 px | Subtítulos y cifras destacadas. |
| `CCA/Heading/H4` | Libre Baskerville | Bold | 23 px | Nombre del comercio en tarjetas. |
| `CCA/Body/Large` | DM Sans | Regular | 20 px | Bajada del hero. |
| `CCA/Body/Base` | DM Sans | Regular | 16 px | Texto de lectura. |
| `CCA/Body/Small` | DM Sans | Regular | 14 px | Descripciones de tarjetas. |
| `CCA/Label/Base` | DM Sans | Bold | 15 px | Texto de botones. |
| `CCA/Label/Small` | DM Sans | Bold | 12 px | Etiquetas, sellos y categorías. |

La combinación de una serif para títulos (Libre Baskerville) y una sans-serif para la interfaz (DM Sans) diferencia el tono institucional del contenido operativo. El cuerpo de lectura parte de 16 px, de modo que el texto de uso diario no queda por debajo de ese tamaño.

**Tabla 7.4**
_Escala de espaciado y radios_

| Token | Valor | Token | Valor |
| :-- | :-- | :-- | :-- |
| `space/1` | 4 px | `space/8` | 32 px |
| `space/2` | 8 px | `space/10` | 40 px |
| `space/3` | 12 px | `space/12` | 48 px |
| `space/4` | 16 px | `space/16` | 64 px |
| `space/5` | 20 px | `space/18` | 72 px |
| `space/6` | 24 px | `radius/sm` · `md` · `lg` · `xl` | 4 · 8 · 14 · 18 px |

El espaciado sigue una rejilla con base de 4 px cuyos pasos principales son múltiplos de 8 px (8, 16, 24, 32, 40, 48, 64, 72). Los pasos de 4, 12 y 20 px se reservan para ajustes finos dentro de componentes pequeños.

---

## 7.3 Fisiología de Auto Layout y Adaptabilidad

Auto Layout es la traducción en Figma del modelo CSS Flexbox. Un contenedor con Auto Layout ya no posiciona a sus hijos por coordenadas, sino por reglas, igual que un contenedor `display: flex`:

**Tabla 7.5**
_Correspondencia entre Auto Layout de Figma y CSS Flexbox_

| Propiedad en Figma | Equivalente CSS | Efecto en el prototipo |
| :-- | :-- | :-- |
| Dirección horizontal / vertical | `flex-direction: row / column` | Fila del botón con su ícono; pila vertical de la tarjeta de vacante. |
| _Gap_ (espacio entre elementos) | `gap` | Separación constante ligada a los tokens `space/*`. |
| _Padding_ | `padding` | Margen interno del botón (12 × 20 px) ligado a tokens. |
| _Hug contents_ | `width: fit-content` | El botón crece o se reduce según la longitud de su etiqueta. |
| _Fill container_ | `flex: 1` / `width: 100%` | Campos y botones ocupan el ancho disponible de su formulario. |
| Alineación (_space between_, centro) | `justify-content` / `align-items` | Salario a la izquierda y botón a la derecha en el pie de la tarjeta. |

En el prototipo, Auto Layout se aplica a las moléculas que cambian de contenido o de ancho: el botón `CCA/Button`, el buscador `CCA/Global Search` y la tarjeta `CCA/Job Card`. Gracias a ello, al cambiar una etiqueta, por ejemplo de "Buscar" a "Continuar al comprobante de pago", el componente se reacomoda solo y conserva los márgenes definidos por los tokens. No hay que redibujarlo.

Para la adaptabilidad, este comportamiento es el mismo que seguirá la implementación web. Un contenedor configurado con _fill container_ en Figma se traduce a un elemento fluido en CSS. Así, el paso de la rejilla de escritorio (pantallas compuestas a 1440 px) a una sola columna en móvil se logra apilando los mismos componentes, sin rediseñarlos. Esto es relevante porque el 83 % de los comerciantes accede desde el móvil: los botones y campos mantienen una altura de 44 px y el texto base de 16 px en cualquier ancho.

---

## 7.4 Catálogo de Pantallas Finales de Alta Fidelidad

Las cuatro pantallas siguientes se exportaron directamente del prototipo de Figma. Su composición se analiza desde las leyes de la Gestalt (Wagemans et al., 2012), los patrones de lectura en pantalla (Nielsen y Pernice, 2010) y las necesidades de los dos buyer personas del proyecto:

- **Doña Rosa:** comerciante tradicional de una soda. Necesita botones grandes, tipografía legible y WhatsApp a un clic.
- **Esteban:** joven emprendedor de comercio electrónico. Escanea en F y busca convenios rápidamente.

### Figura 7.1. Pantalla de inicio

![Figura 7.1. Pantalla de inicio del portal rediseñado de la CCA](../anexos_y_capturas/figura_wireframe_home_cca.png)

_Nota._ Pantalla 01 · Inicio del prototipo de alta fidelidad. Elaboración propia en Figma.

- **Jerarquía y escaneo:** el titular "Su negocio crece mejor cuando crecemos juntos", el buscador y el botón dorado "Ver directorio" caen sobre la diagonal de lectura de la página. Un visitante que solo escanea (Esteban) encuentra en segundos qué ofrece el sitio y por dónde empezar.
- **Figura-fondo:** el buscador blanco sobre la fotografía oscurecida es el elemento de mayor contraste y se lee como la acción principal de la página.
- **Ergonomía (Doña Rosa):** un solo campo de búsqueda con botón "Buscar" explícito reemplaza los 24 bloques dispersos del sitio actual. El botón "Afiliarme" se mantiene fijo en la esquina superior derecha del encabezado, en todas las pantallas.

### Figura 7.2. Directorio comercial con filtros facetados

![Figura 7.2. Directorio comercial con filtros por categoría](../anexos_y_capturas/figura_wireframe_directorio_cca.png)

_Nota._ Pantalla 03 · Directorio del prototipo de alta fidelidad. Elaboración propia en Figma.

- **Región común:** los filtros viven en una tarjeta lateral delimitada y los resultados en otra zona. El usuario distingue sin esfuerzo dónde controla la búsqueda y dónde ve el resultado.
- **Proximidad y semejanza:** cada tarjeta de comercio agrupa categoría, sello "Asociado verificado", nombre, descripción, ubicación y botón. Todas comparten la misma estructura, así que el ojo compara comercios sin reaprender la tarjeta.
- **Ergonomía:** el conteo "4 comercios encontrados" confirma el efecto de cada filtro. Las casillas incluyen el número de resultados por categoría, lo que evita clics sin resultado.

### Figura 7.3. Ficha técnica de comercio afiliado

![Figura 7.3. Ficha de un comercio afiliado con contacto directo](../anexos_y_capturas/figura_wireframe_ficha_comercio_cca.png)

_Nota._ Pantalla 05 · Ficha de comercio del prototipo de alta fidelidad. Elaboración propia en Figma.

- **Página de contenido:** la ruta de navegación (Inicio / Directorio / Gastronomía / El Sabor de la Montaña) ubica al usuario dentro de la jerarquía, y la cabecera muestra el sello "Afiliado verificado CCA" como señal de confianza.
- **Proximidad:** teléfono, horario, ubicación y canal de contacto se agrupan en una misma rejilla de datos, separada del texto descriptivo.
- **Ergonomía (Doña Rosa):** "Abrir en WhatsApp" y "Ver ubicación en Waze" son botones de ancho completo en la columna derecha. El contacto pasa de 4 clics sin número visible en el sitio actual a 1 clic.

### Figura 7.4. Wizard de afiliación digital

![Figura 7.4. Primer paso del wizard de afiliación digital](../anexos_y_capturas/figura_wireframe_afiliacion_cca.png)

_Nota._ Pantalla 06 · Afiliación · Paso 1 del prototipo de alta fidelidad. Elaboración propia en Figma.

- **Figura-fondo y foco:** el formulario se abre como diálogo sobre la página oscurecida. El resto del sitio pasa a segundo plano y la atención queda en una sola tarea.
- **Indicador de progreso:** la barra superior y el rótulo "Paso 1" le dicen al usuario cuánto falta, lo que reduce el abandono del formulario.
- **Ergonomía:** las opciones de tamaño de empresa son tarjetas completas clicables, no casillas pequeñas. La opción elegida se resalta con borde dorado y fondo cálido, y el botón "Continuar" queda abajo a la derecha, donde termina la lectura.

### Navegación sin pantallas huérfanas

Las pantallas están conectadas en un flujo de prototipo de Figma ("Flow 1") con 64 interacciones definidas. Desde la portada, el buscador y "Ver directorio" llevan al Directorio. Desde allí, el filtro de Gastronomía muestra los resultados filtrados y la primera tarjeta abre la Ficha de comercio. "Afiliarme", tanto en el encabezado como en la ficha, abre el wizard, que avanza del Paso 1 al Paso 2 y a la Confirmación, y el botón de cierre devuelve a la portada. Ninguna pantalla del flujo queda sin una salida.

---

## 7.5 Flujo Transaccional y Checkout

La afiliación es la transacción principal del portal, porque convierte a un visitante en asociado de la Cámara. Hoy es un trámite presencial con formulario en papel. La propuesta lo transforma en un checkout digital de tres pasos que se completa sin salir del sitio.

### Figura 7.5. Sitemap macro del nuevo portal

![Figura 7.5. Sitemap macro del nuevo portal web](../anexos_y_capturas/figura_02_sitemap_macro.png)

_Nota._ Arquitectura taxonómica del nuevo portal: página de inicio canónica, cinco ramas maestras y pie de página utilitario. Elaboración propia a partir del modelado en FlowMapp.

El sitemap ubica el checkout dentro de la rama **4. Afiliarse** (4.1 Beneficios de membresía → 4.2 Wizard de registro → 4.3 Pasarela de pago → 4.4 Confirmación). Desde la portada, la afiliación queda a un clic por medio del botón "Afiliarme", presente en todas las pantallas.

### Figura 7.6. Flujo de checkout de afiliación

![Figura 7.6. Flujo de checkout de afiliación en tres pasos](../anexos_y_capturas/figura_05_flujo_checkout_afiliacion.png)

_Nota._ Flujo completo del wizard de afiliación con pago por SINPE Móvil. Elaboración propia en Figma a partir del portal implementado.

Cada paso elimina una fuente de fricción específica del proceso actual:

**Tabla 7.6**
_Reducción de fricción por paso del checkout_

| Paso | Qué hace el usuario | Fricción que elimina |
| :-- | :-- | :-- |
| **1. Datos de la empresa** | Elige la modalidad (Comercio y Pyme, ₡15.000/mes, o Empresa e Industria, ₡35.000/mes) y completa 4 campos obligatorios. | La visita a la sede y el formulario en papel. El precio se ve antes de comprometerse. |
| **2. Pago SINPE Móvil** | Revisa el resumen de su cuota, transfiere al número oficial de la Cámara e ingresa el número de comprobante, o lo envía por WhatsApp. | La necesidad de pagar en ventanilla. El canal por WhatsApp da asistencia a quien no se siente seguro con el formulario (Doña Rosa). |
| **3. Constancia** | Recibe una constancia de afiliación con sus datos, el fundamento legal (Art. 8, Ley N.° 7092) y el recordatorio de que la cuota es deducible del impuesto sobre la renta. | La espera para saber si la solicitud fue recibida. |

El flujo se ajusta a las leyes de la Gestalt en dos puntos. El indicador de progreso de tres círculos se repite en cada paso, como una misma secuencia continua. Y la información de pago (cuota, número SINPE, comprobante) se agrupa en bloques delimitados con fondo propio. Las acciones mantienen siempre la misma posición: el botón principal dorado a la derecha y "Atrás" en azul a la izquierda, de modo que el usuario no busca el siguiente paso.

El prototipo inicial de Figma (Figura 7.4) resolvía la afiliación en dos pasos y una confirmación, sin pago. El flujo de la Figura 7.6 incorpora el paso de pago con SINPE Móvil y la constancia legal, y es el que se adopta como propuesta final. Con él, la afiliación pasa de un trámite presencial que hoy toma alrededor de 5 días a un proceso digital que se estima en unos 4 minutos.

---

## Referencias del capítulo

Frost, B. (2016). _Atomic design_. Brad Frost. https://atomicdesign.bradfrost.com/

Nielsen, J., & Pernice, K. (2010). _Eyetracking web usability_. New Riders.

Rosenfeld, L., Morville, P., & Arango, J. (2015). _Information architecture: For the web and beyond_ (4th ed.). O'Reilly Media.

Wagemans, J., Elder, J. H., Kubovy, M., Palmer, S. E., Peterson, M. A., Singh, M., & von der Heydt, R. (2012). A century of Gestalt psychology in visual perception: I. Perceptual grouping and figure–ground organization. _Psychological Bulletin, 138_(6), 1172–1217. https://doi.org/10.1037/a0029333
