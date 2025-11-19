const movieContainer = document.getElementById('movie-container');
const searchInput = document.getElementById('search');
const API_KEY = '404cdccf'; // Get one free from http://www.omdbapi.com/

async function fetchMovies(query = 'Avengers') {
  const res = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`);
  const data = await res.json();
  movieContainer.innerHTML = '';
  if (data.Search) {
    data.Search.forEach(movie => {
      const card = document.createElement('div');
      card.className = 'movie-card';
      card.innerHTML = `
        <img src="${movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/200x300"}" alt="${movie.Title}">
        <div class="info">
          <h2>${movie.Title}</h2>
          <p>${movie.Year}</p>
        </div>
      `;
      movieContainer.appendChild(card);
    });
  } else {
    movieContainer.innerHTML = '<p>No movies found.</p>';
  }
}

// Load initial movies
fetchMovies();

// Search functionality
searchInput.addEventListener('keyup', (e) => {
  const query = e.target.value;
  if (query.length > 2) fetchMovies(query);
});