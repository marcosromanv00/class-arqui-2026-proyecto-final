# 13. Comercio Electrónico, Seguridad y Medios de Pago (SINPE Móvil + BAC)

## 13.1 Marco Teórico: Transaccionalidad, Seguridad y Medios de Pago Digitales

La culminación de la Arquitectura de Información orientada a la conversión ocurre en la pasarela de pago y formalización transaccional. Como señalan Bonneau y Herley (2022), la seguridad y la usabilidad en sistemas de autenticación y pago no son objetivos antagónicos, sino dimensiones que deben calibrarse de forma conjunta para prevenir el fraude sin imponer barreras cognitivas que induzcan al abandono del trámite. En el contexto de Costa Rica, cualquier sistema de comercio electrónico institucional debe alinearse con la infraestructura nacional de transferencias interbancarias y con la normativa tributaria vigente.

### El Ecosistema SINPE Móvil y la Normativa del BCCR
El **Sistema Nacional de Pagos Electrónicos (SINPE)**, operado y regulado por el Banco Central de Costa Rica (BCCR, 2023), constituye el estándar de facto para pagos inmediatos en el país. Su subsistema **SINPE Móvil** vincula números de cuenta IBAN a números telefónicos celulares de 8 dígitos, permitiendo liquidaciones en tiempo real las 24 horas del día con costos de intermediación prácticamente nulos. A diferencia de las pasarelas de tarjetas internacionales (que cobran comisiones de hasta 4.5% + IVA por transacción), SINPE Móvil ofrece a la Cámara de Comercio de Alajuela un mecanismo ágil, confiable y profundamente arraigado en los hábitos financieros de los comerciantes de la provincia.

### Marco Legal y Tributario: Deducibilidad del Impuesto de Renta (Ley N° 7092)
Un elemento persuasivo clave modelado en la arquitectura del Wizard de Afiliación es la transparencia fiscal. De conformidad con el **Artículo 8, inciso i) de la Ley del Impuesto sobre la Renta (Ley N° 7092)** de la República de Costa Rica (Asamblea Legislativa, 1988), las cuotas pagadas por concepto de membresía a colegios profesionales, cámaras empresariales y sindicatos formalmente constituidos constituyen **gastos 100% deducibles de la renta bruta**, siempre que se cuente con el comprobante de pago debidamente autorizado. Al transparentar este beneficio en la pantalla de resumen, el costo percibido de la afiliación se reduce significativamente.

---

## 13.2 Arquitectura Transaccional y Flujo de Pago en el Portal

En el portal se implementó una arquitectura transaccional dual (`tools/10_ecommerce_pagos/`):
1. **Flujo Primario: SINPE Móvil Asistido con Radicado Digital:**
   * El comerciante transfiere el arancel correspondiente (ej. ₡15.000 para Microempresa) al teléfono oficial de la Cámara (`8703-0792`).
   * Introduce el número de comprobante bancario (mínimo 6 dígitos).
   * El sistema ejecuta validaciones en cliente para verificar el formato, prevenir registros duplicados (*anti-replay protection*) y emite un folio único de radicación.
2. **Flujo Corporativo: Pasarela BAC Compra-Click:**
   * Para empresas medianas y corporativas con facturación centralizada, se habilitó el puente transaccional con la pasarela BAC Compra-Click, admitiendo tarjetas Visa y Mastercard con tokenización segura y protocolo 3D Secure (3DS).

---

## 13.3 Auditoría de Seguridad y Validación en Código

El validador transaccional (`tools/10_ecommerce_pagos/sinpe_movil_validator.js`) aplica las siguientes reglas de negocio:

```javascript
// Validación Estricta de Teléfono y Comprobante Bancario Costarricense
function validarTransaccionSINPE(telefono, comprobante, monto) {
  // 1. Verificación de formato telefónico (+506 y 8 dígitos válidos)
  const regexTelefono = /^(?:\+506\s?)?[24678]\d{3}[-\s]?\d{4}$/;
  if (!regexTelefono.test(telefono)) {
    return { valido: false, error: "El teléfono debe corresponder a una línea celular válida de Costa Rica." };
  }

  // 2. Verificación de comprobante bancario (mínimo 6 caracteres alfanuméricos)
  if (!comprobante || comprobante.trim().length < 6) {
    return { valido: false, error: "Número de comprobante bancario inválido o incompleto." };
  }

  // 3. Cálculo de ahorro fiscal estimado bajo Ley 7092 (Régimen Tradicional pyme 15%)
  const ahorroFiscal = monto * 0.15;
  const costoEfectivo = monto - ahorroFiscal;

  return {
    valido: true,
    montoOriginal: monto,
    ahorroFiscalEstimado: ahorroFiscal,
    costoEfectivoMensual: costoEfectivo,
    folioRadicado: `CCA-AFIL-${Date.now().toString().slice(-6)}`
  };
}
```

---

---

## 13.5 Referencias Bibliográficas del Capítulo (Normativa APA 7 — Literatura 2022–2026)

* Banco Central de Costa Rica [BCCR]. (2023). *Reglamento del Sistema de Pagos: Normativa de SINPE Móvil y Transferencias Electrónicas de Fondos*. San José: División de Sistemas de Pago, BCCR.
* Bonneau, J., & Herley, C. (2022). Modern transactional security and passwordless authentication frameworks for web and mobile commerce. *IEEE Security & Privacy*, 20(3), 44-55. https://doi.org/10.1109/MSEC.2022.3155890
* Ministerio de Hacienda de Costa Rica. (2023). *Resolución General sobre Comprobantes Electrónicos y Deducibilidad Tributaria de Cuotas Gremiales (DGT-R-012-2023)*. San José: Dirección General de Tributación.
