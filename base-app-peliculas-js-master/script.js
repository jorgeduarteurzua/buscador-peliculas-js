// Agregamos el listener del clik para bucar la pelicula, y pasamos un callback searchMovies
document.getElementById("searchButton").addEventListener('click', searchMovies)


// valores API themoviedb.org
// API KEY = 57ed531994d2ae51c5989bdb27bb7efa
// Token   = eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1N2VkNTMxOTk0ZDJhZTUxYzU5ODliZGIyN2JiN2VmYSIsInN1YiI6IjY1N2JhMDgwN2VjZDI4MDEzYjNlZGViZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JPW3deEzqXee_ZGZakBXpK375IyjclOvbCrj3RcVRPY
// nombre aplicacion      = jd-buscador-peliculas-js
// url a crear en netlify = jd-buscador-peliculas-js.netlify.app

let api_key = '57ed531994d2ae51c5989bdb27bb7efa'
let url_base = 'https://api.themoviedb.org/3/search/movie'
let url_img = 'https://image.tmdb.org/t/p/w500'

//?query=Jack+Reacher&api_key=57ed531994d2ae51c5989bdb27bb7efa'

let resultContainer = document.getElementById('results')

function searchMovies(){
    resultContainer.innerHTML = 'Cargando....'
    
    // rescatamos el valor ingresado de la pelicula a buscar
    let searchInput = document.getElementById('searchInput').value
    fetch(`${url_base}?query=${searchInput}&api_key=${api_key}`)
    .then(response => response.json())
    .then(response => displayMovies(response.results)) // results[] es el resultado de la API
}

function displayMovies(movies){
   
    resultContainer.innerHTML = ''

    // si no hay ninguna pelicula con el titulo ingresado indicamos que no existe
    if (movies.length === 0){
        resultContainer.innerHTML = '<p>No se encontraron Películas para el texto ingresado </p>'
        return
    }

    // Si hay peliculas

    movies.forEach(movie => {
        // Por cada pelicula vamos agregando los datos a mostrar
        let movieDiv = document.createElement('div')

        // va a crear la clasee movie que se encuentra en el style.css
        movieDiv.classList.add('movie')

        let title = document.createElement('h2')
        title.textContent = movie.title

        let releaseDate = document.createElement('p')
        releaseDate.textContent = 'La fecha de lanzamiento fue : ' + movie.release_date

        let overview = document.createElement('p')
        overview.textContent = movie.overview

        let posterPath = url_img + movie.poster_path
        let poster = document.createElement('img')
        poster.src = posterPath

        // Agregamos los elementos al Div
        
        movieDiv.appendChild(poster)
        movieDiv.appendChild(title)
        movieDiv.appendChild(releaseDate)
        movieDiv.appendChild(overview)

        // Agregamos al DIV mayor el Div de las peliculas
        resultContainer.appendChild(movieDiv)
    })
}