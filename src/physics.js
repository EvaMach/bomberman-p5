const isCollidingWithObstacle = (destination) => {
  let { x, y } = destination;
  if (y < 0 || y >= grid.length - 1) {
    return true;
  }
  const fieldValue = grid[y][x];
  if (fieldValue === 0) {
    return false;
  }
  return true;
};
