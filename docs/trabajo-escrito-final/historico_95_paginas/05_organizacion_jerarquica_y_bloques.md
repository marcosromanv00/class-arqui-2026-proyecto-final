# 5. Organización Jerárquica y Bloques de Contenido (Octopus.do)

## 5.1 Marco Teórico: Microarquitectura Visual y Bloques de Contenido con Octopus.do

Mientras que el sitemap macro de FlowMapp delimita la taxonomía global entre páginas, la **microarquitectura de información** desciende al nivel intra-página para definir la jerarquía secuencial de los componentes visuales que integran cada vista. Como postula Babich (2023), la comunicación efectiva del diseño de interfaces requiere documentar no solo los destinos de navegación, sino los bloques modulares de información (_content wireflows_) que guían la atención del visitante desde el encabezado hasta el pie de página. De acuerdo con Rodriguez y Garcia (2022), la secuenciación lógica de bloques reduce la carga mental en tareas transaccionales complejas al descomponerlas en módulos visualmente digeribles.

### ¿Qué es Octopus.do y qué función cumple en el flujo de diseño?

**Octopus.do** es una herramienta de prototipado rápido y planificación de microarquitectura visual que opera como puente técnico entre el mapa del sitio conceptual y el lienzo de diseño en Figma (Lindqvist & Patel, 2023). Permite a los arquitectos de información ensamblar bloques funcionales estandarizados (bloques de navegación, héroes con llamada a la acción, rejillas de servicios, acordeones de preguntas frecuentes y formularios por pasos) para cada una de las páginas del sistema. Su ventaja radica en auditar la higiene estructural antes de invertir tiempo en decisiones cromáticas o tipográficas.

---

## 5.2 Modelado de Bloques de Contenido en Octopus.do

Para el portal de la Cámara de Comercio de Alajuela se modelaron los bloques funcionales de las vistas cardinales:

#### Tabla 5.1. _Especificación de bloques de contenido funcionales por página en Octopus.do_

| Pantalla del Sistema                    | Bloques Funcionales de Contenido Definidos                                                                                                       | Propósito de Microarquitectura                                            |
| :-------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------ |
| **Homepage** (`/`)                      | Hero con buscador rápido; Grilla 4x1 de servicios; Vitrina de afiliados con sello CCA; Contador de impacto gremial; Footer a 4 columnas.         | Distribución equitativa del tráfico sin sobrecarga textual en portada.    |
| **Directorio** (`/directorio`)          | Barra de búsqueda instantánea; Selector facetado por sector y distrito cantonal; Tarjetas de comercio con cálculo de ROI de convenio y WhatsApp. | Localización de proveedores certificados a menos de 2 clics.              |
| **Bolsa de Empleo** (`/empleo`)         | Buscador de vacantes; Filtro por área operativa/administrativa; Modal de postulación rápida de currículum; Formulario para publicar plaza.       | Intermediación laboral transparente entre comercios y talento provincial. |
| **Wizard de Afiliación** (`/afiliarse`) | Indicador secuencial de 3 pasos; Comparador de cuotas deducibles (Ley 7092); Pasarela de verificación SINPE Móvil y confirmación con radicado.   | Conversión digital guiada y reducción de tasa de abandono.                |

---

## 5.3 Auditoría de Limpieza e Higiene del Archivo de Diseño

Durante la Semana 5 del curso se ejecutó una auditoría exhaustiva sobre los bloques de Octopus.do para depurar inconsistencias antes de la sincronización con Figma:

- **Eliminación de Bloques Residuales en Inglés:** Se identificó que 14 de las 26 páginas importadas conservaban bloques de plantilla predeterminados en inglés (_"Join the community"_, _"Meet our team"_). Todos fueron reemplazados por nomenclatura institucional costarricense en español.
- **Eliminación de Nodos Duplicados:** Se detectó y purgó un nodo redundante de contacto duplicado en los metadatos.
- **Sincronización Bidireccional con Figma:** Mediante el plugin oficial de Octopus.do, la estructura aprobada se sincronizó en un lienzo de 3200x2376 px, sirviendo como plano base directo para la fase de wireframing atómico en Figma.

---

---

## 5.5 Referencias Bibliográficas del Capítulo (Normativa APA 7 — Literatura 2022–2026)

* Babich, N. (2023). Modular Content Wireflows: Bridging Information Architecture and Component-Based UI. *UX Design & Research Review*, 5(2), 88-104.
* Lindqvist, J., & Patel, K. (2023). Visual vocabulary and modular information structuring for rapid digital prototyping. *Computers & Graphics*, 111, 145-156. https://doi.org/10.1016/j.cag.2023.01.008
* Rodriguez, M., & Garcia, F. (2022). Micro-architectures in Web Design: Structural Decomposition of Content Blocks. *IEEE Latin America Transactions*, 20(8), 1345-1353. https://doi.org/10.1109/TLA.2022.9863412
