const initialResourcesState = {
    powerPlants: [],
    powerProducedLastTick: 0,
    powerUsedLastTick: 0,
    powerLeft: 0,
    bufferMax: 0,
    bufferCurrent: 0
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
            let newBuffer;
            powerplants = JSON.parse(JSON.stringify(state.powerPlants));
            powerplants.push({
                techType: action.techType,
                id: action.id,
                powered: false,
                on: false
            });
            switch (action.techType) {
                case 'coalPower': newBuffer = state.bufferMax + 1000; break;
                case 'oilPower': newBuffer = state.bufferMax + 1000; break;
                default: throw Error('Invalid tech type found in build powerplant switch case');
            }

            return {...state, powerPlants: powerplants, bufferMax: newBuffer};
        case 'SELL_POWER_PLANT':
            return {...state, powerPlants: state.powerPlants.filter(plant => plant.id !== action.id)};
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
            const powerUsedLastTick = state.bufferCurrent - action.newBufferSize + action.totalPowerProduced;
            return {
                ...state,
                powerProducedLastTick: action.totalPowerProduced,
                powerUsedLastTick: powerUsedLastTick,
                bufferCurrent: action.newBufferSize,
                powerPlants: powerplants
            };
        default:
            return state;
    }
};

export default power;