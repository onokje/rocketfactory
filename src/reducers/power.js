const initialResourcesState = {
    powerPlants: [],
    powerProducedLastTick: 0,
    powerLeft: 0
};

const findPowerPlantIdInPoweredPowerPlantsArray = (poweredPowerplants, powerPlantId) => {
    return !!poweredPowerplants.find(item => item === powerPlantId);
};

const power = (state = initialResourcesState, action) => {
    let powerplants;

    switch (action.type) {
        case 'LOAD_PLAYER':
            return action.playerData.power;
        case 'BUILD_POWER_PLANT':
            powerplants = JSON.parse(JSON.stringify(state.powerPlants));
            powerplants.push({
                techType: action.techType,
                id: action.id,
                powered: false,
                on: false
            });
            return {...state, powerPlants: powerplants};

        case 'TOGGLE_POWERPLANT':
            powerplants = state.powerPlants.map(powerplant => {
                return powerplant.id === action.powerPlantId ? {
                    ...powerplant,
                    on: action.on
                } : powerplant
            });

            return {...state, powerPlants: powerplants};
        case 'PRODUCTION_TICK':
            powerplants = state.powerPlants.map(powerplant => {
                const powered = findPowerPlantIdInPoweredPowerPlantsArray(action.poweredPowerplants, powerplant.id);
                return {
                    ...powerplant,
                    powered: powered
                }
            });

            return {...state, powerProducedLastTick: action.totalPowerProduced, powerLeft: action.powerLeft, powerPlants: powerplants};
        default:
            return state;
    }
};

export default power;