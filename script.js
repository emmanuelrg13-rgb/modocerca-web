const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
if (menuBtn && navLinks) {
  menuBtn.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));
}

document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());

const refMap = {
  'tarjeta': 'Tarjeta / QR',
  'qr': 'Tarjeta / QR',
  'junta': 'Junta de vecinos',
  'junta-vecinos': 'Junta de vecinos',
  'paredones': 'Paredones / Radio',
  'paredones-radio': 'Paredones / Radio',
  'web': 'Web',
  'whatsapp': 'WhatsApp',
  'google': 'Google',
  'referido': 'Recomendación',
  'tarjeta-digital': 'WhatsApp',
  'whatsapp-tarjeta': 'WhatsApp'
};

function applyReferralFromUrl() {
  const ref = new URLSearchParams(window.location.search).get('ref');
  if (!ref) return;
  const mapped = refMap[ref.toLowerCase()];
  if (!mapped) return;

  document.querySelectorAll('[data-origin-select]').forEach(select => {
    const option = [...select.options].find(opt => opt.text === mapped || opt.value === mapped);
    if (option) select.value = option.value || option.text;
  });
}

applyReferralFromUrl();

function buildWhatsAppMessage(form) {
  const data = new FormData(form);
  const nombre = data.get('nombre')?.trim() || 'Sin nombre';
  const negocio = data.get('negocio')?.trim() || 'No aplica';
  const servicio = data.get('servicio') || 'Consulta general';
  const origen = data.get('origen') || 'No indicado';
  const mensaje = data.get('mensaje')?.trim() || 'Quisiera recibir orientación.';
  const ref = new URLSearchParams(window.location.search).get('ref');
  const referencia = ref ? `\nReferencia: ${ref}` : '';
  return `Hola ModoCerca 👋\n\nSoy ${nombre}.\nNegocio/organización: ${negocio}\nServicio: ${servicio}\n¿Cómo conocí ModoCerca?: ${origen}${referencia}\n\n${mensaje}`;
}

document.querySelectorAll('.quote-form').forEach(form => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = encodeURIComponent(buildWhatsAppMessage(form));
    window.open(`https://wa.me/56934820776?text=${text}`, '_blank', 'noopener,noreferrer');
  });
});


// Tarjeta digital: compartir enlace con referencia medible.
const digitalCardUrl = 'https://modocerca.cl/tarjeta?ref=whatsapp-tarjeta';

function showShareStatus(message) {
  const status = document.querySelector('[data-share-status]');
  if (!status) return;
  status.textContent = message;
  status.hidden = false;
  window.setTimeout(() => { status.hidden = true; }, 3200);
}

document.querySelectorAll('[data-share-card]').forEach(button => {
  button.addEventListener('click', async () => {
    const shareData = {
      title: 'ModoCerca — Tecnología más cerca',
      text: 'Te comparto ModoCerca: soporte técnico, impresoras, redes, sitios web y soluciones digitales.',
      url: digitalCardUrl
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(digitalCardUrl);
        showShareStatus('Enlace copiado. Ya puedes pegarlo en WhatsApp.');
      } else {
        window.prompt('Copia este enlace:', digitalCardUrl);
      }
    } catch (error) {
      if (error?.name !== 'AbortError') showShareStatus('No se pudo compartir. Usa el botón de WhatsApp.');
    }
  });
});

document.querySelectorAll('[data-copy-card]').forEach(button => {
  button.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(digitalCardUrl);
      showShareStatus('Enlace copiado.');
    } catch (error) {
      window.prompt('Copia este enlace:', digitalCardUrl);
    }
  });
});
