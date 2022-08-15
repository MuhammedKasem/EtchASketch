const grid = document.querySelector('.grid-container');
const slider = document.getElementById("myRange");
const sliderValue = document.getElementById("sliderValue");
const resetBtn = document.querySelector(".resetBtn");
const colorPicker = document.getElementById("colorPicker");
const rainbowBtn = document.querySelector('.rainbowBtn')
const eraserBtn = document.querySelector('.eraserBtn');
const colorBtn = document.querySelector('.colorBtn');

sliderValue.innerHTML = slider.value + 'x' + slider.value;

let gridSize = slider.value;
let gridItems = document.querySelectorAll('.cell');
let currentColor = "default";


function createNewGrid() {
  gridSize = slider.value;
  let squares = gridSize * gridSize;
  for (i = 0; i < squares; i++) {
    grid.style.gridTemplateColumns = (`repeat(${gridSize}, 1fr`);
    grid.style.gridTemplateRows = (`repeat(${gridSize}, 1fr`);
    let gridItem = document.createElement('div');
    gridItem.classList.add('cell');
    gridItem.addEventListener('mouseover', setColors);
    gridItem.addEventListener('click', setColors);
    grid.insertAdjacentElement('beforeend', gridItem);
  }
}

let mouseClicked = false
document.body.onmousedown = () => (mouseClicked = true)
document.body.onmouseup = () => (mouseClicked = false)

function setColors(e) {
  if (e.type === 'mouseover' && !mouseClicked) return;

  else {
    switch (currentColor) {
      case "default":
        e.target.style.backgroundColor = 'black';
        break;

      case "rainbow":
        e.target.style.backgroundColor = `${randomRGB()}`;
        break;

      case "color":
        e.target.style.backgroundColor = `${colorPicker.value}`;
        break;

      case "eraser":
        if (e.type === 'click') e.target.style.backgroundColor = 'white';
        break;
    }
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


function resetGrid() {
  gridItems = document.querySelectorAll('.cell');
  gridItems.forEach(cell => {
    cell.removeAttribute('style');
  })
}
colorPicker.oninput = () => { currentColor = "color"; }
eraserBtn.addEventListener('click', () => { currentColor = "eraser"; });
colorBtn.addEventListener('click', () => { currentColor = "color"; });
resetBtn.addEventListener('click', resetGrid);
rainbowBtn.addEventListener('click', () => { currentColor = "rainbow"; });


createNewGrid();
