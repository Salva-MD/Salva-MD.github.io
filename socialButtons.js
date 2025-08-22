function updateSocialLinks(lang) {
  const linkedin = document.getElementById("linkedin-link");
  const github = document.getElementById("github-link");
  const cv = document.getElementById("cv-link");
  const cvText = document.getElementById("cv-text");

  if (!linkedin || !github || !cv) {
    console.warn("Elementos sociales no encontrados en el DOM");
    return;
  }

  // Enlaces constantes
  linkedin.href = "https://www.linkedin.com/in/salvador-m-donnadieu/";
  github.href = "https://github.com/Salva-MD";

  // Solo cambia texto y enlace del CV según idioma
  if (lang === "es") {
    if (cvText) cvText.textContent = "CV";
    cv.href = "https://drive.google.com/file/d/1uMpIBRQPQ3ed9jdh4qiOoB1bjcx3d5Yq/view";
  } else {
    if (cvText) cvText.textContent = "Resume";
    cv.href = "https://drive.google.com/file/d/1vCZZ7ZKSa3zMNU9uHDqx_hdD2eGOIwS_/view";
  }
}
