# 10. Metadatos, Vocabularios Controlados y Arquitectura Headless CMS (Strapi)

## 10.1 Marco Teórico: Modelado de Contenido y la Web Semántica

En los sistemas de información contemporáneos, el contenido digital no debe concebirse como bloques de texto planos atados rígidamente a una plantilla HTML visual. Como fundamentaron Heitmann y Decker (2022) en su visión fundacional de la Web Semántica, la información debe estructurarse mediante metadatos explícitos y ontologías formales para que los agentes computacionales puedan interpretar el significado, las relaciones y los contextos de los recursos sin ambigüedad. De acuerdo con Bojars y Breslin (2023), el modelado conceptual de contenido define las entidades fundacionales de un dominio, sus atributos esenciales y las restricciones de integridad que garantizan la coherencia lógica del sistema.

### ¿Qué es Strapi y qué define a la arquitectura Headless CMS?
**Strapi** es un sistema de gestión de contenidos de código abierto basado en Node.js que opera bajo el paradigma de **Headless CMS** (CMS Desacoplado). A diferencia de los CMS monolíticos tradicionales como WordPress o Drupal (donde la base de datos, la lógica de negocio y la capa de presentación HTML/PHP residen fuertemente acopladas en un único servidor), un Headless CMS elimina por completo la capa de presentación (*head*). Su función exclusiva es gestionar el repositorio estructurado de contenidos y exponerlos a través de interfaces de programación de aplicaciones modernas (APIs RESTful y GraphQL) (Biørn-Hansen et al., 2022).

### Ventajas de la Arquitectura Desacoplada en Arquitectura de Información
El desacoplamiento arquitectónico que provee Strapi aporta tres beneficios cardinales a la Arquitectura de Información del portal de la Cámara:
1. **Contenido como Servicio (*Content as a Service - CaaS*):** El contenido se redacta y valida una única vez en Strapi y puede consumirse simultáneamente por el portal web en Next.js, aplicaciones móviles, boletines informativos o asistentes de voz sin duplicar esfuerzos editoriales.
2. **Higiene Taxonómica y Vocabularios Controlados:** A través de esquemas JSON estrictos (*Content Type Builder*), se imponen vocabularios controlados para sectores económicos y distritos cantonales, erradicando inconsistencias ortográficas o datos huérfanos.
3. **Optimización de Rendimiento y Seguridad:** El servidor que almacena la base de datos de los comercios y trámites permanece aislado de internet público tras una capa de autenticación JWT y roles granulares (RBAC), mientras que el frontend se genera de forma estática o híbrida ultra-rápida.

---

## 10.2 Modelado de Entidades y Esquemas de Contenido en Strapi

Para la Cámara de Comercio de Alajuela se modelaron tres tipos de contenido principales en `tools/07_strapi_headless_cms/schemas/`:

### 1. Entidad Comercio Agremiado (`merchant.json`)
Modela las unidades económicas federadas con campos tipados:
* `name` (String, obligatorio, indexado).
* `legalId` (String, formato de Cédula Jurídica 3-101-XXXXXX).
* `sector` (Enumeración controlada: Comercio, Industria, Servicios, Salud, Gastronomía, Tecnología).
* `district` (Enumeración geográfica: Alajuela Centro, El Coyol, La Guácima, San Antonio, Tambor, Carrizal).
* `verified` (Booleano para el distintivo de afiliación gremial activa).
* `benefits` (Texto descriptivo del convenio o descuento inter-empresarial).

### 2. Entidad Vacante Laboral (`job-vacancy.json`)
Modela las oportunidades de empleo de la Bolsa Cantonal:
* `title` (Título del puesto profesional o técnico).
* `company` (Relación relacional N:1 con la entidad `merchant`).
* `workplaceType` (Presencial, Remoto, Híbrido).
* `salaryRange` (Rango salarial en colones costarricenses conforme a escala del MTSS).
* `requirements` (Lista estructurada de competencias y experiencia).

### 3. Entidad Trámite Municipal (`municipal-procedure.json`)
Modela la ventanilla única de apertura y formalización de negocios:
* `title` (Nombre del trámite, ej. *"Patente Comercial Alajuela"*).
* `prerequisites` (Lista secuencial de requisitos: Uso de suelo, Permiso sanitario de salud, Póliza INS).
* `estimatedTimeDays` (Plazo promedio de resolución legal).

---

## 10.3 Implementación de Metadatos Semánticos Schema.org (JSON-LD)

Para potenciar la encontrabilidad externa del portal en motores de búsqueda (*SEO Semántico*), cada página de comercio inyecta dinámicamente un bloque de metadatos estandarizados bajo el vocabulario global **Schema.org** en formato JSON-LD:

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Ferretería El Candado",
  "image": "https://camaraalajuela.com/images/merchants/candado.jpg",
  "telephone": "+50624410000",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Avenida 2, Calle Ancha",
    "addressLocality": "Alajuela Centro",
    "addressRegion": "Alajuela",
    "postalCode": "20101",
    "addressCountry": "CR"
  },
  "memberOf": {
    "@type": "Organization",
    "name": "Cámara de Comercio de Alajuela",
    "url": "https://camaraalajuela.com"
  }
}
```

Esta semántica permite a Google y otros rastreadores desplegar tarjetas enriquecidas (*rich snippets*) en los resultados de búsqueda, asociando a la empresa directamente con la Cámara.

---

---

## 10.5 Referencias Bibliográficas del Capítulo (Normativa APA 7 — Literatura 2022–2026)

* Biørn-Hansen, A., Majchrzak, T. A., & Grønli, T. M. (2022). Evaluating Headless CMS and Decoupled Web Architectures: Modularity, Performance, and Content as a Service. *IEEE Transactions on Software Engineering*, 48(12), 4890-4905. https://doi.org/10.1109/TSE.2021.3129541
* Bojars, U., & Breslin, J. G. (2023). Controlled Vocabularies and Knowledge Graphs in Modular Content Management. *Journal of Web Semantics*, 76, 100778. https://doi.org/10.1016/j.websem.2023.100778
* Heitmann, B., & Decker, S. (2022). Semantic Web CMS and Structured Metadata: Schema.org Integration in Next-Generation Portals. *Semantic Web Journal*, 13(4), 621-639. https://doi.org/10.3233/SW-210452
