# Guía de Ejecución Real Paso a Paso: FlowMapp (Semana 4)
**Proyecto:** Cámara de Comercio de Alajuela (CCA)  
**Herramienta:** FlowMapp ([flowmapp.com](https://www.flowmapp.com))  
**Costo:** Gratis (Plan gratuito incluye 1 proyecto activo completo con Sitemap, User Flow y Personas).

---

### Objetivo en el Proyecto
Modelar la arquitectura de información visual del nuevo portal web de la CCA, establecer la jerarquía de 3 niveles, definir los perfiles de usuario (Buyer Personas) que interactúan con el portal y diagramar los flujos de interacción críticos (Afiliación, Directorio y Empleo) antes de pasar al diseño en Figma.

---

### Paso a Paso para la Ejecución Real

#### Paso 1: Creación de Cuenta y Proyecto
1. Ingresa a [https://www.flowmapp.com](https://www.flowmapp.com) y regístrate con tu correo de la UNA o cuenta Google.
2. En el panel principal (Dashboard), haz clic en el botón superior derecho **"+ New Project"**.
3. Asígnale el nombre exacto: `Cámara de Comercio de Alajuela (CCA) - Portal 2026`.
4. Selecciona la miniatura o ícono institucional e ingresa al espacio de trabajo.

#### Paso 2: Construcción del Sitemap Visual (Mapa de Sitio)
1. Dentro del proyecto, haz clic en la pestaña **"Sitemaps"** y pulsa **"+ Create Sitemap"**.
2. Nombra el mapa: `Estructura_Portal_CCA_v2`.
3. Se creará la tarjeta raíz automáticamente. Haz doble clic y renómbrala a:  
   `Inicio (Home Portal CCA)` | URL: `/`.
4. Haz clic en el ícono **"+"** debajo de la raíz para agregar los 6 nodos de **Nivel 1**:
   - `1. Institucional y Gobernanza`
   - `2. Afiliaciones y Membresías`
   - `3. Directorio Comercial de Alajuela`
   - `4. Servicios al Comercio`
   - `5. Prensa y Actualidad`
   - `6. Contacto y Soporte`
5. Haz clic en el ícono **"+"** de cada categoría para añadir las páginas hijas de **Nivel 2** (puedes guiarte con el archivo local [`sitemap_flowmapp_cca.json`](file:///c:/Users/marco/OneDrive/Desktop/Proyectos/2- Activos/3- Otros/personal-university-c22026-arqdeinfo/una-arqinf-proy-camaracomercioalajuela/implementaciones_reales/01_flowmapp/sitemap_flowmapp_cca.json)).
6. **Configuración de Bloques y Etiquetas:**
   - Abre la tarjeta `3. Directorio Comercial de Alajuela`, haz clic en **"Cover / Wireframe"** y selecciona la plantilla `Directory / List`.
   - Asígnale el color azul marino institucional (`#0F2B48`) a los encabezados.
   - En la tarjeta `2.2 Formulario de Afiliación Digital`, asigna el estado **"In Progress"** y la etiqueta `Transaccional`.

#### Paso 3: Configuración de Buyer Personas
1. En la barra superior de FlowMapp, cambia a la pestaña **"Personas"** y pulsa **"+ Create Persona"**.
2. Copia y pega textualmente la información de las 3 personas definidas en [`personas_flowmapp_cca.json`](file:///c:/Users/marco/OneDrive/Desktop/Proyectos/2- Activos/3- Otros/personal-university-c22026-arqdeinfo/una-arqinf-proy-camaracomercioalajuela/implementaciones_reales/01_flowmapp/personas_flowmapp_cca.json):
   - **Persona 1:** Don Álvaro Solano Montero (Dueño de Ferretería Tradicional, 56 años).
   - **Persona 2:** Licda. Sofía Arguedas Mora (Socia Bufete Corporativo El Coyol, 38 años).
   - **Persona 3:** Kevin Chaves Brenes (Emprendedor Tecnológico E-Commerce, 27 años).
3. Sube fotos de perfil sobrias y formales. Rellena los campos: Demografía, Frustraciones con el sitio viejo, Metas y Cita textual.

#### Paso 4: Creación de User Flows (Flujos de Usuario)
1. Cambia a la pestaña **"User Flows"** y pulsa **"+ Create User Flow"**.
2. Crea el flujo principal: `Flujo de Afiliación Digital y Pasarela SINPE`.
3. Agrega bloques rectangulares (pantallas) y rombos (decisiones) siguiendo la especificación lógica documentada en [`user_flows_cca.md`](file:///c:/Users/marco/OneDrive/Desktop/Proyectos/2- Activos/3- Otros/personal-university-c22026-arqdeinfo/una-arqinf-proy-camaracomercioalajuela/implementaciones_reales/01_flowmapp/user_flows_cca.md).
4. Conecta las flechas condicionales (Sí / No) para el caso de validación de cédula jurídica e ingreso de comprobante bancario.

#### Paso 5: Evidencias y Exportación para la Entrega
1. Haz clic en el botón **"Share"** en la esquina superior derecha de FlowMapp y activa el interruptor **"Public link"**. Copia el enlace para adjuntarlo en la entrega final.
2. Haz clic en los tres puntos `...` -> **"Export"** -> Selecciona **"Export as PDF (Vector)"** y **"Export as PNG (High Res)"**.
3. Guarda los archivos descargados en la carpeta `implementaciones_reales/01_flowmapp/exports/` para incorporarlos como figuras oficiales en el informe escrito.
