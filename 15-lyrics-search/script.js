const form = document.getElementById("form");
const search = document.getElementById("search");
const result = document.getElementById("result");
const more = document.getElementById("more");

const apiURL = "https://api.lyrics.ovh";

//Search by song or artist - using the older fetch + then approach
/* function searchSongs(searchTerm) {
  fetch(`${apiURL}/suggest/${searchTerm}`)
    .then((res) => res.json())
    .then((data) => console.log(data));
} */

//Search by song or artist - using the more modern async, await approach
async function searchSongs(searchTerm) {
  const res = await fetch(`${apiURL}/suggest/${searchTerm}`);
  const data = await res.json();
  showData(data);
}

//Show song and artist in DOM
function showData(data) {
  /*   let output = "";
  data.data.forEach((song) => {
   output += `
    <li>
      <span><strong>${song.artist.name}</strong> - ${song.title}</span>
      <button class="btn" data-artist="${song.artist.name}" data-songTitle="${song.title}">Get lyrics</button>
      </li>
    `;
  });

  result.innerHTML = `
  <ul class="songs">
    ${output}
  </ul>
  `; */

  result.innerHTML = `
  <ul class="songs">
    ${data.data
      .map(
        (song) =>
          `
      <li>
        <span><strong>${song.artist.name}</strong> - ${song.title}</span>
        <button class="btn" data-artist="${song.artist.name}" data-songTitle="${song.title}">Get lyrics</button>
        </li>
      `
      )
      .join("")}
  </ul>
  `;

  if (data.prev || data.next) {
    more.innerHTML = `
    ${
      data.prev
        ? `<button class="btn" onclick="getMoreSongs('${data.prev}')">Previous</button>`
        : ""
    }
    ${
      data.next
        ? `<button class="btn" onclick="getMoreSongs('${data.next}')">Next</button>`
        : ""
    }
    `;
  } else {
    more.innerHTML = "";
  }
}

//Get previous and next songs
async function getMoreSongs(url) {
  const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
  const data = await res.json();
  showData(data);
}

//Get lyrics
async function getLyrics(artist, songTitle) {
  const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
  const data = await res.json();
  const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, "<br>");
  result.innerHTML = `
  <h2><strong>${artist}</strong> - ${songTitle}</h2>
  <span>${lyrics}</span>
`;
  more.innerHTML = "";
}

//Event listeners
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = search.value.trim();
  if (!searchTerm) {
    alert("Please type in something to search...");
  } else {
    searchSongs(searchTerm);
  }
});

//Get lyrics button click
result.addEventListener("click", (e) => {
  let clickedElement = e.target;
  if (clickedElement.tagName === "BUTTON") {
    //there are more ways to check this, such as classList.contains('btn')
    const artist = clickedElement.getAttribute("data-artist");
    const songTitle = clickedElement.getAttribute("data-songTitle");

    getLyrics(artist, songTitle);
  }
});
