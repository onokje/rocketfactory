export const createMap = () => ({
    type: 'CREATE_MAP'
});

export const exploreStart = (x, y) => ({
    type: 'EXPLORE_START',
    x,
    y
});

export const selectCell = (x, y) => ({
    type: 'SELECT_CELL',
    x,
    y
});
