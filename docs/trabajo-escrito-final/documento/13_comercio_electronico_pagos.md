# 13. Comercio Electrónico y Arquitectura de Pasarelas de Pago Gremial

## 13.1 De la Web Pasiva al Motor de Conversión Transaccional

En el comercio moderno, un portal gremial no puede limitarse a ser un folleto pasivo de consulta. Para garantizar la sostenibilidad financiera de la institución y facilitar la vida de los comerciantes, la plataforma debe integrar capacidades de **Comercio Electrónico (*E-Commerce*)**, permitiendo la autogestión de afiliaciones, el cobro recurrente de membresías y la matrícula a capacitaciones especializadas.

Durante la Semana 14 del curso se diseñó la arquitectura transaccional del portal, sustituyendo los engorrosos pagos presenciales en ventanilla por un flujo de compra digital seguro, claro y adaptado a las costumbres financieras de Costa Rica.

---

## 13.2 Estructura de Planes y Reglas de Facturación Digital

Se modelaron tres planes de membresía basados en el tamaño de la unidad económica, incorporando una lógica de cálculo automático en cliente:

#### Tabla 13.1. *Estructura tarifaria de membresías y reglas comerciales de afiliación (CCA 2026)*

| Nivel de Membresía | Cuota Base Mensual | Cuota Anual Promocional | Beneficios Comerciales Incluidos |
| :--- | :--- | :--- | :--- |
| **Microempresa & Emprendedor** | ₡15.000 + IVA | ₡150.000 + IVA *(2 meses gratis)* | Ficha en Directorio Verificado; 1 vacante activa en Bolsa de Empleo; Asesoría legal básica trimestral. |
| **PYME Comercial / Servicios** | ₡35.000 + IVA | ₡350.000 + IVA *(2 meses gratis)* | Ficha destacada en Directorio; Vacantes ilimitadas; 30% descuento en capacitaciones; Ruedas de negocio. |
| **Corporativo & Gran Empresa** | ₡75.000 + IVA | ₡750.000 + IVA *(2 meses gratis)* | Directorio prioritario; Salones de eventos de la Cámara gratuitos; Representación gremial ante el Concejo Municipal. |

### Lógica Transaccional y Cálculo del IVA (13%)
El calculador del Wizard desglosa con transparencia matemática el subtotal, el impuesto sobre el valor agregado (IVA del 13% según la Ley N.° 9635) y el monto total definitivo a cancelar. Si el comerciante opta por el ciclo anual, el sistema aplica automáticamente un descuento equivalente a dos meses de cuota, incentivando el flujo de caja anual de la Cámara sin sorpresas ocultas en la pantalla de pago.

---

## 13.3 Integración de Canales de Pago Locales

Para maximizar la tasa de conversión en Alajuela, la arquitectura ofrece tres métodos de pago adaptados a los hábitos del comerciante costarricense:

1. **SINPE Móvil Institucional (Número Oficial 8888-2222):** El método preferido por microempresarios como Don Carlos. El usuario realiza la transferencia desde su aplicación bancaria móvil indicando el nombre de su negocio; el sistema genera el radicado y valida la transacción en línea.
2. **Tarjeta de Crédito / Débito (Pasarela Segura BAC Credomatic / Compra-Click):** Procesamiento tokenizado bajo estándares PCI-DSS para empresas medianas y corporativas como la de Licda. Valeria. Permite domiciliar cargos automáticos mensuales recurrentes.
3. **Transferencia Bancaria IBAN (Banco Nacional de Costa Rica):** Diseñada para empresas grandes que requieren emitir órdenes de pago desde sus departamentos de tesorería y contabilidad.

---

## 13.4 Máquina de Estados del Proceso de Pago y Emisión de Factura Electrónica

El flujo transaccional se diseñó como una máquina de estados finita y predecible para evitar cobros dobles o incertidumbre:

```
[ Estado Inicial: Selección de Plan ]
               │
               ▼
[ Estado 2: Revisión de Aranceles + IVA ]
               │
               ▼
[ Estado 3: Procesando Pago Seguro ] ── (Fallo) ──► [ Estado Error: Instrucción de Reintento ]
               │
               ▼ (Aprobado)
[ Estado 4: Generación de Radicado Único (CCA-2026-XXXX) ]
               │
               ▼
[ Emisión de Factura Electrónica v4.4 (Hacienda) + Notificación WhatsApp ]
```

Una vez completada la transacción, el sistema dispara automáticamente el comprobante electrónico XML al Ministerio de Hacienda y emite al usuario una pantalla de felicitación con su **Número de Radicado Oficial**, informándole que su distintivo físico de afiliado y su acceso al panel del directorio han sido activados de inmediato.
