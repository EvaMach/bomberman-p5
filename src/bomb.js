let bombs = [];
let explosions = [];

const placeBomb = (x, y) => {
  const bomb = { x, y, placedAt: millis() };
  if (bombs.length < 1) {
    bombs.push(bomb);
  }
};

const drawBombs = () => {
  const ticking = Math.sin(millis() / 120) * 2;
  for (const bomb of bombs) {
    image(bombImg, bomb.x, bomb.y + ticking);
  }
  drawExplosion();
};

const cleanUpExplosions = () => {
  explosions = explosions.filter(
    (explosion) => !(explosion.placedAt < millis() - 1000),
  );
};

const addExplosion = (x, y) => {
  explosions.push({ x, y, placedAt: millis() });
};

const blowUpTrees = () => {
  explosions.forEach((explosion) => {
    const { x, y } = positionToCells(explosion);
    if (grid[y][x] === 2) {
      grid[y][x] = 0;
    }
  });
};

const detonateBombs = () => {
  bombs.forEach((bomb) => {
    if (bomb && bomb.placedAt < millis() - 3000) {
      explosionSound.play();
      addExplosion(bomb.x, bomb.y);
      addExplosion(bomb.x, bomb.y - cellSize);
      addExplosion(bomb.x, bomb.y + cellSize);
      addExplosion(bomb.x + cellSize, bomb.y);
      addExplosion(bomb.x - cellSize, bomb.y);
    }
  });
  blowUpTrees();
  bombs = bombs.filter((bomb) => !(bomb.placedAt < millis() - 3000));
  cleanUpExplosions();
  killPlayer();
};

const killPlayer = () => {
  explosions.forEach((explosion) => {
    if (Math.abs(explosion.x - player1.x) > 50) {
      return;
    }
    if (Math.abs(explosion.y - player1.y) > 50) {
      return;
    }

    player1.isAlive = false;
    return;
  });
};

const drawExplosion = () => {
  for (const explosion of explosions) {
    image(explosionImg, explosion.x, explosion.y);
  }
};
