# ModoCerca Web V4 — preview de modo oscuro

Estado: **PROTOTIPO / NO PUBLICADO**.

Base: ModoCerca Web V4 publicada el 17/09/2026.

## Qué agrega
- Botón manual Claro/Oscuro en la web principal.
- Botón equivalente en `/contacto`, `/tarjeta` y la página 404.
- Preferencia persistente mediante `localStorage` (`modocerca-theme`).
- La selección se conserva al navegar entre páginas y al volver más tarde desde el mismo navegador.
- Se actualiza `theme-color` del navegador.
- No modifica DNS, Cloudflare, formularios, WhatsApp, referencias `?ref=`, vCard ni contenidos/precios.

## Criterio visual
- Fondo oscuro azul petróleo profundo, no negro puro.
- Turquesa oficial `#00B4A6` como acento.
- Superficies elevadas en azul grisáceo para conservar jerarquía.
- El logo oficial no se recolorea ni se redibuja: se mantiene sobre una cápsula clara cuando el fondo oscuro reduciría su contraste.

## Archivos modificados/agregados
- `styles.css`
- `script.js`
- `theme-init.js` (nuevo)
- `index.html`
- `contacto/index.html`
- `tarjeta/index.html`
- `404.html`

## Antes de publicar
Validar visualmente escritorio + móvil, ambos temas, formulario WhatsApp, menú móvil, tarjeta digital y QR físico apuntando a `/contacto`.
