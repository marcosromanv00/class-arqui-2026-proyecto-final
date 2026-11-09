# Prueba de usabilidad real · Portal CCA (Cap. 8)

**Portal:** https://cca-alajuela-portal.vercel.app · **Comportamiento:** Microsoft Clarity (proyecto `zaksg7xnz7`) · **Tareas + SUS:** Google Forms
**Participantes:** 4 personas reales (N = 4, prueba exploratoria). Se reporta **solo lo medido**.

> **Por qué no Maze:** el plan gratuito de Maze solo ofrece *Screener*, *Prototype test* (prototipos de Figma) y *Variant comparison*. No incluye pruebas sobre un sitio web publicado. Las 2 misiones del enunciado se ejecutaron sobre el portal real; Clarity registra el comportamiento (tiempos, rutas, clics) y Google Forms recoge el resultado de cada misión y el SUS.

---

## 1. Mensaje para los participantes (copiar y pegar)

> ¡Hola! Te pido unos 10 minutos para probar el portal web de la Cámara de Comercio de Alajuela, que es parte de mi proyecto de la U. Se evalúa **el sitio, no a ti**: si algo te cuesta, eso es justo lo que necesito saber.
> 1. Abre el formulario: **[LINK DEL GOOGLE FORM]** y lee la primera misión.
> 2. En otra pestaña o en el celular abre **https://cca-alajuela-portal.vercel.app** y hazla **sin ayuda**. Vuelve al formulario y responde. Repite con la segunda misión.
> 3. Al final contesta las preguntas sobre el sitio.
>
> ⚠️ El pago es una **simulación**: **no hagas ninguna transferencia SINPE real ni uses tu tarjeta**; la misión te da tarjetas de prueba.
> El sitio registra de forma anónima los clics y movimientos (Microsoft Clarity). No se guardan datos personales.

## 2. Las 2 misiones (del enunciado)

| # | Texto que lee el participante | Respuesta correcta |
|---|---|---|
| **M1 · Comercio gastronómico** | "Quieres almorzar en Alajuela en un lugar afiliado a la Cámara. Usa el portal para encontrar **un restaurante o soda afiliado** y escribe su **nombre** (y su teléfono, si la ficha lo trae)." | Cualquier comercio del sector *Alimentos y Gastronomía* (41 en el directorio; "restaurante" da 10, "soda" 1 y "almorzar" 11). Ojo: Soda los Arcos Cayuga no tiene teléfono en el directorio oficial |
| **M2 · Afiliación digital** | "Afilia tu negocio ficticio **'Soda La Prueba'** (cédula 3-101-000000, cantón Alajuela, teléfono 8888-1234) al **plan "Comercio y Pyme"** y paga **con tarjeta**. Usa primero la tarjeta **4000 0000 0000 0002** (vence 12/28, CVV 123). Si no funciona, termina la afiliación como puedas (otra tarjeta de prueba: 4111 1111 1111 1111). Escribe el **número de radicado** que te da el sistema." | Un radicado `CCA-2026-######` (pantalla "Transacción exitosa") |

## 3. Estructura del Google Form

**Sección 0 · Datos generales (anónimos)**
1. Código de participante: P1, P2, P3 o P4 (lo asigna usted)
2. Rango de edad: 18–25 / 26–35 / 36–50 / 51+
3. Dispositivo que usó: Computadora / Celular / Tablet
4. ¿Con qué frecuencia hace trámites o compras en línea? Nunca / A veces / Frecuentemente

**Sección 1 · Misión 1** (texto M1)
- Respuesta corta: nombre y teléfono del comercio
- "¿Pudo completar la misión?" Sí / No
- "En general, ¿qué tan fácil o difícil fue esta misión?" Escala lineal 1 (Muy difícil) a 7 (Muy fácil)

**Sección 2 · Misión 2** (texto M2): igual que la Sección 1, con la respuesta corta "Número de radicado", más la pregunta "¿Qué hizo cuando el primer pago falló?".

**Sección 3 · SUS**: 10 escalas lineales del 1 (Totalmente en desacuerdo) al 5 (Totalmente de acuerdo), con las afirmaciones de `cuestionario_sus_10_preguntas.md` **en el mismo orden**, cada título empezando con "P1.", "P2.", … "P10." (el script busca ese prefijo).

**Sección 4 · Comentarios**: "¿Qué fue lo más difícil o confuso?" y "¿Qué le gustó más?" (párrafo).

Configuración: no recopilar correos. Al terminar: Respuestas → ⋮ → **Descargar (.csv)** → guardar como `tools/05_maze_y_clarity/respuestas_prueba.csv`.

## 4. Después de la prueba

1. `python tools/05_maze_y_clarity/calcular_resultados.py tools/05_maze_y_clarity/respuestas_prueba.csv` → SUS por persona y promedio, éxito por misión y SEQ.
2. Clarity (esperar ~2 h): **Heatmaps** de clics y scroll de Inicio y Directorio; **Dashboard** con rage clicks, dead clicks y quick backs; **Recordings** para el tiempo por misión y la ruta de cada participante.
3. Capturas en `docs/trabajo-escrito-final/documento/figuras/figura_8_*.png`.

**Limitaciones a declarar:** N = 4 (exploratorio). Éxito y tiempos verificados con las grabaciones, no solo autodeclarados. El SUS se interpreta con Bangor, Kortum & Miller (2008) usando el valor **obtenido**.
