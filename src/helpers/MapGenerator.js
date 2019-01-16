const createCell = (x, y, resource) => {
    return {x: x, y: y, resource: resource, discovered: (x > 3 && x < 7 && y > 3 && y < 7)};
};

const getRandomResource = () => {
    return 'none';
};


const createGrid = () => {
    const grid = [];

    for (let x = 0; x < 10; x++) {

        for (let y = 0; y < 10; y++) {

            if (x === 5 && y === 5) {
                grid.push(createCell(x, y, 'base'));
            } else {
                grid.push(createCell(x, y, getRandomResource()));
            }

        }
    }


    return grid;
};