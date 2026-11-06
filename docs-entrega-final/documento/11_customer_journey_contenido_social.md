# 11. Customer Journey Map y Arquitectura de Contenido Social (Miro)

## 11.1 Mapeo de la Experiencia del Usuario (Customer Journey Map en Miro)

La Arquitectura de Información no opera en un vacío estático; debe sincronizarse con el ciclo de vida del usuario a medida que interactúa con la organización a lo largo del tiempo. Durante la Semana 12 se modeló en la herramienta colaborativa **Miro** el *Customer Journey Map* (CJM) para los dos perfiles principales: el comerciante tradicional (Don Carlos) y la emprendedora digital (Licda. Valeria).

El viaje se dividió en cuatro fases estratégicas:

#### Tabla 11.1. *Customer Journey Map: Etapas, puntos de contacto y resolución de fricción*

| Fase del Journey | Puntos de Contacto (*Touchpoints*) | Pensamiento y Emoción del Usuario | Puntos de Dolor Preexistentes Resueltos | Oportunidad de Arquitectura Implementada |
| :--- | :--- | :--- | :--- | :--- |
| **1. Descubrimiento** | Búsqueda en Google, Redes Sociales de la Cámara, Enlaces de la Municipalidad de Alajuela. | *“¿Qué beneficios reales me ofrece afiliarme si ya pago patente municipal?”* (Incertidumbre) | El sitio previo mostraba una portada confusa con enlaces rotos. | **Hero con Propuesta de Valor Directa** y Grilla de Acceso 4x1 que resume los 3 ejes de apoyo institucional. |
| **2. Evaluación de Beneficios** | Directorio Comercial, Tabla Comparativa de Planes, Preguntas Frecuentes. | *“Quiero saber exactamente cuánto cuesta y si mis competidores están en el directorio.”* (Análisis) | En el sitio viejo los aranceles estaban ocultos en un PDF de 62 KB. | **Calculadora de Aranceles E-Commerce** con desglose de IVA y ahorro anual transparente. |
| **3. Afiliación Digital** | Wizard de 3 Pasos, Pasarela SINPE Móvil / BAC Credomatic. | *“Espero que no me exijan imprimir formularios ni ir a hacer fila a las oficinas.”* (Exigencia) | Exigencia previa de trámite presencial en papel con retrasos de semanas. | **Wizard en 3 Pasos con Validación Reactiva** y generación instantánea de comprobante de radicado. |
| **4. Interacción y Fidelización** | Bolsa de Empleo, Directorio de Proveedores, Capacitaciones, Asesoría Legal. | *“Necesito contratar un chofer y contactar a un abogado para un contrato.”* (Satisfacción) | La bolsa de empleo previa arrojaba error de base de datos vacía. | **Subsistema de Bolsa de Empleo** con postulación en un clic y asistente IA para consultas normativas. |

---

## 11.2 Arquitectura de Contenido Social y Señales de Confianza Gremial

En concordancia con los contenidos del Módulo 8 de la cátedra (*Contenido Social: De la participación del usuario a la búsqueda, la confianza y la recomendación*), las señales generadas por la comunidad empresarial se integraron formalmente en la arquitectura del sistema como **metadatos de recuperación y filtrado**:

### 1. La Señal Social como Metadato de Búsqueda
Cuando una empresa asociada recibe interacciones, estas dejan de ser adornos cosméticos y se convierten en atributos indexables:
* **Valoración Cuantitativa (*Rating*):** Dato estructurado (ej. 4.8 estrellas sobre 5) que permite ordenar el directorio por nivel de satisfacción.
* **Reseña Cualitativa (*Review*):** Texto descriptivo donde otros comerciantes argumentan su experiencia (ej. puntualidad en entregas de materiales, calidad del servicio técnico).
* **Distintivo Oficial (*Verified Badge*):** Señal institucional que certifica que la empresa cuenta con personería jurídica activa, patente al día en la Municipalidad de Alajuela y solvencia gremial ante la Cámara.

### 2. Gobernanza de la Confianza y Mitigación de Riesgos
Siguiendo las advertencias teóricas del curso respecto a los riesgos de las folksonomías y las reseñas no controladas (opiniones falsas, difamación, bots y el sesgo de popularidad excesiva):
* **Identidad Verificada:** Para emitir una reseña sobre un comercio afiliado, el usuario debe autenticarse formalmente, erradicando valoraciones anónimas o malintencionadas.
* **Moderación Gremial Preventiva:** La Dirección Ejecutiva de la Cámara cuenta con un panel de moderación en el Headless CMS que audita textos ofensivos o disputas comerciales antes de su publicación.
* **Equilibrio contra la Burbuja de Popularidad:** El algoritmo del directorio no solo posiciona a las empresas con mayor número de comentarios, sino que combina la antigüedad gremial, la rotación de afiliados destacados del mes y la cercanía geográfica por distrito para brindar visibilidad equitativa a nuevos emprendimientos.

*(Nota: La matriz completa del Customer Journey Map se encuentra graficada en la Figura 5 del Visualizador de Figuras del proyecto).*
