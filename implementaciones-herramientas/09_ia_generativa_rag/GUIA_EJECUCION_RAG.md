# Guía de Ejecución Real Paso a Paso: IA Generativa & RAG (Semana 13)
**Proyecto:** Cámara de Comercio de Alajuela (CCA)  
**Herramienta:** Retrieval-Augmented Generation (RAG) en Python 3 con Vector Space Model  
**Costo:** Gratis (100% de ejecución local, sin requerir APIs de pago de OpenAI o Claude, con soporte opcional para cualquier LLM).

---

### Objetivo en el Proyecto
Implementar una arquitectura de Inteligencia Artificial Generativa no alucinante para el portal web de la Cámara. El asistente responde dudas normativas, tarifas de afiliación, deducibilidad ante Hacienda y convenios institucionales únicamente fundamentándose en el corpus oficial de la CCA, citando la sección reglamentaria de origen con cálculo de similitud coseno.

---

### Paso a Paso para la Ejecución Real

#### Paso 1: Conocer el Corpus Institucional
1. El archivo [`cca_corpus_institucional.txt`](file:///c:/Users/marco/OneDrive/Desktop/Proyectos/2- Activos\3- Otros\personal-university-c22026-arqdeinfo\una-arqinf-proy-camaracomercioalajuela\implementaciones_reales\09_ia_generativa_rag\cca_corpus_institucional.txt) contiene las 5 secciones maestras:
   - Sección 1: Naturaleza Jurídica y Personería (Ley 218).
   - Sección 2: Tarifas de Afiliación (Pyme ₡15.000 vs Corporativo ₡35.000) y Deducibilidad Fiscal (Ley 7092).
   - Sección 3: Requisitos Obligatorios para Afiliación Digital.
   - Sección 4: Convenios y Beneficios Vigentes (Salud, Legal, Ferretería).
   - Sección 5: Política y Reglamento de la Bolsa de Empleo.

#### Paso 2: Ejecutar el Asistente en la Terminal
1. Abre tu terminal de PowerShell en la raíz del proyecto.
2. Ejecuta una consulta directa:
   ```bash
   python implementaciones_reales/09_ia_generativa_rag/rag_asistente_cca.py --query="¿Qué convenios en salud ofrece la Cámara?"
   ```
3. El script tokenizará la pregunta, calculará el vector de pesos TF-IDF, comparará la similitud coseno contra todas las secciones y recuperará la `[SECCIÓN 4: CONVENIOS VIGENTES]` mostrando el texto exacto.

#### Paso 3: Modo Interactivo para Demostración en Vivo
1. Ejecuta el modo interactivo:
   ```bash
   python implementaciones_reales/09_ia_generativa_rag/rag_asistente_cca.py --interactive
   ```
2. Puedes formular preguntas como:
   - *"¿Cómo puedo afiliar mi negocio y pagar con SINPE?"*
   - *"¿Es deducible de renta la cuota que le pago a la cámara?"*
   - *"¿Cuáles son los requisitos de personería jurídica?"*
3. Escribe `salir` para terminar la sesión.

#### Paso 4: Evidencias para la Presentación y Trabajo Escrito
1. Toma capturas de pantalla de la terminal mostrando la consulta, el porcentaje de similitud coseno y las fuentes recuperadas.
2. Comprueba cómo esta arquitectura elimina el riesgo de "alucinación" de los modelos LLM convencionales al forzar el anclaje a fuentes institucionales.
