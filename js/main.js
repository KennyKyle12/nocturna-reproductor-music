const menuToggle = document.getElementById('menu-toggle');
const mainNav = document.getElementById('main-nav');

function setMenu(open) {
  mainNav.classList.toggle('header__nav--open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
}

menuToggle.addEventListener('click', () => {
  setMenu(!mainNav.classList.contains('header__nav--open'));
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') setMenu(false);
});

mainNav.addEventListener('click', (event) => {
  if (event.target.classList.contains('header__nav-link')) setMenu(false);
});
