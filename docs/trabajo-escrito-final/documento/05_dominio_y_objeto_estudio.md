# 3. Dominio y Objeto de Estudio

## 3.1 Contexto Institucional de la Cámara de Comercio de Alajuela

La Cámara de Comercio, Industria, Turismo y Agricultura de Alajuela (CCA) fue fundada en el año 1983 con la misión de representar, fortalecer y coordinar los intereses gremiales del sector empresarial en la provincia de Alajuela. Su ámbito de acción abarca desde el comercio minorista tradicional del casco central de Alajuela hasta empresas de manufactura avanzada, turismo, agroindustria y servicios logísticos radicadas en polos estratégicos (como la zona franca El Coyol y corredores intercantonales hacia Grecia, San Ramón y Poás).

![Figura 3.1. Identidad institucional oficial de la Cámara de Comercio, Industria, Turismo y Agricultura de Alajuela](figuras/Logo-camara-hi.png)

Dentro del ecosistema institucional, la Cámara provee tres ejes fundamentales de servicio:
1. **Representación institucional y defensa gremial:** Enlace ante municipalidades, entidades tributarias (Ministerio de Hacienda) e instituciones de fomento económico.
2. **Capacitación, arbitraje y formalización:** Talleres de actualización fiscal, centros de resolución alterna de conflictos y asesoría en patentes municipales.
3. **Plataforma de vinculación comercial y empleo:** Directorio de afiliados para fomento del encadenamiento productivo local y gestión de vacantes laborales gremiales.

A pesar de la relevancia económica de la organización, su portal digital original presentaba severas limitaciones que impedían canalizar estos servicios con agilidad, desaprovechando el canal web para captar nuevos afiliados y atender las consultas cotidianas de comerciantes y ciudadanos.

## 3.2 Modelado de Usuarios y Arquetipos Gremiales

Para fundamentar la arquitectura de información sobre requerimientos empíricos y no sobre suposiciones técnicas, se modelaron tres arquetipos de usuario que representan los distintos patrones de interacción, necesidades informativas y niveles de alfabetización digital de la comunidad alajuelense.

**Tabla 1.**  
*Matriz de caracterización de arquetipos de usuario del portal CCA*

| Dimensión | Arquetipo 1: Comerciante Tradicional | Arquetipo 2: Emprendedora Digital B2B | Arquetipo 3: Consumidor / Ciudadano |
| :--- | :--- | :--- | :--- |
| **Nombre representativo** | Don Carlos Alvarado (52 años) | Licda. Valeria Brenes (29 años) | José Pablo Navarro (36 años) |
| **Ocupación** | Propietario de ferretería en Alajuela Centro | Fundadora de agencia de consultoría en La Guácima | Técnico de soporte logístico residente en El Coyol |
| **Relación con la Cámara** | Afiliado activo desde hace 14 años | No afiliada, evalúa beneficios gremiales | Público general sin afiliación gremial |
| **Dispositivo de acceso** | Teléfono móvil Android (baja gama) y PC de escritorio | Computadora portátil y smartphone moderno | Smartphone móvil en tránsito (redes 4G/5G) |
| **Objetivo principal** | Gestionar trámites de patente, consultar convenios y pagar cuotas sin filas presenciales | Conocer requisitos y costos de afiliación, descargar estatutos y contactar con la directiva | Buscar comercios verificados para compras y revisar ofertas en la bolsa de empleo |
| **Principal punto de dolor** | Confusión con menús en inglés, enlaces rotos y procesos bancarios engorrosos | Falta de transparencia en costos de membresía y ausencia de inscripción digital | Directorio estático sin buscador, incapacidad de filtrar comercios por distrito |
| **Requisito para la AI** | Rutas directas a trámites, etiquetado en lenguaje natural y pasarela SINPE Móvil | Formulario de afiliación tipo wizard en 3 pasos con cálculo claro de cuota gremial | Buscador instantáneo con facetas por cantón y sección de vacantes activas |

Esta segmentación permitió definir criterios objetivos de diseño: la jerarquía de contenidos debe favorecer tanto el autoservicio rápido para el afiliado frecuente (Don Carlos) como la persuasión y conversión transparente para el visitante interesado (Valeria), asegurando además una interfaz accesible y libre de barreras técnicas para el ciudadano general (José Pablo).

## 3.3 Problemática Inicial del Portal Preexistente y Brechas Operativas

Al inicio de la consultoría, la presencia digital de la Cámara de Comercio de Alajuela (`www.camaraalajuela.com`) operaba sobre una instalación monolítica de WordPress cuya estructura había crecido de forma orgánica y desarticulada sin lineamientos de Arquitectura de Información. La inspección preliminar del ecosistema web permitió identificar seis brechas estructurales críticas que impedían a los tres arquetipos de usuario cumplir sus objetivos:

1. **Conflicto y fuga de dominios no resuelta:** Se constató la existencia del dominio alterno `www.camara-alajuela.com` (con guion intermedio), el cual competía en los resultados de búsqueda con la marca institucional pero devolvía un error HTTP 404 por carecer de una redirección permanente (HTTP 301) hacia el dominio canónico, provocando pérdida de tráfico orgánico y desconfianza en el usuario.
2. **Coexistencia no canónica de páginas de inicio (*Dual Homepages*):** El portal mantenía activas simultáneamente dos portadas distintas en la raíz (`/`) y en la subruta `/home` (etiquetada como *«Inicio del menú»*), exhibiendo banners discrepantes, textos desactualizados y barras de navegación inconsistentes según el punto de entrada del visitante.
3. **Ocultamiento de flujos críticos de conversión y páginas huérfanas:** El levantamiento de rutas reveló que páginas esenciales como *Afiliarse* y *Preguntas Frecuentes* se encontraban fuera del menú principal como *«Páginas auxiliares no visibles en menú»*, coexistiendo con páginas residuales de plantilla en inglés (como `/business/`). En consecuencia, el objetivo estratégico de captar nuevos agremiados carecía de un punto de acceso visible en la navegación global.
4. **Secciones fantasma y promesas rotas de servicio:** Dos módulos promocionados en la estructura superior arrojaban mensajes de consulta vacía de base de datos: la sección `/noticias/` mostraba el aviso predeterminado de WordPress (*«No se han encontrado entradas»*) y la sección `/oferentes/` (Bolsa de Empleo) desplegaba el error *«No hay ofertas que coincidan con tu búsqueda»*, mientras que `/documentos/` alojaba únicamente un archivo PDF comprimido de 62 KB con un formulario de afiliación para imprimir y entregar físicamente.
5. **Fricción extrema y descontrol taxonómico en el Directorio de Asociados:** La consulta de un comercio exigía recorrer hasta **4 niveles de profundidad** (*Inicio principal → Asociados / Directorio → Categoría de asociados → Ficha de asociado*), mezclando el catálogo con vistas administrativas crudas del plugin (*«Vista añadir un anuncio»*, *«Vista buscar anuncios»*). Además, los 171 comercios estaban dispersos en 64 categorías abiertas con duplicados y errores ortográficos (como *«Constuctora»*), sin buscador tolerante a errores y con un 0 % de datos estructurados de cantón o distrito.
6. **Brecha tecnológica, de rendimiento y de accesibilidad (WCAG 2.1 AA):** El sitio presentaba tiempos de respuesta elevados, carencia de etiquetas semánticas HTML5 (`<main>`, `<nav>`, `<section>`, `<article>`), textos e insignias con contraste inferior al mínimo normativo de `4.5:1` y ausencia de indicadores de foco para navegación por teclado, incumpliendo los criterios de accesibilidad universal WCAG 2.1 nivel AA.


