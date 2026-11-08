# Libreto de Oratoria y Guion de Defensa de Alto Impacto (EIF-511)

**Proyecto:** Rediseño Integral de la Arquitectura de Información · Cámara de Comercio de Alajuela (CCA)  
**Ponente Principal:** Marcos Román Valverde (Coordinador General)  
**Tiempo Asignado:** 20 minutos cronometrados (Bloque 1: Diagnóstico, Arquitectura y Validación Empírica)  
**Estilo de Comunicación:** Cercano, seguro, narrativo y académicamente blindado (Cero AI-Slop, Cero lectura de diapositivas).

---

## 🎙️ Guion Técnico por Diapositiva: Frase de Entrada, Dato Duro y Transición

### Slide 1: Portada (0:00 – 1:30)
* **Gatillo de Entrada:**  
  *"Muy buenos días, profesora Cynthia y compañeros. Cuando uno camina por la Calle Ancha de Alajuela o recorre los parques industriales de El Coyol, se da cuenta de que el comercio alajuelense no duerme. Sin embargo, su principal institución gremial, fundada en 1983, tenía una presencia digital que parecía haberse quedado dormida hace 20 años."*
* **Dato de Anclaje:**  
  *"Hoy no venimos a presentar un rediseño gráfico ni una plantilla con colores bonitos. Venimos a presentar una reingeniería de Arquitectura de Información sustentada en modelos matemáticos de clasificación, validación con 18 comerciantes reales y una tasa de éxito directo del 86%."*
* **Transición:**  
  *"Para entender hacia dónde fuimos, primero debemos mirar el abismo del que partimos..."*

---

### Slide 2: El Contexto (1:30 – 3:00)
* **Gatillo de Entrada:**  
  *"La Cámara de Comercio de Alajuela representa a 16 cantones de la provincia con mayor dinamismo logístico e industrial del país. Alberga el aeropuerto y las principales zonas francas de manufactura médica de Centroamérica."*
* **Dato de Anclaje:**  
  *"Pero en su portal web preexistente, encontrar un simple trámite o el contacto de un taller asociado tomaba **cuatro clics a ciegas**. Cuatro clics donde cada enlace roto era una oportunidad de negocio perdida para un comerciante formal."*
* **Transición:**  
  *"Y esto no es una abstracción estadística; esto le dolía todos los días a personas con nombre y apellido."*

---

### Slide 3: El Conflicto Humano: Don Carlos y Valeria (3:00 – 4:45)
* **Gatillo de Entrada:**  
  *"Permítanme presentarles a Don Carlos Alvarado, 52 años, ferretero de segunda generación cerca del Mercado Central de Alajuela. Don Carlos necesitaba contratar un bodeguero. Entraba al sitio web de su Cámara, hacía clic en Bolsa de Empleo, y el sistema le devolvía una pantalla en blanco con error. ¿Qué hacía Don Carlos? Cerraba la computadora, perdía media mañana y se montaba en un bus a dejar un papel a la sede física."*
* **El Contraste:**  
  *"Al otro lado del cantón, en La Guácima, la Licda. Valeria Brenes, de 29 años, quería afiliar su agencia de desarrollo de software. Buscaba precios, buscaba agilidad digital. ¿Qué encontró? Un enlace a un PDF de 62 kilobytes que tenía que imprimir, firmar con lapicero y escanear. Valeria no imprimió el PDF; simplemente no se afilió."*
* **Transición:**  
  *"Don Carlos y Valeria representan los dos extremos de la brecha digital alajuelense. Para resolver sus problemas, ejecutamos una auditoría forense."*

---

### Slide 4: Diagnóstico Forense y Patologías Heurísticas (4:45 – 6:30)
* **Gatillo de Entrada:**  
  *"Bajo el marco de inspección heurística de Nielsen y la teoría de contenido de Halvorson, identificamos tres patologías críticas que destruían la confianza institucional."*
