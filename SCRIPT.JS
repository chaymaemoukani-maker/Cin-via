let favoris = [];
const films = [
  {
    titre: "ONE PIECE",
    image: "image/One_Piece_.webp",
    categori: "Action",
    description: "Dans cette adaptation en prise de vues réelles du manga culte, le jeune pirate au chapeau de paille Monkey D. Luffy emmène son équipage improbable dans une épique chasse au trésor."
  },
  {
    titre: "La Traque dans le sang",
    image: "image/vvv.jpg",
    categori: "Action",
    description: "Confrontés à des ennemis sans pitié assoiffés de violence, deux jeunes boxeurs font équipe pour rendre justice et protéger leurs proches… au péril de leur vie"
  },
  {
    titre: "Peaky Blinders",
    image: "image/Peaky Blinders  L'Immortel.webp",
    categori: "Drame",
    description: "Lorsque son fils, avec qui il est brouillé, se retrouve impliqué dans un complot nazi, Tommy Shelby, en exil, doit retourner à Birmingham pour sauver sa famille et son pays"
  },
  {
    titre: "xo kitty",
    image: "image/télécharger.webp",
    categori: "Drame",
    description: "Guidée par ses sentiments jusqu'à un lycée prestigieux à Séoul, Kitty l'entremetteuse découvre que la vie, l'amour et la famille sont plus compliqués que ce qu'elle imaginait."
  },
  {
    titre: "the summer i turned pretty",
    image: "image/summer.webp",
    categori: "Drame",
    description: "Dans la série L'été où je suis devenue jolie, adaptée des romans à succès de Jenny Han, Belly (Lola Tung), une adolescente de 16 ans, retrouve chaque année la maison de vacances familiale à Cousins Beach."
  },
  {
    titre: "Un ticket pour deux",
    image: "image/OIP.webp",
    categori: "Comédie",
    description: "Un homme peine à rentrer chez lui pour Thanksgiving avec pour unique compagnon un désagréable vendeur d'anneau de rideau de douche."
  }
];

function createCard(film, index) {
  return `
    <div class="card">
      <img src="${film.image}">
      <h3>${film.titre}</h3>
      <p class="card-category">${film.categori}</p>
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
  const categoryText = document.getElementById("popup-category");

  const closeBtn = document.getElementById("close");
  const categoryButtons = document.querySelectorAll(".categories button");

  const favBtn = document.querySelector(".fav-btn");
  const favContainer = document.querySelector(".favorites");

  let currentFilm = null;

  function showMovies(list) {
    container.innerHTML = "";

    list.forEach((film, index) => {
      container.innerHTML += createCard(film, index);
    });

    attachEvents(list);
  }

 
  function attachEvents(list) {
    document.querySelectorAll(".details-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const index = btn.dataset.index;
        const film = list[index];

        currentFilm = film;

        img.src = film.image;
        title.textContent = film.titre;
        desc.textContent = film.description;
        categoryText.textContent = film.categori;

        popup.classList.add("show");
        overlay.style.display = "block";
      });
    });
  }

 
  function showFavorites() {
    favContainer.innerHTML = "";

    favoris.forEach((film, index) => {
      favContainer.innerHTML += `
        <div class="card">
          <img src="${film.image}">
          <h3>${film.titre}</h3>
          <p class="card-category">${film.categori}</p>
          <button class="remove-btn" data-index="${index}">Supprimer</button>
        </div>
      `;
    });

   
    document.querySelectorAll(".remove-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const index = btn.dataset.index;
        favoris.splice(index, 1);
        showFavorites();
      });
    });
  }


  favBtn.addEventListener("click", () => {
    if (!currentFilm) return;

  
    if (!favoris.includes(currentFilm)) {
      favoris.push(currentFilm);
      showFavorites();
    }
  });


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

      const cat = btn.dataset.cat;

      if (cat === "tous") {
        showMovies(films);
      } else {
        const filtered = films.filter(
          f => f.categori.toLowerCase() === cat
        );
        showMovies(filtered);
      }
    });
  });

});