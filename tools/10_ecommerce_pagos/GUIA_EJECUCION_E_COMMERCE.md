# Guía de Ejecución Real Paso a Paso: E-Commerce & Pasarelas de Pago (Semana 14)
**Proyecto:** Cámara de Comercio de Alajuela (CCA)  
**Herramientas:** Pasarela SINPE Móvil Nacional & BAC Credomatic Compra-Click / Stripe  
**Marco Regulatorio:** BCCR, Ley 7472 (Defensa del Consumidor) y Factura Electrónica v4.3 (Hacienda)

---

### Objetivo en el Proyecto
Resolver el bloqueo transaccional más grave del sitio histórico de la Cámara (la imposibilidad de pagar en línea). Implementar un flujo de checkout con validación bancaria para el medio de pago número 1 en Costa Rica (**SINPE Móvil**) y para tarjetas de débito/crédito nacionales e internacionales con firma HMAC-SHA256 y cumplimiento fiscal inmediato.

---

### Paso a Paso para la Ejecución Real

#### Paso 1: Configuración de la Pasarela SINPE Móvil
1. El archivo [`sinpe_movil_validator.js`](file:///c:/Users/marco/OneDrive/Desktop/Proyectos/2- Activos\3- Otros\personal-university-c22026-arqdeinfo\una-arqinf-proy-camaracomercioalajuela\implementaciones_reales\10_ecommerce_pagos\sinpe_movil_validator.js) contiene las reglas de negocio bancarias:
   - Destino: Teléfono oficial de la Cámara (`8703-0792`).
   - Montos válidos: Plan Pyme (`₡15.000`) y Plan Corporativo (`₡35.000`).
   - Validación de formato telefónico emisor (8 dígitos, inicio en 6, 7 u 8).
   - Comprobante bancario numérico único (prevención de ataques de reutilización mediante set en memoria o base de datos).

#### Paso 2: Ejecución del Flujo de Pago en el Portal Web
1. Abre `revamp_portal_web/index.html` en tu navegador.
2. Haz clic en el botón superior **"Afiliar Negocio"**.
3. Selecciona el **Plan Pyme (₡15.000/mes)**.
4. En el paso 1, ingresa los datos de la empresa:
   - Nombre: `Ferretería El Candado Alajuelense`
   - Cédula Jurídica: `3-101-889900`
   - Cantón: `Alajuela`
5. En el paso 2, selecciona el método de pago:
   - **Opción A (SINPE Móvil):** Transfiere al número `8703-0792` e ingresa el número de comprobante bancario (ej. `98234120`).
   - **Opción B (Tarjeta BAC):** Digita los datos de la tarjeta bancaria.
6. Pulsa **"Completar Afiliación y Generar Membresía"**.
7. El sistema validará la transacción, creará el registro en el Directorio y desplegará la pantalla de confirmación con el código de afiliado activo y enlace directo a WhatsApp.

#### Paso 3: Cumplimiento Fiscal (Facturación Electrónica 4.3)
1. Al completarse el pago, el backend genera la clave numérica de 50 dígitos exigida por el Ministerio de Hacienda para comprobantes electrónicos.
2. Se certifica que el gasto es **100% deducible de la renta bruta empresarial** al amparo del Artículo 8 de la Ley 7092.
