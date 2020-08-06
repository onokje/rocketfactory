import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {loadPlayer} from "./playerSlice";
import {productionTick} from "./productionSlice";
import {PowerState} from "../CommonTypes/state";

const findPowerPlantIdInPoweredPowerPlantsArray = (poweredPowerplants: string[], powerPlantId: string) => {
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
    } as PowerState,
    reducers: {
        buildPowerPlant(state, action: PayloadAction<{techType: string, id: string}>) {
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
        sellPowerPlant(state, action: PayloadAction<{id: string, techType: string}>) {
            return {...state, powerPlants: state.powerPlants.filter(plant => plant.id !== action.payload.id)};
        },
        togglePowerplant(state, action: PayloadAction<{powerPlantId: string, on: boolean}>) {
            const {powerPlantId, on} = action.payload;
            const powerPlant = state.powerPlants.find(powerplant => powerplant.id === powerPlantId);
            if (!powerPlant) {
                throw Error('Trying to toggle a powerplant that does not exist');
            }
            powerPlant.on = on;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(loadPlayer, (state, action) => action.payload.playerData.power)
            .addCase(productionTick, (state: PowerState, action) => {
                const {poweredPowerplants, newBufferSize, totalPowerProduced} = action.payload;
                state.powerPlants.forEach(powerplant => {
                    powerplant.powered = findPowerPlantIdInPoweredPowerPlantsArray(poweredPowerplants, powerplant.id);
                });
                state.powerProducedLastTick = totalPowerProduced;
                state.powerUsedLastTick = state.bufferCurrent - newBufferSize + totalPowerProduced;
                state.bufferCurrent = newBufferSize;
            });
    }

});

export const { buildPowerPlant, sellPowerPlant, togglePowerplant } = powerSlice.actions;

export default powerSlice.reducer;