//Selectors
const msgEl = document.getElementById("msg");

//Get a random number
const randomNum = getRandomNumber();

function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

//Initialize the speech recognition
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

//Start recognition
recognition.start();

//Capture user speech
function onSpeak(e) {
  const msg = e.results[0][0].transcript;
  alert(msg);
  writeMessage(msg);
  checkNumber(msg);
}

//Display on the screen what the user has said
function writeMessage(msg) {
  msgEl.innerHTML = `
  <div>You have said:</div>
  <span class="box">${msg}</span>
  `;
}

function checkNumber(msg) {
  const num = +msg;
  //Check whether the message is a valid number
  if (Number.isNaN(num)) {
    msgEl.innerHTML += "<div>That is not a valid number</div>";
    return;
  }
  //Check the number is in the range
  if (num > 100 || num < 1) {
    msgEl.innerHTML = "<div>The number must be between 1 and 100</div>";
    return;
  }
  //Check number
  if (num === randomNum) {
    document.body.innerHTML = `
    <h2>Congrats! You have guessed the number! <br><br>
    It was ${num}
    <button class="play-again" id="play-again">Play again!</button>
    </h2>
    `;
  } else if (num > randomNum) {
    msgEl.innerHTML += "<div>Go lower</div>";
  } else {
    msgEl.innerHTML += "<div>Go higher</div>";
  }
}

//Speak result
recognition.addEventListener("result", onSpeak);

//End speach recognition service
recognition.addEventListener("end", () => recignition.start());

//Start playing again
document.body.addEventListener("click", (e) => {
  if (e.target.id === "play-again") {
    window.location.reload();
  }
});
