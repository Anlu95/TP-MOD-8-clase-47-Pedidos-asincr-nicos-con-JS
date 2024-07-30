window.onload = async function () {
    const inputId = document.querySelector("[name='id']");
    const inputTitle = document.querySelector("[name=title]");
    const inputRating = document.querySelector("[name=rating]");
    const inputAwards = document.querySelector("[name=awards]");
    const inputDate = document.querySelector("[name=release_date]");
    const inputLength = document.querySelector("[name=length]");
    const genreSelect = document.querySelector("[name=genre]");
  
    const deleteButton = document.querySelector('.botonBorrar');
    const createButton = document.querySelector('.botonCrear');
    const editButton = document.querySelector('.botonAgregar');
  
    // Cargar géneros en el select
    const { data: genres } = await (await fetch('http://localhost:3031/api/genres')).json();
    genres.forEach(g => {
      genreSelect.innerHTML += `<option value="${g.id}">${g.name}</option>`;
    });
  
    const query = window.location.search;
    const params = new URLSearchParams(query);
    const movieId = params.get('id');
  
    if (movieId) {
      const { data: movie } = await (await fetch(`http://localhost:3031/api/movies/${movieId}`)).json();
      
      inputId.value = movie.id;
      inputTitle.value = movie.title;
      inputRating.value = movie.rating;
      inputAwards.value = movie.awards;
      inputDate.value = movie.release_date.split('T')[0]; 
      inputLength.value = movie.length;
      genreSelect.value = movie.genre_id;
  
      createButton.style.display = 'none';
    } else {
      editButton.style.display = 'none';
      deleteButton.style.display = 'none';
    }
  
    // Crear película
    createButton.addEventListener('click', async function (event) {
      event.preventDefault();
      const data = {
        title: inputTitle.value,
        rating: inputRating.value,
        awards: inputAwards.value,
        release_date: inputDate.value,
        length: inputLength.value,
        genre_id: genreSelect.value
      };
  
      const settings = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      };
  
      await fetch("http://localhost:3031/api/movies/create", settings);
      alert('Película creada con éxito');
      window.location.href = 'home.html';
    });
  
    // Editar película
    editButton.addEventListener('click', async function (event) {
      event.preventDefault();
      const data = {
        title: inputTitle.value,
        rating: inputRating.value,
        awards: inputAwards.value,
        release_date: inputDate.value,
        length: inputLength.value,
        genre_id: genreSelect.value
      };
  
      const settings = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      };
  
      await fetch(`http://localhost:3031/api/movies/update/${inputId.value}`, settings);
      alert('Película actualizada con éxito');
      window.location.href = 'home.html';
    });
  
    // Eliminar película
    deleteButton.addEventListener('click', async function (event) {
      event.preventDefault();
      const settings = {
        method: 'DELETE'
      };
  
      await fetch(`http://localhost:3031/api/movies/delete/${inputId.value}`, settings);
      alert('Película eliminada con éxito');
      window.location.href = 'home.html';
    });
  };
  