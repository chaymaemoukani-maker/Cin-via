const films = [
  {
    titre: "ONE PIECE",
    image: "image/One_Piece_.webp",
    categori: "action",
    description: "Dans cette adaptation en prise de vues réelles du manga culte, le jeune pirate au chapeau de paille Monkey D. Luffy emmène son équipage improbable dans une épique chasse au trésor."
  },
  {
    titre: "La Traque dans le sang",
    image: "image/vvv.jpg",
    categori: "action",
    description: "Confrontés à des ennemis sans pitié assoiffés de violence, deux jeunes boxeurs font équipe pour rendre justice et protéger leurs proches… au péril de leur vie."
  },
  {
    titre: "Peaky Blinders",
    categori: "drame",
    image: "image/Peaky Blinders  L'Immortel.webp",
    description: "Lorsque son fils, avec qui il est brouillé, se retrouve impliqué dans un complot nazi, Tommy Shelby, en exil, doit retourner à Birmingham pour sauver sa famille et son pays."
  },
  {
    titre: "xo kitty",
    image: "image/télécharger.webp",
    categori: "drame",
    description: "Guidée par ses sentiments jusqu'à un lycée prestigieux à Séoul, Kitty l'entremetteuse découvre que la vie, l'amour et la famille sont plus compliqués que ce qu'elle imaginait."
  },
  {
    titre: "the summer i turned pretty",
    image: "image/summer.webp",
    categori: "drame",
    description: "Dans la série L'été où je suis devenue jolie, adaptée des romans à succès de Jenny Han, Belly (Lola Tung), une adolescente de 16 ans, retrouve chaque année la maison de vacances familiale à Cousins Beach."
  },
  {
    titre:"Un ticket pour deux",
    image: "image/OIP.webp",
    categori: "comédie",
    description:"Un homme peine à rentrer chez lui pour Thanksgiving avec pour unique compagnon un désagréable vendeur d'anneau de rideau de douche."
  }
];

function createCard(film, index) {
  return `
    <div class="card">
      <img src="${film.image}">
      <h3>${film.titre}</h3>
      <p class="card-category">${film.categori || "Non classé"}</p>
      <button class="details-btn" data-index="${index}">Voir détails</button>
    </div>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".movies");
  const popup = document.querySelector(".popup-content");
  const overlay = document.querySelector(".overlay");
  const img = document.getElementById("popup-img");
  const title = document.getElementById("popup-title");
  const desc = document.getElementById("popup-desc");
  const closeBtn = document.getElementById("close");
  const categoryText = document.getElementById("popup-category");
  const categoryButtons = document.querySelectorAll(".categories button");

  
  function showMovies(filteredFilms) {
    container.innerHTML = "";
    filteredFilms.forEach((film, index) => {
      container.innerHTML += createCard(film, index);
    });
    attachDetailsEvents();
  }

 
  function attachDetailsEvents() {
    document.querySelectorAll(".details-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const index = btn.getAttribute("data-index");
        const film = films[index];

        img.src = film.image;
        title.textContent = film.titre;
        desc.textContent = film.description || "Pas de description";
        categoryText.textContent = film.categori || "Non classé";

        popup.classList.add("show");
        overlay.style.display = "block";
      });
    });
  }


  function closePopup() {
    popup.classList.remove("show");
    overlay.style.display = "none";
  }
  closeBtn.addEventListener("click", closePopup);
  overlay.addEventListener("click", closePopup);

  
  showMovies(films);

  
  categoryButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      categoryButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const cat = btn.textContent.toLowerCase();
      if (cat === "tous") {
        showMovies(films);
      } else {
        const filtered = films.filter(f => f.categori.toLowerCase() === cat);
        showMovies(filtered);
      }
    });
  });
});