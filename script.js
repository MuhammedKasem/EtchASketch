const grid = document.querySelector('.grid-container');
const slider = document.getElementById("myRange");
const sliderValue = document.getElementById("sliderValue");
const resetBtn = document.getElementById("resetBtn");
sliderValue.innerHTML = slider.value + 'x' + slider.value;
let gridSize = slider.value;
let squares = gridSize * gridSize;
let gridNumber = 0;
createNewGrid();

function createNewGrid() {
  gridSize = slider.value;
  console.log(gridSize);
} 

for(i = 0; i < squares; i++) {
  grid.style.gridTemplateColumns = (`repeat(${gridSize}, 1fr`); 
  grid.style.gridTemplateRows = (`repeat(${gridSize}, 1fr`);
  let gridItem = document.createElement('div');
  gridItem.classList.add('cell');
  grid.insertAdjacentElement('beforeend', gridItem);
  // gridItem.innerHTML = gridNumber += 1;
}

const gridItems = document.querySelectorAll('.cell');
gridItems.forEach(cell => {
  cell.addEventListener('mouseover', function handleClick(event) {
    console.log('box clicked', event);

    cell.setAttribute('style', 'background-color: salmon;');
  });
});

slider.oninput = function() {
  sliderValue.innerHTML = this.value + 'x' + this.value;
}

function resetGrid() {
  gridItems.forEach(cell => {
    cell.removeAttribute('style');
  })
}

resetBtn.addEventListener('click', resetGrid);
