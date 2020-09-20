const draggable_list = document.getElementById('draggable-list');
const check = document.getElementById('check');

const richestPeople = [
  'Jeff Bezos',
  'Bill Gates',
  'Warren Buffett',
  'Bernard Arnault',
  'Carlos Slim Helu',
  'Amancio Ortega',
  'Larry Ellison',
  'Mark Zuckerberg',
  'Michael Bloomberg',
  'Larry Page'
]

//Store the list items
const listItems = [];
let dragStartIndex;
createList();

//Insert list items into DOM
function createList() {
  [...richestPeople]
  .map(person => ({
      value: person,
      randomNumberForSorting: Math.random()
    }))
    .sort((a, b) => a.randomNumberForSorting - b.randomNumberForSorting)
    .map(sortedPerson => sortedPerson.value)
    .forEach((person, index) => {
      const listItem = document.createElement('li');
      listItem.setAttribute('data-index', index);
      listItem.innerHTML = `
    <span class="number">${index+1}</span>
    <div class="draggable" draggable="true">
      <p class="person-name">${person}</p>
      <i class="fas fa-grip-lines"></i>
    </div>
    `

      listItems.push(listItem);
      draggable_list.appendChild(listItem);
    });
}