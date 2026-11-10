# Guía Maestra de la Presentación Ejecutiva (Deck Oficial 16:9)

**Proyecto:** Reorganización de la Arquitectura de Información · Cámara de Comercio de Alajuela (CCA)  
**Curso:** EIF-511 Arquitectura de Información · Universidad Nacional de Costa Rica (UNA)  
**Equipo Consultor:** Marcos Román Valverde (Coord.) · Emanuel Soto · Allan Arce  
**Archivo PowerPoint:** [`Presentacion_Final_CCA_UNA.pptx`](Presentacion_Final_CCA_UNA.pptx)  
**Eje Estratégico:** Conectar los fallos de Arquitectura de Información con su impacto real en la credibilidad gremial, la confianza empresarial y el crecimiento de nuevas afiliaciones.

---

## 1. Storytelling en 3 Preguntas Guía

```
┌───────────────────────────┐     ┌───────────────────────────┐     ┌───────────────────────────┐
│     ¿QUÉ ENCONTRAMOS?     │ ──► │ ¿QUÉ USAMOS Y CÓMO AYUDÓ? │ ──► │   ¿CÓMO LO IMPLEMENTAMOS? │
│         (Slides 2–5)      │     │        (Slides 6–11)      │     │        (Slides 12–16)     │
│  La brecha de credibilidad│     │  OptimalSort, Algolia,    │     │  Laboratorio funcional,   │
│  y el embudo roto que     │     │  Strapi, Miro, RAG y      │     │  facetas en vivo, wizard  │
│  frenaba las afiliaciones │     │  polijerarquía de acceso  │     │  en 3 pasos y SUS de 89.5 │
└───────────────────────────┘     └───────────────────────────┘     └───────────────────────────┘
```

---

## 2. Desglose Slide por Slide con Narrativa de Exposición

### Portada Institucional

- **Slide 1:** _Por el comercio. Por Alajuela._ — Reorganización de la Arquitectura de Información para la Cámara de Comercio de Alajuela.
  - _Enfoque:_ Apertura sobria y profesional. Establecer desde el primer segundo que este no es un rediseño cosmético, sino una consultoría estratégica sobre cómo la Cámara proyecta valor a su provincia.

---

### Acto I: ¿Qué encontramos? (La Crisis de Credibilidad y el Embudo Roto)

- **Slide 2: Contexto y credibilidad:** _La brecha entre el peso gremial de la Cámara y su portal digital._
  - _Oneliner:_ Un hub empresarial que transmitía descuido, dañando la confianza y frenando la afiliación de nuevas empresas.
  - _Mensaje clave:_ La Cámara tiene 43 años liderando el segundo polo económico del país, pero su portal operaba como un repelente digital: 4 clics ciegos para ubicar un comercio y un embudo roto que exigía llenar un formulario de Word a mano. Si una empresa no percibe orden en la web del gremio, no confía ni se afilia.
- **Slide 3: Portada y navegación:** _Doble inicio y servicios de valor invisibles en el menú._
  - _Evidencia:_ [`auditoria_original_home.png`](../trabajo-escrito-final/documento/figuras/auditoria_original_home.png).
  - _Mensaje clave:_ La coexistencia de `/` y `/home` creaba desconcierto espacial y dividía el tráfico. Más grave aún: la Bolsa de Empleo y el formulario de Afiliación estaban ocultos fuera de la barra principal. Los dos servicios que justifican la afiliación estaban invisibilizados.
- **Slide 4: Sistema de etiquetado:** _64 categorías caóticas que devaluaban a los comercios socios._
  - _Evidencia:_ [`auditoria_original_directorio.png`](../trabajo-escrito-final/documento/figuras/auditoria_original_directorio.png).
  - _Mensaje clave:_ Categorías duplicadas, espanglish y faltas ortográficas visibles (_«Constuctora»_). Un catálogo inusable le resta seriedad a las empresas que pagan su cuota mensual esperando visibilidad. Además, la contradicción de reportar 173 y 171 empresas en la misma vista minaba la transparencia.
- **Slide 5: Sistema de organización:** _Módulos vacíos que transmitían inoperancia institucional._
  - _Evidencia:_ [`auditoria_original_oferentes.png`](../trabajo-escrito-final/documento/figuras/auditoria_original_oferentes.png).
  - _Mensaje clave:_ La sección de empleo devolvía permanentemente _"No hay ofertas"_ y las noticias mostraban errores de base de datos vacía. Para un empresario que evalúa afiliarse, esto transmite una institución dormida o inactiva.

---

### Acto II: ¿Qué usamos y cómo nos ayudó? (Métodos, Herramientas y Hallazgos)

- **Slide 6: FlowMapp y Octopus.do:** _De 42 enlaces dispersos a 26 nodos en 3 niveles._
  - _Evidencia:_ [`figura_02_sitemap_macro.png`](../trabajo-escrito-final/documento/figuras/figura_02_sitemap_macro.png).
  - _Mensaje clave:_ Aplicación estricta de la Ley de Hick: 5 macro-ramas claras y un botón magnético de Afiliación como llamada a la acción principal. Cero redundancias y garantía de acceso a cualquier servicio en 3 pasos.
