const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
if (menuBtn && navLinks) {
  function setMenuOpen(open) {
    navLinks.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    menuBtn.textContent = open ? '×' : '☰';
  }
  menuBtn.addEventListener('click', () => setMenuOpen(!navLinks.classList.contains('open')));
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenuOpen(false)));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && navLinks.classList.contains('open')) {
      setMenuOpen(false);
      menuBtn.focus();
    }
  });
  document.addEventListener('click', e => {
    if (navLinks.classList.contains('open') && !navLinks.contains(e.target) && !menuBtn.contains(e.target)) {
      setMenuOpen(false);
    }
  });
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
  const normalized = ref.toLowerCase();
  const mapped = refMap[normalized] || (normalized.startsWith('web-') ? 'Web' : null);
  if (!mapped) return;

  document.querySelectorAll('[data-origin-select]').forEach(select => {
    const option = [...select.options].find(opt => opt.text === mapped || opt.value === mapped);
    if (option) select.value = option.value || option.text;
  });
}

applyReferralFromUrl();

// La selección viene de una opción existente: no se inyecta HTML de la URL.
function applyServiceFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const selectedService = params.get('servicio');
  const intro = params.get('mensaje');
  if (selectedService) {
    document.querySelectorAll('.quote-form select[name="servicio"]').forEach(select => {
      const matching = [...select.options].find(option => option.value === selectedService || option.text === selectedService);
      if (matching) select.value = matching.value;
    });
  }
  if (intro && intro.length <= 280) {
    document.querySelectorAll('.quote-form textarea[name="mensaje"]').forEach(textarea => {
      if (!textarea.value) textarea.value = intro;
    });
  }
}
applyServiceFromUrl();

// Solo en la portada, el contacto es por definición originado desde la web.
if (window.location.pathname === '/' || window.location.pathname.endsWith('/index.html')) {
  document.querySelectorAll('[data-origin-select]').forEach(select => {
    if (!new URLSearchParams(window.location.search).has('ref') && !select.value) {
      select.value = 'Web';
    }
  });
}


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
