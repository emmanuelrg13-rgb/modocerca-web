# ModoCerca Web V1 — Despliegue en Cloudflare Pages

## Qué contiene
- `index.html`: landing principal.
- `contacto/index.html`: página estable para el QR (`https://modocerca.cl/contacto`).
- `styles.css` y `script.js`: diseño y formulario de WhatsApp.
- `assets/logo.svg` y `assets/favicon.svg`: identidad visual.
- `404.html`, `robots.txt`, `sitemap.xml` y `_headers`: soporte técnico básico, SEO y cabeceras de seguridad.

## Opción recomendada: Cloudflare Pages con GitHub
Esta opción deja historial de cambios y despliega automáticamente cada vez que actualices el repositorio.

1. Crea un repositorio en GitHub, por ejemplo `modocerca-web`.
2. Sube **el contenido de esta carpeta** al nivel raíz del repositorio (no una carpeta contenedora adicional).
3. En Cloudflare entra a **Workers & Pages**.
4. Crea una aplicación/proyecto de **Pages** usando **Git integration** y conecta el repositorio.
5. Como este sitio es HTML/CSS/JS puro, no requiere framework ni build. Selecciona una configuración de sitio estático / sin comando de build cuando Cloudflare lo permita; el directorio de salida es la raíz del repositorio.
6. Despliega. Cloudflare entregará un subdominio temporal `*.pages.dev`.
7. Abre el proyecto de Pages > **Custom domains** > **Set up a domain**.
8. Agrega primero `modocerca.cl`. Como el dominio ya usa los nameservers de Cloudflare, Cloudflare puede crear el DNS requerido automáticamente.
9. Agrega también `www.modocerca.cl` si quieres que funcione la variante `www`.
10. Prueba `https://modocerca.cl/` y `https://modocerca.cl/contacto`.

## Opción rápida: Direct Upload (sin GitHub)
1. En Cloudflare: Workers & Pages > Create application > Get started > Drag and drop your files.
2. Usa la carpeta completa o el ZIP entregado.
3. Pon un nombre de proyecto, por ejemplo `modocerca-web`, y despliega.
4. Luego entra a Custom domains y agrega `modocerca.cl`.

**Importante:** Cloudflare indica que un proyecto creado inicialmente con Direct Upload no se convierte después en un proyecto con Git integration; para usar Git automático más adelante tendrías que crear otro proyecto. Por eso, si quieres mantener la web como proyecto versionado, conviene empezar con GitHub.

## Qué NO tocar
- No borres los registros MX/TXT/DKIM/SPF/DMARC de Google Workspace al conectar la web.
- El dominio puede tener registros web y de correo simultáneamente sin problema.
- Añade el dominio desde **Custom domains** del proyecto Pages; no crees manualmente un CNAME hacia `pages.dev` antes de asociar el dominio al proyecto.

## Próximos ajustes recomendados
- Reemplazar los precios cuando el Tarifario V1 cambie.
- Crear imagen Open Graph para compartir en WhatsApp/LinkedIn.
- Añadir Google Business cuando exista la ficha comercial.
- Generar QR definitivo apuntando a `https://modocerca.cl/contacto`.