- **Slide 7: OptimalSort y Treejack:** _El modelo mental de los usuarios cuestionó la jerarquía rígida._
  - _Evidencia:_ [`figura_matriz_similitud_optimalsort.png`](../trabajo-escrito-final/documento/figuras/figura_matriz_similitud_optimalsort.png).
  - _Mensaje clave:_ 18 participantes clasificados en 3 perfiles (comercio tradicional, B2B y emprendedores) evaluaron 30 conceptos. La matriz de similitud demostró que los usuarios no buscan la información en silos estáticos: patentes, convenios y empleo requerían múltiples puntos de acceso.
- **Slide 8: El principio rector:** _Polijerarquía: Múltiples caminos para respaldar la conversión._
  - _Mensaje clave:_ Conectamos los servicios críticos en más de una ruta: Patentes dentro de Servicios y como paso previo en Afiliación; Empleo en la navegación primaria y en las fichas del Directorio; Convenios en el catálogo comercial y con cálculo de ahorro fiscal en el registro.
- **Slide 9: Algolia Search:** _Búsqueda predictiva para devolverle valor al Directorio._
  - _Evidencia:_ [`figura_9_5_algolia_analytics_queries.png`](../trabajo-escrito-final/documento/figuras/figura_9_5_algolia_analytics_queries.png).
  - _Mensaje clave:_ Motor en milisegundos con 52 grupos de sinónimos locales y tolerancia a faltas tipográficas (_«fereteria»_, _«biyares»_). Redujo las búsquedas fallidas del 23% al 6%, asegurando que el cliente siempre encuentre al comerciante afiliado.
- **Slide 10: Strapi CMS:** _Vocabularios controlados para garantizar profesionalismo._
  - _Evidencia:_ [`captura_strapi_content_manager_comercios.png`](../trabajo-escrito-final/documento/figuras/captura_strapi_content_manager_comercios.png).
  - _Mensaje clave:_ La gobernanza de la información no puede depender del cuidado manual. Strapi bloquea entradas arbitrarias con esquemas cerrados para los 16 cantones y 5 sectores, garantizando que el portal mantenga su orden y seriedad en el tiempo.
- **Slide 11: Miro, RAG y SINPE:** _Digitalización del viaje: De la consulta a la afiliación activa._
  - _Evidencia:_ [`figura_05_flujo_checkout_afiliacion.png`](../trabajo-escrito-final/documento/figuras/figura_05_flujo_checkout_afiliacion.png).
  - _Mensaje clave:_ El Customer Journey Map identificó que el trámite de afiliación era donde se perdían todos los prospectos. Con IA (RAG) aclaramos estatutos y deducibilidad fiscal al instante; con SINPE Móvil validamos el pago y emitimos radicado de forma inmediata.

---

### Acto III: ¿Cómo lo implementamos? (Laboratorio, Evidencias y Métricas)

- **Slide 12: Prototipo como laboratorio:** _Un entorno funcional para restaurar la confianza._
  - _Evidencia:_ [`figura_web_resultado_home.png`](../trabajo-escrito-final/documento/figuras/figura_web_resultado_home.png).
  - _Mensaje clave:_ El prototipo no es una maqueta cosmética; es un laboratorio de usabilidad interactivo. Portada canónica unificada con el escudo oficial de la Cámara, estética editorial sobria y navegación diseñada para transmitir credibilidad gremial.
- **Slide 13: Sistemas funcionales:** _Directorio útil y Bolsa de Empleo activa para la provincia._
  - _Evidencia:_ [`figura_web_resultado_directorio.png`](../trabajo-escrito-final/documento/figuras/figura_web_resultado_directorio.png).
  - _Mensaje clave:_ 171 comercios indexados con filtros instantáneos por cantón (18 ms), botones de WhatsApp/Waze en 1 clic y una bolsa de empleo reactivada con ofertas vigentes en Alajuela y El Coyol.
- **Slide 14: Proceso transaccional:** _Afiliación digital: El motor para captar nuevas empresas._
  - _Evidencia:_ [`figura_web_resultado_afiliacion.png`](../trabajo-escrito-final/documento/figuras/figura_web_resultado_afiliacion.png).
  - _Mensaje clave:_ Reemplazamos el documento Word manual por un wizard en 3 pasos: planes claros (₡15.000 y ₡35.000) con desglose de deducibilidad del impuesto sobre la renta (Ley 7092), pago digital SINPE verificado y constancia con radicado formal.
- **Slide 15: Evaluación Cuantitativa:** _Métricas que respaldan el retorno de la confianza._
  - _89.5 SUS:_ Salto cuantitativo desde un 48.2 reprobatorio al rango de excelencia (grado A+).
  - _86% éxito directo:_ En Treejack, los participantes localizaron servicios prioritarios a la primera sin extraviarse.
  - _0.8% clics de frustración:_ La telemetría en Microsoft Clarity confirmó la desaparición de bucles de desorientación frente al 18.4% previo.
- **Slide 16: Conclusiones estratégicas:** _La Arquitectura de Información como activo estratégico institucional._
  - _Mensaje de cierre:_ La credibilidad digital impacta directamente la representatividad gremial. Si el portal proyecta descuido, las empresas no se afilian; si la información está ordenada y accesible, la Cámara atrae más comercios, fortalece su presupuesto y consolida su autoridad provincial.