* **Dato de Anclaje:**  
  *"Primero: **Canibalización SEO severa**. La portada existía simultáneamente en la raíz `/` y en `/home`, con menús desincronizados. Segundo: **Secciones fantasma**. Las rutas `/oferentes/` y `/noticias/` eran promesas rotas con tablas vacías. Tercero: **El trámite huérfano**. Cero comercio electrónico para afiliarse."*
* **Transición:**  
  *"En el Avance 1 cometimos un error metodológico que la profesora nos señaló con total acierto: validar una arquitectura con 2 personas simuladas y un consenso artificial del 100% no es ciencia, es complacencia. Por eso, cambiamos radicalmente las reglas del juego."*

---

### Slide 5: El Giro Científico en Optimal Workshop (6:30 – 8:30)
* **Gatillo de Entrada:**  
  *"Convocamos a **18 participantes reales** de Alajuela, estratificados en tres cohortes operativas: comerciantes tradicionales, despachos profesionales B2B y emprendedores digitales."*
* **Dato de Anclaje:**  
  *"En la suite OptimalSort procesamos **540 asignaciones de tarjetas**. Como demuestran Kuric et al. en sus investigaciones de 2025, la variabilidad es la huella digital del comportamiento humano. Obtuvimos niveles de afinidad de entre el **72% y el 94%**. Ese margen de dispersión no fue un error: fue la luz que nos indicó exactamente dónde fallaban los modelos mentales convencionales."*
* **Transición:**  
  *"Y ese análisis nos llevó al hallazgo más importante de toda la consultoría..."*

---

### Slide 6: El Hallazgo de Oro: Adopción de Polijerarquía (8:30 – 10:30)
* **Gatillo de Entrada:**  
  *"El gran error de los árboles taxonómicos tradicionales es asumir que el usuario piensa en casillas rígidas y excluyentes. Como demostró Ladisa en 2023 en IEEE, forzar una monojerarquía en conceptos con solapamiento semántico induce al fallo a un tercio de los usuarios."*
* **Dato de Anclaje:**  
  *"Descubrimos que la 'Guía de Patente Municipal' era buscada en un 67% en Servicios, pero un 22% la buscaba en Institucional y un 11% en Afiliaciones. ¿Qué hicimos? Establecimos su ubicación canónica en `/servicios/tramites`, pero creamos accesos polijerárquicos contextuales en el paso 1 de afiliación y en el repositorio de normativas. Lo mismo aplicamos con la Bolsa de Empleo y el retorno de convenios."*
* **Transición:**  
  *"Con este modelo flexible y probado, diseñamos el sitemap definitivo."*

---

### Slide 7: La Nueva Arquitectura del Sitemap (10:30 – 12:00)
* **Gatillo de Entrada:**  
  *"Redujimos la navegación superior de más de nueve enlaces desordenados a exactamente **cinco ramas maestras** más un botón magnético de conversión."*
* **Dato de Anclaje:**  
  *"Aplicamos el principio de profundidad máxima de 3 niveles de Bernard (2002): ningún contenido crítico se encuentra a más de dos clics del inicio. Institucional, Servicios, Directorio, Bolsa de Empleo y Contacto. Y sobre todas ellas, el botón prioritario: **'Afiliar mi Empresa'**."*
* **Transición:**  
  *"Pero una arquitectura lógica perfecta fracasa si la interfaz visual le grita al usuario o lo abruma con ruido..."*

---

### Slide 8: Diseño Visual Editorial y Erradicación del AI-Slop (12:00 – 13:45)
* **Gatillo de Entrada:**  
  *"Tomamos como benchmark de clase mundial a la International Chamber of Commerce (iccwbo.org). Decidimos conscientemente erradicar todo rastro de 'AI-Slop': eliminamos los gradientes morados predeterminados, las tarjetas 3D infladas y los botones con sombras excesivas."*
* **Dato de Anclaje:**  
  *"Más del **85% de la interfaz reposa sobre fondos blancos prístinos y neutrales suaves**. Restauramos la paleta de honor de la Cámara: **Rojo Carmín institucional (`#991B1B`)** y **Negro Grafito (`#09090B`)**, combinando la serenidad editorial de la tipografía Newsreader con la precisión funcional de Inter."*
