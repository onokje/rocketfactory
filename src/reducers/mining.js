const initialResourcesState = {
    mines: []
};

const findMineIdInPoweredMinesArray = (poweredMinesArray, mineId) => {
    return !!poweredMinesArray.find(item => item === mineId);
};

const mining = (state = initialResourcesState, action) => {
    let mines;

    switch (action.type) {
        case 'LOAD_PLAYER':
            return action.playerData.mining;
        case 'BUILD_MINE':

            mines = JSON.parse(JSON.stringify(state.mines));
            mines.push({
                id: action.id,
                resourceType: action.resourceType,
                techType: action.techType,
                on: false,
                running: false,
                powered: false,
                progressTicks: 0,
                ticksCost: 5
            });
            return {...state, mines: mines};

        case 'TOGGLE_MINE':
            mines = state.mines.map(mine => {
                return mine.id === action.mineId ? {
                    ...mine,
                    on: action.on
                } : mine
            });

            return {...state, mines: mines};
        case 'MINING_PRODUCTION_START':
            mines = state.mines.map(mine => {
                return mine.id === action.mineId ? {
                    ...mine,
                    running: true,
                } : mine
            });

            return {...state, mines: mines};
        case 'MINING_PRODUCTION_FINISH':
            mines = state.mines.map(mine => {
                return mine.id === action.mineId ? {
                    ...mine,
                    progressTicks: 0,
                    running: false
                } : mine
            });

            return {...state, mines: mines};
        case 'PRODUCTION_TICK':
            mines = state.mines.map(mine => {
                if (mine.on) {
                    const powered = findMineIdInPoweredMinesArray(action.poweredMineIds, mine.id);
                    return mine.running && powered ? {
                        ...mine,
                        powered: true,
                        progressTicks: mine.progressTicks + 1
                    } : {...mine, powered: false}
                }
                return mine;

            });

            return {...state, mines: mines};
        default:
            return state;
    }
};

export default mining;