const projectFiles = [
  'projects/music.html',
  'projects/beta_bank.html',
  'projects/megaline.html'
];

const container = document.getElementById('projects-container');

function loadProjects(lang) {
  container.innerHTML = '';
  projectFiles.forEach(file => {
    fetch(file)
      .then(resp => resp.text())
      .then(html => {
        container.innerHTML += html;
        attachProjectEvents(container);
        setProjectLanguage(lang);
      });
  });
}

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

function setProjectLanguage(lang) {
  container.querySelectorAll('[data-lang]').forEach(el => {
    if (el.dataset.lang === 'both') return; // contenedor de tarjeta
    if (el.dataset.lang === lang) {
      el.style.display = '';
    } else {
      el.style.display = 'none';
    }
  });
}

function getTranslateX(element) {
  const style = window.getComputedStyle(element);
  const matrix = new WebKitCSSMatrix(style.transform);
  return matrix.m41;
}

// Escuchar cambio de idioma global
document.addEventListener('langChanged', (e) => {
  setProjectLanguage(e.detail.lang);
});

// Inicial
const savedLang = localStorage.getItem('lang') || 'es';
loadProjects(savedLang);
