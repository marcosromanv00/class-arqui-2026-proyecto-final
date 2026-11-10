# 9. Conclusiones y Recomendaciones a Futuro

## 9.1 Conclusiones Estratégicas

1. **La reingeniería de la Arquitectura de Información resuelve las patologías del sitio vigente:** Se unificó la doble página de inicio y el dominio con error 404 bajo una portada canónica, reduciendo los 42 enlaces desarticulados a un sitemap jerárquico de 26 nodos en 3 niveles respaldado por la Ley de Hick.
2. **La validación empírica con participantes (N=18) determinó decisiones estructurales no evidentes:** El estudio en Optimal Workshop demostró que los comerciantes tradicionales y los perfiles corporativos difieren en la clasificación de convenios, patentes y pagos. La incorporación de tres rutas polijerárquicas elevó el éxito directo en Treejack al 86% y el éxito global al 96.3%.
3. **La curaduría de datos y los vocabularios controlados resultaron más determinantes que la complejidad algorítmica:** En el directorio de 171 asociados reales, normalizar las 64 etiquetas originales en 12 sectores, mapear 52 grupos de sinónimos costarricenses y retirar las direcciones por señas de los campos buscables redujo las consultas sin resultados del 23% al 6% con tiempos de 4.5 ms en Algolia.
4. **El desacoplamiento con Strapi v5 garantiza la gobernanza y vigencia del contenido:** Las enumeraciones cerradas para los 16 cantones de Alajuela impiden errores ortográficos de raíz y el filtrado por fecha de cierre oculta automáticamente las vacantes vencidas sin intervención técnica.
5. **La conversión y la usabilidad registraron mejoras cuantificadas:** La articulación del mapa de experiencia en Miro con el wizard transaccional SINPE Móvil / BAC Compra-Click y la telemetría en Maze y Microsoft Clarity redujo los clics de furia del 18.4% al 0.8% y elevó el puntaje SUS de **48.2 (Grado F) a 89.5 puntos (Grado A)**, operando íntegramente a costo **$0.00/mes**.

---

## 9.2 Hoja de Ruta de Implementación (Roadmap en 3 Fases)

Para orientar la adopción gradual de la solución por parte de la Junta Directiva y el personal administrativo de la Cámara, se recomienda la siguiente hoja de ruta:

**Tabla 13.**  
*Cronograma de implementación y evolución recomendada para la Cámara de Comercio de Alajuela*

| Fase y Horizonte | Acciones Prioritarias de Arquitectura y Operación | Condición / Entregable de Cierre |
| :--- | :--- | :--- |
| **Fase 1: Despliegue Canónico y Búsqueda Activa** (Meses 1 a 2) | • Configurar redirección HTTP 301 desde `camara-alajuela.com` y retirar el directorio heredado (`directorio-asociados-old`).<br>• Publicar el portal unificado conectado al índice Algolia de 171 asociados.<br>• Habilitar el wizard de afiliación con cobro vía SINPE Móvil (`8703-0792`) y conciliación por Tesorería. | Portal en producción sin errores 404, directorio buscable en < 15 ms y recepción digital de nuevas afiliaciones. |
| **Fase 2: Gobernanza en Strapi y Asistente RAG** (Meses 3 a 4) | • Capacitar al personal administrativo en la carga de comercios y vacantes desde el panel de Strapi v5.<br>• Enriquecer cada ficha con el campo `palabras_clave_busqueda` (productos específicos como *"leche"*) y activar el *webhook* hacia Algolia.<br>• Integrar el Asistente RAG en la sección de trámites y lanzar la campaña *«Comercio del Mes»* en redes sociales. | Autonomía administrativa total (publicación en 30 s) y atención automatizada de consultas sobre Ley 7092 y patentes. |
| **Fase 3: Analítica Continua y Expansión Provincial** (Meses 5 a 6) | • Auditar mensualmente Algolia Analytics y los mapas de calor de Microsoft Clarity para agregar nuevos sinónimos según términos reales buscados.<br>• Evaluar la activación del corrector ortográfico ante resultados de baja calidad y expandir el padrón hacia parques industriales de El Coyol, Grecia y San Ramón. | Auditoría semestral de mantenimiento ROT y medición de control del índice SUS por encima de 85 puntos. |
