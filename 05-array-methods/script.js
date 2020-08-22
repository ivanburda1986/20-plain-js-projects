const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');



let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

//Fetch random user and add money
async function getRandomUser() {
  const res = await fetch('https://randomuser.me/api');
  const data = await res.json();
  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  }
  addData(newUser);
}

//Add new user object to the data array
function addData(object) {
  data.push(object);
  updateDOM();
}

//Update DOM
function updateDOM(providedData = data) {
  //Clear the main div
  main.innerHTML = '<h2><strong>Person</strong>Wealth</h2>';

  providedData.forEach((person) => {
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<strong>${person.name}</strong> ${formatMoney(person.money)}`;
    main.appendChild(element);
  });
}

//Format number as money
function formatMoney(number) {
  return '$' + (number).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

}


//Event listeners
addUserBtn.addEventListener('click', getRandomUser);