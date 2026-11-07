# ModoCerca Web V4.1 — Vitrinismo y conversión

**Preparado el 07/11/2026.** Partiendo exclusivamente del ZIP oficial `ModoCerca_Web_V4_LISTA_PARA_PUBLICAR.zip` (17/09/2026).

## Qué hicimos

1. **Portada orientada a necesidades:** reemplazamos el listado repetido del bloque destacado por cuatro accesos concretos («mi computador», «mi impresora», «mi Wi-Fi» y «mi negocio»), con enlaces que preparan una consulta sin exigir conocimientos técnicos. El mensaje general y la identidad se mantienen.
2. **Tarjetas de servicios con CTA:** ahora las seis tarjetas incorporan un problema real del cliente, una descripción prudente y un botón de consulta. La ruta lleva a `/contacto` con `ref=web-servicios-...` y preselección de servicio.
3. **Proceso transparente:** una sección de tres pasos muestra cómo se evalúa la necesidad y se confirma el alcance y precio antes de intervenir. No introduce promesas de gratuidad ni plazos no pactados.
4. **Precios por familias:** los **16 valores y sus textos originales se mantienen íntegros**, ahora organizados en seis secciones navegables: computadores, impresoras, redes, web, radio y Google Workspace. Cada grupo tiene un enlace para consultar.
5. **Formularios más claros:** el botón explica que **prepara** el mensaje de WhatsApp, no que lo envía automáticamente. Las consultas enlazadas preseleccionan el servicio y admiten un mensaje introductorio opcional. `ref=web-...` queda clasificado como origen web; la referencia concreta queda en el mensaje.
6. **Accesibilidad y móvil:** menú con `aria-expanded`, cierre con Escape, estilos de foco, encabezado principal en `/contacto` y pequeños ajustes en tarjetas/tarifas para pantallas estrechas.

## No cambiamos

- Identidad, logotipo, paleta, DNS, correo, Cloudflare, encabezados de seguridad ni vCard.
- Número de WhatsApp o correo público.
- Los **16 precios originales** (ni cantidades ni condiciones).
- Ruta `/contacto` a la que apunta el QR físico y ruta `/tarjeta`.
- Funciones de compartir y guardar contacto de la tarjeta digital; `tarjeta/index.html` sigue igual.
- No se añadió una tienda, publicaciones de Renueva ni servicios no validados.
- No se añadieron analíticas de visitas ni rastreadores externos.

## Limitaciones importantes

- El código se validó estructuralmente, sin ejecutar una auditoría visual real en navegadores de escritorio y móvil: **es obligatorio revisar una vista previa antes de publicar en producción**.
- El parámetro `ref` se comunica en el texto de WhatsApp **solo si el visitante finalmente envía el mensaje**. Esto permite conocer el origen de las consultas recibidas, pero NO cuenta visitas, clics ni abandonos.
- Los QR físicos existentes conducen a `/contacto` sin `ref`; por tanto no se puede distinguir automáticamente un escaneo de una visita directa a esa misma ruta. Se preserva su comportamiento anterior. Para medir QR con precisión en una futura tirada sería necesario introducir una URL etiquetada, por ejemplo `/contacto?ref=tarjeta`.
- Shopify está fuera del alcance de este cambio y no debe activarse por efecto de esta entrega.

## Publicación segura (sin tocar DNS)

1. **Respaldar** el repositorio publicado (rama o commit de la V4 actual).
2. Extraer este ZIP y copiar **su contenido** a la raíz del repositorio web, respetando `assets/`, `contacto/` y `tarjeta/`.
3. Crear una rama de revisión y desplegar en una **vista previa de Cloudflare Pages**, o probarlo con un servidor estático local que sirva desde la raíz. No abrir `index.html` con doble clic: los recursos usan rutas `/...`.
4. Probar desde escritorio y celular: `/`, `/contacto`, `/tarjeta`; menú móvil; tarjetas de servicio; navegación por categorías de precios; WhatsApp; formulario; compartir/guardar vCard; visita desde QR físico.
5. Validar que los precios coincidan con el **tarifario comercial vigente al día de la publicación**; la versión adjunta reproduce exactamente los de septiembre, no presupone que sigan vigentes en noviembre.
6. Solo con esas comprobaciones aprobadas: fusionar a producción y verificar enlaces y rutas públicas. **No tocar DNS, MX, SPF, DKIM ni Google Workspace.**

Los archivos `README_PUBLICAR_V4.md` y `README_DESPLIEGUE.md` están conservados como referencia histórica de la entrega original. Esta guía V4.1 prevalece para los nuevos cambios.
