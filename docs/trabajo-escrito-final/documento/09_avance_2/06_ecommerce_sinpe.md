## 7.6 Pasarela Transaccional y Cobro Digital Gremial (E-Commerce & SINPE Móvil)

### ¿Qué es? ¿Qué hace? ¿Cómo podría implementarse en nuestro proyecto?
La arquitectura de **Comercio Electrónico y Pagos Digitales** articula el flujo de conversión que permite a un comerciante formalizar su membresía y pagar su cuota en línea. Combina **SINPE Móvil** —el subsistema del Banco Central de Costa Rica (BCCR, 2023) que vincula cuentas IBAN a líneas celulares de 8 dígitos para transferencias inmediatas— con una pasarela corporativa de tarjetas Visa/Mastercard (**BAC Compra-Click**).

En el proyecto se implementó como un motor transaccional dual integrado en el wizard de Afiliación Digital (`src/lib/pagos.ts` y `tools/10_ecommerce_pagos/`), sustituyendo el trámite presencial en papel por un checkout de 3 pasos con validación algorítmica en tiempo real, cálculo de ahorro fiscal y emisión de radicado único (`CCA-2026-######`) sujeto a conciliación por Tesorería de la Cámara.

### Costos, planes y alcance de capa gratuita
- **SINPE Móvil Institucional:** **Costo mensual de $0.00/mes y 0% de comisión** en transferencias dirigidas al número oficial de la Cámara (`+506 8703-0792`).
- **BAC Compra-Click:** Sin cuota fija mensual de mantenimiento ($0.00/mes), aplicando únicamente comisión por transacción procesada (1.75%–2.5%) en el segmento corporativo que paga con tarjeta.

### Alternativas Open Code
- **MedusaJS:** Plataforma de comercio electrónico headless de código abierto (licencia MIT) en Node.js con arquitectura modular de pasarelas de pago.
- **Validadores Abiertos Luhn y SINPE en TypeScript/Node.js:** Módulos open source ejecutables sin intermediarios de pago para validación de estructura de comprobantes bancarios y tarjetas.

### Principios de Arquitectura de Información relacionados
1. **Divulgación Progresiva en 3 Pasos (Nielsen):** Separación cognitiva del trámite en *1) Datos de la empresa*, *2) Comprobante / Pago* y *3) Constancia*, evitando saturar al usuario con formularios extensos.
2. **Prevención Activa de Errores (Heurística #5 de Nielsen; Bonneau & Herley, 2022):** Validación de prefijos celulares costarricenses, longitud de comprobantes y algoritmo de Luhn antes de enviar la solicitud.
3. **Persuasión por Transparencia Fiscal (Art. 8, inciso i, Ley N.° 7092):** Visualización en pantalla del ahorro tributario (15% estimado en régimen tradicional Pyme) al ser la cuota gremial un gasto 100% deducible de la renta bruta.

### Demostración de aplicación en nuestro dominio
Se incluyeron en el motor de validación (`src/lib/pagos.ts`, `sinpe_movil_validator.js` y `probar_pagos.ts`) las reglas de negocio del sistema bancario costarricense buscando comprobar que la pasarela aceptara transacciones legítimas y bloqueara errores de digitación o intentos de reutilización de recibos:

**Tabla 10.**  
*Resultados de la batería de pruebas unitarias automatizadas de la pasarela transaccional (12/12 casos exitosos)*

| Caso de Prueba Evaluado | Entrada Sometida al Sistema | Resultado | Diagnóstico y Regla de Arquitectura Aplicada |
| :--- | :--- | :--- | :--- |
| **SINPE Móvil válido** | Celular `8703-0792`, comprobante `20261108123` | **Aprobado** | Emite radicado `CCA-2026-945680` en estado *En Aprobación · Tesorería CCA* |
| **SINPE con teléfono fijo** | Línea fija `2441-2090` | **Rechazado** | Exige prefijo celular móvil válido en Costa Rica (iniciando en 6, 7 u 8) |
| **SINPE comprobante inválido** | Cadena corta o con letras | **Rechazado** | Exige comprobante numérico bancario de entre 6 y 14 dígitos |
| **SINPE comprobante repetido** | Reintento del comprobante `20261108123` | **Rechazado** | Protección *Anti-Replay*: bloquea la reutilización de un recibo ya registrado |
| **Tarjeta Visa válida** | `4111 1111 1111 1111`, CVV `123` | **Aprobado** | Supera checksum de Luhn y emite radicado `CCA-2026-157659` |
| **Tarjeta con error de dígito** | Falla en suma de verificación de Luhn | **Rechazado** | Detecta error tipográfico en el número de tarjeta antes de procesar |
| **Tarjeta vencida / sin fondos** | Fecha pasada o `4000 0000 0000 0002` | **Rechazado** | Informa causa específica y ofrece cambio inmediato a SINPE Móvil |

![Figura 7.7. Flujo de checkout de afiliación digital en tres pasos](figuras/figura_05_flujo_checkout_afiliacion.png)

### Ajustes para un mejor resultado y justificación
Una vez recopilados los datos de las pruebas transaccionales y del estudio de usabilidad, se implementaron tres ajustes en el sistema:
1. **Protección Anti-Replay contra comprobantes duplicados:** Dado que SINPE Móvil no expone una API pública de consulta inmediata para comercios, se implementó un registro de control de comprobantes procesados que impide usar el mismo número de referencia dos veces y sitúa la solicitud en estado *«En Aprobación · Tesorería CCA»* hasta su conciliación contable.
2. **Desglose automático del costo efectivo mensual (Ley N.° 7092):** El validador calcula y muestra en el resumen el ahorro fiscal estimado del 15% (`costoEfectivo = monto - monto * 0.15`), reduciendo la fricción de precio percibido en la etapa de evaluación.
3. **Canal asistido por WhatsApp con mensaje prellenado:** Para comerciantes tradicionales como Doña Rosa o Don Carlos que prefieren enviar la captura del comprobante desde su celular, el Paso 2 incluye un enlace directo que abre WhatsApp con el número de radicado y los datos de la empresa listos para enviar.

### Evidencias
La ejecución de la suite automatizada `npx tsx tools/10_ecommerce_pagos/probar_pagos.ts` (documentada en `resultados_pruebas_pasarela.md`) superó el **100% de los casos de prueba (12/12)**, validando la robustez del flujo transaccional en el prototipo interactivo.
