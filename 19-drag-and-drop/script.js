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
  addEventListeners();
}

function dragStart() {
  // console.log('Event:', 'dragstart');
  dragStartIndex = this.closest('li').getAttribute('data-index');

}

function dragEnter() {
  // console.log('Event:', 'dragenter');
  this.classList.add('over');
}

function dragLeave() {
  // console.log('Event:', 'dragleave');
  this.classList.remove('over');
}

function dragOver(e) {
  e.preventDefault();
  //console.log('Event:', 'dragover');
}

function dragDrop() {

  const dragEndIndex = +this.getAttribute('data-index');
  swapItems(dragStartIndex, dragEndIndex);
  this.classList.remove('remove');
}

function swapItems(fromIndex, toIndex) {
  const itemOne = listItems[fromIndex].querySelector('.draggable');
  const itemTwo = listItems[toIndex].querySelector('.draggable');

  listItems[fromIndex].appendChild(itemTwo);
  listItems[toIndex].appendChild(itemOne);
}



function addEventListeners() {
  const draggables = document.querySelectorAll('.draggable');
  const dragListItems = document.querySelectorAll('.draggable-list li');

  draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', dragStart);
  })

  dragListItems.forEach(item => {
    item.addEventListener('dragover', dragOver);
    item.addEventListener('drop', dragDrop);
    item.addEventListener('dragenter', dragEnter);
    item.addEventListener('dragleave', dragLeave);
  })
}