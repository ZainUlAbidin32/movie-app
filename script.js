const APIURL="https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const imgPath="https://image.tmdb.org/t/p/original";
const searchAPI="https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const main=document.querySelector("main");
const form=document.getElementById("form");
const search=document.getElementById("search");

fetchMovies(APIURL);
async function fetchMovies(url){
    const resp=await fetch(url);
    const respData=await resp.json();
    console.log(respData);
    showMovies(respData.results);
    // respData.results.forEach(movie=>{
    //     const img=document.createElement("img");
    //     img.src=imgPath+movie.backdrop_path;
    //     document.body.appendChild(img);
    // })
    
    
}

function voteColor(vote){
    if(vote>=8){
        return 'green';
    }
    else if(vote>=5){
        return 'orange';
    }
    else{
        return 'red';
    }
}

function showMovies(movies){
    main.innerHTML="";
    movies.forEach(movie=>{
        const movieEl=document.createElement("div");
        movieEl.classList.add("movie");
        movieEl.innerHTML=`
            <img src="${imgPath+movie.backdrop_path}" alt="">
            <div class="movie-info">
                <h3>${movie.original_title}</h3>
                <span class="${voteColor(movie.vote_average)}">${movie.vote_average}</span>
            </div>
            <div class="overview">
            <h4>Overview:</h4>
            ${movie.overview}
            </div>
        `
        main.appendChild(movieEl)
    })

}

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    const seachTerm=search.value;
    if(seachTerm){
        fetchMovies(searchAPI+seachTerm);
        search.value="";
    }
})

