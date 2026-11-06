# 10. Metadatos, Vocabularios Controlados y Modelado de Contenido en Headless CMS (Strapi / Contentful)

## 10.1 La Separación entre Contenido y Presentación

Uno de los principales errores del portal anterior de la Cámara radicaba en mezclar los datos de las empresas con el código visual de maquetación dentro de WordPress. Esto ocasionaba que cada actualización requiriera editar manualmente páginas HTML, generando inconsistencias de formato y datos obsoletos.

En la Semana 11 se adoptó el paradigma de **Gestor de Contenidos Desacoplado (*Headless CMS*)**, utilizando plataformas como **Strapi** y **Contentful**. Bajo este enfoque, el personal administrativo de la Cámara gestiona la información a través de formularios limpios respaldados por esquemas de datos estrictos, mientras que el frontend consume dichos datos mediante APIs seguras. El contenido se redacta una sola vez y puede reutilizarse simultáneamente en el sitio web, en la aplicación móvil o en el boletín informativo digital.

---

## 10.2 Modelado de Contenido (*Content Modeling*) en Strapi

Se definieron esquemas de tipos de contenido (*Content Types*) con tipado riguroso, validaciones obligatorias y relaciones semánticas entre entidades:

#### Tabla 10.1. *Modelo de datos del tipo de contenido "Comercio Afiliado" (Strapi Content-Type)*

| Campo / Atributo | Tipo de Dato | Validación | Propósito en la Arquitectura de Información |
| :--- | :--- | :--- | :--- |
| `nombre_comercial` | String | Requerido, Único | Nombre oficial visible en el Directorio y fichas de detalle. |
| `cedula_juridica` | String | Requerido (Regex `\d-\d{3}-\d{6}`) | Validación de personería jurídica ante el Registro Nacional. |
| `sector_economico` | Enumeration | Requerido (8 opciones controladas) | Alimenta la faceta de filtrado por sector en el buscador. |
| `distrito` | Enumeration | Requerido (7 distritos de Alajuela) | Alimenta la faceta de filtrado territorial cantonal. |
| `direccion_fisica` | Text | Requerido | Dirección con señas locales alajuelenses y puntos de referencia. |
| `coordenadas_gps` | JSON (`{lat, lng}`) | Opcional | Generación del botón dinámico de navegación en Waze y Google Maps. |
| `telefono_oficina` | String | Requerido | Enlace interactivo `tel:+506...` para llamadas inmediatas. |
| `whatsapp_corporativo` | String | Requerido | Enlace `https://wa.me/...` para atención expedita a clientes. |
| `estado_verificacion` | Boolean | Requerido (Default `true`) | Habilita el sello distintivo *"Afiliado Oficial Verificado CCA"*. |
| `anio_afiliacion` | Integer | Requerido | Cálculo dinámico de antigüedad gremial como señal de confianza. |
| `palabras_clave_tags` | JSON (Array de Strings) | Requerido | Términos de vocabulario controlado para alimentar el índice de Algolia. |

---

## 10.3 Marcado Semántico Estructurado (Schema.org & Dublin Core)

Para garantizar un posicionamiento orgánico dominante en motores de búsqueda (SEO) y facilitar que los asistentes virtuales interpreten con exactitud los servicios de la Cámara, cada página del nuevo portal incorpora metadatos estructurados en formato **JSON-LD**:

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.camaraalajuela.com/#organization",
      "name": "Cámara de Comercio, Industria, Turismo y Servicios de Alajuela",
      "foundingDate": "1983-06-15",
      "url": "https://www.camaraalajuela.com",
      "logo": "https://www.camaraalajuela.com/assets/logo-cca.png",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Calle 2, Avenidas Central y 1, 200m este del Parque Central",
        "addressLocality": "Alajuela",
        "addressRegion": "Alajuela",
        "postalCode": "20101",
        "addressCountry": "CR"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+506-2441-1555",
        "contactType": "Atención Gremial",
        "areaServed": "Alajuela"
      }
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://www.camaraalajuela.com/directorio/ferreteria-el-candado",
      "name": "Ferretería El Candado Alajuelense",
      "parentOrganization": { "@id": "https://www.camaraalajuela.com/#organization" },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Calle Ancha, 150m norte del Mercado Central",
        "addressLocality": "Alajuela",
        "addressRegion": "Alajuela"
      },
      "telephone": "+506-2441-2090",
      "priceRange": "$$"
    }
  ]
}
```

Asimismo, se implementaron las directivas del estándar **Dublin Core** en los encabezados `<meta>` (`DC.Title`, `DC.Creator`, `DC.Subject`, `DC.Date`), asegurando interoperabilidad bibliográfica y archivo digital formal.
