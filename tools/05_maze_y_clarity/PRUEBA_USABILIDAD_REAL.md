# Prueba de usabilidad real · Portal CCA (Cap. 8)

**Portal:** https://cca-alajuela-portal.vercel.app · **Pruebas de tareas + SUS:** Maze (maze.co) · **Analítica:** Microsoft Clarity (proyecto `zaksg7xnz7`)
**Participantes:** 4 personas reales (N = 4, prueba exploratoria). Se reporta **solo lo medido**: el enunciado prohíbe datos inventados, aunque prescriba un SUS de 84.5.

---

## 1. Crear el estudio en Maze

1. Entrar a **maze.co** → *Create new maze* → plantilla en blanco.
2. Agregar bloques en este orden:

| # | Bloque de Maze | Contenido |
|---|---|---|
| 1 | **Welcome / Context screen** | Texto de bienvenida (sección 2) |
| 2 | **Website test** (o *Live website*) — Misión 1 | URL inicial: `https://cca-alajuela-portal.vercel.app` · Tarea: *"Usted quiere almorzar en Alajuela en un lugar afiliado a la Cámara. Encuentre una **soda o restaurante afiliado** y abra su ficha o su teléfono."* · Ruta esperada (opcional): Inicio → Directorio/buscador → resultado de Alimentos y Gastronomía |
| 3 | **Opinion scale 1–7** | "¿Qué tan fácil fue esta tarea?" (SEQ) |
| 4 | **Website test** — Misión 2 | URL inicial: `https://cca-alajuela-portal.vercel.app` · Tarea: *"Afilie su negocio ficticio 'Soda La Prueba' (cédula 3-101-000000, teléfono 8888-1234) al plan Pyme y pague **con tarjeta**. Use primero la tarjeta **4000 0000 0000 0002** (vence 12/28, CVV 123). Si no funciona, complete la afiliación como pueda (otra tarjeta: 4111 1111 1111 1111)."* · Pantalla final esperada: "Transacción exitosa" |
| 5 | **Opinion scale 1–7** | "¿Qué tan fácil fue esta tarea?" (SEQ) |
| 6–15 | **SUS**: si Maze ofrece la plantilla *System Usability Scale*, usarla. Si no, 10 bloques **Opinion scale 1–5** con las afirmaciones de `cuestionario_sus_10_preguntas.md`, **en el mismo orden** y con el título empezando en "P1.", "P2.", … "P10." | |
| 16 | **Open question** | "¿Qué fue lo más difícil o confuso?" |
| 17 | **Thank you screen** | — |

3. Si **el plan gratis no permite "Website test"**: avisar. Las alternativas son el prototipo de Figma de Emanuel en Maze, o Google Forms con el mismo contenido (ver `calcular_resultados.py`), documentando el cambio en el Cap. 8.
4. *Share* → copiar el link del estudio.

## 2. Texto de bienvenida / mensaje para los participantes

> ¡Hola! Te pido unos 10 minutos para probar el portal web de la Cámara de Comercio de Alajuela, que es parte de mi proyecto de la U. Se evalúa **el sitio, no a ti**: si algo te cuesta, eso es justo lo que necesito saber.
> Entra a este link y sigue las instrucciones: **[LINK DE MAZE]**. Haz las tareas **sin ayuda**.
> ⚠️ El pago es una **simulación**: **no hagas ninguna transferencia SINPE real ni uses tu tarjeta**; la tarea te da tarjetas de prueba.
> El sitio registra de forma anónima los clics (Maze y Microsoft Clarity). No se guardan datos personales.

## 3. Qué se mide y de dónde sale (para el Cap. 8)

| Requisito del enunciado | Fuente |
|---|---|
| Tasa de éxito, tiempo promedio y rutas de las 2 misiones | Reporte de Maze (*Results* → cada misión) |
| SUS (fórmula de Brooke 1996, tabla de las 10 preguntas) | Respuestas SUS exportadas de Maze (CSV) → `calcular_resultados.py` o cálculo manual |
| Mapas de calor de clics y de scroll (Inicio y Directorio) | Clarity → *Heatmaps* (captura PNG) |
| Rage clicks y dead clicks | Clarity → *Dashboard* y *Recordings* (valores reales, sean 0 o no) |
| Interpretación | Bangor, Kortum & Miller (2008) con el SUS **obtenido** |

**Respuestas correctas de referencia:**
- Misión 1: cualquier comercio del sector *Alimentos y Gastronomía* (41 en el directorio).
- Misión 2: llegar a "Transacción exitosa" con un radicado `CCA-2026-######`.

**Limitación a declarar:** con N = 4 la prueba es exploratoria. Sirve para detectar problemas, pero no para generalizar el SUS.
