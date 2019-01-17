export const findSectorByCoords = (map, x, y) => {
    return map.find(cell => cell.x === x & cell.y === y);
};