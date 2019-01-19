export const findSectorByCoords = (map, x, y) => {
    return map.find(cell => cell.x === x & cell.y === y);
};

export const findMineByCoords = (mines, x, y) => {
    return mines.find(mine => mine.x === x & mine.y === y);
};

