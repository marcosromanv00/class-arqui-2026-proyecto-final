/**
 * Crea el Google Form de la prueba de usabilidad del Portal CCA (Cap. 8).
 *
 * Uso:
 *  1. Abra https://script.google.com → "Nuevo proyecto".
 *  2. Borre el contenido, pegue este archivo completo y dele Guardar (Ctrl+S).
 *  3. Arriba elija la función "crearFormulario" y dele "Ejecutar". Acepte los permisos (es su propia cuenta).
 *  4. Abajo, en "Registro de ejecución", aparecen 2 links: el de EDITAR (para usted) y el PÚBLICO (para enviar).
 *
 * Las personas responden SIN iniciar sesión y SIN correo.
 */
function crearFormulario() {
  const PORTAL = "https://cca-alajuela-portal.vercel.app";
  const form = FormApp.create("Prueba de usabilidad · Portal Cámara de Comercio de Alajuela");

  form.setDescription(
    "Gracias por ayudar. Se evalúa el SITIO, no a usted: si algo le cuesta, eso es justo lo que necesitamos saber.\n\n" +
    "Abra el portal en otra pestaña (o en el celular): " + PORTAL + "\n" +
    "Haga cada misión SIN ayuda y luego vuelva aquí a responder.\n\n" +
    "⚠️ El pago del portal es una SIMULACIÓN: no haga transferencias SINPE reales ni use su tarjeta; la misión le da tarjetas de prueba.\n" +
    "El sitio registra de forma anónima los clics y movimientos (Microsoft Clarity). No se guardan datos personales."
  );
  form.setCollectEmail(false);
  form.setLimitOneResponsePerUser(false);
  form.setAllowResponseEdits(false);
  form.setProgressBar(true);
  form.setConfirmationMessage("¡Listo! Muchas gracias por su tiempo.");

  // --- Sección 0: datos generales
  form.addMultipleChoiceItem().setTitle("Código de participante").setChoiceValues(["P1", "P2", "P3", "P4", "P5", "P6"]).setRequired(true);
  form.addMultipleChoiceItem().setTitle("Rango de edad").setChoiceValues(["18–25", "26–35", "36–50", "51 o más"]).setRequired(true);
  form.addMultipleChoiceItem().setTitle("Dispositivo que usó").setChoiceValues(["Computadora", "Celular", "Tablet"]).setRequired(true);
  form.addMultipleChoiceItem().setTitle("¿Con qué frecuencia hace trámites o compras en línea?").setChoiceValues(["Nunca", "A veces", "Frecuentemente"]).setRequired(true);

  // --- Misión 1
  form.addPageBreakItem().setTitle("Misión 1 · Comercio gastronómico").setHelpText(
    "Quiere almorzar en Alajuela en un lugar afiliado a la Cámara. Use el portal (" + PORTAL + ") para encontrar " +
    "UN RESTAURANTE O SODA AFILIADO y anote su nombre y su teléfono (si la ficha no trae teléfono, anote solo el nombre). Cuando termine, responda abajo."
  );
  form.addTextItem().setTitle("Nombre (y teléfono, si aparece) del comercio que encontró. Si no pudo, escriba \"no pude\"").setRequired(true);
  form.addMultipleChoiceItem().setTitle("¿Pudo completar la misión 1?").setChoiceValues(["Sí", "No"]).setRequired(true);
  form.addScaleItem().setTitle("En general, ¿qué tan fácil o difícil fue la misión 1?").setBounds(1, 7).setLabels("Muy difícil", "Muy fácil").setRequired(true);

  // --- Misión 2
  form.addPageBreakItem().setTitle("Misión 2 · Afiliación digital").setHelpText(
    "Afilie su negocio ficticio 'Soda La Prueba' (cédula 3-101-000000, cantón Alajuela, teléfono 8888-1234) al plan \"COMERCIO Y PYME\" " +
    "y pague CON TARJETA.\n\nUse primero esta tarjeta: 4000 0000 0000 0002 · vence 12/28 · CVV 123.\n" +
    "Si no funciona, termine la afiliación como pueda (otra tarjeta de prueba: 4111 1111 1111 1111).\n\n" +
    "Anote el número de radicado que le da el sistema (CCA-2026-…)."
  );
  form.addTextItem().setTitle("Número de radicado (si no pudo, escriba \"no pude\")").setRequired(true);
  form.addMultipleChoiceItem().setTitle("¿Pudo completar la misión 2?").setChoiceValues(["Sí", "No"]).setRequired(true);
  form.addScaleItem().setTitle("En general, ¿qué tan fácil o difícil fue la misión 2?").setBounds(1, 7).setLabels("Muy difícil", "Muy fácil").setRequired(true);
  form.addParagraphTextItem().setTitle("¿Qué hizo cuando el primer pago falló?");

  // --- SUS (Brooke, 1996), mismo orden que cuestionario_sus_10_preguntas.md
  form.addPageBreakItem().setTitle("Su opinión sobre el portal").setHelpText("Califique cada afirmación: 1 = Totalmente en desacuerdo · 5 = Totalmente de acuerdo.");
  const sus = [
    "P1. Creo que me gustaría utilizar este portal web de la Cámara con frecuencia para mis trámites comerciales.",
    "P2. Encontré que el portal web era innecesariamente complejo de navegar.",
    "P3. Pensé que el portal era muy fácil de usar y que la información estaba bien organizada.",
    "P4. Creo que necesitaría el apoyo de un técnico o personal de la Cámara para poder completar un trámite en línea.",
    "P5. Encontré que las diversas funciones del portal (Buscador, Directorio, Pagos) estaban muy bien integradas.",
    "P6. Pensé que había demasiada inconsistencia en la forma de presentar los servicios y contenidos.",
    "P7. Imagino que la mayoría de comerciantes alajuelenses aprenderían a usar este portal muy rápidamente.",
    "P8. Encontré el portal muy engorroso e incómodo de utilizar.",
    "P9. Me sentí muy seguro y confiado al utilizar el buscador y la pasarela de pago de la Cámara.",
    "P10. Necesité aprender muchas cosas nuevas antes de poder empezar a usar el portal de forma efectiva.",
  ];
  sus.forEach((t) => form.addScaleItem().setTitle(t).setBounds(1, 5).setLabels("Totalmente en desacuerdo", "Totalmente de acuerdo").setRequired(true));

  // --- Comentarios
  form.addPageBreakItem().setTitle("Comentarios finales");
  form.addParagraphTextItem().setTitle("¿Qué fue lo más difícil o confuso?");
  form.addParagraphTextItem().setTitle("¿Qué le gustó más?");

  Logger.log("EDITAR (solo usted): " + form.getEditUrl());
  Logger.log("LINK PÚBLICO para enviar: " + form.getPublishedUrl());
}
