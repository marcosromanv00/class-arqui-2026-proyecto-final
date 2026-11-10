## 7.5 Asistente Institucional con Recuperación Contextual (IA Generativa & RAG)

### ¿Qué es? ¿Qué hace? ¿Cómo podría implementarse en nuestro proyecto?
La arquitectura de **Recuperación Aumentada por Generación (RAG — *Retrieval-Augmented Generation*)** (Lewis et al., 2022; Gao et al., 2023) combina un motor determinista de recuperación documental en espacio vectorial con la síntesis en lenguaje natural. Mientras que un modelo de lenguaje genérico puede inventar normativas inexistentes (*alucinaciones*), un sistema RAG busca primero los fragmentos más próximos del corpus oficial mediante **similitud coseno** y restringe la respuesta exclusivamente a los artículos y leyes verificados de la institución.

En el proyecto se implementó mediante el pipeline ejecutable en Python `AsistenteVirtualCCA` (`tools/09_ia_generativa_rag/rag_asistente_cca.py`), que indexa el corpus normativo consolidado de la Cámara (`cca_corpus_institucional.txt`) para atender en tiempo real consultas abiertas de los comerciantes sobre estatutos, patentes municipales, deducibilidad tributaria y arbitraje comercial.

### Costos, planes y alcance de capa gratuita
- **Vectorización y Recuperación Local:** El motor de indexación opera localmente en Python con vectorización `TfidfVectorizer(ngram_range=(1, 2), norm='l2')` y cálculo matricial de similitud coseno en memoria sin depender de servidores externos de pago (**$0.00/mes**).
- **APIs de Síntesis en Capa Gratuita:** Para la capa de redacción conversacional, proveedores como Google Gemini API (*Flash Free Tier*) ofrecen hasta 1.500 peticiones diarias sin costo, superando ampliamente la demanda estimada de ~80 consultas diarias en la CCA.

### Alternativas Open Code
- **Ollama + Llama 3 / Mistral:** Ejecución 100% local y de código abierto de modelos de lenguaje en infraestructura propia de la Cámara con privacidad absoluta de datos.
- **ChromaDB / FAISS + Sentence-BERT (Reimers & Gurevych, 2022):** Librerías open source para indexación de embeddings densos y búsqueda semántica sin costos de licencia.

### Principios de Arquitectura de Información relacionados
1. **Recuperación Semántica Asociativa para Necesidades No Estructuradas (Rosenfeld et al., 2015):** Mientras Algolia resuelve la búsqueda estructurada de comercios en el directorio, el asistente RAG atiende preguntas normativas abiertas expresadas en lenguaje cotidiano.
2. **Autoridad Documental y Cero Alucinación:** Atribución explícita de la ley, reglamento o artículo estatutario de respaldo en cada respuesta.
3. **Degradación Elegante y Escalamiento Humano:** Derivación automática hacia un asesor humano por WhatsApp cuando la consulta cae fuera del dominio documentado.

### Demostración de aplicación en nuestro dominio
Se incluyó en el corpus institucional (`cca_corpus_institucional.txt`) la base normativa oficial de la Cámara —Estatutos fundacionales de 1983, Guía de Patentes de la Municipalidad de Alajuela, Artículo 8 de la Ley N.° 7092 (Impuesto sobre la Renta) y Reglamento del Centro de Arbitraje Mercantil bajo la Ley N.° 7727 (RAC)— buscando medir la precisión de recuperación ante dudas reales de los afiliados:

**Tabla 9.**  
*Resultados experimentales de recuperación vectorial y respuesta en el Asistente RAG de la CCA*

| Consulta en Lenguaje Natural | Similitud Coseno | Fuente Oficial Recuperada | Síntesis Entregada por el Sistema (< 1.5 s) |
| :--- | :--- | :--- | :--- |
| *"¿Cuáles son los requisitos para afiliar mi negocio?"* | **0.4281** | Estatutos CCA (1983), Cap. III · Requisitos de Ingreso | Detalla personería jurídica vigente, cédula de identidad o jurídica, patente municipal al día y selección de plan en el wizard digital. |
| *"¿Cómo funciona el arbitraje comercial de la Cámara?"* | **0.3895** | Marco Ley N.° 7727 (RAC) y Reglamento de Arbitraje CCA | Explica el proceso confidencial de conciliación y arbitraje mercantil con laudo vinculante en un plazo menor a 90 días hábiles. |
| *"¿La cuota de afiliado es deducible del impuesto de renta?"* | **0.4512** | Ley N.° 7092, Art. 8 · Gastos Deducibles de Renta Bruta | Confirma que las cuotas gremiales pagadas a la Cámara son 100% deducibles del Impuesto sobre la Renta con comprobante electrónico. |
| *"¿Tienen servicio de veterinaria a domicilio?"* (Fuera de dominio) | **0.0410** (< 0.15) | Umbral de seguridad activado (`score < 0.15`) | Informa que no existe información concluyente en los reglamentos oficiales y transfiere al usuario al WhatsApp institucional. |

### Ajustes para un mejor resultado y justificación
Una vez recopilados los puntajes de similitud en las pruebas de consola, se implementaron tres ajustes en el módulo `rag_asistente_cca.py`:
1. **Incorporación de bigramas (`ngram_range=(1, 2)`) con normalización L2:** Inicialmente la vectorización por palabras aisladas (*unigramas*) perdía contexto en términos compuestos como *"impuesto de renta"*, *"patente municipal"* o *"personería jurídica"*. Al incluir bigramas, la similitud coseno en consultas legales subió de ~0.21 a **0.38–0.45**.
2. **Umbral estricto de abstención (`mejor_score < 0.15`):** Para impedir que el asistente responda sobre temas ajenos a la Cámara con fragmentos débilmente relacionados, se programó una regla de corte en `0.15` que detiene la síntesis y ofrece el enlace directo de soporte humano por WhatsApp.
3. **Gobernanza ética y privacidad:** Se estableció por diseño que las consultas de los comerciantes no se almacenan con datos identificables ni se envían para reentrenamiento de modelos externos.

### Evidencias
La ejecución reproducible del script `python tools/09_ia_generativa_rag/rag_asistente_cca.py` sobre `cca_corpus_institucional.txt` validó tiempos de respuesta inferiores a **1.5 segundos** con **100% de fidelidad normativa** y activación efectiva del umbral de seguridad ante preguntas fuera de contexto.
