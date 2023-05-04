const positionToCells = (position) => {
  const rowIndex = Math.floor(position.y / cellSize);
  const columnIndex = Math.floor(position.x / cellSize);
  return { x: columnIndex, y: rowIndex };
};
