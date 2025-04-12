// TMDB Movie API
const API_KEY = "api_key=ec332d19e6fed067df0160ce34067cc4"; // API Key
const BASE_URL = "https://api.themoviedb.org/3";
const LANGUAGE_PARAM = "&language=pt-BR"; // Parâmetro para idioma
const IMAGE_URL = "https://image.tmdb.org/t/p/w500";
const SEARCH_URL = `${BASE_URL}/search/movie?${API_KEY}${LANGUAGE_PARAM}`; // Adicionando idioma na busca

const form = document.getElementById("form");
const searchInput = document.getElementById("search");
const resultsDiv = document.getElementById("results");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
        fetch(`${SEARCH_URL}&query=${searchTerm}`)
            .then((res) => res.json())
            .then((data) => {
                resultsDiv.innerHTML = "";
                if (data.results.length > 0) {
                    data.results.forEach((movie) => {
                        const movieDiv = document.createElement("div");
                        movieDiv.innerHTML = `
                        <div class="movie">
                            <a href="movie.html?id=${movie.id}">
                                <h2 class="titulo">${movie.title}</h2>
                                <img src="${IMAGE_URL}${movie.poster_path}" alt="${movie.title}">
                                <p class="ano">Ano: ${movie.release_date.split('-')[0]}</p>
                            </a>
                        </div>
                        `;
                        resultsDiv.appendChild(movieDiv);
                    });
                } else {
                    resultsDiv.innerHTML = "Nenhum filme encontrado.";
                }
            })
            .catch((error) => console.error("Erro ao buscar filmes:", error));
    }
});
