# Guía de Ejecución Real Paso a Paso: Octopus.do (Semana 5)
**Proyecto:** Cámara de Comercio de Alajuela (CCA)  
**Herramienta:** Octopus.do ([octopus.do](https://octopus.do))  
**Costo:** Gratis (1 proyecto activo ilimitado en ramas y exportación básica).

---

### Objetivo en el Proyecto
Generar el mapa de sitio visual dinámico incorporando **bloques de contenido (content blocks / micro-wireframes)** en cada página, estimar complejidad de desarrollo y sincronizar la jerarquía generada directamente con Figma mediante el plugin oficial `Octopus to Figma`.

---

### Paso a Paso para la Ejecución Real

#### Paso 1: Creación del Proyecto mediante Importación Rápida
1. Accede a [https://octopus.do](https://octopus.do) e inicia sesión con Google o correo electrónico.
2. En la pantalla principal, haz clic en **"+ New Project"**.
3. Selecciona la opción **"Start from text"** (o "Import text").
4. Abre el archivo local [`octopus_sitemap_hierarchy.txt`](file:///c:/Users/marco/OneDrive/Desktop/Proyectos/2- Activos\3- Otros\personal-university-c22026-arqdeinfo\una-arqinf-proy-camaracomercioalajuela\implementaciones_reales\02_octopus_do\octopus_sitemap_hierarchy.txt), copia todo el contenido tabulado y pégalo en la ventana de Octopus.do.
5. Haz clic en **"Generate Sitemap"**.  
   *Octopus.do construirá instantáneamente todo el árbol jerárquico de 3 niveles con sus 6 ramas primarias y 21 páginas secundarias.*

#### Paso 2: Asignación de Bloques de Contenido (Wireframe Blocks)
1. Haz clic sobre la tarjeta de la página `Inicio (Home Portal CCA)`.
2. En el panel lateral derecho, haz clic en **"+ Add Content Block"** e inserta en orden:
   - `Header` (Encabezado)
   - `Hero` (Titular y llamada a la acción)
   - `Features` (Rejilla de servicios y accesos rápidos)
   - `Stats` (Contadores: +650 comercios afiliados)
   - `List / Cards` (Directorio destacado con buscador)
   - `Footer` (Pie de página)
3. Repite el proceso para `Afiliaciones` (bloques: Pricing, Form, Payment) y `Directorio` (bloques: Search, Filter, Grid) siguiendo la especificación de [`octopus_content_blocks.json`](file:///c:/Users/marco/OneDrive/Desktop/Proyectos/2- Activos\3- Otros\personal-university-c22026-arqdeinfo\una-arqinf-proy-camaracomercioalajuela\implementaciones_reales\02_octopus_do\octopus_content_blocks.json).

#### Paso 3: Asignación de Colores y Estimación de Complejidad
1. Selecciona los nodos principales y aplica el esquema de color:
   - Azul (`#0F2B48`) para Páginas Institucionales y Gobernanza.
   - Verde esmeralda para Páginas Transaccionales (`Afiliaciones`, `Pasarela de Pago`).
   - Naranja cálido para Páginas de Alto Tráfico (`Directorio Comercial`, `Bolsa de Empleo`).
2. En la barra superior, activa la opción **"Estimates"** (Estimación de esfuerzo) y asigna puntos de historia o días estimados a las páginas críticas (ej. Directorio: 5 días; Pasarela de Pago: 4 días).

#### Paso 4: Sincronización Automática con Figma
1. En Octopus.do, haz clic en el botón superior derecho **"Share"** y copia el enlace público del proyecto.
2. Abre Figma Desktop o Web y abre el archivo del proyecto de la CCA.
3. Ve al menú superior -> **Plugins** -> Busca y ejecuta el plugin **"Octopus.do"**.
4. Pega el enlace de Octopus.do que acabas de copiar y haz clic en **"Import into Figma"**.
5. *Resultado:* Figma creará automáticamente todos los marcos (frames) de baja fidelidad organizados espacialmente con los bloques de contenido correspondientes.

#### Paso 5: Evidencias y Exportación
1. En Octopus.do, haz clic en **"Export"** en el menú superior.
2. Descarga la versión en **PDF Vectorial** y en **PNG**.
3. Guarda estos archivos en `implementaciones_reales/02_octopus_do/exports/` para incorporarlos en el capítulo de organización y jerarquía del informe final.
