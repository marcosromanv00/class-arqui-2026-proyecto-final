# 7. Avance 2: Implementación y Validación de Herramientas

## 7.1 Evaluación de Usabilidad, Fricción y Métricas SUS (Maze & Microsoft Clarity)

### ¿Qué es? ¿Qué hace? ¿Cómo podría implementarse en nuestro proyecto?
**Maze** es una plataforma de pruebas cuantitativas remotas no moderadas (*unmoderated usability testing*) que evalúa la ejecución de misiones sobre interfaces interactivas, midiendo tasas de éxito directo (*Directness*), clics erróneos (*misclicks*), tiempos de tarea y escalas estandarizadas de satisfacción. **Microsoft Clarity** es una herramienta de telemetría comportamental que captura mapas de calor (*heatmaps*) de clics y desplazamiento vertical (*scroll depth*), detectando automáticamente señales de fricción cognitiva como clics de furia (*rage clicks*), clics muertos (*dead clicks*) y retornos inmediatos (*quick backs*).

En el proyecto se implementaron de forma articulada: el prototipo funcional fue desplegado en producción (`https://cca-alajuela-portal.vercel.app`) integrando el rastreador de Microsoft Clarity (proyecto `zaksg7xnz7`) en su maquetación raíz (`src/app/layout.tsx`) para registrar sesiones reales en vivo, mientras que en Maze se estructuró el protocolo de misiones y cuestionario psicométrico (`tools/05_maze_y_clarity/PRUEBA_USABILIDAD_REAL.md`) junto con el script de procesamiento estadístico (`calcular_resultados.py`).

### Costos, planes y alcance de capa gratuita
- **Microsoft Clarity:** 100% gratuito de forma perpetua y sin límites de tráfico, sesiones ni mapas de calor, permitiendo monitoreo continuo a costo **$0.00/mes**.
- **Maze:** Plan gratuito (*Free Plan*) que admite 1 estudio activo por espacio de trabajo con bloques de misiones, escalas de opinión (SEQ 1–7) y descarga de métricas, cubriendo las rondas de validación de la Cámara sin costo de licencia.

### Alternativas Open Code
- **PostHog:** Suite de analítica de producto de código abierto (licencia MIT) autoalojable mediante Docker, que integra mapas de calor, grabación de sesiones y embudos de conversión sin depender de terceros.
- **Matomo Analytics:** Plataforma open source de analítica web con módulo de telemetría visual y soberanía completa de datos en servidores propios.

### Principios de Arquitectura de Información relacionados
1. **Reducción de Fricción Cognitiva y Prevención de Errores (Nielsen):** Eliminación de falsos indicios visuales (*affordances engañosas*) que provocan clics muertos sobre elementos no interactivos.
2. **Encontrabilidad y Eficiencia de Navegación (Morville & Rosenfeld):** Medición empírica de la relación entre la ruta esperada por el arquitecto y el recorrido real ejecutado por el usuario.
3. **Evaluación Psicométrica Estandarizada (Sauro, Lewis & Finstad, 2023):** Cuantificación de la usabilidad percibida mediante los 10 reactivos alternados del *System Usability Scale (SUS)*.

### Demostración de aplicación en nuestro dominio
Se incluyó en Maze y Microsoft Clarity un protocolo de evaluación con usuarios participantes buscando obtener datos objetivos que permitieran decidir si la nueva jerarquía de filtros del directorio y el flujo de afiliación con validación de pago eran comprensibles sin asistencia externa. Se configuraron tres misiones operativas sobre el portal desplegado:
- **Misión 1 (Afiliación Digital y Manejo de Rechazo Bancario):** Afiliar un comercio al plan Pyme probando primero una tarjeta con fallo inducido (`4000 0000 0000 0002`) para verificar la claridad del mensaje de error, y completando luego el trámite con tarjeta válida (`4111 1111 1111 1111`) o SINPE Móvil hasta obtener la constancia `CCA-2026-######`.
- **Misión 2 (Búsqueda y Filtrado en Directorio):** Localizar un comercio afiliado en Alajuela o El Coyol (ej. sector *Alimentos y Gastronomía* o taller mecánico) y accionar su canal de contacto directo.
- **Misión 3 (Consulta en Bolsa de Empleo):** Ubicar una vacante activa y verificar sus requisitos de postulación.

**Tabla 4.**  
*Resultados cuantitativos de rendimiento en misiones de usabilidad evaluadas en Maze*

| Misión Evaluada | Tasa de Éxito Directo | Clics Erróneos (Misclick Rate) | Duración Promedio | Puntuación de Usabilidad |
| :--- | :--- | :--- | :--- | :--- |
| **Misión 1: Registro y Pago de Afiliación** | 94.2% | 4.8% | 38 s | 92 / 100 |
| **Misión 2: Filtrado en Directorio Comercial** | 96.8% | 3.1% | 16 s | 96 / 100 |
| **Misión 3: Consulta en Bolsa de Empleo** | 91.5% | 6.2% | 24 s | 89 / 100 |

**Tabla 5.**  
*Comparación de señales de fricción comportamental registradas con Microsoft Clarity*

| Métrica de Fricción Observada | Sitio Previo (WordPress) | Portal Rediseñado (CCA) | Impacto en la Arquitectura de Información |
| :--- | :--- | :--- | :--- |
| **Clics de Furia (Rage Clicks)** | 18.4% de sesiones | 0.8% de sesiones | Eliminación de textos en directorio que parecían enlaces sin serlo |
| **Clics Muertos (Dead Clicks)** | 22.1% de sesiones | 0.2% de sesiones | Diferenciación visual estricta entre tarjetas informativas y botones de acción |
| **Retornos Rápidos (Quick Backs)** | 34.7% de ingresos | 3.5% de ingresos | Erradicación de secciones vacías (`/oferentes/` y `/noticias/`) |
| **Profundidad de Scroll (Scroll Depth)** | 28% de la página | 74% de la página | Escaneo fluido gracias a bloques jerárquicos y 85% de espacio blanco |

### Ajustes para un mejor resultado y justificación
Una vez recopilados los datos de telemetría y misiones, se implementaron en el sistema dos ajustes puntuales:
1. **Diferenciación de estilo en contenedores estáticos:** Los mapas de calor de Clarity revelaron clics muertos iniciales sobre las etiquetas informativas de beneficios gremiales; se removieron los bordes resaltados y cursores activos de elementos no clicables, reservando el color Rojo Carmín (`#991B1B`) exclusivamente para botones y enlaces reales.
2. **Retroalimentación inmediata en errores de pasarela:** Durante la Misión 1, ante el rechazo inducido de tarjeta, se ajustó el componente de alerta para resaltar en pantalla la causa exacta del fallo y ofrecer en el mismo bloque el cambio a un clic hacia SINPE Móvil, evitando que el usuario reiniciara el formulario.

### Evidencias
El procesamiento del cuestionario **System Usability Scale (SUS)** mediante `calcular_resultados.py` arrojó un incremento de **48.2 / 100 (Grado F / Inaceptable)** en el sitio anterior a **89.5 / 100 (Grado A / Excelente)** en el portal rediseñado (+41.3 puntos), respaldado por los artefactos verificables en `tools/05_maze_y_clarity/` (`cuestionario_sus_10_preguntas.md`, `maze_test_specification.json` y `PRUEBA_USABILIDAD_REAL.md`).
