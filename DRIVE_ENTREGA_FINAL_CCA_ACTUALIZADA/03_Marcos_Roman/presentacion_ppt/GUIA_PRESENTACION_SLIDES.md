# Guía Maestra de la Presentación Ejecutiva (Deck Oficial 16:9)

**Proyecto:** Rediseño de Arquitectura de Información · Cámara de Comercio de Alajuela (CCA)  
**Curso:** EIF-511 Arquitectura de Información · Universidad Nacional de Costa Rica (UNA)  
**Equipo Consultor:** Marcos Román Valverde (Coord.) · Emanuel Soto · Allan Arce  
**Archivo PowerPoint Generado:** [`Presentacion_Final_CCA_UNA.pptx`](Presentacion_Final_CCA_UNA.pptx)  
**Principios de Diseño Aplicados:** *The 3-Second Glance Test*, *Radical Minimalism*, *One Idea per Slide*, *Action Titles* y *Cero AI-Slop*.

---

## 1. Hilo Narrativo y Estructura Dramática

La presentación no recita capítulos técnicos aislados; cuenta una historia humana y gremial estructurada en 5 actos:

```
[ ACTO 1: LA REALIDAD ] ──► [ ACTO 2: EL CONFLICTO ] ──► [ ACTO 3: LA CIENCIA ] ──► [ ACTO 4: LA SOLUCIÓN ] ──► [ ACTO 5: EL IMPACTO ]
43 años de historia          Don Carlos y Valeria          OptimalSort N=18              5 ramas + Wizard              SUS 89.5 (+41 pts)
frente a un portal roto       frente a un muro digital      desmonta el árbol rígido      SINPE + Algolia               Rage clicks: 0.8%
```

---

## 2. Desglose Slide por Slide (Texto Mínimo & Escaneo Rápido)

### Slide 1: La Portada (El Gancho Humano)
* **Categoría:** `UNIVERSIDAD NACIONAL DE COSTA RICA · EIF-511`
* **Titular Principal (Hero):** *"Por el comercio. Por Alajuela."*
* **Bajada:** Reingeniería de Arquitectura de Información para el Portal Digital de la Cámara de Comercio de Alajuela (1983–2026).
* **Ficha Técnica:** Marcos Román Valverde (Coord.) · Emanuel Soto · Allan Arce | Docente: MSc. Cynthia Bolaños Espinoza.
* **Propósito en Escena:** Establecer solemnidad gremial, arraigo territorial y profesionalismo inmediato.

---

### Slide 2: El Contexto (La Brecha Oculta)
* **Categoría:** `01. CONTEXTO & PUNTO DE PARTIDA`
* **Acción / Titular:** *"Una institución de 43 años con un portal que alejaba a sus propios socios"*
* **Subtítulo:** La Cámara nació en 1983 para respaldar al comercio. En internet ocurría lo contrario.
* **3 Tarjetas Numéricas de Alto Impacto:**
  1. **1983** | *AÑO DE FUNDACIÓN* | Cuatro décadas defendiendo al comercio formal, MIPYMES y zonas francas de Alajuela.
  2. **16** | *CANTONES DE INFLUENCIA* | Representación estratégica provincial desde Alajuela Centro hasta El Coyol, Grecia y San Ramón.
  3. **4** | *CLICS CIEGOS PREVIOS* | El sitio anterior forzaba al usuario a adivinar categorías ocultas para encontrar un simple teléfono.

---

### Slide 3: El Conflicto Humano (Don Carlos y Valeria)
* **Categoría:** `02. LA FRICCIÓN HUMANA`
* **Acción / Titular:** *"Dos realidades alajuelenses frente a un muro digital"*
* **Subtítulo:** La mala arquitectura no es un tecnicismo: es tiempo y dinero perdido para personas reales.
* **2 Columnas Enfrentadas:**
  * **Don Carlos Alvarado (52 años) · Ferretero Tradicional (Calle Ancha):**
    * *Fricción:* Entraba a la bolsa de empleo para contratar un bodeguero y la página salía en blanco con error. Terminaba viajando en bus a dejar un papel a la sede física.
    * *Solución:* Bolsa de Empleo en el menú superior a 1 clic y confirmación asistida vía WhatsApp oficial.
  * **Licda. Valeria Brenes (29 años) · Emprendedora Digital (La Guácima):**
    * *Fricción:* Quería afiliar su agencia en línea. Precios ocultos y sólo un archivo PDF de 62 KB para imprimir a mano.
    * *Solución:* Wizard de afiliación 100% digital en 3 minutos, pago SINPE Móvil y ahorro deducible bajo la Ley 7092.

---

