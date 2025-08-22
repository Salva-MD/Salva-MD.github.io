async function loadNavbar() {
  try {
    const response = await fetch('navbar.html');
    if (!response.ok) throw new Error('No se pudo cargar la navbar');

    const html = await response.text();
    document.getElementById('navbar-container').innerHTML = html;

    // Detectamos en qué página estamos
    const path = window.location.pathname.split('/').pop();

    // Ocultamos el link de la página actual
    if (path === 'index.html' || path === '') {
      const homeLink = document.getElementById('home-link');
      if (homeLink) homeLink.style.display = 'none';
    } else if (path === 'about.html') {
      const aboutLink = document.getElementById('nav-about');
      if (aboutLink) aboutLink.style.display = 'none';
    } else if (path === 'projects.html') {
      const projectsLink = document.getElementById('nav-projects');
      if (projectsLink) projectsLink.style.display = 'none';
    }

    // Ejecutamos cambio de idioma para actualizar textos y estilos
    const savedLang = localStorage.getItem('lang') || 'es';
    changeLang(savedLang);

  } catch (error) {
    console.error(error);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadNavbar();
});
