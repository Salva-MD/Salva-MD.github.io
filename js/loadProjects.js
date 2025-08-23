const projectFiles = [
  'projects/music.html',
  'projects/beta_bank.html',
  'projects/megaline.html'
];

// Versión para evitar caché
const version = '1.0.0';

const container = document.getElementById('projects-container');

function loadProjects() {
  container.innerHTML = '';
  projectFiles.forEach(file => {
    fetch(`${file}?v=${version}`)
      .then(response => response.text())
      .then(html => {
        container.innerHTML += html;
        attachProjectEvents(container);
      })
      .catch(error => console.error('Error al cargar el proyecto:', error));
  });
}

// Configura la expansión de cada proyecto y el carrusel
function attachProjectEvents(container) {
  container.querySelectorAll('.project-header').forEach(header => {
    header.addEventListener('click', () => {
      const body = header.nextElementSibling;
      body.classList.toggle('hidden');
      const arrow = header.querySelector('span:last-child');
      arrow.textContent = body.classList.contains('hidden') ? '▼' : '▲';
    });
  });

  // Carrusel
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

document.addEventListener('DOMContentLoaded', loadProjects);
