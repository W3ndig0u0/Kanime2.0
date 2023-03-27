function getAnimeInfo(animeID) {
  // let animeId = sessionStorage.getItem("AnimeID");
  const url = "https://api.consumet.org/anime/gogoanime/info/";
  
  fetch(url + animeID)
  .then(response => response.json())
  .then(result => {
    ShowAnimeInfo(result);
  })
}

function getAnimeVideo(animeEpisodeId) {
const urlDownload = "https://api.consumet.org/anime/gogoanime/watch/";
const urlPlayer = "https://api.consumet.org/anime/gogoanime/servers/";

    fetch(urlDownload + animeEpisodeId)
    .then(response => response.json())
    .then(result => ShowAnimeDownload(result)),

    fetch(urlPlayer + animeEpisodeId)
    .then(response => response.json())
    .then(result => ShowAnimeVideoAlternatives(result))
}

function onClickEpisode(episodeID){
  getAnimeVideo(episodeID);
}

function onClickAnime(animeID){
  getAnimeInfo(animeID);
}

// ?Information
function ShowAnimeInfo(result){

    const animeInfoDiv = document.querySelector(".animeInfo");

    // !Tar bort det gamla infot
    while (animeInfoDiv?.firstChild) {
      animeInfoDiv.removeChild(animeInfoDiv.firstChild);
    }

    const animeInfo = document.createElement("div");
    const animeEpisodes= document.createElement("div");
    const animeTitle = result.title;
    const otherName = result.otherName

    const description = result.description
    const animeId = result.id
    const totalEpisodes = result.totalEpisodes
    const year = result.releaseDate
    const type = result.type
    const image = result.image
    const genres = JSON.stringify(result.genres);
    const episodeOne = result.episodes[0].id;

    // ?Episoder knapp
    for (let i = 0; i < result.episodes.length; i++) {
      const episode = document.createElement("div");

      const episodeNr = result.episodes[i].number;
      const episodeID = result.episodes[i].id;
      const episodeInnerHTML = `
      <div>
        <h4>${episodeID}</h4>
        <button class="${episodeID}" onclick="onClickEpisode(this.className)">${episodeNr}</button>
      </div>
      `;

      episode.innerHTML = episodeInnerHTML;
      animeEpisodes.appendChild(episode);
      document.querySelector(".animeInfo")?.appendChild(animeEpisodes);
    }

    const AnimeInfoInnerHTML = `
    <div>
    <h1>${animeTitle}</h1>
    <p>${description}</p>
    <div></div>
    <image src="${image}">
    <p>${otherName}</p>
    <p>${animeId}</p>
    <p>${year}</p>
    <p>${totalEpisodes}</p>
    <p>${type}</p>
    <p>${removeSign(genres)}</p>
    </div>
    `;
    animeInfo.innerHTML = AnimeInfoInnerHTML;
    document.querySelector(".animeInfo")?.appendChild(animeInfo);
    // ?Deafult till ep 1
    getAnimeVideo(episodeOne);
}

// ?Ladda ned
function ShowAnimeDownload(result) {
  const animeDownloadDiv = document.querySelector(".animeDownload");

    // !Tar bort det gamla infot
    while (animeDownloadDiv?.firstChild) {
      animeDownloadDiv.removeChild(animeDownloadDiv.firstChild);
    }

    for (let i = 0; i < result.sources.length; i++) {
    const AnimeDownload = document.createElement("div");
    const animeUrl = result.sources[i].url
    const animeQ = result.sources[i].quality
    const AnimeDInnerHTML = `<a href="${animeUrl}">>${animeQ}</a>`;

    AnimeDownload.innerHTML = AnimeDInnerHTML;
    animeDownloadDiv?.appendChild(AnimeDownload);
  }
}

// ?Alla video spelare
  function ShowAnimeVideoAlternatives(result) {
    const animeVideo = document.querySelector(".animeVideo");

    // !Tar bort det gamla infot
    while (animeVideo?.firstChild) {
      animeVideo.removeChild(animeVideo.firstChild);
    }

    for (let i = 0; i < result.length; i++) {
    const episodesPlay = document.createElement("div");
    const streamingService = result[i].name
    const animeUrl = result[i].url
    const episodesPlayHTML = `
    <div>
     <h5>${streamingService}</h5>
     <iframe src="${animeUrl}" frameborder="0"></iframe>
    </div>
    `;

    episodesPlay.innerHTML = episodesPlayHTML;
    animeVideo?.appendChild(episodesPlay);
  }
}


// !Tar bort "", [, ] och ,
function removeSign(genres){
  const s = genres.replace(/[""]/g, '');
  const s1 = s.replace("[", '');
  const s2 = s1.replace("]", '');
  const s3 = s2.replace(/[,]/g, ' ');
  return s3
}