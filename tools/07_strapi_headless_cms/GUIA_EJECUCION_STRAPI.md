# Guía de Ejecución Real Paso a Paso: Strapi Headless CMS (Semana 11)
**Proyecto:** Cámara de Comercio de Alajuela (CCA)  
**Herramienta:** Strapi Open-Source Headless CMS ([strapi.io](https://strapi.io))  
**Costo:** Gratis (100% de código abierto, ejecutable en local con Node.js y SQLite o PostgreSQL).

---

### Objetivo en el Proyecto
Desacoplar la gestión de contenidos institucionales y mercantiles de la capa de presentación visual. Permitir al personal administrativo de la Cámara registrar, editar y validar comercios afiliados, vacantes de empleo y convenios institucionales a través de un panel de control con roles y permisos, exponiendo una API REST y GraphQL tipada para el portal web y aplicaciones móviles.

---

### Paso a Paso para la Ejecución Real

#### Paso 1: Instalación Rápida de Strapi en Local
1. Abre tu terminal de PowerShell en una carpeta externa (o dentro del proyecto).
2. Ejecuta el comando oficial de inicialización no interactiva con base de datos SQLite integrada:
   ```bash
   npx create-strapi-app@latest cca-backend-cms --quickstart --no-run
   ```
3. Una vez finalizada la instalación de dependencias, accede a la carpeta:
   ```bash
   cd cca-backend-cms
   ```

#### Paso 2: Importar los Esquemas de la CCA
1. Copia el archivo local [`schemas/comercio.schema.json`](file:///c:/Users/marco/OneDrive/Desktop/Proyectos/2- Activos\3- Otros\personal-university-c22026-arqdeinfo\una-arqinf-proy-camaracomercioalajuela\implementaciones_reales\07_strapi_headless_cms\schemas\comercio.schema.json) en la ruta:
   `src/api/comercio/content-types/comercio/schema.json`
2. Copia [`schemas/vacante_empleo.schema.json`](file:///c:/Users/marco/OneDrive/Desktop/Proyectos/2- Activos\3- Otros\personal-university-c22026-arqdeinfo\una-arqinf-proy-camaracomercioalajuela\implementaciones_reales\07_strapi_headless_cms\schemas\vacante_empleo.schema.json) en:
   `src/api/vacante-empleo/content-types/vacante-empleo/schema.json`

#### Paso 3: Iniciar Strapi y Crear el Primer Administrador
1. Inicia el servidor de desarrollo:
   ```bash
   npm run develop
   ```
2. Strapi abrirá automáticamente el navegador en `http://localhost:1337/admin`.
3. Completa el formulario de registro del primer superadministrador (Nombre, Correo, Contraseña).

#### Paso 4: Habilitar Permisos Públicos de la API
1. En el panel izquierdo de Strapi, ve a **Settings** (Configuración) -> **Users & Permissions Plugin** -> **Roles**.
2. Haz clic en el rol **"Public"** (Público).
3. En la sección **Comercio**, marca las casillas:
   - `find` (Obtener lista de comercios)
   - `findOne` (Obtener detalle de un comercio)
4. En la sección **Vacante-empleo**, marca `find` y `findOne`.
5. Haz clic en **"Save"** en la esquina superior derecha.

#### Paso 5: Consultar la API REST desde el Navegador o Frontend
1. Abre una pestaña del navegador o Postman y consulta:
   `http://localhost:1337/api/comercios`
2. Recibirás la respuesta en formato JSON estructurado con paginación y metadatos.
3. Para buscar con filtros nativos de Strapi:
   `http://localhost:1337/api/comercios?filters[canton][$eq]=Alajuela&filters[afiliado_verificado][$eq]=true`
4. Toma capturas de pantalla de la interfaz de administración (Content Manager) y de la respuesta JSON para el Capítulo 10 del documento final.
