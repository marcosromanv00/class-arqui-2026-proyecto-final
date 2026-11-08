# Pruebas de la pasarela simulada (SINPE Móvil + BAC Compra Click)

**Fecha:** 2026-11-08 12:03 · Módulo: `src/lib/pagos.ts` · Script: `probar_pagos.ts` (Node v24.17.0, localStorage simulado en memoria).

Reglas: SINPE valida celular CR (6/7/8 + 7 dígitos), comprobante numérico de 6 a 14 dígitos y anti-replay. La tarjeta valida Luhn, vencimiento futuro y CVV de 3-4 dígitos, y aprueba toda tarjeta válida excepto la de prueba de rechazo 4000 0000 0000 0002. Ningún pago es real.

## Resultados

- SINPE válido: {}
- SINPE teléfono fijo (2xxx): {"telefono":"Debe ser un celular costarricense de 8 dígitos (inicia en 6, 7 u 8)."}
- SINPE comprobante con letras: {"comprobante":"El comprobante del banco es numérico, de 6 a 14 dígitos."}
- Tarjeta Visa de prueba 4111…: {}
- Tarjeta con un dígito mal: {"numero":"Número de tarjeta inválido. Revise los dígitos."}
- Tarjeta vencida: {"vencimiento":"La tarjeta está vencida."}
- CVV de 2 dígitos: {"cvv":"El CVV tiene 3 o 4 dígitos."}
- Tarjeta de rechazo pasa formato: {}
- Pago tarjeta aprobada: {"aprobado":true,"metodo":"tarjeta","radicado":"CCA-2026-157659","referencia":"**** 1111 · Aut. 864063","estado":"EN APROBACIÓN · TESORERÍA CCA"}
- Pago tarjeta de rechazo: {"aprobado":false,"metodo":"tarjeta","radicado":"CCA-2026-756678","referencia":"**** 0002","estado":"RECHAZADO","motivo":"El banco emisor rechazó la transacción (fondos insuficientes). Intente con otra tarjeta o pague por SINPE Móvil."}
- SINPE primer uso: {"aprobado":true,"metodo":"sinpe","radicado":"CCA-2026-945680","referencia":"20261108123","estado":"EN APROBACIÓN · TESORERÍA CCA"}
- SINPE comprobante repetido (anti-replay): {"aprobado":false,"metodo":"sinpe","radicado":"CCA-2026-674318","referencia":"20261108123","estado":"RECHAZADO","motivo":"El comprobante 20261108123 ya fue registrado para otra afiliación. No se permiten comprobantes duplicados."}

**12/12 casos con el resultado esperado.** Los radicados y códigos de autorización son aleatorios en cada corrida.

**Limitación:** en el prototipo, el registro anti-replay vive en el navegador (localStorage). Otro navegador no conoce los comprobantes ya usados. En producción ese registro estaría en la base de datos de Tesorería.


**Flujo de aprobación:** todo pago válido (SINPE o tarjeta) termina en "Transacción exitosa", con estado **EN APROBACIÓN · TESORERÍA CCA**. El comprobante no prueba el pago: la afiliación se activa solo cuando Tesorería concilia el pago (SINPE) o recibe la confirmación firmada del banco (tarjeta).