function getAnimeInfo() {
  // let animeId = sessionStorage.getItem("AnimeID");
  const url = "https://api.consumet.org/anime/gogoanime/info/spy-x-family";
  
  fetch(url)
  .then(response => response.json())
  .then(result => {
    ShowAnimeInfo(result);
  })
}

function getAnimeVideoAlternaives(animeId) {
  // const url = "https://api.consumet.org/anime/gogoanime/servers/" + anime + episode;
  const url = "https://api.consumet.org/anime/gogoanime/servers/spy-x-family-episode-1";
    
    fetch(url)
    .then(response => response.json())
    .then(result => {
      ShowAnimeVideoAlternatives(result, animeId);
    })
  }

function getAnimeVideoPlayer() {
// const url = "https://api.consumet.org/anime/gogoanime/servers/" + anime + episode;
const url = "https://api.consumet.org/anime/gogoanime/watch/spy-x-family-episode-1";

//? https://api.consumet.org/anime/gogoanime/watch/{episodeId}?server={serverName}

  fetch(url)
  .then(response => response.json())
  .then(result => {
    ShowAnimeVideoPlayer(result);
  })
}

function ShowAnimeInfo(result){
  console.log(result);

    const animeInfo = document.createElement("div");
    animeInfo.classList.add("AnimeVideo");
    const aniemeTitle = result.title;
    const otherName = result.otherName

    const description = result.description
    const animeId = result.id
    const totalEpisodes = result.totalEpisodes
    const year = result.releaseDate
    const type = result.type
    const image = result.image
    // const image = result.image
    var animeGenres = document.createElement("div");
    animeGenres.classList.add("animeGenres");

    for (let i = 0; i < result.genres.length; i++) {
      const genres = result.genres[i];
      animeGenres.innerHTML = `
      <div>
      <p>${genres}</p>
      </div>
      `;
      console.log(genres);
      document.querySelector(".AnimeVideo")?.appendChild(animeGenres);
    }

    const AnimeGenresInnerHTML = `
    <div>
    <h1>${aniemeTitle}</h1>
    <p>${description}</p>
    <div></div>
    <image src="${image}">
    <p>${otherName}</p>
    <p>${animeId}</p>
    <p>${year}</p>
    <p>${totalEpisodes}</p>
    <p>${type}</p>
    </div>
    `;
    animeInfo.innerHTML = AnimeGenresInnerHTML;
    document.querySelector(".animeGenres")?.appendChild(animeInfo);
}

function ShowAnimeVideoPlayer(result) {
  console.log(result);

    for (let i = 0; i < result.length; i++) {

    const AnimeInfo = document.createElement("div");
    AnimeInfo.classList.add("AnimeVideo");
    const animeUrl = result[i].url
    const streamingService = result[i].name

    const AnimeInfoInnerHTML = `
    <div>
     <h1>${streamingService}</h1>
     <iframe width="840" height="600" src="${animeUrl}" frameborder="0"></iframe>

    </div>
    `;

    AnimeInfo.innerHTML = AnimeInfoInnerHTML;
    document.querySelector(".animeVideo")?.appendChild(AnimeInfo);
  }
}

  function ShowAnimeVideoAlternatives(result, animeId) {
    console.log(result);
    for (let i = 0; i < result.length; i++) {

    const AnimeInfo = document.createElement("div");
    AnimeInfo.classList.add("AnimeVideo");
    const animeUrl = result[i].url
    const streamingService = result[i].name

    const AnimeInfoInnerHTML = `
    <div>
     <h1>${streamingService}</h1>
    </div>
    `;
    AnimeInfo.innerHTML = AnimeInfoInnerHTML;
    document.querySelector(".animeVideo")?.appendChild(AnimeInfo);

  }
}

getAnimeInfo();
getAnimeVideoPlayer();
getAnimeVideoAlternaives();