import {createSlice} from '@reduxjs/toolkit';
import {loadPlayer} from "./playerSlice";
import {productionTick} from "./productionSlice";

const findPowerPlantIdInPoweredPowerPlantsArray = (poweredPowerplants, powerPlantId) => {
    return !!poweredPowerplants.find(item => item === powerPlantId);
};

const powerSlice = createSlice({
    name: 'power',
    initialState: {
        powerPlants: [],
        powerProducedLastTick: 0,
        powerUsedLastTick: 0,
        powerLeft: 0,
        bufferMax: 0,
        bufferCurrent: 0
    },
    reducers: {
        buildPowerPlant(state, action) {
            const {techType, id} = action.payload;
            let newBuffer;
            switch (techType) {
                case 'coalPower': newBuffer = state.bufferMax + 1000; break;
                case 'oilPower': newBuffer = state.bufferMax + 1000; break;
                default: throw Error('Invalid tech type found in build powerplant switch case');
            }

            state.powerPlants.push({
                techType,
                id,
                powered: false,
                on: false
            });
            state.bufferMax = newBuffer;

        },
        sellPowerPlant(state, action) {
            return {...state, powerPlants: state.powerPlants.filter(plant => plant.id !== action.payload.id)};
        },
        togglePowerplant(state, action) {
            const {powerPlantId, on} = action.payload;
            const powerPlant = state.powerPlants.find(powerplant => powerplant.id === powerPlantId);
            powerPlant.on = on;
        },
    },
    extraReducers: {
        [loadPlayer]: (state, action) => action.payload.playerData.power,
        [productionTick]: (state, action) => {
            const {poweredPowerplants, newBufferSize, totalPowerProduced} = action.payload;
            state.powerPlants.forEach(powerplant => {
                powerplant.powered = findPowerPlantIdInPoweredPowerPlantsArray(poweredPowerplants, powerplant.id);
            });
            state.powerProducedLastTick = totalPowerProduced;
            state.powerUsedLastTick = state.bufferCurrent - newBufferSize + totalPowerProduced;
            state.bufferCurrent = newBufferSize;
        }
    }
});

export const { buildPowerPlant, sellPowerPlant, togglePowerplant } = powerSlice.actions;

export default powerSlice.reducer;