const initialResourcesState = {
    coalPowerPlants: [],
    powerProducedLastTick: 0
};

const power = (state = initialResourcesState, action) => {
    let powerplants;

    switch (action.type) {
        case 'LOAD_PLAYER':
            return {...state, ...action.playerData.power};
        case 'BUILD_POWER_PLANT':
            switch (action.powerType) {
                case 'coal':

                    powerplants = JSON.parse(JSON.stringify(state.coalPowerPlants));
                    powerplants.push({
                        id: action.id,
                        name: action.name,
                        on: false
                    });
                    return {...state, coalPowerPlants: powerplants};


                default:
                    return state;
            }
        case 'TOGGLE_POWERPLANT':
            powerplants = state.coalPowerPlants.map(powerplant => {
                return powerplant.id === action.powerPlantId ? {
                    ...powerplant,
                    on: action.on
                } : powerplant
            });

            return {...state, coalPowerPlants: powerplants};
        case 'POWER_PRODUCTION_TICK':
            return {...state, powerProducedLastTick: action.powerProduced};
        default:
            return state;
    }
};

export default power;