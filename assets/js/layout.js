// Account for navigation wrapping, browser zoom, and translation-added lines.
const header = document.getElementById('site-header');
if (header && 'ResizeObserver' in window) {
  new ResizeObserver(() => {
    document.documentElement.style.setProperty('--site-header-height', `${header.getBoundingClientRect().height}px`);
  }).observe(header);
}
// The theme's checkbox menu uses a label; give it button keyboard semantics.
const menu = document.getElementById('nav-toggle');
const menuButton = document.querySelector('label[for="nav-toggle"]');
if (menu && menuButton) {
  menuButton.setAttribute('role', 'button');
  menuButton.setAttribute('tabindex', '0');
  menuButton.setAttribute('aria-controls', 'nav-menu');
  menuButton.setAttribute('aria-label', document.documentElement.lang.startsWith('zh') ? '导航菜单' : 'Navigation menu');
  const syncMenu = () => menuButton.setAttribute('aria-expanded', String(menu.checked));
  menu.addEventListener('change', syncMenu);
  menuButton.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      menuButton.click();
    }
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu.checked) {
      menu.checked = false;
      menu.dispatchEvent(new Event('change'));
      menuButton.focus();
    }
  });
  document.getElementById('nav-menu')?.addEventListener('click', event => {
    if (event.target.closest('a')) {
      menu.checked = false;
      menu.dispatchEvent(new Event('change'));
    }
  });
  syncMenu();
}

// Show the scroll instruction only when a table actually exceeds its viewport.
for (const region of document.querySelectorAll('.paper-table-scroll')) {
  const hint = region.previousElementSibling;
  if (!hint?.classList.contains('paper-table-hint')) continue;
  const update = () => { hint.hidden = region.scrollWidth <= region.clientWidth + 1; };
  if ('ResizeObserver' in window) {
    const observer = new ResizeObserver(update);
    observer.observe(region);
    observer.observe(region.querySelector('table'));
  }
  update();
}
