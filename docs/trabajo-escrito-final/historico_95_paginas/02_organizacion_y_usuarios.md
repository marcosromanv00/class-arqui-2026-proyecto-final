# 2. Descripción de la Organización y Modelado de Usuarios

## 2.1 La Cámara de Comercio de Alajuela y su Ecosistema Socioeconómico

La **Cámara de Comercio de Alajuela** (oficialmente denominada Cámara de Comercio, Industria, Turismo y Servicios de Alajuela) es una organización gremial sin fines de lucro, constituida formalmente en el año 1983. Con sede física en el cantón central de Alajuela (Calle 2, Avenidas Central y 1, a doscientos metros este del Parque Central), su misión institucional radica en representar, capacitar, defender y vincular a las empresas formales del cantón central y de la provincia de Alajuela.

La provincia de Alajuela ostenta una relevancia estratégica singular en la economía de Costa Rica:

- Alberga la principal terminal aérea del país (Aeropuerto Internacional Juan Santamaría).
- Concentra los parques industriales y de manufactura médica más dinámicos de Centroamérica (Zonas Francas en El Coyol y San Antonio del Tejar).
- Mantiene un tejido tradicional vigoroso de micro, pequeñas y medianas empresas (MIPYMES) en el comercio detallista, gastronomía, agricultura y servicios profesionales.

En este entorno heterogéneo, la Cámara desempeña tres roles cardinales:

1. **Representación Institucional:** Ejerce como interlocutor formal ante la Municipalidad de Alajuela, ministerios, el Concejo Municipal y entes reguladores en temas de licencias comerciales (patentes), tasas e impuestos cantonales.
2. **Capacitación Continua:** Diseña seminarios y talleres de actualización tributaria (ej. facturación electrónica 4.4, reformas fiscales), gestión de nóminas y mercadeo digital para comerciantes de la región.
3. **Plataforma de Visibilidad y Encadenamiento:** Provee a los agremiados un Directorio Comercial certificado que respalda la formalidad de sus negocios ante consumidores y otras empresas, junto con una Bolsa de Empleo que fomenta la contratación de mano de obra local.

No obstante, esta misión se veía severamente obstaculizada por una presencia digital anticuada que no comunicaba su propuesta de valor ni permitía la autogestión de trámites.

---

## 2.2 Marco Teórico: Modelado de Usuarios y Arquetipos (Personas)

El diseño centrado en el usuario exige trascender las generalizaciones demográficas abstractas. Conforme a la metodología pionera de _Goal-Directed Design_ formulada por Alan Cooper (Chasanidou & Karahasanovic, 2022), los **arquetipos de usuario (_Personas_)** constituyen modelos descriptivos concretos que sintetizan patrones de comportamiento observados, actitudes, motivaciones y modelos mentales de usuarios reales. Como afirman Salminen et al. (2022) y Jansen et al. (2023), las Personas previenen el fenómeno del "usuario elástico" (donde los desarrolladores adaptan las definiciones de usuario según su propia conveniencia técnica) y sirven como ancla cognitiva para evaluar cada decisión de navegación.

Para fundamentar las decisiones de diseño del portal, el equipo consultor modeló tres perfiles de usuario que representan los segmentos cardinales de la institución:

### Perfil 1: Don Carlos Alvarado — Comerciante y Afiliado Tradicional

- **Edad:** 52 años.
- **Ubicación:** Alajuela Centro (negocio familiar a 150m del Mercado Central).
- **Ocupación:** Propietario de una ferretería mediana con 14 colaboradores. Afiliado a la Cámara desde hace 12 años.
- **Modelo Mental:** Pragmático y enfocado en la resolución de problemas cotidianos. Utiliza WhatsApp corporativo en su teléfono móvil y accede al computador de su oficina principalmente para tareas administrativas y bancarias. Valora la formalidad y el contacto humano directo.
- **Objetivos Clave:**
  1. Anunciar vacantes operativas de bodega o ventas de mostrador en la bolsa de empleo para contratar personal residente en el cantón.
  2. Consultar convenios con aseguradoras y bancos locales para financiar inventario con tasas preferenciales de la Cámara.
  3. Verificar el estado de su membresía y recibir alertas sobre operativos municipales o vencimiento de patentes.
- **Puntos de Dolor con el Sitio Previo:** La bolsa de empleo del sitio web arrojaba un mensaje de base de datos vacía; no encontraba dónde publicar una vacante y el directorio comercial requería navegar entre categorías vacías sin orden alfabético ni buscador.

### Perfil 2: Licda. Valeria Brenes — Joven Emprendedora Digital (No Afiliada)

