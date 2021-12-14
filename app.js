async function getMovies(page = 1) {
    const movieTitle = document.getElementById("search").value;
    const res = await fetch("http://www.omdbapi.com/?apikey=d67c387a&s=" + movieTitle + "&page=" + page);
    const data = await res.json();

    let movieObj = document.getElementById("movie-list");
    movieObj.innerHTML = "";

    if (!isArrayEmpty(data.Search)) {
        document.getElementById("movie-total").innerHTML = "Total: " + data.totalResults; // Set total
        document.getElementById("sad-face").classList.add("d-none");
        sortMovies(data.Search);
        displayMovies(movieObj, data.Search);
    } else {
        document.getElementById("movie-total").innerHTML = "";
        document.getElementById("sad-face").classList.remove("d-none");
        displaySadFace();
    }
    document.getElementById("movies-row").classList.remove("d-none");
}

function isArrayEmpty(arr) {
    return !Array.isArray(arr) || !arr.length > 0
}

function wrapItem(title, year, poster) {
    let ret = `
        <li class="list-group-item">
            <p>${title} (${year})</p>
            `
    if (poster != "N/A") {
        ret += `<img src=${poster}></img>`
    }
    ret += "</li>"
    return ret;
}

function sortMovies(arr) {
    arr.sort((a, b) => (a.Year < b.Year ? 1 : -1))
}

function displayMovies(movieList, movies) {
    movies.forEach((movie) => {
        const {
            Title,
            Year,
            Poster
        } = movie
        movieList.innerHTML += wrapItem(Title, Year, Poster);
    })
}

function displaySadFace() {}

function pressEnter(event) {
    if (event.keyCode === 13) {
        getMovies();
    }
}