import createGrid from "../helpers/MapGenerator";

const initialResourcemapState = {
    map: [],
    mapSelected: null,
    exploring: false,
    exploringProgressTicks: null,
    exploringProgressTicksTotal: 60,
    exploringCoords: null
};

const resourcemap = (state = initialResourcemapState, action) => {
    switch (action.type) {
        case 'LOAD_PLAYER':
            return action.playerData.resourcemap;
        case 'CREATE_MAP':
            return {...state, map: createGrid()};
        case 'SELECT_CELL':
            return {...state, mapSelected: {x: action.x, y: action.y}};
        case 'PRODUCTION_TICK':
            if (state.exploring) {

                if (state.exploringProgressTicks === state.exploringProgressTicksTotal) {

                    const map = state.map.map(cell => {
                        if (cell.x === state.exploringCoords.x && cell.y === state.exploringCoords.y) {
                            return {...cell, explored: true}
                        }
                        return cell;
                    });
                    return {
                        ...state,
                        map: map,
                        exploringProgressTicks: 0,
                        exploring: false,
                        exploringCoords: null
                    };
                }
                return {...state, exploringProgressTicks: state.exploringProgressTicks + 1};
            }

            return state;
        case 'EXPLORE_START':
            return {
                ...state,
                exploringProgressTicks: 0,
                exploringProgressTicksTotal: 60,
                exploring: true,
                exploringCoords: {x: action.x, y: action.y}
            };

        default:
            return state;
    }
};

export default resourcemap;