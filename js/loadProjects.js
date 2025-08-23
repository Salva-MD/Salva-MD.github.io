// Archivos de proyectos en español
const projectFilesES = [
  'projects/beta_bank.html',
  'projects/megaline.html',
  'projects/instacart.html'
];

// Archivos de proyectos en inglés
const projectFilesEN = [
  'projects/beta_bank_en.html',
  'projects/megaline_en.html',
  'projects/instacart_en.html'
];

const container = document.getElementById('projects-container');
const version = '1.0.0';

// Función para cargar proyectos según idioma
function loadProjects(lang) {
  container.innerHTML = ''; // limpiar contenedor al inicio
  const files = (lang === 'en') ? projectFilesEN : projectFilesES;

  // Obtener todos los contenidos primero
  const fetches = files.map(file =>
    fetch(`${file}?v=${version}`)
      .then(response => response.text())
  );

  Promise.all(fetches)
    .then(allHtml => {
      // Insertar todo junto de una vez
      container.innerHTML = allHtml.join('');

      attachProjectEvents(container);

      // Mensaje final de repositorios
      const reposMessage = document.createElement('div');
      reposMessage.classList.add('mt-8', 'text-center', 'text-gray-700');
      reposMessage.innerHTML = (lang === 'en') ? `
        <p>Some of my projects are available in the following repositories:</p>
        <p>
          <a href="https://github.com/Salva-MD/Python-and-Data-Wrangling" target="_blank" class="text-blue-600 hover:underline">Python and Data Wrangling</a> |
          <a href="https://github.com/Salva-MD/Analisis-de-Datos" target="_blank" class="text-blue-600 hover:underline">Data Analysis</a> |
          <a href="https://github.com/Salva-MD/Machine-Learning" target="_blank" class="text-blue-600 hover:underline">Machine Learning</a>
        </p>
      ` : `
        <p>Algunos de mis proyectos están disponibles en los siguientes repositorios:</p>
        <p>
          <a href="https://github.com/Salva-MD/Python-and-Data-Wrangling" target="_blank" class="text-blue-600 hover:underline">Python y Data Wrangling</a> |
          <a href="https://github.com/Salva-MD/Analisis-de-Datos" target="_blank" class="text-blue-600 hover:underline">Análisis de Datos</a> |
          <a href="https://github.com/Salva-MD/Machine-Learning" target="_blank" class="text-blue-600 hover:underline">Machine Learning</a>
        </p>
      `;
      container.appendChild(reposMessage);
    })
    .catch(error => console.error('Error al cargar los proyectos:', error));
}

// Función para manejar expansión de proyectos y carrusel
function attachProjectEvents(container) {
  // Expandir/colapsar proyectos
  container.querySelectorAll('.project-header').forEach(header => {
    header.addEventListener('click', () => {
      const body = header.nextElementSibling;
      body.classList.toggle('hidden');
      const arrow = header.querySelector('span:last-child');
      arrow.textContent = body.classList.contains('hidden') ? '▼' : '▲';
    });
  });

  // Botón anterior del carrusel
  container.querySelectorAll('.prev-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const track = btn.parentElement.querySelector('.slider-track');
      const imgs = track.querySelectorAll('img');
      const imgWidth = imgs[0].offsetWidth;
      let currentTransform = getTranslateX(track);
      currentTransform += imgWidth;
      if (currentTransform > 0) currentTransform = -imgWidth * (imgs.length - 1);
      track.style.transform = `translateX(${currentTransform}px)`;
    });
  });

  // Botón siguiente del carrusel
  container.querySelectorAll('.next-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const track = btn.parentElement.querySelector('.slider-track');
      const imgs = track.querySelectorAll('img');
      const imgWidth = imgs[0].offsetWidth;
      let currentTransform = getTranslateX(track);
      currentTransform -= imgWidth;
      if (currentTransform < -imgWidth * (imgs.length - 1)) currentTransform = 0;
      track.style.transform = `translateX(${currentTransform}px)`;
    });
  });
}

// Obtener la posición actual del carrusel
function getTranslateX(element) {
  const style = window.getComputedStyle(element);
  const matrix = new WebKitCSSMatrix(style.transform);
  return matrix.m41;
}

// Cargar proyectos al inicio según idioma guardado
document.addEventListener('DOMContentLoaded', () => {
  const lang = localStorage.getItem('lang') || 'es';
  loadProjects(lang);
});
