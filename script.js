const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const resultsList = document.getElementById("results");
const errorMessage = document.getElementById("error-message");
searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const searchTerm = searchInput.value.trim();
  if (searchTerm === "") {
    errorMessage.textContent = "Please enter a search term.";
    return;
  }
  errorMessage.textContent = "";
  const url = `https://itunes.apple.com/search?entity=allArtist&attribute=allArtistTerm&term=${searchTerm}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      resultsList.innerHTML = "";
      if (data.resultCount === 0) {
        errorMessage.textContent = "No search results found.";
      } else {
        data.results.forEach((result) => {
          const li = document.createElement("li");
          const name = document.createElement("span");
          name.textContent = result.artistName;
          li.appendChild(name);
          if (result.primaryGenreName) {
            const genre = document.createElement("span");
            genre.textContent = ` (${result.primaryGenreName})`;
            li.appendChild(genre);
          }
          resultsList.appendChild(li);
        });
      }
    })

    .catch((error) => {
      console.error(error);
      errorMessage.textContent = "An error occurred while searching.";
    });
});