### Slide 4: El Diagnóstico Forense (Los 3 Pecados Capitales)
* **Categoría:** `03. DIAGNÓSTICO HEURÍSTICO`
* **Acción / Titular:** *"Tres patologías críticas destruían la credibilidad del portal"*
* **Subtítulo:** Auditoría técnica sobre el WordPress preexistente basada en Nielsen y Halvorson.
* **3 Tarjetas Diagnósticas:**
  1. **Canibalización SEO (`/` vs `/home`):** La portada existía bajo dos URLs con menús distintos. Confundía a Google y hacía que el visitante sintiera que navegaba en dos webs distintas.
  2. **Secciones Fantasma (`/oferentes/` y `/noticias/`):** Promesas rotas en la cabecera. Clics que llevaban a pantallas en blanco con *"No se encontraron entradas"*.
  3. **El Trámite Huérfano (`/documentos/`):** Cero transaccionalidad. Para afiliarse había que descargar un PDF manual, imprimirlo y llevarlo físicamente.

---

### Slide 5: El Giro Científico (Optimal Workshop N=18)
* **Categoría:** `04. VALIDACIÓN EMPÍRICA`
* **Acción / Titular:** *"Dejamos de adivinar: 18 comerciantes reales modelaron la estructura"*
* **Subtítulo:** Subsanación del Avance 1: sustituimos los consensos artificiales por variabilidad real (Kuric et al., 2025).
* **3 Métricas Científicas:**
  1. **N=18** | *PARTICIPANTES REALES* | Estratificados en 3 cohortes: Tradicionales (7), Profesionales B2B (6) y Emprendedores (5).
  2. **540** | *CLASIFICACIONES PROCESADAS* | 100% de completitud en OptimalSort evaluando 30 conceptos representativos.
  3. **72% – 94%** | *DISPERSIÓN NATURAL* | Afinidad empírica que desnudó fricciones en patentes, empleo y convenios antes de tocar código.

---

### Slide 6: El Hallazgo de Oro (Polijerarquía Validada)
* **Categoría:** `05. HALLAZGO CIENTÍFICO`
* **Acción / Titular:** *"La rigidez del árbol expulsaba a los usuarios: adoptamos Polijerarquía"*
* **Subtítulo:** Forzar una única ruta lógica provocaba que el 33% de los usuarios no encontrara el servicio (Ladisa et al., 2023).
* **3 Decisiones Estructurales:**
  * **Guía de Patentes:** 67% la buscaba en Servicios, 22% en Institucional y 11% en Afiliación. *Solución:* Ruta canónica en Servicios con accesos cruzados en el formulario de afiliación.
  * **Bolsa de Empleo:** El 50% de usuarios B2B la buscaba ligada al Directorio. *Solución:* Nodo de primer nivel y enlace directo en la cabecera del directorio.
  * **Convenios Comerciales:** Dividida entre Afiliación y Directorio. *Solución:* Catálogo en Directorio y retorno de inversión visible en el Wizard.

---

### Slide 7: La Nueva Arquitectura (Sitemap en 5 Ejes)
* **Categoría:** `06. ARQUITECTURA PROPUESTA`
* **Acción / Titular:** *"Cinco ramas maestras. Cero callejones sin salida."*
* **Subtítulo:** Estructura balanceada en 3 niveles de profundidad máxima: ningún contenido vital a más de 2 clics.
* **5 Columnas de Navegación Horizontal:**
  1. **Institucional (`/la-camara`):** Misión, Junta Directiva, Estatutos y Reseña histórica desde 1983.
  2. **Servicios (`/servicios`):** Centro de Arbitraje Mercantil (Ley 7727), Patentes Municipales y Convenios.
  3. **Directorio (`/directorio`):** Buscador facetado por cantón, sello de Afiliado CCA y WhatsApp directo.
  4. **Bolsa Empleo (`/empleo`):** Vacantes activas en El Coyol y Alajuela Centro + postulación digital.
  5. **Contacto (`/contacto`):** Sede en Plaza Tomás Guardia, canal oficial de WhatsApp y Preguntas Frecuentes.
* **Llamada a la Acción Transversal:** Botón magnético contrastado en Rojo Carmín: *Afiliar mi Empresa* (`/afiliarse`).

---

### Slide 8: Diseño Visual Anti-Slop (Estilo Editorial ICC)
* **Categoría:** `07. SISTEMA DE DISEÑO VISUAL`
* **Acción / Titular:** *"Inspiración editorial ICC: 85% fondo blanco y cero adornos inútiles"*
* **Subtítulo:** Benchmark oficial: International Chamber of Commerce (`iccwbo.org`).
* **3 Pilares Estéticos:**
  * **Paleta Cívica:** Rojo Carmín (`#991B1B`) y Negro Grafito (`#09090B`). Erradicación de azules genéricos.
  * **Tipografía Serena:** Titulares en *Newsreader* (serif editorial) + interfaz en *Inter*. Cero tipografías ultra-gruesas o chillonas.
  * **Cero "AI Slop":** Sin gradientes morados artificiales ni badges falsos. Bordes limpios de 1px y fotografía documental auténtica de comercio local.

---

