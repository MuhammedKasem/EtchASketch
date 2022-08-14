const grid = document.querySelector('.grid-container');
const slider = document.getElementById("myRange");
const sliderValue = document.getElementById("sliderValue");
const resetBtn = document.getElementById("resetBtn");
const colorPicker = document.getElementById("colorPicker");
const rainbowBtn = document.getElementById('rainbowBtn')
const eraserBtn = document.getElementById('eraserBtn');
const colorBtn = document.getElementById('colorBtn');

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
  console.log('Removing Children');
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
  gridItems = document.querySelectorAll('.cell');
  console.log("Hi!");
  gridItems.forEach(cell => {
    cell.removeAttribute('style');
  })
}
eraserBtn.addEventListener('click', () => {
  currentColor = "eraser";
  setColors();
});

colorBtn.addEventListener('click', () => {
  currentColor = "color";
  setColors();
})


resetBtn.addEventListener('click', resetGrid);
rainbowBtn.addEventListener('click', () => {
  currentColor = "rainbow";
  setColors();
})
