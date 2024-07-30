window.onload = () => {
  const app = document.getElementById("root");
  const container = document.createElement("div");
  container.setAttribute("class", "container");
  app.appendChild(container);

  // Obtener el array de películas favoritas del localStorage
  const favoriteMovies = JSON.parse(localStorage.getItem("favoriteMovies")) || [];

  if (favoriteMovies.length === 0) {
    container.innerHTML = "<p>No tienes películas favoritas</p>";
    return;
  }

  // Fetch para cada película favorita
  favoriteMovies.forEach(movieId => {
    fetch(`http://localhost:3031/api/movies/${movieId}`)
      .then(response => response.json())
      .then(data => {
        const movie = data.data;
        const card = document.createElement('div');
        card.classList.add('card');

        const h1 = document.createElement('h1');
        h1.textContent = movie.title;

        const p = document.createElement('p');
        p.textContent = `Rating: ${movie.rating}`;

        const duracion = document.createElement('p');
        duracion.textContent = `Duración: ${movie.length}`;

        // Añadir elementos a la tarjeta y al contenedor
        card.appendChild(h1);
        card.appendChild(p);
        card.appendChild(duracion);
        if (movie.genre !== null) {
          const genero = document.createElement('p');
          genero.textContent = `Género: ${movie.genre.name}`;
          card.appendChild(genero);
        }
        container.appendChild(card);
      })
      .catch(error => console.error('Error al cargar las películas:', error));
  });
};
