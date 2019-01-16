const createCell = (x, y, resource) => {
    return {x: x, y: y, resource: resource, explored: (x > 5 && x < 9 && y > 5 && y < 9)};
};

const getRandomResource = () => {
    const rand = Math.random();
    if (rand > 0.9) {
        return 'coal';
    }
    if (rand > 0.8) {
        return 'iron';
    }
    if (rand > 0.7) {
        return 'copper';
    }
    if (rand > 0.6) {
        return 'stone';
    }
    if (rand > 0.5) {
        return 'oil';
    }

    return 'none';
};


export default function createGrid() {
    const grid = [];

    for (let x = 0; x < 15; x++) {

        for (let y = 0; y < 15; y++) {

            if (x === 7 && y === 7) {
                grid.push(createCell(x, y, 'base'));
            } else {
                grid.push(createCell(x, y, getRandomResource()));
            }

        }
    }

    return grid;
};