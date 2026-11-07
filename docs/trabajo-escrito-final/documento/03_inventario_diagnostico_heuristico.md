# 3. Inventario del Contenido y Diagnóstico Heurístico Forense

## 3.1 Auditoría Inicial de la Plataforma Web Existente

Durante la fase de diagnóstico inicial (Semanas 1 a 3), el equipo consultor ejecutó una auditoría técnica, heurística y de contenido sobre la presencia digital en línea de la Cámara de Comercio de Alajuela (`www.camaraalajuela.com`). Lejos de cumplir su papel como activo institucional de referencia para el empresariado cantonal, la plataforma presentaba un estado severo de abandono tecnológico y desarticulación organizativa.

Se identificaron cinco patologías críticas de Arquitectura de Información que erosionaban la credibilidad institucional y bloqueaban la conversión de usuarios:

### Patología 1: Conflicto y Fuga de Dominios no Mitigada (Error HTTP 404)
La institución poseía registrado el dominio alternativo con guion intermedio `www.camara-alajuela.com`. En motores de búsqueda como Google, dicho dominio competía directamente contra la marca oficial `www.camaraalajuela.com` por términos clave como *"Cámara de Comercio Alajuela"* o *"Afiliación comercial Alajuela"*. Sin embargo, al ingresar a este dominio alternativo, el servidor devolvía un error fatal `HTTP 404 Not Found`.

La inexistencia de una directriz de redirección permanente (`301 Moved Permanently`) en el servidor web provocaba la pérdida continua de usuarios y empresarios legítimos, transmitiendo la falsa impresión de que la institución había cesado sus operaciones.

### Patología 2: Dualidad de Páginas de Inicio (*Dual Homepages*)
El sitio web operaba de manera concurrente dos páginas de inicio distintas: la ruta raíz (`/`) y la subruta `/home`. Ambas interfaces presentaban banners contradictorios, textos desalineados y menús con enlaces dispares. Esta anomalía confundía a los usuarios que regresaban al portal tras explorar secciones internas, duplicaba el esfuerzo de mantenimiento editorial y canibalizaba la autoridad de indexación SEO.

### Patología 3: Secciones Neurálgicas Fantasma y Enlaces Inactivos
Varias de las secciones más publicitadas por la Junta Directiva en medios locales carecían de contenido funcional dentro de la página:
* **Bolsa de Empleo (`/oferentes/`):** Al acceder, el sistema mostraba el mensaje genérico de consulta de base de datos vacía: *"No hay ofertas que coincidan con tu búsqueda"*, anulando el servicio de vinculación laboral.
* **Sección de Noticias y Actualidad (`/noticias/`):** Desplegaba el texto predeterminado de un gestor desatendido: *"No se han encontrado entradas"*, proyectando descuido ante posibles inversionistas.
* **Descarga de Documentos (`/documentos/`):** Aloja un único archivo comprimido en formato PDF titulado *"Formulario Ingreso Asociado"* (62.8 KB), desaprovechando la sección para reglamentos, actas o boletines económicos.

### Patología 4: Alta Fricción en el Directorio de Afiliados
Para localizar a un comercio asociado, el visitante debía navegar a través de una jerarquía ciega: ingresar al menú, seleccionar categorías genéricas (muchas de las cuales tenían únicamente 1 empresa registrada o se encontraban vacías) y ejecutar entre tres y cuatro clics sin disponer de:
* Un motor de búsqueda interno con autocompletado.
* Ordenamiento alfabético estandarizado.
* Filtros facetados por sector comercial o por distrito cantonal.
* Enlaces directos de contacto (WhatsApp corporativo o Waze).

### Patología 5: Brecha Tecnológica y Falta de Accesibilidad (WCAG 2.1)
El sitio operaba sobre una instalación monolítica de WordPress con plugins obsoletos, tiempos de respuesta de servidor superiores a 4.2 segundos en redes móviles, código saturado de etiquetas genéricas `<div>` sin semántica HTML5 (`<header>`, `<nav>`, `<main>`, `<article>`, `<footer>`) y ratios de contraste insuficientes en textos sobre imágenes, incumpliendo las pautas internacionales de accesibilidad web (WCAG 2.1 nivel AA).

---

## 3.2 Tabla de Inventario Inicial y Acciones Estratégicas

#### Tabla 3.1. *Inventario exhaustivo de activos del portal anterior y plan de acción de arquitectura de información*

| Ruta / Sección Auditada | Contenido Preexistente | Diagnóstico Heurístico | Acción Estratégica en el Rediseño |
| :--- | :--- | :--- | :--- |
| `camara-alajuela.com` | Servidor inactivo (Error 404). | Fuga de tráfico y pérdida de reputación de marca. | Configuración de **Redirección 301 Permanente** al dominio canónico. |
| `/` (Inicio Raíz) | Banner estático y bienvenida general. | Coexistencia no canónica con `/home`. | Consolidar como **Homepage Canónica Única** con buscador integrado. |
| `/home` (Inicio Alterno) | Contenido redundante desactualizado. | Canibalización SEO y sobrecarga cognitiva. | Eliminación y redirección 301 definitiva a `/`. |
| `/quienes-somos/` | Párrafos densos sobre historia de 1983. | Muro de texto sin jerarquía visual ni escaneabilidad. | Reestructuración modular en la sección **La Cámara** (Misión, Visión y Junta). |
| `/noticias/` | Mensaje de *"No se han encontrado entradas"*. | Sección fantasma que proyecta inactividad gremial. | Integración de **Actualidad y Eventos** con tarjetas dinámicas y fechas claras. |
| `/oferentes/` | Mensaje de *"No hay ofertas que coincidan"*. | Servicio inactivo que decepciona a empresas y ciudadanos. | Transformación en subsistema **Bolsa de Empleo** con postulación digital. |
| `/directorio/` | Lista fragmentada en categorías con 0 o 1 asociados. | Fricción extrema (3-4 clics ciegos sin búsqueda). | Creación del **Directorio Facetado** con motor instantáneo y sello de verificación. |
| `/documentos/` | Enlace aislado a PDF de afiliación de 62 KB. | Trámite manual arcaico (imprimir, firmar y trasladarse). | Reemplazo total por el **Wizard de Afiliación Digital** en 3 pasos con cálculo en línea. |
| `/contacto/` | Formulario genérico y teléfono fijo. | Falta de geolocalización precisa y soporte en tiempo real. | Incorporación de **Atención Multicanal** (WhatsApp, enlace Waze y formulario rápido). |

*(Nota: La comparativa gráfica estructurada de esta auditoría se encuentra documentada en la Figura 1 del Visualizador de Figuras del proyecto).*
