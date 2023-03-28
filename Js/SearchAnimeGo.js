function getAnimeSearch(input) {
  // let animeId = sessionStorage.getItem("AnimeID");
  
  const url = "https://api.consumet.org/anime/gogoanime/" + input + "?page=1";
  
  fetch(url)
  .then(response => response.json())
  .then(result => {
    console.log(url);
    ShowSearch(result);
  })
}


function searchAnime(){
  getAnimeSearch(document.querySelector(".animeSearch")?.value);
}

function enterBtn(){
  const input = document.querySelector(".animeSearch");
  input?.addEventListener("keypress", function(event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      document.getElementById("searchBtn")?.click();
    }
  });
}


// ?Alla video spelare
function ShowSearch(result) {
  console.log(result.results);
  const shearchResult = document.querySelector(".searchingShow");

  // !Tar bort det gamla search
  while (shearchResult?.firstChild) {
    shearchResult.removeChild(shearchResult.firstChild);
  }

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
  <p>${genres}</p>
  </div>
  `;

  animeEpisodes.innerHTML = AnimeInfoInnerHTML;
  animeInfo.appendChild(animeEpisodes);
  animeEpisodes.className = "animeCardHolder";
  document.querySelector(".searchingShow")?.appendChild(animeInfo);
  }
}



enterBtn();
