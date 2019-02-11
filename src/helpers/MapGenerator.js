const createCell = (x, y, resource) => {
    return {x: x, y: y, resource: resource, explored: (x > 3 && x < 6 && y > 3 && y < 6)};
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

    for (let x = 0; x < 10; x++) {

        for (let y = 0; y < 10; y++) {

            if (x === 4 && y === 4){
                grid.push(createCell(x, y, 'coal'));
            } else if (x === 4 && y === 5){
                grid.push(createCell(x, y, 'iron'));
            } else if (x === 5 && y === 4){
                grid.push(createCell(x, y, 'copper'));
            } else if (x === 5 && y === 5){
                grid.push(createCell(x, y, 'stone'));
            } else {
                grid.push(createCell(x, y, getRandomResource()));
            }

        }
    }

    return grid;
};