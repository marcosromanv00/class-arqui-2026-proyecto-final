# 8. Decisiones Finales de Consultoría

## 8.1 Matriz de Decisiones de Arquitectura de Información

Una vez completada la experimentación y el levantamiento de datos en cada herramienta del proyecto, se consolidaron las decisiones estructurales que gobiernan la nueva plataforma digital de la Cámara de Comercio de Alajuela, descartando opciones que introducían fricción, costos desproporcionados o complejidad innecesaria:

**Tabla 11.**  
*Matriz de decisiones estructurales y tecnológicas adoptadas en el proyecto*

| Área de Arquitectura | Alternativa Evaluada / Descartada | Decisión Final Implementada | Evidencia Empírica que Justifica la Decisión |
| :--- | :--- | :--- | :--- |
| **Jerarquía y Sitemap** | Menú horizontal saturado (42 enlaces) o jerarquía excluyente | Sitemap de 26 nodos en 3 niveles con 3 rutas de polijerarquía | El estudio OptimalSort (N=18) reveló 28%–43% de divergencia en patentes y convenios; la polijerarquía elevó el éxito en Treejack a 96.3%. |
| **Motor del Directorio** | Coincidencia exacta SQL o búsqueda vectorial en todo el directorio | Algolia Search (171 asociados) + 52 grupos de sinónimos + corrector en 0 resultados | El problema medido era de vocabulario (64 etiquetas dispersas). Los sinónimos y exclusión de `address` bajaron las búsquedas vacías de 23% a 6% en 4.5 ms. |
| **Gestión de Contenido** | WordPress monolítico con datos incrustados en plantillas HTML | Strapi v5.61 Headless CMS con listas cerradas y vigencia automática | Rechaza errores como *"Alajuel"* o *"San Ramon"*, oculta vacantes vencidas por fecha (`$gte`) y reduce la publicación de 72 h a 30 segundos. |
| **Experiencia y Canales** | Sitio estático aislado percibido como «ente fantasma» | Mapa de viaje de 25 cuadrantes en Miro y estrategia social omnicanal | Convierte el cuello de botella de afiliación presencial (curva Likert −2) en un flujo digital guiado (+2) articulado con LinkedIn, Instagram y WhatsApp. |
| **Consultas Normativas** | Chatbot generativo libre con riesgo de alucinación legal | Asistente RAG en Python con similitud coseno por bigramas y umbral `0.15` | Recupera artículos exactos de estatutos (1983), Ley 7092 y Ley 7727 (scores 0.38–0.45 en < 1.5 s) y deriva a WhatsApp cuando `score < 0.15`. |
| **Afiliación y Cobro** | Formulario físico en papel y depósito bancario en ventanilla | Checkout wizard de 3 pasos con SINPE Móvil (`8703-0792`) y BAC Compra-Click | Valida prefijos móviles, checksum de Luhn y bloqueo *anti-replay* (12/12 tests exitosos), transparentando el ahorro fiscal del 15% (Art. 8, Ley 7092). |

## 8.2 Matriz de Viabilidad Técnica y Financiera ($0.00/Mes)

Un requisito indispensable para la adopción institucional por parte de la Cámara de Comercio de Alajuela consiste en no comprometer su presupuesto operativo con licencias recurrentes. La totalidad de la arquitectura implementada opera dentro de las capas gratuitas oficiales (*Free Tiers*) o mediante software de código abierto autoalojado:

**Tabla 12.**  
*Matriz de viabilidad financiera y consumo proyectado frente a límites de capa gratuita*

| Herramienta / Servicio | Rol en la Arquitectura CCA | Límite de Capa Gratuita | Consumo Real / Estimado CCA | Costo Mensual |
| :--- | :--- | :--- | :--- | :--- |
| **Vercel Hosting** | Despliegue del portal web interactivo | 100 GB de banda y despliegues continuos | ~6 GB / mes | **$0.00** |
| **Algolia Search** | Índice predictivo del directorio comercial | 10.000 búsquedas y 10.000 registros/mes | ~2.500 búsquedas y 171 registros | **$0.00** |
| **Strapi Community v5** | Administración headless de socios y vacantes | Código abierto MIT sin límite de registros | 171 comercios y ~30 vacantes | **$0.00** |
| **Microsoft Clarity** | Mapas de calor y detección de clics de furia | Sesiones y mapas de calor ilimitados | ~1.500 sesiones / mes | **$0.00** |
| **Maze (Free Plan)** | Pruebas de misiones y cuestionario SUS | 1 estudio activo por ronda de evaluación | Pruebas semestrales de control | **$0.00** |
| **Miro (Free Plan)** | Tablero colaborativo del Customer Journey Map | 3 tableros editables y API REST | 1 tablero maestro de 25 cuadrantes | **$0.00** |
| **Motor RAG + Corrector** | Recuperación normativa y corrección local | Ejecución local en Python y TypeScript | ~80 consultas / día | **$0.00** |
| **SINPE Móvil (BCCR)** | Cobro de membresías al `+506 8703-0792` | 0% comisión en transferencias directas | ~60 afiliaciones y renovaciones/mes | **$0.00** |
| **Costo Operativo Total** | **Ecosistema Digital Completo de la CCA** | — | — | **$0.00 / mes** |
