async function getMovies() {
    const movieTitle = document.getElementById("search").value;
    const res = await fetch("http://www.omdbapi.com/?apikey=d67c387a&s=" + movieTitle);
    const data = await res.json();
    displayMovies(data.Search);
}

function wrapItem(title, year, poster) {
    return `
        <li class="list-group-item">
            ${title} (${year})
            <img href=${poster}></img>
        </li>
    `
}

function displayMovies(movies) {
    let movieList = document.getElementById("movie-list");
    movieList.innerHTML = "";
    document.getElementById("movie-total").innerHTML = "Total: " + movies.length; // Set total
    movies.forEach((movie) => {
        const {Title, Year, Poster} = movie
        movieList.innerHTML += wrapItem(Title, Year, Poster);
    })
}