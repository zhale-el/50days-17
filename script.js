const API_URL =
  "https://api.themoviedb.org/3/discover/movie?page=1&sort_by=popularity.desc";

const IMG_PATH = "https://image.tmdb.org/t/p/w500";

const SEARCH_URL = "https://api.themoviedb.org/3/search/movie?query=";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NjY5ZjAyZDMxZmRiMjRiY2NlZDBlMGZlMzZlYThmYyIsInN1YiI6IjY0YzhjN2Q2Zjc5NGFkMDBhZDA1N2ZmYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vqPJoxtTIyLgOmm5v9cVF8QVgjeJh2Hx0ZZV6sAaIEY",
  },
};

const form = document.getElementById("form");
const search = document.getElementById("search");
const main = document.querySelector("main");

// get initial movies

getMovies(API_URL).then((res) => {
  showMovies(res);
});

async function getMovies(api) {
  const res = await fetch(api, options);
  const data = await res.json();
  return data.results;
}

function showMovies(movies) {
  main.innerHtml = "";
  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
  
    <img src="${IMG_PATH + poster_path}" alt="${title}" />
    <div class="movie-info">
      <h3>${title}</h3>
      <span class="${getClassByRate(vote_average)}">${vote_average}</span>
    </div>
    <div class="overview">
      <h3>overview</h3>
      ${overview}
    </div>
  `;
    main.appendChild(movieEl);
  });
}

function getClassByRate(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const searchTerm = search.value;
  if (searchTerm && searchTerm !== "") {
    getMovies(SEARCH_URL + searchTerm).then((res) => {
      showMovies(res);
    });
    search.value = "";
  } else {
    window.location.reload();
  }
});
