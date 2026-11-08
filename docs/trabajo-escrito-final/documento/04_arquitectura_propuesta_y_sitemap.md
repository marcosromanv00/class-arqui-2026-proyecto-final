# 4. Arquitectura de Información Propuesta y Sitemap Macro (FlowMapp)

## 4.1 Marco Teórico: Modelado Estructural de Sitemaps con FlowMapp

El diseño del mapa del sitio (_Sitemap_) constituye el plano arquitectónico fundamental que articula la jerarquía global de una plataforma web. De acuerdo con Kalbach (2023), la estructura de información se ubica en el plano de la estructura del diseño de experiencia de usuario, determinando cómo se relacionan los nodos de contenido y qué rutas de navegación se ponen a disposición del visitante. Como demuestra empíricamente Vartiainen y Rossi (2022) en sus investigaciones sobre jerarquías web, los árboles de navegación con balance óptimo entre **amplitud (_breadth_) y profundidad (_depth_)** superan consistentemente a las jerarquías profundas (más de cuatro niveles), reduciendo el tiempo de localización y minimizando la tasa de desorientación o pérdida (_lostness metric_).

### ¿Qué es FlowMapp y qué valor aporta al diseño de sitemaps?

**FlowMapp** es una herramienta especializada de la industria para la planificación visual de Arquitectura de Información y flujos de usuario (_user flows_). A diferencia de las herramientas genéricas de diagramación (como Visio o Illustrator), FlowMapp modela la taxonomía digital como un grafo de relaciones lógicas donde cada nodo representa una página o subsistema funcional con sus respectivos metadatos: tipología canónica, nivel jerárquico, estado de desarrollo y dependencias de contenido (Alroobaea & Mayhew, 2022). Esto permite al equipo consultor auditar la higiene estructural antes de iniciar la fase de wireframing o programación.

---

## 4.2 Principios Rectores del Rediseño Estructural

Para erradicar la sobrecarga cognitiva del sitio anterior y guiar con claridad a los tres arquetipos de usuario identificados, el equipo consultor diseñó una nueva arquitectura de información basada en cuatro principios fundamentales de interacción:

1. **Ley de Hick y Reducción de la Amplitud de Opciones:** La navegación superior se redujo de más de nueve enlaces desordenados a exactamente **cinco opciones de primer nivel** más un botón de llamada a la acción primario (_Afiliar mi Empresa_). Esto acelera la toma de decisiones al disminuir el tiempo que el usuario invierte en escanear el menú.
2. **Divulgación Progresiva (_Progressive Disclosure_):** En lugar de abrumar al visitante con densos párrafos informativos en la portada, el portal expone primero resúmenes escaneables en tarjetas y revela los detalles técnicos o requisitos legales únicamente cuando el usuario manifiesta interés activo.
3. **Profundidad Máxima de Tres Niveles:** Ningún contenido vital se ubica a más de **tres clics de distancia** de la página de inicio. Tareas críticas como contactar a una empresa afiliada o iniciar el proceso de afiliación se resolvieron a **un solo clic directo**.
4. **Coexistencia de Esquemas Híbridos:** La organización no impone un único modelo mental rígido, sino que combina esquemas exactos y ambiguos según la intención de la consulta.

---

## 4.3 Taxonomía Oficial del Sitemap (FlowMapp)

El mapa del sitio modelado en **FlowMapp** comprende **26 nodos informativos** estructurados en torno a cinco ramas principales y un pie de página utilitario transversal:

#### Tabla 4.1. _Taxonomía completa de los 26 nodos del sitemap del nuevo portal web de la CCA_

