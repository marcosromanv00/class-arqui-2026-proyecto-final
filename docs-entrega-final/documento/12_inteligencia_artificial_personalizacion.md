# 12. Uso de Inteligencia Artificial Generativa, Personalización y Análisis Crítico

## 12.1 Aplicación de la Inteligencia Artificial a la Arquitectura de Información

En la Semana 13 del curso se abordó la intersección entre la Arquitectura de Información y los modelos generativos contemporáneos (LLMs). Lejos de concebir la Inteligencia Artificial como un generador de textos decorativos o ilustraciones aleatorias, el equipo consultor la implementó como un **mecanismo de recuperación aumentada por contexto (*Retrieval-Augmented Generation*, RAG)** al servicio de la orientación y la personalización del usuario.

En el nuevo portal de la Cámara, la IA se materializa en dos subsistemas cardinales:
1. **El Asistente Virtual Institucional ("Asistente CCA"):** Un agente conversacional embebido que asiste 24/7 a comerciantes en dudas normativas, trámites de patentes y cálculo de membresías.
2. **Personalización Adaptativa de la Navegación:** Reorganización dinámica de los bloques de la página de inicio según las señales declaradas por el visitante.

---

## 12.2 Arquitectura RAG del Asistente Virtual CCA

A diferencia de los chatbots tradicionales basados en árboles rígidos de preguntas y respuestas (*decision trees*), el Asistente CCA procesa consultas en lenguaje natural mediante una arquitectura de tres capas:

1. **Capa de Captura y Normalización de Intenciones:** El usuario formula su duda con palabras cotidianas (ej. *"¿Cómo hago para que la Municipalidad no me cierre el negocio por el permiso?"* o *"¿Cuánto me cobran si tengo una ferretería pequeña?"*). El sistema normaliza la consulta y extrae las entidades clave (*patente, municipalidad, inspección, microempresa*).
2. **Capa de Recuperación Contextual (RAG):** El motor no consulta a un modelo general en blanco; recupera de manera estricta los fragmentos pertinentes de la base de conocimiento institucional de la Cámara:
   * Ley de Patentes de la Municipalidad de Alajuela (Ley N.° 8307).
   * Estatutos Oficiales y Tabla Arancelaria de Membresías 2026.
   * Catálogo de Convenios Comerciales y Directorio Activo.
3. **Capa de Generación Controlada y Respaldo Humano:** El asistente sintetiza la respuesta en un lenguaje claro, profesional y empático, indicando los pasos a seguir e incorporando siempre el canal directo de contacto oficial de WhatsApp (+506 8888-2222) para seguimiento presencial.

---

## 12.3 Escenarios de Personalización Contextual

La arquitectura implementa reglas de personalización no intrusivas basadas en el comportamiento del visitante:
* **Escenario A (Comerciante Afiliado Recurrente):** Tras detectar una sesión activa o navegación orientada a gestión empresarial, la portada prioriza en la grilla superior el acceso a la Bolsa de Empleo, la publicación de vacantes y los boletines de actualización tributaria.
* **Escenario B (Emprendedor Nuevo / Prospecto):** Si el visitante proviene de motores de búsqueda buscando *"cómo afiliarse a la Cámara de Comercio"*, la portada despliega el Wizard de Afiliación Digital con la calculadora de cuotas en primer plano y testimonios de asociados del cantón.
* **Escenario C (Consumidor / Ciudadano Local):** Si el usuario busca proveedores ferreteros, mecánicos o médicos, el portal resalta el Directorio Comercial interactivo y las vacantes laborales activas en su distrito.

---

## 12.4 Análisis Crítico y Responsabilidad Ética del Arquitecto de Información

Conforme a las exigencias académicas de la cátedra, el equipo consultor realizó una evaluación crítica sobre los riesgos inherentes al uso de la Inteligencia Artificial en plataformas gremiales públicas:

#### Tabla 12.1. *Matriz de riesgos éticos de la IA en Arquitectura de Información y medidas de mitigación*

| Riesgo Técnico / Ético Identificado | Impacto Potencial en la Organización | Medida de Arquitectura y Mitigación Implementada |
| :--- | :--- | :--- |
| **Alucinaciones en Asesoría Tributaria o Legal** | Una respuesta inventada por el LLM podría inducir a un comerciante al impago de tributos municipales o sanciones legales. | **Arquitectura RAG Acotada:** El bot tiene prohibido generar consejos legales fuera de los textos oficiales indexados. Si una consulta supera su base contextual, deriva obligatoriamente al usuario a un asesor humano de la Cámara. |
| **Opacidad Algorítmica (*Black-Box Decisions*)** | El usuario desconoce por qué se le recomienda determinado comercio o plan de membresía. | **Etiquetas de Explicabilidad Semántica:** Cada recomendación o respuesta explicita la fuente normativa utilizada (ej. *"Basado en el Reglamento de Patentes del Cantón Central de Alajuela, Art. 14"*). |
| **Vulneración de Privacidad y Ley N.° 8968** | Filtración de datos financieros o personales de asociados a través de APIs de IA. | **Cero Exposición de Datos Privados:** El asistente únicamente procesa información de acceso público. Los datos sensibles de afiliación ingresados en el Wizard jamás se transmiten a modelos de lenguaje externos. |
| **Burbujas de Filtro y Sesgos de Popularidad** | La personalización excesiva podría ocultar a empresas nuevas en beneficio exclusivo de marcas consolidadas. | **Mecanismos de Control Humano:** El usuario dispone de controles visibles para desactivar filtros automáticos y explorar el catálogo completo en orden alfabético o geográfico neutro. |

*(Nota: El diagrama de flujo de la arquitectura RAG se encuentra documentado en la Figura 6 del Visualizador de Figuras del proyecto).*
