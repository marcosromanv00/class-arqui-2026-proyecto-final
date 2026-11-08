# 11. Customer Journey Mapping y Estrategia de Contenidos (Miro)

## 11.1 Marco Teórico: Diseño de Experiencias y Mapeo del Viaje del Usuario

El diseño de un ecosistema de información digital no puede limitarse a la disposición estática de menús y botones; debe concebirse a lo largo del eje temporal de la experiencia del usuario. Como fundamentan Lemon y Verhoef (2022), el viaje del cliente (*Customer Journey*) comprende la secuencia iterativa de interacciones que un individuo experimenta con una organización a través de múltiples puntos de contacto (*touchpoints*) antes, durante y después de la prestación del servicio. De acuerdo con Bernard y Andritsos (2022), el mapeo del viaje del cliente constituye una herramienta diagnóstica fundamental para identificar brechas de servicio, momentos de fricción emocional y oportunidades de valor que pasan desapercibidas en el análisis convencional de páginas aisladas.

### ¿Qué es Miro y cómo potencia el Customer Journey Mapping?
**Miro** es un espacio de trabajo visual colaborativo en tiempo real basado en un lienzo infinito (*infinite canvas*). En la metodología de diseño de servicios contemporánea (Terragni y Hassani, 2023), Miro se ha consolidado como el entorno estándar para sintetizar datos cualitativos y cuantitativos de investigación de usuarios. Permite a equipos multidisciplinarios articular matrices tridimensionales que cruzan:
1. **Fases Temporales:** Descubrimiento, Consideración, Afiliación/Conversión, Uso recurrente y Fidelización.
2. **Acciones del Usuario:** Tareas específicas ejecutadas por cada arquetipo de persona.
3. **Puntos de Contacto (*Touchpoints*):** Canales físicos y digitales involucrados (Portal web, WhatsApp, SINPE Móvil, Sede física de la Cámara).
4. **Curva Emocional y Dolores (*Pain Points*):** Niveles de frustración o satisfacción percibidos en cada etapa.
5. **Oportunidades de Arquitectura:** Soluciones concretas de navegación y microarquitectura implementadas para mitigar la fricción.

---

## 11.2 Arquetipos de Usuario y Viajes Modelados en Miro

Tomando como base la matriz de interacción en `tools/08_miro_cjm/customer_journey_map_matrix.json`, se estructuraron los mapas de experiencia para los dos perfiles cardinales de la institución:

### Arquetipo 1: Don Carlos Alvarado (52 años, Comerciante Tradicional de Alajuela Centro)
* **Objetivo:** Renovar su patente municipal y publicar una plaza vacante para dependiente de almacén.
* **Viaje Previo (Sitio Monolítico Viejo):** 
  * *Punto de Dolor:* Ingresaba a `/oferentes/` y encontraba la sección vacía; debía cerrar el navegador, llamar por teléfono fijo a la Cámara y trasladarse físicamente a Plaza Tomás Guardia a dejar un formulario en papel. Curva emocional: **Frustración severa (-2)**.
* **Viaje Rediseñado (Nuevo Portal):**
  * *Solución de AI:* Ingresa al portal, visualiza el enlace de *Bolsa de Empleo Cantonal* a 1 clic en el menú, consulta los convenios vigentes y activa el canal asistido de WhatsApp donde un asesor valida su solicitud al instante. Curva emocional: **Satisfacción alta (+2)**.

### Arquetipo 2: Licda. Valeria Brenes (29 años, Emprendedora Digital de La Guácima)
* **Objetivo:** Afiliar su agencia de diseño web a la Cámara y obtener el distintivo de comercio formal verificado.
* **Viaje Previo (Sitio Monolítico Viejo):**
  * *Punto de Dolor:* El único acceso era un enlace a un archivo PDF huérfano de 62 KB que requería ser impreso, firmado a mano y escaneado. Curva emocional: **Abandono inmediato (-3)**.
* **Viaje Rediseñado (Nuevo Portal):**
  * *Solución de AI:* Accede al botón destacado *Afiliar mi Empresa*, completa el Wizard de 3 etapas en menos de 3 minutos, calcula el retorno de inversión (ROI) deducible de renta (Ley 7092) y paga de forma segura mediante SINPE Móvil. Curva emocional: **Deleite y resolución instantánea (+3)**.

---

## 11.3 Matriz de Puntos de Contacto y Omnicanalidad

La siguiente tabla resume los puntos de contacto redefinidos para garantizar la continuidad de la experiencia:

#### Tabla 11.1. *Matriz de alineación omnicanal del viaje del usuario en la CCA*

| Fase del Viaje | Touchpoint Principal | Fricción Histórica Detectada | Solución de Arquitectura de Información |
| :--- | :--- | :--- | :--- |
| **1. Descubrimiento** | Búsqueda en Google / Redes Sociales | Redirecciones rotas y desactualización. | Metadatos Schema.org JSON-LD y títulos canónicos. |
| **2. Evaluación** | Directorio y Ficha de Comercio | 4 clics ciegos sin filtros ni contacto directo. | Búsqueda facetada instantánea y botón directo a WhatsApp. |
| **3. Transacción** | Wizard de Afiliación Digital | Formulario físico en PDF no transaccional. | Flujo de 3 pasos con cálculo automático de aranceles y SINPE. |
| **4. Soporte** | Centro de Ayuda / Chat Asistido | Teléfono fijo desatendido fuera de oficina. | Preguntas frecuentes interactivas y asistente virtual RAG 24/7. |

---

---

## 11.5 Referencias Bibliográficas del Capítulo (Normativa APA 7 — Literatura 2022–2026)

* Bernard, R., & Andritsos, P. (2022). Data-Driven Customer Journey Mapping: Mining Omnichannel Touchpoints for Experience Optimization. *ACM Transactions on Management Information Systems*, 13(3), 1-29. https://doi.org/10.1145/3510411
* Lemon, K. N., & Verhoef, P. C. (2022). Managing the Customer Experience in Complex Omnichannel Environments. *Journal of the Academy of Marketing Science*, 50(6), 1165-1188. https://doi.org/10.1007/s11747-022-00892-4
* Terragni, A., & Hassani, R. (2023). Visualizing Customer Journeys: Process Mining and Qualitative Touchpoint Modeling. *Decision Support Systems*, 168, 113942. https://doi.org/10.1016/j.dss.2023.113942
