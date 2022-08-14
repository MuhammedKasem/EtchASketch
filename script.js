const grid = document.querySelector('.grid-container');
const slider = document.getElementById("myRange");
const sliderValue = document.getElementById("sliderValue");
const resetBtn = document.getElementById("resetBtn");
const colorPicker = document.getElementById("colorPicker");
const rainbowBtn = document.getElementById('rainbowBtn')
sliderValue.innerHTML = slider.value + 'x' + slider.value;


let gridSize = slider.value;
let gridItems = document.querySelectorAll('.cell');
let currentColor = "default";

createNewGrid();

function createNewGrid() {
  gridSize = slider.value;
  let squares = gridSize * gridSize;
  for (i = 0; i < squares; i++) {
    grid.style.gridTemplateColumns = (`repeat(${gridSize}, 1fr`);
    grid.style.gridTemplateRows = (`repeat(${gridSize}, 1fr`);
    let gridItem = document.createElement('div');
    gridItem.classList.add('cell');
    gridItem.addEventListener('mouseover', setColors);
    grid.insertAdjacentElement('beforeend', gridItem);
  }
}

function setColors(e) {
  switch (currentColor) {
    case "default":
      e.target.style.backgroundColor = 'black';
      break;

    case "rainbow":
      e.target.style.backgroundColor = `${randomRGB()}`;
      break;

    case "color":
      e.target.style.backgroundColor = `${colorPicker.value}`;

  }
}

function randomRGB() {
  let x = Math.floor(Math.random() * 256);
  let y = Math.floor(Math.random() * 256);
  let z = Math.floor(Math.random() * 256);
  return "rgb(" + x + "," + y + "," + z + ")";
}

function removeChildren(grid) {
  while (grid.firstChild) {
    grid.removeChild(grid.firstChild);
  }
}

slider.onchange = function() {
  removeChildren(grid);
  sliderValue.innerHTML = this.value + 'x' + this.value;
  createNewGrid();
}

colorPicker.oninput = () => {
  currentColor = "color";
  setColors();
}

function resetGrid() {
  gridItems.forEach(cell => {
    cell.removeAttribute('style');
  })
}

resetBtn.addEventListener('click', resetGrid);
rainbowBtn.addEventListener('click', () => {
  currentColor = "rainbow";
  setColors();
})
