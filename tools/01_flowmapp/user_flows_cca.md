# Flujos de Usuario Reales (User Flows) - Cámara de Comercio de Alajuela (CCA)

Este documento contiene la lógica formal de navegación, toma de decisiones y puntos de contacto diagramados para su implementación en la herramienta **FlowMapp (User Flow Tool)**.

---

## Flujo 1: Afiliación Digital y Pasarela de Pago (Comerciante)

```mermaid
graph TD
    A[Inicio: Portal Web CCA] -->|Clic en CTA 'Afiliar Negocio'| B[Página de Planes y Tarifas /afiliaciones/planes]
    B -->|Selecciona Plan: Pyme ₡15.000/mes| C[Formulario de Datos Mercantiles]
    C -->|Valida Cédula Jurídica / Física| D{¿Cédula Válida en Registro?}
    D -- No --> E[Mensaje de Error Inline + Corrección]
    E --> C
    D -- Sí --> F[Paso 2: Datos de Contacto y Representante]
    F --> G[Paso 3: Selección de Método de Pago]
    G --> H{¿Método Elegido?}
    H -- SINPE Móvil --> I[Muestra Número Oficial 8492-3925 + Monto Exacto]
    I --> J[Ingresa Comprobante Bancario 8 dígitos]
    H -- Tarjeta BAC / Stripe --> K[Iframe Seguro PCI-DSS]
    K --> L[Procesamiento Bancario]
    J --> M[Confirmación y Generación de Factura Electrónica]
    L --> M
    M --> N[Pantalla de Bienvenida: Ficha Creada en Directorio]
    N --> O[Fin: Notificación Automática a WhatsApp y Correo]
```

---

## Flujo 2: Búsqueda y Filtrado en Directorio de Comercios (Turista / Residente)

```mermaid
graph TD
    A[Inicio: Barra de Búsqueda Predictiva Algolia] -->|Escribe 'ferreteria coyol'| B[Dropdown Autocomplete con 3 Sugerencias]
    B -->|Presiona Enter o Selecciona 'Ver todos los 8 resultados'| C[Página de Resultados /directorio/busqueda]
    C --> D[Filtros Facetados Laterales: Cantón, Sector, Descuento CCA]
    D -->|Activa Checkbox 'Afiliado Verificado'| E[Refresco Instantáneo de Grid (<50ms)]
    E -->|Clic en Tarjeta de Comercio| F[Ficha Detallada del Comercio /directorio/comercio/slug]
    F --> G{Acción del Usuario}
    G -- Contactar --> H[Abre WhatsApp con Mensaje Prellenado]
    G -- Ubicación --> I[Abre Google Maps con Coordenadas Exactas]
    G -- Beneficio --> J[Muestra Cupón o Convenio Activo]
```

---

## Flujo 3: Postulación a Vacante en Bolsa de Empleo (Ciudadano Alajuelense)

```mermaid
graph TD
    A[Menú Principal: Servicios -> Bolsa de Empleo] --> B[Catálogo de Vacantes Activas /servicios/bolsa-empleo]
    B -->|Aplica Filtros: Tiempo Completo / Alajuela Centro| C[Lista Filtrada de Puestos]
    C -->|Selecciona Puesto: Asistente Administrativo| D[Detalle de Puesto y Requisitos]
    D -->|Clic en 'Postularme a esta Plaza'| E[Modal de Postulación]
    E --> F[Ingreso de Datos Básicos y Teléfono]
    E --> G[Carga de Hoja de Vida en Formato PDF < 5MB]
    G -->|Validación de Formato| H{¿PDF Válido?}
    H -- No --> I[Alerta: Solo archivos PDF permitidos]
    I --> G
    H -- Sí --> J[Envío Seguro de Postulación a Empresa Empleadora]
    J --> K[Confirmación en Pantalla con Código de Seguimiento]
```
