# ModoCerca Web V3 — lista para publicar

Esta versión conserva todos los cambios de V2 y añade la tarjeta digital.

## Novedades

- Nueva página: `https://modocerca.cl/tarjeta`
- Botón **Guardar contacto** mediante vCard (`.vcf`).
- Botón **Compartir tarjeta** usando el sistema de compartir del teléfono cuando está disponible.
- La tarjeta digital ofrece acceso directo a WhatsApp, contacto, teléfono, correo y servicios.
- Los enlaces compartidos usan la referencia `whatsapp-tarjeta`, que se registra como canal **WhatsApp** en el formulario existente.
- Se añadieron accesos a la tarjeta digital desde la portada y la página de contacto.
- Se actualizó `sitemap.xml`.
- Se mantiene soporte de impresoras y medición de origen de contactos de V2.
- Radio/Streaming sigue sin publicarse hasta terminar la validación de RadioEmma.

## Publicación

1. Copia el contenido de esta carpeta a la raíz del repositorio `modocerca-web`, reemplazando los archivos existentes.
2. Haz commit y push a la rama que Cloudflare usa para producción.
3. Espera el despliegue automático de Cloudflare.
4. Verifica en un teléfono real:
   - `https://modocerca.cl/`
   - `https://modocerca.cl/contacto`
   - `https://modocerca.cl/tarjeta`
   - `https://modocerca.cl/contacto?ref=paredones-radio`
   - botón Guardar contacto
   - botón Compartir tarjeta
   - envío del formulario a WhatsApp
   - QR físico de la tarjeta, que debe seguir abriendo `/contacto`

No es necesario modificar DNS, MX, TXT, DKIM ni la configuración de Google Workspace para publicar esta versión.
