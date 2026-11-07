# Guía de Ejecución Real Paso a Paso: Maze & Microsoft Clarity (Semana 8)
**Proyecto:** Cámara de Comercio de Alajuela (CCA)  
**Herramientas:** Microsoft Clarity (Grabación de Sesiones y Mapas de Calor) & Maze (Pruebas de Usabilidad Remotas)

---

### PARTE 1: Implementación Real de Microsoft Clarity

#### 1. ¿Qué es y por qué es 100% real y gratuito?
Microsoft Clarity ([clarity.ms](https://clarity.ms)) es una herramienta gratuita de analítica de comportamiento de usuario que genera **mapas de clics (heatmaps), mapas de scroll y grabaciones de video en vivo** de cómo las personas interactúan con la página, detectando "Rage Clicks" (clics de rabia o frustración) y "Dead Clicks" (clics en elementos no interactivos). No requiere tarjeta de crédito ni tiene límites de tráfico.

#### 2. Paso a Paso de Configuración en Clarity:
1. Entra a [https://clarity.ms](https://clarity.ms) e inicia sesión con una cuenta de Microsoft, Google o GitHub.
2. Pulsa el botón **"+ Add new project"** (Agregar nuevo proyecto).
3. Rellena los datos:
   - **Name:** `Portal Cámara de Comercio de Alajuela`
   - **Website URL:** `http://localhost:3000` (o la URL pública si lo despliegas en Vercel, Netlify o GitHub Pages).
4. Clarity te dará un **Tracking Code** (código de seguimiento) de 5 líneas con un `projectId` único de 10 caracteres (ejemplo: `clarity("set", "_project_id", "p9k12x8abc")`).
5. Abre el archivo `revamp_portal_web/index.html` y pega el snippet dentro de la etiqueta `<head>`:
   ```html
   <!-- Microsoft Clarity Tracking Code para Cámara de Comercio de Alajuela -->
   <script type="text/javascript">
       (function(c,l,a,r,i,t,y){
           c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
           t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
           y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
       })(window, document, "clarity", "script", "TU_CLARITY_PROJECT_ID");
   </script>
   ```
6. Al abrir el portal en el navegador y hacer clics, Clarity comenzará a registrar las sesiones.
7. En el panel de Clarity, ve a **"Heatmaps"** y toma capturas de:
   - Mapa de clics en la barra de búsqueda y en el botón de afiliación.
   - Mapa de scroll (para evidenciar que el 85% de los usuarios llegan hasta el Directorio).

---

### PARTE 2: Implementación Real de Maze (Usability Testing)

#### 1. Paso a Paso de Configuración en Maze:
1. Accede a [https://maze.co](https://maze.co) e inicia sesión en el plan gratuito.
2. En el Dashboard, pulsa **"+ New Maze"** -> **"Start from scratch"**.
3. Nombra la prueba: `Prueba de Usabilidad Portal CCA - UNA 2026`.
4. **Vincular el Prototipo de Figma:**
   - Haz clic en **"Add Block"** -> Selecciona **"Prototype test"**.
   - Pega el enlace de tu prototipo de Figma:
     `https://www.figma.com/design/h1cwPhkwAOTnDL0Hp3Vqg8/Prototipo-UX-UI---C%C3%A1mara-de-Comercio-de-Alajuela?node-id=20-297&t=32u9KsQuGYp766H5-0`
   - Maze cargará e importará los marcos de Figma de forma interactiva.
5. **Configurar la Misión 1 (Afiliación):**
   - Título: `Misión 1: Afiliar un negocio a la Cámara`.
   - Instrucción: `"Navegue desde el Inicio hasta completar el formulario y confirmar el pago por SINPE."`
   - Define el camino esperado (Expected Path) haciendo clic en los marcos de Figma: `Home` -> `Planes` -> `Registro` -> `Pago SINPE` -> `Confirmación`.
6. **Configurar la Misión 2 (Bolsa de Empleo):**
   - Agrega otro bloque de prototipo.
   - Instrucción: `"Encuentre una vacante disponible en la sección de Bolsa de Empleo."`
   - Define el camino: `Home` -> `Menú Servicios` -> `Bolsa de Empleo` -> `Ficha Vacante`.
7. **Agregar el Cuestionario SUS (10 preguntas):**
   - Agrega bloques de tipo **"Multiple Choice"** u **"Opinion Scale"** (1 al 5) con las 10 preguntas documentadas en [`cuestionario_sus_10_preguntas.md`](file:///c:/Users/marco/OneDrive/Desktop/Proyectos/2- Activos\3- Otros\personal-university-c22026-arqdeinfo\una-arqinf-proy-camaracomercioalajuela\implementaciones_reales\05_maze_y_clarity\cuestionario_sus_10_preguntas.md).
8. **Lanzar la Prueba:**
   - Pulsa **"Review and Start Testing"**.
   - Copia el enlace de participantes (ej. `https://t.maze.co/12345678`) y compártelo con al menos 10 usuarios.
9. **Extracción del Informe de Resultados de Maze:**
   - Maze calculará de forma automática:
     - **Direct Success Rate:** % de usuarios que completaron el camino sin desvíos.
     - **Misclick Rate (Tasa de clics erróneos):** % de clics fuera de las zonas activas.
     - **Average Duration:** Tiempo promedio de resolución por pantalla.
     - **Heatmaps agregados:** Mapas de calor directamente sobre los marcos de Figma.
   - Descarga o captura estos gráficos para incluirlos en el Capítulo 8 del informe escrito.
