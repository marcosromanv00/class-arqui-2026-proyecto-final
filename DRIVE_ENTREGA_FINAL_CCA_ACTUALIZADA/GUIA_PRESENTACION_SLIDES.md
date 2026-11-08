# Guía Maestra de la Presentación Ejecutiva (Deck Oficial 16:9)

**Proyecto:** Rediseño de Arquitectura de Información · Cámara de Comercio de Alajuela (CCA)  
**Curso:** EIF-511 Arquitectura de Información · Universidad Nacional de Costa Rica (UNA)  
**Equipo Consultor:** Marcos Román Valverde (Coord.) · Emanuel Soto · Allan Arce  
**Archivo PowerPoint:** [`Presentacion_Final_CCA_UNA.pptx`](Presentacion_Final_CCA_UNA.pptx) (16 Diapositivas Widescreen 16:9)  
**Principios de Diseño:** *The 3-Second Glance Test*, *Radical Minimalism*, *One Idea per Slide*, *Action Titles* y *Cero AI-Slop*.

---

## 1. Hilo Narrativo y Estructura Dramática (5 Actos)

```
[ ACTO 1: LA REALIDAD ] ──► [ ACTO 2: EL CONFLICTO ] ──► [ ACTO 3: LA CIENCIA ] ──► [ ACTO 4: LA SOLUCIÓN ] ──► [ ACTO 5: EL IMPACTO ]
43 años de historia          Comerciantes vs Muro          OptimalSort N=18              5 Ramas + Algolia             SUS 89.5 (+41 pts)
frente a un portal roto       Digital de desinformación    desmonta el árbol rígido      Strapi + Miro + Pasarela      Rage clicks: 0.8%
```

---

## 2. Desglose Slide por Slide (16 Diapositivas)

### Slide 1: Portada Institucional (Marcos Román)
* **Titular Principal:** *"Por el comercio. Por Alajuela."*
* **Bajada:** Reingeniería Integral de Arquitectura de Información y Plataforma Digital · Cámara de Comercio de Alajuela (1983–2026).
* **Ficha:** Marcos Román Valverde (Coord.) · Emanuel Soto · Allan Arce | Docente: MSc. Cynthia Bolaños Espinoza.

### Slide 2: Contexto & Punto de Partida (Marcos Román)
* **Titular de Acción:** *"Una institución de 43 años con un portal que alejaba a sus propios socios"*
* **Métricas:** 1983 (Año de fundación), 16 cantones de influencia provincial, 4 clics ciegos previos.

### Slide 3: La Fricción Humana (Marcos Román)
* **Titular de Acción:** *"Realidades alajuelenses frente a un muro digital de desinformación"*
* **Arquetipos:** Don Carlos / Doña Rosa (comercio tradicional en Calle Ancha) vs Valeria / Mariana (empresa B2B y servicios cloud).

### Slide 4: Diagnóstico Heurístico Forense (Marcos Román)
* **Titular de Acción:** *"Tres patologías críticas destruían la credibilidad del portal anterior"*
* **Patologías:** Canibalización SEO (`/` vs `/home`), Secciones fantasma (`/oferentes/`) y el Trámite huérfano (PDF 62 KB).

### Slide 5: Validación Empírica Rigurosa (Marcos Román)
* **Titular de Acción:** *"Dejamos de adivinar: 18 participantes reales modelaron la estructura"*
* **Métricas:** $N=18$ participantes estratificados, 540 clasificaciones en OptimalSort, 72%–94% de dispersión natural (Kuric et al., 2025).

### Slide 6: Hallazgo Científico: Polijerarquía (Marcos Román)
* **Titular de Acción:** *"La rigidez del árbol expulsaba a los usuarios: adoptamos Polijerarquía"*
* **Decisiones:** Guía de Patente Municipal (multiruta), Bolsa de Empleo Cantonal (nodo directo) y Convenios integrados al catálogo.

### Slide 7: Arquitectura Propuesta (Marcos Román)
* **Titular de Acción:** *"Cinco ramas maestras. Cero callejones sin salida."*
* **Estructura:** `/la-camara`, `/servicios`, `/directorio`, `/empleo`, `/contacto` + Botón Magnético `/afiliarse`.

### Slide 8: Sistema de Diseño Visual Anti-Slop (Emanuel Soto)
* **Titular de Acción:** *"Inspiración editorial ICC: 85% fondo blanco y cero adornos inútiles"*
* **Pilares:** Paleta Rojo Carmín (`#991B1B`), tipos *Newsreader* + *Plus Jakarta Sans*, fotografía documental y cero gradientes morados.

### Slide 9: Búsqueda Inteligente con Algolia Cloud (Allan Arce)
* **Titular de Acción:** *"Algolia Cloud indexa los 171 comercios reales con latencia < 20 ms"*
* **Pilares:** 171 comercios reales, 52 grupos de sinónimos alajuelenses, facetado geográfico y reducción de búsquedas vacías del 23% al 6%.

### Slide 10: Corrección Semántica con IA (Allan Arce)
* **Titular de Acción:** *"Endpoint `/api/corregir` con Azure OpenAI y fallback heurístico local"*
* **Pilares:** Recuperación semántica de erratas complejas ("fereteria en el collor"), fallback local resiliente y re-búsqueda automática.

