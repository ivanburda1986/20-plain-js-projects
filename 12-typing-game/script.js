const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const endgameEl = document.getElementById("end-game-container");
const settingsBtn = document.getElementById("settings-btn");
const settingsForm = document.getElementById("settings-form");
const difficultySelect = document.getElementById("difficulty");

//List of words for the game
const words = [
  "alphamale",
  "banana",
  "cypress",
  "donought",
  "elixire",
  "fantasy",
  "government",
  "hiroshima",
  "goose",
  "indigo",
  "journalism",
  "kangaroo",
];

// Init the first word
let randomWord;

//Init score
let score = 0;

//Init time
let time = 10;

//Set difficulty to the value from local storage and if not available then to medium
let difficulty =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

//Set difficulty dropdown value
difficultySelect.value =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

//Focus on the input field on start
text.focus();

//Start counting down
const timeInterval = setInterval(updateTime, 1000);

//get a random word
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

//Add a word to DOM
function addWordToDOM() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}

//Update score
function updateScore() {
  score += 1;
  scoreEl.innerHTML = score;
}

//Update time
function updateTime() {
  time--;
  timeEl.innerHTML = time + "s";

  if (time === 0) {
    clearInterval(timeInterval);
    //End the game
    gameOver();
  }
}

//Gameover
function gameOver() {
  endgameEl.innerHTML = `
  <h1>Time ran out</h1>
  <p>Your final score is ${score}</p>
  <button onclick="location.reload()">Reload</button>
  `;
  endgameEl.style.display = "flex";
}

addWordToDOM();

//Event listeners

//Typing
text.addEventListener("input", (e) => {
  const insertedText = e.target.value;
  if (insertedText === randomWord) {
    addWordToDOM();
    updateScore();

    //Clear the typed word once correct
    e.target.value = "";

    if (difficulty === "hard") {
      time += 2;
    } else if (difficulty === "medium") {
      time += 3;
    } else {
      time += 5;
    }

    updateTime();
  }
});

//Settings btn click
settingsBtn.addEventListener("click", () => {
  settings.classList.toggle("hide");
});

//Settings select difficulty
settingsForm.addEventListener("change", (e) => {
  difficulty = e.target.value;
  localStorage.setItem("difficulty", difficulty);
});
