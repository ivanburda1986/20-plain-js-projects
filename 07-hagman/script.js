const wordEl = document.getElementById('wordEl');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-again');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');

const words = ['application', 'programming', 'interface', 'lizzard'];

let selectedWord = words[Math.floor(Math.random() * words.length)];

console.log(selectedWord);