* **Transición:**  
  *"Veamos cómo cobra vida esta filosofía en el Directorio Comercial."*

---

### Slide 9: El Directorio Inteligente con Algolia (13:45 – 15:30)
* **Gatillo de Entrada:**  
  *"¿Recuerdan los 4 clics ciegos del sitio anterior? Hoy, encontrar un taller mecánico en El Coyol toma exactamente **19 segundos**."*
* **Dato de Anclaje:**  
  *"Descartamos las consultas SQL lentas tipo `LIKE %query%`. Implementamos un índice invertido en memoria RAM con Algolia que entrega resultados en menos de **20 milisegundos**. Incorporamos el algoritmo de Damerau-Levenshtein para tolerar faltas ortográficas y tildes omitidas desde el celular, integrando filtros facetados por cantón y botón directo a WhatsApp con distintivo de Afiliado Verificado."*
* **Transición:**  
  *"Y para quien decide formalizar su ingreso a la Cámara, rediseñamos por completo el embudo de conversión."*

---

### Slide 10: Wizard de Afiliación Transaccional y SINPE (15:30 – 17:00)
* **Gatillo de Entrada:**  
  *"El PDF huérfano de 62 KB es historia. Diseñamos un Wizard guiado en 3 etapas que se completa en menos de tres minutos."*
* **Dato de Anclaje:**  
  *"En el Paso 2 transparentamos una ventaja fiscal que el sitio anterior jamás mencionó: bajo el **Artículo 8 de la Ley N° 7092**, la cuota gremial es **100% deducible del impuesto de renta**. Y en el Paso 3, integramos pago directo por **SINPE Móvil** con validación de comprobante bancario, prevención contra ataques de re-ejecución (*anti-replay*) y generación inmediata de folio digital de radicación."*
* **Transición:**  
  *"Toda esta reingeniería tenía que someterse a la prueba de fuego de las métricas objetivas..."*

---

### Slide 11: La Prueba de Fuego: Métricas de Usabilidad (17:00 – 18:30)
* **Gatillo de Entrada:**  
  *"Sometimos el prototipo a pruebas psicométricas y de telemetría de comportamiento contra el sitio previo."*
* **Dato de Anclaje:**  
  *"Los resultados son contundentes:  
  1. El **System Usability Scale (SUS)** subió de un reprobado **48.2 (Grado F)** a un sobresaliente **89.5 (Grado A Excelente)**: una ganancia de más de 41 puntos.  
  2. En la prueba de árbol textual puro en **Treejack**, obtuvimos un **86% de éxito directo** sin desvíos.  
  3. En Microsoft Clarity, los **clics de furia (*rage clicks*)** se desplomaron del **18.4% al 0.8%**."*
* **Transición:**  
  *"Esto demuestra que el sistema no sólo es estéticamente sobrio, sino cognitivamente eficiente."*

---

### Slide 12 y 13: Hoja de Ruta y Conclusión con Propósito (18:30 – 20:00)
* **Gatillo de Entrada:**  
  *"Dejamos una hoja de ruta técnica clara para 2027: despliegue headless en Vercel y Strapi Cloud en el primer trimestre, portal de autogestión de socios en el segundo, y nuestro asistente RAG de inteligencia artificial en WhatsApp para el tercero."*
* **Cierre Humano Memorable:**  
  *"Profesora, compañeros: a lo largo de este ciclo aprendimos que la Arquitectura de Información no consiste en diseñar pantallas bonitas. Consiste en diseñar puentes. Puentes para que Don Carlos no pierda su mañana en un bus, y para que Valeria encuentre en su Cámara local el respaldo para hacer crecer su empresa.*  
  *La nueva plataforma de la Cámara de Comercio de Alajuela está lista. Muchas gracias, y quedamos atentos a sus preguntas y comentarios."*

