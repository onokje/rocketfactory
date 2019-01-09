const initialResourcesState = {
    mines: []
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
                on: false
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
        default:
            return state;
    }
};

export default mining;