const cellSize = 50;
const yOffset = Math.floor(cellSize * 0.75);
const xOffset = Math.floor(cellSize * 0.8);
const rows = window.innerHeight / cellSize;
const cols = window.innerWidth / cellSize;
const grid = [];

let lives = 3;

let explosionSound;

let bomberman;
let tree;
let rock;
let bombImg;
let explosionImg;
let heart;
function preload() {
  bomberman = loadImage('../img/1forw0.png');
  tree = loadImage('../img/tree.png');
  rock = loadImage('../img/rock.png');
  bombImg = loadImage('../img/bomb.png');
  explosionImg = loadImage('../img/explosion.png');
  heart = loadImage('../img/heart.png');
}

function setup() {
  frameRate(30);
  createCanvas(cols * cellSize, rows * cellSize);

  for (let iy = 0; iy < rows; iy++) {
    const row = [];
    for (let ix = 0; ix < cols; ix++) {
      if (Math.random() > 0.9) {
        row.push(2);
      } else if (Math.random() > 0.98) {
        row.push(3);
      } else {
        row.push(0);
      }
    }
    grid.push(row);
  }
  const player = positionToCells(player1);
  grid[player.y][player.x] = 0;

  // Load assets
  explosionSound = loadSound('sound/explosion.mp3');
}

function draw() {
  background(108, 212, 85);
  // fill(61, 84, 62);

  // Draw grid
  for (let iy = 0; iy < rows; iy++) {
    for (let ix = 0; ix < cols; ix++) {
      // rect(ix * cellSize, iy * cellSize, cellSize);
      if (grid[iy][ix] === 2) {
        image(tree, ix * cellSize, iy * cellSize);
      } else if (grid[iy][ix] === 3) {
        image(rock, ix * cellSize, iy * cellSize);
      }
    }
  }
  fill(78, 212, 209);
  rect(0, 0, window.innerWidth, 50);
  fill(0, 0, 0);
  text('Bomberman', 10, 40);
  // text(lives, 580, 40);
  // image(heart, 620, 0);

  detonateBombs();
  drawBombs();
  movePlayer();
  drawPlayer();
}