### Slide 9: Funcionalidad: Directorio Facetado Inteligente
* **Categoría:** `08. FUNCIONALIDAD: DIRECTORIO`
* **Acción / Titular:** *"Encontrar un taller en El Coyol ahora toma menos de lo que dura un parpadeo"*
* **Subtítulo:** Reducción del tiempo de búsqueda de más de 2 minutos a 19 segundos.
* **3 Pilares Tecnológicos:**
  * **Algolia Search en < 20 ms:** Búsqueda predictiva instantánea mientras se escribe (*as-you-type*) con tolerancia a errores tipográficos.
  * **Filtros por Cantón y Sector:** Segmentación territorial en los 16 cantones alajuelenses y 8 sectores comerciales formales.
  * **ROI Tangible de Afiliación:** Sello de verificación CCA, cálculo de ahorro de convenios y contacto directo a WhatsApp.

---

### Slide 10: Conversión Digital: Wizard de Afiliación SINPE
* **Categoría:** `09. CONVERSIÓN & FINANZAS`
* **Acción / Titular:** *"Afiliarse ya no requiere papel: 3 minutos y 100% deducible de renta"*
* **Subtítulo:** De un PDF manual de 62 KB a un embudo transaccional guiado en 3 etapas.
* **3 Pasos Transparentes:**
  * **Paso 1 (Identificación):** Cédula Jurídica y datos de la empresa con validación reactiva en cliente.
  * **Paso 2 (Transparencia Fiscal):** Cálculo automático del arancel y recordatorio del Artículo 8 de la Ley 7092: gasto 100% deducible de renta.
  * **Paso 3 (Pago Inmediato):** SINPE Móvil al teléfono oficial (`8703-0792`), validación del comprobante y radicado digital instantáneo.

---

### Slide 11: La Prueba de Fuego: Métricas de Usabilidad
* **Categoría:** `10. EVALUACIÓN CUANTITATIVA`
* **Acción / Titular:** *"Los números no mienten: la usabilidad subió 41 puntos"*
* **Subtítulo:** Telemetría de comportamiento y psicometría comparando el portal viejo vs el rediseñado.
* **3 Métricas Heroicas:**
  * **89.5** | *SYSTEM USABILITY SCALE (SUS)* | De 48.2 (Grado F / Reprobado) a 89.5 (Grado A / Excelente).
  * **86%** | *ÉXITO DIRECTO EN TREEJACK* | Medido en árbol textual puro sobre 3 tareas críticas: los usuarios llegaron al destino sin desvíos.
  * **0.8%** | *CLICS DE FURIA (RAGE CLICKS)* | En Microsoft Clarity las pulsaciones repetidas por frustración cayeron del 18.4% a prácticamente cero.

---

### Slide 12: Hoja de Ruta Tecnológica (2027)
* **Categoría:** `11. HOJA DE RUTA TECNOLÓGICA`
* **Acción / Titular:** *"Un ecosistema moderno diseñado para evolucionar"*
* **Subtítulo:** Plan de adopción progresivo por trimestres para garantizar sostenibilidad institucional.
* **4 Fases Trimestrales:**
  * **T1 – 2027 (Puesta en Producción):** Despliegue en Vercel, vinculación de Strapi Cloud y primer índice de Algolia.
  * **T2 – 2027 (Autogestión Empresarial):** Portal de autoservicio para agremiados al día (editar perfil y vacantes).
  * **T3 – 2027 (Asistente RAG con IA):** Integración del pipeline en Python con WhatsApp oficial para resolver dudas de estatutos 24/7.
  * **T4 – 2027 (Observatorio Económico):** Tablero provincial interactivo de comercio para la toma de decisiones gremiales.

---

### Slide 13: Conclusión y Cierre Humano
* **Categoría:** `CONCLUSIÓN GENERAL · EQUIPO CONSULTOR EIF-511`
* **Frase de Cierre (Hero):**  
  > *"La Arquitectura de Información no es decorar pantallas.  
  > Es conectar a quienes producen con quienes necesitan, sin fricción y con orgullo alajuelense."*
* **Llamado al Diálogo:**  
  ¡Muchas gracias! Espacio abierto para preguntas y retroalimentación.  
  *Prototipo interactivo navegable disponible en vivo · Repositorio: github.com/marcosromanv00/class-arqui-2026-proyecto-final*

---

## 3. Principios de Defensa Oral para el Equipo (60 Minutos)

1. **No leas las diapositivas:** La diapositiva es el ancla visual del público; tú eres la voz que explica el por qué.
2. **Habla de comerciantes, no de divs ni clases CSS:** La profesora evalúa arquitectura de información y valor de negocio. Cita a Don Carlos, a Valeria, al ferretero de Calle Ancha y a las empresas de El Coyol.
3. **Muestra el prototipo en vivo después del Slide 9 o 10:** Abre una pestaña con el prototipo Next.js, haz una búsqueda en el directorio tecleando *"taller"* y muestra cómo responde en tiempo real.
