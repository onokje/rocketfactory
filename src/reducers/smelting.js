const initialFurnaceState = {
    furnaces: [],

};

const findFurnaceIdInPoweredFurnacesArray = (poweredFurnacesArray, furnaceId) => {
    return !!poweredFurnacesArray.find(item => item === furnaceId);
};

const smelting = (state = initialFurnaceState, action) => {
    let furnaces;
    switch (action.type) {
        case 'LOAD_PLAYER':
            return action.playerData.smelting;
        case 'BUILD_FURNACE':

            furnaces = JSON.parse(JSON.stringify(state.furnaces));
            furnaces.push({
                id: action.id,
                on: false,
                powered: false,
                running: false,
                nextItem: 'ironPlate',
                currentItem: null,
                progressTicks: 0,
                ticksCost: 10,
                techType: action.techType
            });
            return {...state, furnaces: furnaces};

        case 'TOGGLE_FURNACE':
            furnaces = state.furnaces.map(furnace => {
                return furnace.id === action.furnaceId ? {
                    ...furnace,
                    on: action.on,
                    nextItem: action.nextItem,
                    progressTicks: action.on ? furnace.progressTicks : 0
                } : furnace
            });

            return {...state, furnaces: furnaces};
        case 'PRODUCTION_TICK':
            furnaces = state.furnaces.map(furnace => {
                if (furnace.on) {
                    const powered = findFurnaceIdInPoweredFurnacesArray(action.poweredFurnaceIds, furnace.id);
                    return furnace.running && powered? {
                        ...furnace,
                        powered: true,
                        progressTicks: furnace.progressTicks + 1
                    } : {...furnace, powered: powered}
                }
                return furnace;
            });

            return {...state, furnaces: furnaces};
        case 'FURNACE_PRODUCTION_START':
            furnaces = state.furnaces.map(furnace => {
                return furnace.id === action.furnaceId ? {
                    ...furnace,
                    currentItem: action.currentItem,
                    running: true,
                } : furnace
            });

            return {...state, furnaces: furnaces};
        case 'FURNACE_PRODUCTION_FINISH':
            furnaces = state.furnaces.map(furnace => {
                return furnace.id === action.furnaceId ? {
                    ...furnace,
                    running: false,
                    currentItem: null,
                    progressTicks: 0
                } : furnace
            });

            return {...state, furnaces: furnaces};
        default:
            return state;
    }
};

export default smelting;