function updateSocialButtons(lang) {
  const linkedin = document.getElementById("linkedin-link");
  const github = document.getElementById("github-link");
  const cv = document.getElementById("cv-link");
  const cvText = document.getElementById("cv-text"); // si usas un span para texto CV

  if (!linkedin || !github || !cv) {
    console.warn("Elementos sociales no encontrados en el DOM");
    return;
  }

  if (lang === "es") {
    linkedin.textContent = "LinkedIn";
    linkedin.href = "https://www.linkedin.com/in/salvador-m-donnadieu/";

    github.textContent = "GitHub";
    github.href = "https://github.com/Salva-MD";

    if(cvText) cvText.textContent = "CV";
    cv.href = "https://drive.google.com/file/d/1uMpIBRQPQ3ed9jdh4qiOoB1bjcx3d5Yq/view";
  } else {
    linkedin.textContent = "LinkedIn";
    linkedin.href = "https://www.linkedin.com/in/salvador-m-donnadieu/";

    github.textContent = "GitHub";
    github.href = "https://github.com/Salva-MD";

    if(cvText) cvText.textContent = "Resume";
    cv.href = "https://drive.google.com/file/d/1vCZZ7ZKSa3zMNU9uHDqx_hdD2eGOIwS_/view";
  }
}
