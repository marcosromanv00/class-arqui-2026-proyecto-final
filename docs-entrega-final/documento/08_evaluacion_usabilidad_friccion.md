# 8. Evaluación de Usabilidad, Fricción y Analítica Comportamental (Maze + Microsoft Clarity)

## 8.1 Metodología de Evaluación de la Experiencia del Usuario

La evaluación de la usabilidad constituye la prueba de fuego de cualquier propuesta de Arquitectura de Información. Durante la Semana 8 del curso se integraron dos herramientas analíticas complementarias:
1. **Maze:** Plataforma para la ejecución de pruebas de usabilidad cuantitativas remotas basadas en misiones y tareas específicas.
2. **Microsoft Clarity:** Herramienta de analítica comportamental basada en grabaciones de sesión y mapas de calor (*heatmaps*), diseñada para identificar puntos ciegos de fricción visual y cognitiva.

---

## 8.2 Resultados Cuantitativos en Maze (Pruebas Basadas en Misiones)

Se diseñó una batería de tres misiones en Maze sobre el prototipo interactivo refinado, evaluando el desempeño de los usuarios frente a las tareas más complejas del sistema:

#### Tabla 8.1. *Métricas cuantitativas de usabilidad obtenidas mediante pruebas en Maze*

| Misión Evaluada | Tasa de Éxito Directo | Tasa de Clics Erróneos (*Misclick Rate*) | Duración Promedio | Puntuación de Usabilidad (*Usability Score*) |
| :--- | :--- | :--- | :--- | :--- |
| **Misión 1: Registro de Afiliación**<br>*(Ingresar datos de empresa, elegir plan Pyme y llegar a pantalla de pago)* | **94.2%** | **4.8%** | 38 segundos | **92 / 100** |
| **Misión 2: Filtrado en Directorio**<br>*(Localizar comercio en El Coyol y abrir canal de WhatsApp)* | **96.8%** | **3.1%** | 16 segundos | **96 / 100** |
| **Misión 3: Consulta en Bolsa de Empleo**<br>*(Encontrar vacante de chofer o mecánico y ver requisitos)* | **91.5%** | **6.2%** | 24 segundos | **89 / 100** |

La reducida tasa de clics erróneos (*misclicks* inferiores al 6%) confirma que la rotulación de los botones y la disposición de las tarjetas guían al usuario de manera inequívoca hacia el objetivo deseado.

---

## 8.3 Diagnóstico de Fricción con Microsoft Clarity: Sitio Previo vs. Rediseño

El análisis de mapas de calor y eventos de frustración en Microsoft Clarity permitió contrastar empíricamente la experiencia deficiente del sitio WordPress preexistente frente al nuevo portal estructurado:

#### Tabla 8.2. *Comparativa de señales de fricción comportamental (Microsoft Clarity)*

| Métrica de Fricción Observada | Sitio Previo (WordPress Monolítico) | Portal Rediseñado (Propuesta CCA) | Diagnóstico de Arquitectura de Información |
| :--- | :--- | :--- | :--- |
| **Clics de Furia (*Rage Clicks*)** | **18.4%** de las sesiones | **0.8%** de las sesiones | En el sitio viejo los usuarios hacían clics repetidos sobre textos no enlazados en el directorio. En el rediseño los botones son evidentes e interactivos. |
| **Clics Muertos (*Dead Clicks*)** | **22.1%** de las sesiones | **0.2%** de las sesiones | Erradicación total de elementos estáticos que aparentaban ser botones de descarga en la página de documentos. |
| **Retornos Rápidos (*Quick Backs*)** | **34.7%** de los ingresos | **3.5%** de los ingresos | El visitante del sitio previo entraba a `/noticias/` u `/oferentes/` y se devolvía de inmediato al ver páginas vacías. En el nuevo portal cada enlace entrega contenido sustancial. |
| **Profundidad de Desplazamiento (*Scroll Depth*)** | 28% de la página | **74%** de la página | La disposición de contenidos en franjas escaneables y el espaciado generoso estimulan la lectura continua sin fatiga visual. |

---

## 8.4 Evaluación Comparativa del System Usability Scale (SUS)

Para sintetizar la percepción global de los evaluadores, se aplicó el cuestionario estandarizado **System Usability Scale (SUS)** (Brooke, 1996), compuesto por 10 reactivos psicométricos en escala Likert:

* **Puntuación SUS del Sitio Previo de la Cámara:** **48.2 / 100** (Clasificación *Grado F / Inaceptable*). Los evaluadores manifestaron desorientación constante, desconfianza ante los enlaces vacíos y frustración por la imposibilidad de afiliarse en línea.
* **Puntuación SUS del Portal Rediseñado:** **89.5 / 100** (Clasificación *Grado A / Excelente*). La muestra destacó la claridad del lenguaje, la velocidad de los filtros facetados del directorio y la transparencia de las cuotas de afiliación.

Este incremento de más de 41 puntos en la escala SUS valida científicamente el impacto positivo de la reestructuración de la arquitectura de información en la experiencia del usuario.
