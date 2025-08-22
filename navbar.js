async function loadNavbar() {
  try {
    const response = await fetch('navbar.html');
    if (!response.ok) throw new Error('No se pudo cargar la navbar');

    const html = await response.text();
    document.getElementById('navbar-container').innerHTML = html;

    // Ya que la navbar se cargó, ejecutamos el cambio de idioma para actualizar textos y estilos
    const savedLang = localStorage.getItem('lang') || 'es';
    changeLang(savedLang);

  } catch (error) {
    console.error(error);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadNavbar();
});
