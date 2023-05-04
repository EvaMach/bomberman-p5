const player1 = {
  x: Math.floor(Math.random() * cols) * cellSize,
  y: Math.floor(Math.random() * rows) * cellSize,
  isMoving: false,
  lives: [0, 1, 2],
  isAlive: true,
};

let playerImg = bomberman;
console.log(player1.lives);

const movePlayer = () => {
  let isMoving = false;
  const speed = Math.floor(deltaTime * 0.2);

  let deltaX = 0;
  let deltaY = 0;
  const margin = 5;

  if (keyIsDown(RIGHT_ARROW)) {
    deltaX = 1;
    isMoving = true;
  } else if (keyIsDown(LEFT_ARROW)) {
    // player1.image = heart;
    deltaX = -1;
    isMoving = true;
  } else if (keyIsDown(UP_ARROW)) {
    deltaY = -1;
    isMoving = true;
  } else if (keyIsDown(DOWN_ARROW)) {
    deltaY = 1;
    isMoving = true;
  }

  const destinationLeftTop = positionToCells({
    x: player1.x + deltaX * speed + margin,
    y: player1.y + deltaY * speed + margin,
  });

  const destinationRightTop = positionToCells({
    x: player1.x + cellSize - 1 + deltaX * speed - margin,
    y: player1.y + deltaY * speed + margin,
  });

  const destinationRightBottom = positionToCells({
    x: player1.x + cellSize - 1 + deltaX * speed - margin,
    y: player1.y + cellSize - 1 + deltaY * speed - margin,
  });

  const destinationLeftBottom = positionToCells({
    x: player1.x + deltaX * speed + margin,
    y: player1.y + cellSize - 1 + deltaY * speed - margin,
  });

  const destinations = [
    destinationLeftBottom,
    destinationLeftTop,
    destinationRightBottom,
    destinationRightTop,
  ];

  if (
    destinations.some((destination) => isCollidingWithObstacle(destination))
  ) {
    return;
  }

  player1.isMoving = isMoving;
  player1.x += deltaX * speed;
  player1.y += deltaY * speed;
};

function roundToNearestCell(num) {
  return Math.round(num / cellSize) * cellSize;
}

function keyPressed() {
  if (keyCode === 32) {
    const x = roundToNearestCell(player1.x);
    const y = roundToNearestCell(player1.y);
    placeBomb(x, y);
  }
}

const drawPlayer = () => {
  const bouncing = Math.sin(millis() / 60) * 2;

  textSize(cellSize);
  if (player1.isAlive) {
    image(bomberman, player1.x, player1.y + (player1.isMoving ? bouncing : 0));
  } else {
    text(
      'Game over',
      window.innerWidth / 2 - 2 * cellSize,
      window.innerHeight / 2 + cellSize,
    );
  }
};
