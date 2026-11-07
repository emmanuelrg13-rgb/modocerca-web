/* ModoCerca V4.2: tema claro/oscuro compartido entre las páginas. */
(() => {
  'use strict';
  const storageKey = 'modocerca-theme';
  const root = document.documentElement;
  const systemQuery = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
  let stored = null;

  try {
    const previous = window.localStorage.getItem(storageKey);
    if (previous === 'dark' || previous === 'light') stored = previous;
  } catch (_) { /* Modo privado / almacenamiento bloqueado: usar preferencia del sistema. */ }

  function applyTheme(value) {
    const dark = value === 'dark';
    root.setAttribute('data-theme', dark ? 'dark' : 'light');
    root.style.colorScheme = dark ? 'dark' : 'light';
    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) themeColor.setAttribute('content', dark ? '#0C1B26' : '#0F2D3D');
    document.querySelectorAll('[data-theme-toggle]').forEach(button => {
      button.setAttribute('aria-label', dark ? 'Activar modo claro' : 'Activar modo oscuro');
      button.setAttribute('title', dark ? 'Activar modo claro' : 'Activar modo oscuro');
      const icon = button.querySelector('.theme-toggle-icon');
      const label = button.querySelector('.theme-toggle-label');
      if (icon) icon.textContent = dark ? '☀' : '☾';
      if (label) label.textContent = dark ? 'Modo claro' : 'Modo oscuro';
    });
  }

  applyTheme(stored || (systemQuery && systemQuery.matches ? 'dark' : 'light'));

  document.addEventListener('DOMContentLoaded', () => {
    applyTheme(root.getAttribute('data-theme'));
    document.querySelectorAll('[data-theme-toggle]').forEach(button => {
      button.addEventListener('click', () => {
        const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        stored = next;
        try { window.localStorage.setItem(storageKey, next); } catch (_) { /* Sigue funcionando esta sesión. */ }
        applyTheme(next);
      });
    });
  });

  if (systemQuery) {
    const updateForSystem = event => {
      if (!stored) applyTheme(event.matches ? 'dark' : 'light');
    };
    if (systemQuery.addEventListener) systemQuery.addEventListener('change', updateForSystem);
    else if (systemQuery.addListener) systemQuery.addListener(updateForSystem);
  }
})();
