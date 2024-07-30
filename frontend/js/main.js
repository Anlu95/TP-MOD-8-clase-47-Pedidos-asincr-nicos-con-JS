window.onload = () => {
  const app = document.getElementById("root");
  const container = document.createElement("div");
  container.setAttribute("class", "container");
  app.appendChild(container);

  const favoriteMovies = JSON.parse(localStorage.getItem("favoriteMovies")) || [];

  // Aquí debemos agregar nuestro fetch
  fetch("http://localhost:3031/api/movies/")
    .then(response => response.json())
    .then(peliculas => {
      console.log(peliculas.data);

      let data = peliculas.data;

      data.forEach(movie => {
        const card = document.createElement("div");
        card.setAttribute("class", "card");

        const h1 = document.createElement("h1");
        h1.textContent = movie.title;

        const p = document.createElement("p");
        p.textContent = `Rating: ${movie.rating}`;

        const duracion = document.createElement("p");
        duracion.textContent = `Duración: ${movie.length}`;

        const star = document.createElement('span');
        star.textContent = '⭐';
        star.classList.add('favorite-icon');
        star.style.cursor = 'pointer';
        if (favoriteMovies.includes(movie.id)) {
          star.style.color = 'gold'; 
        }
        star.addEventListener('click', () => {
          let favorites = JSON.parse(localStorage.getItem("favoriteMovies")) || [];
          if (!favorites.includes(movie.id)) {
            favorites.push(movie.id);
            localStorage.setItem("favoriteMovies", JSON.stringify(favorites));
            star.style.color = 'gold'; 
            alert('Película añadida a favoritos');
          } else {
            favorites = favorites.filter(id => id !== movie.id);
            localStorage.setItem("favoriteMovies", JSON.stringify(favorites));
            star.style.color = ''; 
            alert('Película removida de favoritos');
          }
        });

        card.appendChild(h1);
        card.appendChild(p);
        card.appendChild(duracion);
        if (movie.genre !== null) {
          const genero = document.createElement("p");
          genero.textContent = `Género: ${movie.genre.name}`;
          card.appendChild(genero);
        }
        card.appendChild(star);
        container.appendChild(card);
      });
    })
    .catch(error => console.error('Error al cargar las películas:', error));
};
