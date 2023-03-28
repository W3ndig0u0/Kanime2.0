function getTopAiring(page) {
  // let animeId = sessionStorage.getItem("AnimeID");
  // const url = "https://api.consumet.org/anime/gogoanime/recent-episodes?page=" + page;
  const url = "https://api.consumet.org/anime/gogoanime/top-airing?page=" + page;
  
  fetch(url)
  .then(response => response.json())
  .then(result => {
    ShowTopAiring(result);
  })
}


// ?Alla video spelare
function ShowTopAiring(result) {

  const animeInfo = document.createElement("div");
  animeInfo.className = "imgRow";

  for (let i = 0; i < result.results.length; i++) {

  const animeEpisodes= document.createElement("span");

  const animeTitle = result.results[i].title;
  const animeId = result.results[i].id
  const image = result.results[i].image
  const genres = JSON.stringify(result.results[i].genres);

  const AnimeInfoInnerHTML = `
  <div id="${animeId}" class="animeCard" onclick="onClickAnime(this.id)">
  <h1>${animeTitle}</h1>
  <image src="${image}">
  <p>${animeId}</p>
  <p>${removeSign(genres)}</p>
  </div>
  `;

  animeEpisodes.innerHTML = AnimeInfoInnerHTML;
  animeInfo.appendChild(animeEpisodes);
  animeEpisodes.className = "animeCardHolder";
  document.querySelector(".animeTopAiring")?.appendChild(animeInfo);
  }
}

getTopAiring(1);