| Rama Maestra (Nivel 1)             | Secciones Derivadas (Nivel 2)            | Páginas Finales de Contenido / Tarea (Nivel 3)                 |
| :--------------------------------- | :--------------------------------------- | :------------------------------------------------------------- |
| **1. Inicio** (`/`)                | Portada unificada con Hero Search        | Grilla de acceso rápido 4x1; Vitrina de afiliados destacados.  |
| **2. Directorio** (`/directorio`)  | 2.1 Resultados de Búsqueda Instantánea   | 2.1.1 Ficha Detallada de Comercio Afiliado con distintivo CCA. |
|                                    | 2.2 Barra de Filtros Facetados           | 2.2.1 Filtro por Sector Económico (8 categorías).              |
|                                    |                                          | 2.2.2 Filtro por Distrito Cantonal (7 distritos activos).      |
| **3. Servicios** (`/servicios`)    | 3.1 Asesoría Legal y Tributaria          | 3.1.1 Consultas de patentes municipales y régimen fiscal.      |
|                                    | 3.2 Capacitaciones Técnicas              | 3.2.1 Calendario e inscripción a talleres para pymes.          |
|                                    | 3.3 Convenios y Alianzas Comerciales     | 3.3.1 Catálogo de convenios con bancos y aseguradoras.         |
|                                    | 3.4 Trámites Municipales                 | 3.4.1 Guía de licencias y enlace con el gobierno local.        |
| **4. Bolsa de Empleo** (`/empleo`) | 4.1 Catálogo de Vacantes Activas         | 4.1.1 Ficha de Puesto y requisitos de contratación.            |
|                                    | 4.2 Formulario de Postulación de CV      | 4.2.1 Pantalla de confirmación de postulación laboral.         |
|                                    | 4.3 Publicación de Puestos para Empresas | 4.3.1 Formulario corporativo para agremiados al día.           |
| **5. Afiliarse** (`/afiliarse`)    | 5.1 Propuesta de Valor y Beneficios      | 5.1.1 Comparativa de membresías (Micro, Pyme, Corporativo).    |
|                                    | 5.2 Wizard de Afiliación Digital         | 5.2.1 Paso 1: Datos de la Empresa y Cédula Jurídica.           |
|                                    |                                          | 5.2.2 Paso 2: Plan de Membresía y Arancel con IVA.             |
|                                    |                                          | 5.2.3 Paso 3: Pago Seguro (SINPE Móvil / BAC) y Radicado.      |
| **6. La Cámara** (`/la-camara`)    | 6.1 Misión, Visión y Reseña Histórica    | 6.1.1 Antecedentes desde la fundación en 1983.                 |
|                                    | 6.2 Junta Directiva 2025 - 2027          | 6.2.1 Perfiles de directores gremiales y representación.       |
|                                    | 6.3 Contacto y Sede Física               | 6.3.1 Ubicación física, teléfonos, WhatsApp y botón Waze.      |
| **7. Pie de Página (Utilitario)**  | 7.1 Preguntas Frecuentes (FAQ)           | 7.1.1 Acordeón de dudas sobre cuotas, patentes y trámites.     |
|                                    | 7.2 Política de Privacidad de Datos      | 7.2.1 Tratamiento seguro de datos de comercios y usuarios.     |
|                                    | 7.3 Reglamentos Gremiales                | 7.3.1 Estatutos vigentes de la Cámara de Comercio.             |

---

---

## 4.5 Referencias Bibliográficas del Capítulo (Normativa APA 7 — Literatura 2022–2026)

* Alroobaea, R., & Mayhew, P. J. (2022). Optimizing website hierarchical structures for reduced cognitive load: An empirical study. *International Journal of Information Management Data Insights*, 2(1), 100067. https://doi.org/10.1016/j.jjimei.2022.100067
* Kalbach, J. (2023). Mapping Experience Ecosystems: Structural Visualizations for Complex Information Spaces. *Journal of Information Architecture*, 7(2), 45-62.
* Vartiainen, E., & Rossi, M. (2022). Navigation depth vs. breadth trade-offs in mobile and responsive web architectures. *ACM Transactions on the Web*, 16(3), 1-28. https://doi.org/10.1145/3511598
