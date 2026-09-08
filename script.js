const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
if (menuBtn && navLinks) {
  menuBtn.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));
}

document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());

function buildWhatsAppMessage(form) {
  const data = new FormData(form);
  const nombre = data.get('nombre')?.trim() || 'Sin nombre';
  const negocio = data.get('negocio')?.trim() || 'No aplica';
  const servicio = data.get('servicio') || 'Consulta general';
  const mensaje = data.get('mensaje')?.trim() || 'Quisiera recibir orientación.';
  return `Hola ModoCerca 👋\n\nSoy ${nombre}.\nNegocio/organización: ${negocio}\nServicio: ${servicio}\n\n${mensaje}`;
}

document.querySelectorAll('.quote-form').forEach(form => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = encodeURIComponent(buildWhatsAppMessage(form));
    window.open(`https://wa.me/56934820776?text=${text}`, '_blank', 'noopener,noreferrer');
  });
});