- **Edad:** 29 años.
- **Ubicación:** La Guácima de Alajuela.
- **Ocupación:** Cofundadora de una agencia boutique de desarrollo de software y servicios en la nube para empresas de zona franca.
- **Modelo Mental:** Nativa digital. Espera que cualquier servicio corporativo moderno se contrate en línea en pocos minutos, con transparencia total de precios y sin formularios físicos ni traslados a oficinas centrales.
- **Objetivos Clave:**
  1. Conocer los beneficios tangibles de agremiarse a la Cámara (redes de contacto con gerencias de El Coyol, asesoría en propiedad intelectual).
  2. Consultar con absoluta claridad el costo mensual y anual de la membresía según el tamaño de su empresa.
  3. Realizar el trámite de afiliación y pago 100% digital en menos de 5 minutos mediante SINPE Móvil o tarjeta de crédito corporativa.
- **Puntos de Dolor con el Sitio Previo:** El sitio no detallaba los costos de afiliación. El único enlace disponible era un botón de descarga para un archivo PDF comprimido que debía imprimirse, llenarse a mano con lapicero y entregarse físicamente en la secretaría de la Cámara en Alajuela Centro.

### Perfil 3: José Pablo Navarro — Consumidor y Ciudadano Alajuelense

- **Edad:** 36 años.
- **Ubicación:** El Coyol de Alajuela.
- **Ocupación:** Supervisor de logística en bodega industrial; busca proveedores mecánicos confiables y explora nuevas ofertas laborales en la provincia.
- **Modelo Mental:** Búsqueda rápida orientada a tareas (_task-oriented_), navegación predominantemente desde su teléfono celular inteligente (móvil) durante trayectos o descansos laborales.
- **Objetivos Clave:**
  1. Encontrar rápidamente un taller mecánico o servicio de mantenimiento automotriz certificado y formal en el sector de El Coyol o Alajuela Centro.
  2. Obtener de inmediato el número de WhatsApp, teléfono de contacto y enlace directo a Waze para llegar al taller sin rodeos.
  3. Explorar convocatorias de empleo activas en empresas consolidadas de la zona.
- **Puntos de Dolor con el Sitio Previo:** El directorio no permitía filtrar por distrito ni contaba con un buscador por palabras clave. Cada intento de búsqueda de proveedores requería adivinar categorías ocultas en menús desplegables desactualizados.

---

#### Tabla 2.1. _Matriz comparativa de necesidades, modelos mentales y requerimientos de interacción por arquetipo_

| Parámetro de Diseño                    | Perfil 1: Don Carlos (Afiliado Activo)             | Perfil 2: Licda. Valeria (Emprendedora)               | Perfil 3: José Pablo (Consumidor)                          |
| :------------------------------------- | :------------------------------------------------- | :---------------------------------------------------- | :--------------------------------------------------------- |
| **Dispositivo Principal**              | Híbrido (Desktop en oficina / Móvil)               | Móvil y Laptop ultradelgada                           | Teléfono inteligente (Móvil 100%)                          |
| **Frecuencia de Uso**                  | Mensual / Quincenal                                | Ocasional (Exploración y Afiliación)                  | Puntual / Orientado a una necesidad inmediata              |
| **Expectativa de Velocidad**           | Media (tolerancia moderada si el dato es exacto)   | Alta (abandono inmediato si hay fricción)             | Inmediata (<10 segundos para hallar el contacto)           |
| **Requerimiento Crítico en el Portal** | Publicar vacantes y acceder a convenios gremiales. | Formulario Wizard de afiliación con aranceles claros. | Directorio con búsqueda instantánea, facetas y botón Waze. |

---

---

## 2.5 Referencias Bibliográficas del Capítulo (Normativa APA 7 — Literatura 2022–2026)

* Chasanidou, D., & Karahasanovic, A. (2022). Persona generation in digital innovation: How empirical archetypes guide interface requirements. *Computers in Human Behavior*, 134, 107312. https://doi.org/10.1016/j.chb.2022.107312
* Jansen, B. J., Salminen, J., & Guan, K. W. (2023). Data-Driven Personas: Models and Methods for User Understanding. *ACM Transactions on Computer-Human Interaction*, 30(4), 1-38. https://doi.org/10.1145/3577011
* Salminen, J., Sengün, S., Jung, S. G., & Jansen, B. J. (2022). Does a persona design matter? An empirical study on persona formatting and readability. *International Journal of Human-Computer Studies*, 160, 102764. https://doi.org/10.1016/j.ijhcs.2021.102764
