## 7.3 Modelado de Contenidos y Taxonomías Estructuradas (Strapi Headless CMS)

### ¿Qué es? ¿Qué hace? ¿Cómo podría implementarse en nuestro proyecto?
**Strapi** es un sistema de gestión de contenidos desacoplado (*Headless CMS*) de código abierto que separa la capa de administración de datos de la capa de presentación visual. Mientras que en el sitio WordPress actual de la Cámara el contenido vive mezclado con el código HTML (exigiendo contratar a un programador externo y esperar hasta 72 horas para agregar un comercio o retirar una vacante vencida), Strapi almacena los contenidos como entidades tipadas y los entrega al portal web y al buscador mediante una API REST en formato JSON.

En el proyecto se implementó una instancia de **Strapi v5.61** (`tools/07_strapi_headless_cms/`) con esquemas formales (`comercio.schema.json` y `vacante_empleo.schema.json`) y un script de carga automatizada (`seed_strapi.js`), permitiendo al personal administrativo de la Cámara publicar un nuevo afiliado desde el *Content Manager* en unos 30 segundos sin riesgo de alterar el diseño del portal.

### Costos, planes y alcance de capa gratuita
- **Strapi Community Edition:** **100% gratuito y de código abierto (licencia MIT)** para autoalojamiento (*self-hosted*), sin límites en el número de registros, tipos de contenido, roles de lectura ni peticiones a la API REST.
- **Viabilidad en la CCA:** Su operación en el servidor institucional o contenedor gratuito mantiene el costo de licenciamiento en **$0.00/mes**.

### Alternativas Open Code
- **Directus:** Plataforma open source de gestión de datos headless que envuelve cualquier base de datos SQL relacional con una API REST/GraphQL instantánea.
- **Payload CMS:** Gestor headless de código abierto escrito en TypeScript con validación nativa de esquemas e integración directa con Next.js.

### Principios de Arquitectura de Información relacionados
1. **Separación entre Contenido y Presentación (Rosenfeld et al., 2015):** Un único registro estructurado alimenta simultáneamente la ficha del portal, los filtros del directorio, el índice de Algolia y canales externos sin duplicar carga manual.
2. **Vocabularios Controlados por Enumeración Cerrada (Bojars & Breslin, 2023):** Sustitución de campos de texto libre por listas desplegables estrictas para erradicar errores ortográficos que fragmentan los filtros.
3. **Gobernanza y Prevención de Contenido ROT (*Redundant, Outdated, Trivial*):** Control del ciclo de vida mediante estados *Draft & Publish* y caducidad programada por metadatos de fecha.

### Demostración de aplicación en nuestro dominio
Se incluyeron en Strapi los modelos de datos de las dos entidades críticas de la Cámara buscando comprobar que el sistema impidiera el ingreso de datos inconsistentes y automatizara la vigencia de las publicaciones:

**Tabla 7.**  
*Estructura de atributos, tipos y reglas de validación implementadas en Strapi v5.61*

| Entidad en Strapi | Atributos Clave del Esquema | Tipo y Regla de Validación en el Sistema |
| :--- | :--- | :--- |
| **Comercio Afiliado CCA** (`api::comercio.comercio`) | `nombre_comercial`, `cedula_juridica`, `sector_comercial`, `canton`, `distrito`, `telefono_whatsapp`, `correo_contacto`, `afiliado_verificado`, `beneficio_convenio_cca`, `palabras_clave_busqueda` | • `cedula_juridica`: Regex obligatoria `^[0-9]{10,12}$`.<br>• `canton`: Enumeración cerrada de los **16 cantones de Alajuela** con tildes oficiales.<br>• `sector_comercial`: Enumeración cerrada de **5 macro-sectores** (*Comercio, Servicios, Salud, Tecnología, Gastronomía*). |
| **Vacante de Empleo CCA** (`api::vacante-empleo.vacante-empleo`) | `titulo_puesto`, `empresa_empleadora`, `comercio` (relación M:1), `jornada`, `canton`, `salario_indicativo`, `correo_recepcion_cv`, `fecha_cierre_postulacion` | • `jornada`: Enumeración (*Tiempo Completo, Medio Tiempo, Híbrido, Remoto, Pasantía*).<br>• `fecha_cierre_postulacion`: Campo `date` obligatorio para filtrado automático de vigencia. |

![Figura 7.4. Panel Content Manager de Strapi v5.61 con los comercios afiliados cargados](figuras/captura_strapi_content_manager_comercios.png)

### Ajustes para un mejor resultado y justificación
Una vez recopilados los resultados de las pruebas de validación y consulta en la instancia local, se implementaron tres ajustes en la arquitectura:
1. **Rechazo estricto de variantes ortográficas en cantones:** Se comprobó que escribir *"Alajuel"* o *"San Ramon"* (sin tilde) fragmentaba los contadores del directorio; al declararse como enumeración cerrada de 16 cantones (*Alajuela, San Ramón, Grecia, San Mateo, Atenas, Naranjo, Palmares, Poás, Orotina, San Carlos, Zarcero, Sarchí, Upala, Los Chiles, Guatuso, Río Cuarto*), la API rechaza cualquier valor mal escrito incluso en estado borrador, mientras que una cédula incompleta (`3-101-000`) puede guardarse como borrador pero se bloquea al intentar publicar (*Publish*).
2. **Desaparición automática de vacantes vencidas sin pérdida de historial:** En la instancia se cargaron dos vacantes de *Ferretería El Candado Alajuelense*: una vigente hasta el `2026-12-15` y otra vencida el `2026-10-31`. El portal se configuró para consultar únicamente `GET /api/vacantes-empleo?filters[fecha_cierre_postulacion][$gte]=FECHA_ACTUAL`, logrando que las ofertas vencidas desaparezcan automáticamente de la vista pública sin que el personal deba borrarlas manualmente.
3. **Protocolo de Gobernanza ROT:** Comercios con más de 60 días de mora pasan de *Published* a *Draft* (retirándose de la API pública sin perder su historial), y la publicación o edición de un registro notifica vía *webhook* al índice de Algolia.

![Figura 7.5. Respuesta JSON de la API REST de Strapi para Ferretería El Candado Alajuelense](figuras/captura_strapi_api_rest_comercio.png)

### Evidencias
Se verificó la respuesta de los endpoints REST (`payload_strapi_comercio_ferreteria_el_candado.json`, `payload_strapi_filtro_alajuela_salud.json` y `payload_strapi_vacantes_vigentes.json` en `tools/07_strapi_headless_cms/`), confirmando la entrega de registros validados con identificadores `documentId`, metadatos de auditoría (`createdAt`, `updatedAt`, `publishedAt`) y paginación nativa.
