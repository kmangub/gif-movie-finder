document.getElementById("my-form").addEventListener("submit", function(e) {
    e.preventDefault();
    // console.log(e.target.query.value);
    const keyword = e.target.query.value;

    const card = document.createElement("div");
    
        card.classList.add("card");
        card.style.width = "18rem";

        card.innerHTML = `
        <div class="card-body">
            <h3 class="card-title">${keyword}</h3>
            <button class="card-text" onclick="changeGifs(this)" value="${keyword}">Search GIFs</button>
            <button class=card-text" onclick="changeMovies(this)" value="${keyword}">Search Movies</button>
        </div>
        `;

        document.getElementById("keyword-buttons").append(card);
})

function getGifs(userInput) {
    const URL = `https://api.giphy.com/v1/gifs/search?api_key=mEjyhwBdv4Zt2LhqSouYRfxvm5geSKGQ&q=${userInput}&limit=12`

    fetch(URL)
        .then((response) => response.json())
        .then((data) => {
            const gifs = data.data;
            document.getElementById("result-container").innerHTML = "";
            showGifs(gifs);
        })
        .catch((error) => console.log(error))
}

function showGifs(arr) {
    for (const gif of arr) {
        const title = gif.title;
        const url = gif.images.fixed_height_small.url;

        const card = document.createElement("div");

        card.classList.add("card");
        card.style.width = "18rem";

        card.innerHTML = ` <img src=${url} class="card-img-top" alt=${title}>
        <div class="card-body">
        <p class=card-text">
        ${title}</p>
        </div>
        `;

        document.getElementById("result-container").append(card);
    }
}

function changeGifs(buttonObj){
    const buttonValue = buttonObj.value;

    getGifs(buttonValue);
}

function getMovies(input){
    const URL = `https://www.omdbapi.com/?s=${input}&apikey=cb594669`
    // const URL = `https://omdbapi.com/?t=${input}&apikey=cb594669`

    fetch(URL)
    .then((req) => req.json())
    .then((movie)=> {
    document.getElementById("result-container").innerHTML = "";
    console.log(movie.Search)
    displayMovies(movie.Search);
    })
}

function displayMovies(movies) {
    for (movie of movies){
        const movieTitle = movie.Title;
        const movieYear = movie.Year;
        const moviePosterURL = movie.Poster;
    
        const card = document.createElement("div");
    
        card.classList.add("card");
        card.style.width = "18rem";
    
        card.innerHTML = ` <img src=${moviePosterURL} class="card-img-top" alt=${movieTitle}>
            <div class="card-body">
            <p class=card-text">
            ${movieTitle}</p>
            <p class="card-text">
            ${movieYear}</p>
            </div>
            `;
    
            document.getElementById("result-container").append(card);

    }
}

function changeMovies(buttonObj) {
    const buttonValue = buttonObj.value;
    console.log(buttonValue)

    getMovies(buttonValue);
}