const grid = document.querySelector('.grid-container');
const slider = document.getElementById("myRange");
const sliderValue = document.getElementById("sliderValue");
const resetBtn = document.getElementById("resetBtn");
sliderValue.innerHTML = slider.value + 'x' + slider.value;
let gridSize = slider.value;
let gridItems = document.querySelectorAll('.cell');
createNewGrid();

function createNewGrid() {
  gridSize = slider.value;
  let squares = gridSize * gridSize;
  console.log(gridSize);
  console.log(squares);
for(i = 0; i < squares; i++) {
  grid.style.gridTemplateColumns = (`repeat(${gridSize}, 1fr`); 
  grid.style.gridTemplateRows = (`repeat(${gridSize}, 1fr`);
  let gridItem = document.createElement('div');
  gridItem.classList.add('cell');
  grid.insertAdjacentElement('beforeend', gridItem);
  }
  addListeners();
}


function addListeners() {
gridItems = document.querySelectorAll('.cell');
gridItems.forEach(cell => {
    cell.addEventListener('mousedown', () => {
    console.log('box clicked' );
    cell.setAttribute('style', 'background-color: cyan;');
  });
});
}


function removeChildren (grid) {
  while (grid.firstChild) {
    grid.removeChild(grid.firstChild);
  }
  console.log('removing Children!');
}
slider.onchange = function() {
  removeChildren(grid);
  sliderValue.innerHTML = this.value + 'x' + this.value;
  createNewGrid();
}

function resetGrid() {
  gridItems.forEach(cell => {
    cell.removeAttribute('style');
  })
}

resetBtn.addEventListener('click', resetGrid);