### Slide 11: CMS Headless Strapi 5.61 (Emanuel Soto)
* **Titular de Acción:** *"Strapi v5.61 desacopla el contenido y erradica los errores ortográficos"*
* **Pilares:** Vocabularios controlados cerrados (16 cantones, 5 sectores macro), script `seed_strapi.js` y publicación autónoma en 30 segundos.

### Slide 12: Customer Journey Map en Miro (Emanuel Soto)
* **Titular de Acción:** *"Tablero 5×5 en Miro transforma la mayor fricción en la mayor conversión"*
* **Pilares:** 25 cuadrantes generados vía Miro API, salto de satisfacción de $-2$ a $+2$ en la afiliación y estrategia omnicanal (LinkedIn, Instagram, WhatsApp).

### Slide 13: Asistente RAG con IA Generativa (Marcos Román)
* **Titular de Acción:** *"Inteligencia Artificial fundamentada en el corpus oficial de la CCA"*
* **Pilares:** ChromaDB + embeddings sobre estatutos gremiales, cálculo de ahorro fiscal (Art. 8 Ley 7092) y canal SINPE oficial `8703-0792`.

### Slide 14: Transaccionalidad & Pagos Simulados (Allan Arce)
* **Titular de Acción:** *"Pasarela en `src/lib/pagos.ts` con validación Luhn, anti-replay y 12/12 pruebas"*
* **Pilares:** Algoritmo de Luhn, formato de celular costarricense, protección anti-replay con radicado único y aviso visible de simulación académica.

### Slide 15: Evaluación Cuantitativa de Usabilidad (Allan Arce)
* **Titular de Acción:** *"Los números ratifican el éxito: la usabilidad subió a 89.5 puntos"*
* **Pilares:** SUS 89.5 (Grado A Excelente vs 48.2 anterior), 86% de éxito directo en Treejack y 0.8% de rage clicks en Microsoft Clarity.

### Slide 16: Conclusión General & Cierre Humano (Equipo)
* **Frase de Cierre:**
  > *"La Arquitectura de Información no es decorar pantallas.  
  > Es conectar a quienes producen con quienes necesitan, sin fricción y con orgullo alajuelense."*
* **Apertura:** Espacio para preguntas y retroalimentación de la docente.

---

## 3. Plan de Roles y Tiempos para el Martes (Total: ~30 min + Preguntas)

| Bloque | Expositor | Diapositivas | Tiempo Estimado | Enfoque Principal |
| :--- | :--- | :---: | :---: | :--- |
| **Apertura & Diagnóstico** | **Marcos Román** (Coord.) | 1 a 7 | **8 – 10 min** | Contexto histórico, patologías del sitio anterior, estudio con $N=18$ (Optimal Workshop), polijerarquía y sitemap. |
| **Diseño, CMS & Journey** | **Emanuel Soto** | 8, 11 y 12 | **6 – 8 min** | Sistema de diseño editorial ICC, arquitectura headless en Strapi 5.61 con vocabularios cerrados y Customer Journey Map 5×5 en Miro. |
| **Búsqueda, Pagos & Métricas** | **Allan Arce** | 9, 10, 14 y 15 | **8 – 10 min** | Algolia Cloud con 171 comercios reales, corrección IA `/api/corregir`, pasarela simulada con Luhn/anti-replay y métricas SUS (89.5). |
| **RAG & Demo en Vivo** | **Marcos Román** | 13 y 16 + Demo | **5 – 6 min** | Asistente RAG con ChromaDB/Ley 7092, navegación ágil en el portal y cierre humano. |
| **Defensa & Preguntas** | **Todo el equipo** | — | **15 – 20 min** | Respuestas técnicas y metodológicas a la docente MSc. Cynthia Bolaños. |

---

## 4. Guion Rápido para la Demo en Vivo (3 Minutos)

1. **Búsqueda Instantánea con Algolia (`/directorio`):**
   * Teclea *"ferretería"* o *"taller"* y muestra cómo aparecen los resultados en $<20\text{ ms}$.
   * Filtra por cantón (*"Alajuela"* o *"San Ramón"*) y muestra la ficha con el botón de WhatsApp directo.
2. **Corrección Semántica con IA (`/api/corregir`):**
   * Teclea intencionalmente *"fereteria en el collor"* y observa cómo el sistema sugiere *"Ferretería en El Coyol"* sin pantallas en blanco.
3. **Wizard de Afiliación Transaccional (`/afiliarse`):**
   * Llena el paso 1 con datos ficticios.
   * En el paso 2, resalta el desglose del arancel y el aviso de deducibilidad fiscal bajo la Ley 7092.
   * En el paso 3, selecciona SINPE Móvil o Tarjeta de prueba, procesa el pago y muestra el número de radicado generado con estado *"En Aprobación · Tesorería CCA"* y el banner visible de advertencia académica.

---

## 5. Recomendaciones Clave para la Defensa Oral

1. **Habla de Personas y Negocio:** Cita a Don Carlos (el ferretero de Calle Ancha) y a Valeria (la emprendedora de La Guácima). La docente valora la empatía y la solución a problemas reales, no la jerga técnica vacía.
2. **No leas las diapositivas:** La diapositiva contiene el titular de acción y los números de impacto; el expositor debe contextualizar el *por qué* de la decisión de diseño.
3. **Tener backup offline:** Aunque el sitio está desplegado en Vercel (`https://cca-alajuela-portal.vercel.app`), ten levantado `npm run dev` en `localhost:3000` en tu máquina por si la conexión de la universidad falla.
