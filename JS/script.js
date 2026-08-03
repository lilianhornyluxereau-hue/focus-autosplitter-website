// =================================
// FOCUS AUTOSPLITTER WEBSITE
// SCRIPT
// =================================

console.log("Focus Autosplitter website chargé");

// =================================
// ANIMATION APPARITION
// =================================

const animatedElements = document.querySelectorAll(
  ".card, .download-box, .hero",
);

animatedElements.forEach((element) => {
  element.style.opacity = "0";

  element.style.transform = "translateY(30px)";
});

function revealElements() {
  animatedElements.forEach((element) => {
    const position = element.getBoundingClientRect();

    if (position.top < window.innerHeight - 80) {
      element.style.transition = "0.6s ease";

      element.style.opacity = "1";

      element.style.transform = "translateY(0)";
    }
  });
}

window.addEventListener("scroll", revealElements);

window.addEventListener("load", revealElements);

// =================================
// BOUTONS TEMPORAIRES
// =================================

const buttons = document.querySelectorAll("button");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.textContent.includes("Nouveau sujet")) {
      alert("Le forum complet sera disponible prochainement !");
    }
  });
});

// =================================
// VERSION APPLICATION
// =================================

const version = document.querySelector("#version");

if (version) {
  version.textContent = "Focus Autosplitter v1.0.0";
}

// =================================
// TELECHARGEMENT
// =================================

const downloadButtons = document.querySelectorAll("[href*='Setup.exe']");

downloadButtons.forEach((button) => {
  button.addEventListener("click", () => {
    console.log("Téléchargement de Focus Autosplitter lancé");
  });
});

// =================================
// ANIMATION LOGO
// =================================

const logo = document.querySelector(".logo img");

if (logo) {
  logo.addEventListener("mouseenter", () => {
    logo.style.transform = "rotate(10deg) scale(1.1)";
  });

  logo.addEventListener("mouseleave", () => {
    logo.style.transform = "rotate(0deg) scale(1)";
  });
}
// =================================
// CHARGEMENT FORUM
// =================================

const topicsContainer = document.getElementById("topics-container");

if (topicsContainer) {
  fetch("/api/topics")
    .then((response) => response.json())

    .then((topics) => {
      topicsContainer.innerHTML = "";

      if (topics.length === 0) {
        topicsContainer.innerHTML = "<p>Aucune discussion pour le moment.</p>";

        return;
      }

      topics.forEach((topic) => {
        const div = document.createElement("div");

        div.className = "topic";

        div.innerHTML = `

<div>

<h3>
${topic.title}
</h3>

<p>
Posté par ${topic.author} • ${topic.date}
</p>

</div>


<span>
${topic.category}
</span>

`;

        topicsContainer.appendChild(div);
      });
    });
}
