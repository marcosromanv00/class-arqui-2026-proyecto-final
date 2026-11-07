# Manual de Mantenimiento y Estructura del Documento Escrito
## Proyecto Integrador Final (30%) · Consultoría Cámara de Comercio de Alajuela (CCA)
**Curso:** EIF-511 Arquitectura de Información · Universidad Nacional de Costa Rica (UNA)

---

## 1. Estructura Modular de Capítulos

Para garantizar un mantenimiento quirúrgico y permitir incorporar retroalimentación de la docente sin desconfigurar el reporte completo, el documento se encuentra particionado en **16 archivos Markdown independientes**:

* `00_portada_resumen.md`: Portada oficial institucional de la UNA, datos del equipo y Resumen Ejecutivo.
* `01_introduccion_contexto.md`: Fundamentos de la Arquitectura de Información (Wurman, Rosenfeld) y objetivos.
* `02_organizacion_y_usuarios.md`: Reseña de la Cámara (fundada 1983) y modelado de las 3 Personas (Don Carlos, Valeria Brenes, José Pablo).
* `03_inventario_diagnostico_heuristico.md`: Auditoría forense del WordPress previo, conflicto de dominios (404), homepages duplicadas y tabla de inventario.
* `04_arquitectura_propuesta_y_sitemap.md`: Taxonomía del sitemap en FlowMapp (26 nodos, 3 niveles, 5 ramas y footer utilitario).
* `05_organizacion_jerarquica_y_bloques.md`: Microarquitectura modular en Octopus.do, depuración de plantillas en inglés y sincronización a Figma.
* `06_validacion_empirica_taxonomia.md`: Estudio de Card Sorting Abierto y Treejack (Tree Testing) con métricas de encontrabilidad.
* `07_composicion_contenido_wireframes.md`: Composición canónica (navegación, funcional, contenido), Atomic Design y enlace al prototipo en Figma.
* `08_evaluacion_usabilidad_friccion.md`: Pruebas de tareas en Maze y erradicación de rage/dead clicks en Microsoft Clarity (SUS Score de 48 a 89).
* `09_estrategia_busqueda_inteligente.md`: Motores de búsqueda Algolia y Azure AI Search, tolerancia a typos y sinónimos locales.
* `10_metadatos_taxonomias_cms.md`: Content Modeling desacoplado en Strapi, Schema.org JSON-LD y vocabularios controlados.
* `11_customer_journey_contenido_social.md`: Customer Journey Map en Miro, señales de confianza gremial y moderación anti-spam.
* `12_inteligencia_artificial_personalizacion.md`: Asistente Virtual CCA con RAG, personalización adaptativa y análisis crítico ético.
* `13_comercio_electronico_pagos.md`: Arquitectura transaccional de afiliaciones, pasarelas SINPE Móvil y BAC, cálculo de IVA y radicado.
* `14_conclusiones_recomendaciones.md`: Conclusiones de consultoría, justificación técnica JAMstack vs monolito y hoja de ruta.
* `15_referencias_bibliograficas.md`: Bibliografía académica completa bajo formato APA 7.

---

## 2. Instrucciones para Compilar a Word (.docx) y PDF

El proyecto incluye un script automatizado en Python que lee los 16 capítulos en orden, procesa tablas y títulos con estilo visual universitario formal, y genera los entregables consolidados en la carpeta `entrega_final/output/`:

### Paso 1: Ejecutar el Compilador Python
Abra la terminal en la raíz del proyecto y ejecute:
```powershell
python entrega_final/compilador/compilar_documento_final.py
```

### Paso 2: Archivos Generados
El script depositará los resultados en:
1. **Documento Word Editable:** `entrega_final/output/Reporte_Final_Consultoria_CCA_UNA.docx`
2. **Documento PDF Formal:** `entrega_final/output/Reporte_Final_Consultoria_CCA_UNA.pdf`

---

## 3. Banco Gráfico Privado para Capturas de Pantalla

Si requiere capturar imágenes de alta resolución de las figuras, sitemaps o matrices para ilustrar aún más el informe de Word, abra en su navegador local la siguiente ruta:
```text
entrega_final/visualizador_figuras/index.html
```
Allí encontrará 6 lienzos gráficos de alta definición listos para ser capturados con la herramienta de recorte de Windows (**Win + Shift + S**).
