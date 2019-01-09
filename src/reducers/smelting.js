const initialFurnaceState = {
    stoneFurnaces: [],

};

const smelting = (state = initialFurnaceState, action) => {
    let stoneFurnaces;
    switch (action.type) {
        case 'LOAD_PLAYER':
            return action.playerData.smelting;
        case 'BUILD_FURNACE':
            switch (action.furnaceType) {
                case 'stone':

                    const stoneFurnaces = JSON.parse(JSON.stringify(state.stoneFurnaces));
                    stoneFurnaces.push({
                        id: action.id,
                        on: false,
                        running: false,
                        nextItem: 'ironPlate',
                        currentItem: null,
                        progressTicks: 0,
                        ticksCost: 10
                    });
                    return {...state, stoneFurnaces: stoneFurnaces};

                default:
                    return state;
            }
        case 'TOGGLE_FURNACE':
            stoneFurnaces = state.stoneFurnaces.map(furnace => {
                return furnace.id === action.furnaceId ? {
                    ...furnace,
                    on: action.on,
                    nextItem: action.nextItem,
                    currentItem: action.on ? furnace.currentItem : null,
                    progressTicks: action.on ? furnace.progressTicks : 0
                } : furnace
            });

            return {...state, stoneFurnaces: stoneFurnaces};
        case 'PRODUCTION_TICK':
            stoneFurnaces = state.stoneFurnaces.map(furnace => {
                return furnace.on && furnace.running ? {
                    ...furnace,
                    progressTicks: furnace.progressTicks + 1
                } : furnace
            });

            return {...state, stoneFurnaces: stoneFurnaces};
        case 'FURNACE_PRODUCTION_START':
            stoneFurnaces = state.stoneFurnaces.map(furnace => {
                return furnace.id === action.furnaceId ? {
                    ...furnace,
                    currentItem: action.currentItem,
                    running: true,
                } : furnace
            });

            return {...state, stoneFurnaces: stoneFurnaces};
        case 'FURNACE_PRODUCTION_FINISH':
            stoneFurnaces = state.stoneFurnaces.map(furnace => {
                return furnace.id === action.furnaceId ? {
                    ...furnace,
                    running: false,
                    currentItem: null,
                    progressTicks: 0
                } : furnace
            });

            return {...state, stoneFurnaces: stoneFurnaces};
        default:
            return state;
    }
};

export default smelting;