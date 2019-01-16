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
                const newTicks = state.exploringProgressTicks >= state.exploringProgressTicksTotal ? 0 : state.exploringProgressTicks + 1;
                return {...state, exploringProgressTicks: newTicks};
            }

            return state;

        default:
            return state;
    }
};

export default resourcemap;