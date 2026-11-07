# Guía de Ejecución Real Paso a Paso: Figma & FigJam (Semana 7)
**Proyecto:** Cámara de Comercio de Alajuela (CCA)  
**Herramientas:** Figma (Diseño y Prototipado Interactivo) & FigJam (Co-creación y Brainstorming)  
**Enlace Oficial del Archivo Figma del Proyecto:**  
[Prototipo UX/UI - Cámara de Comercio de Alajuela en Figma](https://www.figma.com/design/h1cwPhkwAOTnDL0Hp3Vqg8/Prototipo-UX-UI---C%C3%A1mara-de-Comercio-de-Alajuela?node-id=20-297&t=32u9KsQuGYp766H5-0)

---

### Objetivo en el Proyecto
Diseñar el sistema de componentes atómicos, layout responsivo y prototipo navegable de alta fidelidad que resuelva las heurísticas de Nielsen y sirva de base para las pruebas de usabilidad en Maze.

---

### Paso a Paso para la Ejecución Real

#### Paso 1: Configuración de Tokens de Diseño en Figma
1. Abre tu archivo en Figma: [Enlace al Prototipo CCA](https://www.figma.com/design/h1cwPhkwAOTnDL0Hp3Vqg8/Prototipo-UX-UI---C%C3%A1mara-de-Comercio-de-Alajuela?node-id=20-297&t=32u9KsQuGYp766H5-0).
2. En el panel derecho de Figma, ve a la sección **"Variables"** (o ejecuta el plugin **"Tokens Studio for Figma"**).
3. Importa el archivo local [`design_tokens_cca.tokens.json`](file:///c:/Users/marco/OneDrive/Desktop/Proyectos/2- Activos\3- Otros\personal-university-c22026-arqdeinfo\una-arqinf-proy-camaracomercioalajuela\implementaciones_reales\04_figma_figjam\design_tokens_cca.tokens.json) para vincular los colores oficiales:
   - `brand-primary`: `#0F2B48` (Azul Alajuela)
   - `brand-secondary`: `#D97706` (Ámbar Mango)
   - `neutral-text`: `#09090B` (Alto contraste)

#### Paso 2: Creación de Componentes y Variantes (Atomic Design)
1. **Átomos:**
   - Botón Principal (`btn-primary`): Auto-layout horizontal (Padding: 12px 24px, Radius: 8px). Variantes: Default, Hover, Pressed, Disabled.
   - Botón Secundario (`btn-secondary`): Borde de 1px `#CBD5E1`, fondo blanco.
   - Input de Texto: Con etiqueta superior flotante, ícono opcional y estado de error con texto de ayuda.
2. **Moléculas:**
   - Tarjeta de Comercio (`MerchantCard`): Imagen de fachada (aspect ratio 16:9), Título H3 (Outfit 18px), Tag de sector comercial, insignia de Verificado con tooltip, y botón WhatsApp directo.
   - Caja de Búsqueda Predictiva: Input con botón lupa y dropdown desplegable con resultados instantáneos.
3. **Organismos:**
   - Barra de Navegación (`HeaderNavbar`): Logo CCA oficial, enlaces de navegación de Nivel 1, buscador colapsable y CTA "Afiliarse".
   - Asistente IA Flotante: Burbuja fija en esquina inferior derecha (`bottom: 24px, right: 24px`) con ventana de chat expandible.
   - Pie de Página en 4 Columnas: Misión, Enlaces Rápidos, Contacto Físico (Alajuela Centro) y Legal.

#### Paso 3: Conexión de Flujos Interactivos (Prototyping)
1. Cambia a la pestaña **"Prototype"** en la barra superior derecha de Figma.
2. **Flujo 1 (Afiliación):**
   - Conecta el botón `Afiliar Negocio` del Home con el marco `Afiliaciones / Planes`.
   - Conecta el botón `Elegir Plan Pyme` con el marco `Formulario de Afiliación`.
   - Conecta el botón `Continuar a Pago` con el marco `Pasarela SINPE Móvil`.
   - Conecta el botón `Confirmar Pago` con el marco `Éxito / Bienvenida`.
3. **Flujo 2 (Bolsa de Empleo):**
   - Conecta `Servicios > Bolsa de Empleo` con el listado de vacantes y el modal `Postularme`.
4. Asigna animaciones de transición fluidas: **"Smart Animate"** con curva **"Ease out" (250ms)** para evitar saltos bruscos.

#### Paso 4: Preparación del Prototipo para Maze
1. En Figma, haz clic en el botón **"Present"** (ícono de Play).
2. Asegúrate de que el flujo inicial comience en el marco `Home - Desktop (1440px)`.
3. Haz clic en **"Share prototype"** -> Cambia los permisos a **"Anyone with the link can view"** (Cualquiera con el enlace puede ver).
4. Copia este enlace exacto; será el input directo que pegaremos en **Maze** para correr las pruebas de usabilidad con usuarios.
