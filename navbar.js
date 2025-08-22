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

function changeLang(lang) {
  localStorage.setItem('lang', lang);

  document.querySelectorAll("[data-lang]").forEach(el => {
    el.style.display = el.getAttribute("data-lang") === lang ? "block" : "none";
  });

  // Actualizar textos de la navbar
  const homeLink = document.getElementById("home-link");
  if (homeLink) {
    homeLink.textContent = lang === "es" ? "Inicio" : "Home";
  }

  const aboutLink = document.getElementById("nav-about");
  if (aboutLink) {
    aboutLink.textContent = lang === "es" ? "Sobre mí" : "About me";
  }

  const projectsLink = document.getElementById("nav-projects");
  if (projectsLink) {
    projectsLink.textContent = lang === "es" ? "Proyectos" : "Projects";
  }

  updateSocialLinks(lang); // si usas esta función, sino la puedes quitar

  setActiveLangButton(lang);
}

function setActiveLangButton(activeLang) {
  const btnES = document.querySelector("button[onclick=\"changeLang('es')\"]");
  const btnEN = document.querySelector("button[onclick=\"changeLang('en')\"]");

  if (activeLang === 'es') {
    btnES?.classList.add('bg-gray-800', 'text-white');
    btnEN?.classList.remove('bg-gray-800', 'text-white');
    btnEN?.classList.add('bg-gray-200', 'text-black');
  } else {
    btnEN?.classList.add('bg-gray-800', 'text-white');
    btnES?.classList.remove('bg-gray-800', 'text-white');
    btnES?.classList.add('bg-gray-200', 'text-black');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadNavbar();
});
