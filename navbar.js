async function loadNavbar() {
  try {
    const response = await fetch('navbar.html');
    if (!response.ok) throw new Error('No se pudo cargar la navbar');

    const html = await response.text();
    document.getElementById('navbar-container').innerHTML = html;

    // Obtener sólo el archivo del path, sin carpetas ni query params
    const path = window.location.pathname.split('/').pop().split('?')[0].split('#')[0];

    // Ocultar el link correspondiente según la página actual
    if (path === '' || path === 'index.html') {
      const homeLink = document.getElementById('home-link');
      if (homeLink) homeLink.style.display = 'none';
    } else if (path === 'about.html') {
      const aboutLink = document.getElementById('nav-about');
      if (aboutLink) aboutLink.style.display = 'none';
    } else if (path === 'projects.html') {
      const projectsLink = document.getElementById('nav-projects');
      if (projectsLink) projectsLink.style.display = 'none';
    }

    // Actualizar idioma
    const savedLang = localStorage.getItem('lang') || 'es';
    changeLang(savedLang);

  } catch (error) {
    console.error(error);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadNavbar();
});
