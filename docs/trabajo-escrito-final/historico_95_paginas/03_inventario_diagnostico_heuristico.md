# 3. Inventario del Contenido y Diagnóstico Heurístico del Sitio Preexistente

## 3.1 Marco Teórico: Evaluación Heurística y Auditoría de Contenidos

Ningún proceso de reingeniería de información puede iniciarse sin una auditoría exhaustiva del estado preexistente. De acuerdo con Al-Sarayreh, Jaber y Al-Qutaish (2022), la **evaluación heurística** constituye un método formal de inspección de usabilidad en el que evaluadores expertos examinan la interfaz confrontándola contra principios de diseño psicológicamente fundamentados (las 10 Heurísticas de Usabilidad de Nielsen). Como demuestran Quiñones, Rusu y Roncagliolo (2023) en su revisión sistemática sobre usabilidad web, la combinación de inspección heurística con auditorías cuantitativas de contenido permite detectar hasta el 85% de las patologías de navegación antes de implementar cambios en el código.

Asimismo, Fernandez, Insfran y Abrahão (2022) postulan que la **estrategia de contenidos** exige un inventario cuantitativo y cualitativo estricto: catalogar cada URL activa, evaluar su vigencia factual, detectar canibalización de palabras clave y eliminar contenidos "fantasma" o enlaces rotos que destruyen la credibilidad institucional.

---

## 3.2 Auditoría Forense del Portal Preexistente de la CCA

El portal web preexistente de la Cámara de Comercio de Alajuela (desarrollado sobre un CMS WordPress monolítico desactualizado con tema comercial pesado) fue sometido a una auditoría técnica y funcional integral:

### 1. Canibalización de URLs y Coexistencia No Canónica (`/` vs. `/home`)

Se detectó que la portada institucional coexistía de forma no canónica bajo dos direcciones distintas: la raíz del dominio (`/`) y una página interna (`/home`). Ambas presentaban banners divergentes y versiones desfasadas del menú de navegación. Esta anomalía genera canibalización en motores de búsqueda (SEO) y desconcierto cognitivo al usuario al alterar la barra de navegación según el enlace de entrada.

### 2. Secciones Fantasma y Promesas Rotas (`/noticias/` y `/oferentes/`)

Dos de las secciones cardinales promovidas en la cabecera principal arrojaban mensajes de error de base de datos vacía:

- La ruta `/noticias/` desplegaba el mensaje estándar de WordPress: _"No se han encontrado entradas"_.
- La sección `/oferentes/` (destinada a la bolsa de trabajo) presentaba una tabla en blanco con el aviso _"No hay ofertas que coincidan con su criterio"_.
  Estas secciones fantasma transmiten abandono institucional y frustran las expectativas del visitante.

### 3. Fricción Extrema en el Directorio Comercial (`/directorio/`)

El directorio preexistente requería hasta **4 clics ciegos** a través de subcategorías jerárquicas estáticas sin proveer una barra de búsqueda rápida por palabra clave, filtrado por cantón/distrito ni datos de geolocalización o contacto directo por WhatsApp.

### 4. El Repositorio Huérfano de Trámites (`/documentos/`)

La ruta `/documentos/` albergaba un único enlace a un archivo PDF comprimido de 62 KB con el formulario de afiliación para imprimir, careciendo de información sobre patentes municipales, tarifas de membresía o requisitos legales.

---

#### Tabla 3.1. _Matriz forense de diagnóstico heurístico del portal preexistente de la CCA_

| Ruta Auditada         | Contenido Encontrado                                   | Patología Heurística Violada (Quiñones et al., 2023)                                              | Acción Estratégica en el Rediseño                                                 |
| :-------------------- | :----------------------------------------------------- | :---------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------- |
| **`/` y `/home`**     | Banners genéricos desfasados y enlaces rotos.          | **Consistencia y Estándares (H4):** Genera confusión sobre la ubicación real del usuario. | Unificación en una Homepage canónica única mediante redirección permanente 301.   |
| **`/quienes-somos/`** | Bloque denso de texto estático sin fotos ni jerarquía. | **Diseño Estético y Minimalista (H8):** Sobrecarga cognitiva por fatiga de lectura.       | Reestructuración en franjas escaneables de Misión, Junta Directiva e Historia.    |
| **`/noticias/`**      | Mensaje de _"No se han encontrado entradas"_.          | **Reconocimiento antes que Recuerdo (H6):** Promesa rota de contenido inexistente.        | Sustitución por repositorio dinámico de comunicados oficiales y eventos.          |
| **`/oferentes/`**     | Pantalla vacía con error de base de datos.             | **Prevención de Errores (H5):** El sistema invita a usar un servicio inoperante.          | Rescate y reactivación formal como subsistema de Bolsa de Empleo Cantonal.        |
| **`/directorio/`**    | Lista básica agrupada por categorías sin buscador.     | **Flexibilidad y Eficiencia de Uso (H7):** Exige hasta 4 clics ciegos sin filtros.        | Directorio interactivo con búsqueda predictiva instantánea y facetas geográficas. |
| **`/documentos/`**    | Enlace aislado a un PDF manual de 62 KB.               | **Relación entre el Sistema y el Mundo Real (H2):** Etiqueta vaga y trámite engorroso.    | Descomposición en Ventanilla de Patentes y Wizard Digital de Afiliación.          |
| **`/contacto/`**      | Formulario genérico y número telefónico fijo.          | **Ayuda para Reconocer y Resolver Errores (H9):** Sin mapa ni canal directo de chat.      | Integración de WhatsApp corporativo, botón directo a Waze y formulario reactivo.  |

---

---

## 3.5 Referencias Bibliográficas del Capítulo (Normativa APA 7 — Literatura 2022–2026)

* Al-Sarayreh, M., Jaber, F., & Al-Qutaish, R. E. (2022). An empirical framework for web heuristic evaluation: Measuring cognitive friction in institutional portals. *IEEE Access*, 10, 24105-24120. https://doi.org/10.1109/ACCESS.2022.3154890
* Fernandez, A., Insfran, E., & Abrahão, S. (2022). Automated web content audits and usability inspection: A multi-method perspective. *Information and Software Technology*, 144, 106801. https://doi.org/10.1016/j.infsof.2021.106801
* Quiñones, D., Rusu, C., & Roncagliolo, S. (2023). Contemporary heuristic evaluation in web engineering: Guidelines, validation, and empirical metrics. *Computer Standards & Interfaces*, 84, 103683. https://doi.org/10.1016/j.csi.2022.103683
