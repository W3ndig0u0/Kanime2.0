function getTopAiring(page) {
  // let animeId = sessionStorage.getItem("AnimeID");
  const url = "https://api.consumet.org/anime/gogoanime/top-airing?page=" + page;
  
  fetch(url)
  .then(response => response.json())
  .then(result => {
    ShowTopAiring(result);
  })
}


// ?Alla video spelare
function ShowTopAiring(result) {
  console.log(result.results);

  const animeInfo = document.createElement("div");

  for (let i = 0; i < result.results.length; i++) {

  const animeEpisodes= document.createElement("div");

  const animeTitle = result.results[i].title;
  const animeId = result.results[i].id
  const image = result.results[i].image
  const genres = JSON.stringify(result.results[i].genres);

  const AnimeInfoInnerHTML = `
  <div class="${animeId}" onclick="onClickAnime(this.className)">
  <h1>${animeTitle}</h1>
  <div></div>
  <image src="${image}">
  <p>${animeId}</p>
  <p>${removeSign(genres)}</p>
  </div>
  `;
  animeEpisodes.innerHTML = AnimeInfoInnerHTML;
  animeInfo?.appendChild(animeEpisodes);
  document.querySelector(".animeTopAiring")?.appendChild(animeInfo);
  }
}

getTopAiring(1);