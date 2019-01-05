const initialResourcesState = {
    coalPowerPlants: 0,
    powerProducedLastTick: 0
};

const power = (state = initialResourcesState, action) => {
    switch (action.type) {
        case 'LOAD_PLAYER':
            return {...state, ...action.playerData.power};
        case 'BUILD_POWER_PLANT':
            switch (action.powerType) {
                case 'coal':
                    return {...state, coalPowerPlants: state.coalPowerPlants + 1};

                default:
                    return state;
            }
        case 'POWER_PRODUCTION_TICK':
            return {...state, powerProducedLastTick: action.powerProduced};
        default:
            return state;
    }
};

export default power;