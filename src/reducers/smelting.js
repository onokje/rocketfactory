const initialFurnaceState = {
    stoneFurnaces: [],

};

const smelting = (state = initialFurnaceState, action) => {
    let stoneFurnaces;
    switch (action.type) {
        case 'LOAD_PLAYER':
            return {...state, ...action.playerData.smelting};
        case 'BUILD_FURNACE':
            switch (action.furnaceType) {
                case 'stone':

                    const stoneFurnaces = JSON.parse(JSON.stringify(state.stoneFurnaces));
                    stoneFurnaces.push({
                        id: action.id,
                        name: action.name,
                        on: false,
                        item: 'ironPlate',
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
                    item: action.item,
                    progressTicks: 0
                } : furnace
            });

            return {...state, stoneFurnaces: stoneFurnaces};
        case 'productionTick':
            stoneFurnaces = state.stoneFurnaces.map(furnace => {
                return furnace.on ? {
                    ...furnace,
                    progressTicks: furnace.progressTicks < furnace.ticksCost ? furnace.progressTicks + 1 : 0
                } : furnace
            });

            return {...state, stoneFurnaces: stoneFurnaces};

        default:
            return state;
    }
};

export default smelting;