//Selectors
const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

//Functions
//Show input error message
function showError(input, message) {

}

//Event listeners
form.addEventListener('submit', function (e) {
  console.log(username.value);
  if (username.value === '') {
    showError(username, 'Username is required');
  } else {
    showSuccess(username);
  }



  e.preventDefault();
});