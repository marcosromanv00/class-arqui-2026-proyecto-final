# 5. Organización Jerárquica y Microarquitectura de Contenido (Octopus.do)

## 5.1 Del Sitemap Macro a la Microarquitectura Modular

Mientras que el sitemap en FlowMapp definió el mapa general de rutas del portal, el laboratorio tecnológico de la Semana 5 basado en **Octopus.do** permitió descender hacia la microarquitectura de contenido. Esta disciplina consiste en descomponer cada una de las 26 páginas en módulos y bloques informativos específicos, detallando el propósito comunicativo de cada contenedor antes de iniciar el diseño visual.

La implementación en Octopus.do aportó dos ventajas metodológicas cardinales:
1. **Modelado Modular de Bloques:** Se definieron los componentes obligatorios para cada interfaz (ej. barras de búsqueda rápida, testimonios verificados, filtros facetados, calculadoras de aranceles y llamadas a la acción).
2. **Puente Directo hacia el Prototipado:** Mediante el plugin oficial *Octopus.do to Figma*, la arquitectura completa fue transferida directamente al lienzo de trabajo como un contenedor vectorial nativo de **3200 × 2376 píxeles**, generando marcos editables con capas independientes para títulos, textos, botones y formularios, evitando la pérdida de tiempo asociada a redibujar estructuras estáticas.

---

## 5.2 Hallazgos Críticos de la Auditoría en Octopus.do

El análisis técnico minucioso del árbol de contenido estructurado en la herramienta reveló dos problemas metodológicos que fueron documentados y corregidos de forma inmediata:

### 1. Descontaminación de Bloques de Plantilla en Idioma Inglés
Se constató que catorce de las veintiséis páginas importadas arrastraban encabezados y textos predeterminados en inglés (*"Join the community"*, *"Meet our team"*, *"Discover our services"*), insertados automáticamente por las plantillas por defecto del software. Si esta contaminación no se depuraba en la fase de arquitectura, se corría el grave riesgo de trasladar textos sin sentido a los wireframes finales de Figma. El equipo consultor procedió a eliminar todos los bloques espurios y redactar descripciones precisas en español adaptadas al contexto gremial costarricense.

### 2. Neutralización del Nodo Huérfano de Contacto
En la inspección de los metadatos del archivo de Octopus.do se detectó la presencia de un nodo secundario de *"Contacto"* flotando sin conexión con el árbol central de navegación. Esta duplicidad residual fue eliminada, consolidando la información de contacto en dos niveles complementarios: una página institucional dedicada (`/contacto`) y una sección transversal en el pie de página común persistente.

---

## 5.3 Especificación de Bloques de Contenido por Pantalla

#### Tabla 5.1. *Inventario y auditoría de bloques de contenido especificados en Octopus.do*

| Pantalla del Sistema | Bloques de Contenido Específicos (Español) | Estado de Auditoría |
| :--- | :--- | :--- |
| **Inicio (Homepage)** | Hero inmersivo con buscador; Acceso 4x1; Vitrina de 3 comercios verificados; Ejes estratégicos de la Cámara; Footer a 4 columnas. | Depurado (eliminado bloque en inglés *"Discover our services"*). |
| **Directorio Comercial** | Buscador instantáneo tipo Algolia; Panel lateral de facetas (Sector y Distrito); Contador dinámico de resultados; Grilla de fichas comerciales. | Depurado (eliminado bloque en inglés *"Meet our partners"*). |
| **Ficha de Empresa** | Encabezado con sello de Afiliado Oficial; Dirección exacta en Alajuela; Botón directo a WhatsApp; Botón de ruta en Waze; Teléfono y catálogo. | Aprobado (100% bloques personalizados). |
| **Bolsa de Empleo** | Buscador por perfil ocupacional; Lista de vacantes con rango salarial transparente; Botón de postulación digital; Acceso exclusivo para empresas. | Aprobado (100% bloques personalizados). |
| **Wizard de Afiliación** | Indicador de 3 pasos; Formulario de empresa y cédula jurídica; Selector interactivo de membresías (Micro, Pyme, Corp); Pasarela y radicado. | Aprobado (100% bloques personalizados). |
| **La Cámara** | Misión y visión institucional; Reseña histórica de 1983; Directorio de la Junta Directiva con cargos y fotografías formales. | Depurado (eliminado bloque en inglés *"Our team"*). |
| **Contacto & Sede** | Datos de atención física; Horarios continuos; Mapa de ubicación; Formulario ágil de 3 campos directo a WhatsApp. | Consolidado (eliminado nodo huérfano secundario). |
| **Pie de Página (Footer)** | 4 columnas tradicionales (Identidad, Servicios, Normativa/FAQ, Sede física con teléfono y Waze); Colophon legal con botón subir. | Aprobado (categoría utilitaria validada). |
