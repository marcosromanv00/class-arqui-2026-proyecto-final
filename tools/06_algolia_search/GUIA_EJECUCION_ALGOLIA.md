# Guía de Ejecución Real Paso a Paso: Algolia Search Engine (Semana 10)
**Proyecto:** Cámara de Comercio de Alajuela (CCA)  
**Herramienta:** Algolia Search ([algolia.com](https://www.algolia.com))  
**Costo:** Gratis (Plan Build incluye 10.000 búsquedas mensuales gratuitas de por vida).

---

### Objetivo en el Proyecto
Reemplazar la arquitectura de búsqueda deficiente del sitio anterior por un motor de búsqueda instantáneo (as-you-type), con tolerancia a errores tipográficos (typo-tolerance) para términos costarricenses, filtros facetados en tiempo real por cantón y sector comercial, y ordenamiento por relevancia y antigüedad del afiliado.

---

### Paso a Paso para la Ejecución Real

#### Paso 1: Crear Cuenta Gratuita en Algolia
1. Ve a [https://www.algolia.com](https://www.algolia.com) y pulsa **"Start free"**.
2. Regístrate con tu correo o cuenta de GitHub (no solicita tarjeta de crédito).
3. Selecciona la región del clúster más cercana (ej. `us-east-1` en Estados Unidos para latencia mínima desde Costa Rica).

#### Paso 2: Obtener las Credenciales de API
1. En el panel de control de Algolia, haz clic en el engranaje de **Settings** (esquina inferior izquierda) y selecciona **"API Keys"**.
2. Copia los tres valores:
   - **Application ID:** (Cadena de 10 caracteres, ej. `B4V91K8XZ2`).
   - **Search-Only API Key:** (Llave pública segura para el frontend).
   - **Admin API Key:** (Llave privada con permisos de escritura e indexación).

#### Paso 3: Ejecutar el Script de Indexación Automatizada
1. Abre tu terminal de PowerShell en la carpeta raíz del proyecto.
2. Ejecuta el comando de indexación suministrando tus credenciales:
   ```bash
   node implementaciones_reales/06_algolia_search/index_algolia.js --appId=TU_APPLICATION_ID --apiKey=TU_ADMIN_API_KEY
   ```
3. El script ejecutará automáticamente dos acciones contra la API de Algolia:
   - **Configuración de Relevancia:** Establece `searchableAttributes`, orden de ranking personalizado por antigüedad (`yearsMember`) y facetas navegables.
   - **Carga de Datos:** Sube los comercios, contactos y convenios del archivo [`cca_merchants_dataset.json`](file:///c:/Users/marco/OneDrive/Desktop/Proyectos/2- Activos/3- Otros/personal-university-c22026-arqdeinfo/una-arqinf-proy-camaracomercioalajuela/implementaciones_reales/06_algolia_search/cca_merchants_dataset.json).

#### Paso 4: Verificación en el Dashboard de Algolia
1. En Algolia, ve a la sección **"Search"** -> **"Indices"** -> Selecciona el índice `cca_directorio_comercial`.
2. Prueba escribir palabras con errores tipográficos intencionales en el buscador de la consola:
   - Escribe `fereteria` (falta una 'r') -> Comprueba que devuelve "Ferretería El Candado".
   - Escribe `coyol mecanico` -> Comprueba que devuelve "Taller Mecánico Hermanos Solís".
3. Toma capturas de pantalla de la consola mostrando:
   - La lista de registros indexados.
   - El panel de **Configuration > Searchable Attributes** y **Facets**.

#### Paso 5: Conectar con el Portal Web en Vivo
1. En el archivo `revamp_portal_web/app.js`, ingresa tu `Application ID` y tu `Search-Only API Key` en las variables de inicialización.
2. Abre `revamp_portal_web/index.html` en tu navegador.
3. Al teclear en la barra del encabezado o en el Directorio, las solicitudes viajarán directamente a los servidores de Algolia, mostrando tiempos de respuesta inferiores a 20 milisegundos.
