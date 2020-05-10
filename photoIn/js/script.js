const auth = "563492ad6f91700001000001fcad7b912d714173b98262e18b05a0b5";
const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const form = document.querySelector(".search-form");
let searchValue;
const more = document.querySelector(".more");
let page = 1;
let search;
let lastSearch;

document.images[0].remove();

searchInput.addEventListener("input", updateInput);
more.addEventListener("click", loadmore);

function updateInput() {
  searchValue = this.value;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    searchPhotos(searchValue, clear);
  });
}

async function fetchApi(url) {
  const dataFetch = await fetch(url, {
    headers: {
      Accept: "application/json",
      Authorization: auth,
    },
  });
  const data = await dataFetch.json();
  return data;
}

function creatPhoto(data) {
  data.photos.forEach((photo) => {
    const galleryImg = document.createElement("div");
    galleryImg.classList.add("gallery-img");
    galleryImg.innerHTML = `
    <div class="photo-info">
          <p>${photo.photographer}</p>
          <a href=${photo.src.original} >Download</a>
    </div>
    <img src="${photo.src.large}" />
  `;

    gallery.appendChild(galleryImg);
  });
}

async function curatedPhotos() {
  search = false;
  const data = await fetchApi(
    `https://api.pexels.com/v1/curated?per_page=15&page=${page}`
  );

  creatPhoto(data);
}
async function searchPhotos(query, call) {
  search = true;
  lastSearch = query;
  const data = await fetchApi(
    `https://api.pexels.com/v1/search?query=${query}+query&per_page=15&page=${page}`
  );

  call();

  creatPhoto(data);
}
function clear() {
  gallery.innerHTML = "";
  searchInput.value = "";
}

async function loadmore() {
  page++;
  if (search === false) curatedPhotos();
  else searchPhotos(lastSearch, hey);
}

function hey() {
  console.log("hey");
}

curatedPhotos();
