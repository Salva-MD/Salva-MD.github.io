async function loadNavbar() {
  try {
    const response = await fetch('navbar.html');
    if (!response.ok) throw new Error('No se pudo cargar la navbar');

    const html = await response.text();
    document.getElementById('navbar-container').innerHTML = html;

    const savedLang = localStorage.getItem('lang') || 'es';
    changeLang(savedLang);

    // Ocultar botón de la página actual
    hideCurrentPageButton();

  } catch (error) {
    console.error(error);
  }
}

function hideCurrentPageButton() {
  let currentPage = window.location.pathname.split('/').pop();

  if (!currentPage) currentPage = 'index.html';

  const pageButtonMap = {
    'index.html': 'home-link',
    'about.html': 'home-link',
    'projects.html': 'projects-link',
  };

  const idToHide = pageButtonMap[currentPage];

  if (idToHide) {
    const el = document.getElementById(idToHide);
    if (el) el.style.display = 'none';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadNavbar();
});
