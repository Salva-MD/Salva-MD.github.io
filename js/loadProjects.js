const projectFilesES = [
  'projects/music.html',
  'projects/beta_bank.html',
  'projects/megaline.html'
];

// Si más adelante quieres separar por idioma, puedes crear projectFilesEN
const projectFilesEN = [
  'projects/music_en.html',
  'projects/beta_bank_en.html',
  'projects/megaline_en.html'
];

const container = document.getElementById('projects-container');
const version = '1.0.0';

function loadProjects(lang) {
  container.innerHTML = '';
  
  // Selecciona archivos según idioma
  const files = (lang === 'en') ? projectFilesEN : projectFilesES;

  files.forEach(file => {
    fetch(`${file}?v=${version}`)
      .then(response => response.text())
      .then(html => {
        container.innerHTML += html;
        attachProjectEvents(container);
      })
      .catch(error => console.error('Error al cargar el proyecto:', error));
  });
}

// Mantén la función attachProjectEvents igual (expansión + carrusel)
function attachProjectEvents(container) {
  container.querySelectorAll('.project-header').forEach(header => {
    header.addEventListener('click', () => {
      const body = header.nextElementSibling;
      body.classList.toggle('hidden');
      const arrow = header.querySelector('span:last-child');
      arrow.textContent = body.classList.contains('hidden') ? '▼' : '▲';
    });
  });

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

