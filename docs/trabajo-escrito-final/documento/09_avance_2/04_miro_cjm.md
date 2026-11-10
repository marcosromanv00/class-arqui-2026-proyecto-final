## 7.4 Mapeo de la Experiencia del Usuario Gremial (Miro CJM)

### ¿Qué es? ¿Qué hace? ¿Cómo podría implementarse en nuestro proyecto?
**Miro** es una plataforma colaborativa de visualización estratégica que permite construir el **Customer Journey Map (CJM)**, un instrumento metodológico (Kalbach, 2020) que representa cronológicamente las acciones, puntos de contacto (*touchpoints*), pensamientos, curva emocional y fricciones de una persona al interactuar con una organización. Mientras el sitemap define dónde vive cada contenido, el CJM determina en qué momento del recorrido ese contenido resulta indispensable.

En el proyecto se implementó programáticamente mediante la API REST de Miro (`tools/08_miro_cjm/crear_tablero_miro.js` y `customer_journey_map_matrix.json`), generando un tablero estructurado de **5 etapas temporales × 5 carriles de análisis (25 cuadrantes)** que alinea las necesidades de los tres perfiles de usuario del proyecto (comerciante tradicional, emprendedor digital y responsable administrativa B2B).

### Costos, planes y alcance de capa gratuita
- **Miro Free Plan (Capa Gratuita):** Provee **3 tableros editables activos con colaboradores ilimitados**, acceso a la API REST para generación automatizada de nodos y exportación de alta resolución, manteniendo un costo operativo de **$0.00/mes** para la Cámara.

### Alternativas Open Code
- **Excalidraw:** Pizarra colaborativa de código abierto (licencia MIT) basada en navegador y autoalojable sin costos de suscripción.
- **Penpot:** Herramienta open source de diseño y diagramación colaborativa basada en estándares web abiertos (SVG).

### Principios de Arquitectura de Información relacionados
1. **Alineación entre Estructura y Momento de Necesidad (Rosenfeld et al., 2015):** Disposición de los argumentos de decisión (precios y deducibilidad fiscal) exactamente antes del punto de compromiso transaccional.
2. **Coherencia Omnicanal y Única Fuente de Verdad:** Sincronización entre las redes sociales gremiales y las páginas de destino del portal web administradas desde Strapi.
3. **Reducción de Puntos de Deserción:** Transformación de cuellos de botella presenciales en flujos digitales asistidos.

### Demostración de aplicación en nuestro dominio
Se incluyó en Miro la matriz de recorrido de los arquetipos gremiales buscando localizar los puntos exactos donde la experiencia actual provocaba el abandono del comerciante y definir qué componentes de Arquitectura de Información debían implementarse en cada etapa:

**Tabla 8.**  
*Matriz síntesis del Customer Journey Map (5 etapas × 5 carriles) y curva de satisfacción Likert (−2 a +2)*

| Etapa (Curva Actual → Rediseño) | Acción y Punto de Contacto | Cuello de Botella / Dolor Detectado | Implementación en el Sistema de la CCA |
| :--- | :--- | :--- | :--- |
| **1. Descubrimiento** (−1 → 0) | Búsqueda en Google desde móvil tras recomendación de colega | Portada con 24 bloques sin jerarquía y dos homepages compitiendo | Portada canónica única con 3 focos visuales, buscador central y CTA «Afiliarme» fijo |
| **2. Evaluación** (−1 → +1) | Compara planes (₡15.000 Pyme; ₡35.000 Empresa) y convenios | **Cuello 1:** Tarifas y beneficios ocultos; duda sobre validez contable | Precios públicos antes del registro y aviso explícito «100% deducible de Renta (Ley 7092)» |
| **3. Afiliación Digital** (**−2 → +2**) | Completa wizard en 3 pasos y paga por SINPE al `+506 8703-0792` | **Cuello 2:** Requisitos en papel entregados en persona en horario de oficina | Checkout digital de 3 pasos con constancia inmediata y envío asistido por WhatsApp |
| **4. Uso del Directorio** (−1 → +1) | Filtra proveedores por cantón/sector y recibe clientes desde su ficha | Directorio con comercios cerrados hace años y teléfono oculto a 4 clics | Fichas vivas en Strapi con sello «Afiliado verificado» y botones a 1 clic (WhatsApp y Waze) |
| **5. Fidelización** (−2 → +2) | Aprovecha convenios B2B, publica vacantes y renueva membresía | **Cuello 3:** La Cámara se percibe como un «ente fantasma» que solo cobra | Estrategia omnicanal: LinkedIn (convenios B2B), Instagram («Comercio del Mes») y alertas WhatsApp |

![Figura 7.6. Tablero del Customer Journey Map de 25 cuadrantes generado en Miro](figuras/figura_customer_journey_map_miro.png)

### Ajustes para un mejor resultado y justificación
Una vez recopilados los hallazgos de los tres cuellos de botella y la curva emocional, se implementaron tres ajustes estructurales en el portal:
1. **Salto de −2 a +2 en la etapa de Afiliación:** Al identificar que la exigencia de acudir presencialmente con formularios impresos causaba la mayor deserción (−2), se reemplazó por el wizard de 3 pasos con SINPE Móvil y se añadió un botón de asistencia directa por WhatsApp para el comerciante tradicional que prefiere acompañamiento humano.
2. **Transparencia tarifaria y fiscal previa al formulario:** Para responder a la exigencia administrativa de contabilidad corporativa, el desglose de precios y el respaldo del Art. 8 de la Ley N.° 7092 se colocaron en la columna izquierda visible desde el Paso 1.
3. **Estrategia de contenido social conectada al portal:** Para erradicar la percepción de «ente fantasma», se estructuró una parrilla omnicanal donde LinkedIn (semanal, orientado a empresas en zonas francas), Instagram (mensual, campaña *«Comercio del Mes»*) y el canal institucional de WhatsApp enlazan siempre de regreso a las fichas y vacantes publicadas en Strapi.

### Evidencias
El tablero generado mediante `tools/08_miro_cjm/crear_tablero_miro.js` (`cjm_tablero_miro.json` y `customer_journey_map_matrix.json`) documenta los 25 cuadrantes sincronizados con el flujo del prototipo, reduciendo el tiempo de afiliación de ~5 días hábiles presenciales a menos de **4 minutos en línea**.
