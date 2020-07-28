import {createSlice} from '@reduxjs/toolkit';
import {loadPlayer} from "./playerSlice";
import {productionTick} from "./productionSlice";
import {car, launchPad, rocketSiloData} from "../gamedata/rocketSilo";

const rocketSiloSlice = createSlice({
    name: 'rocketSilo',
    initialState: {
        powered: false,
        siloBuildProgressTicks: null, // ticks for silo itself, launchpad or car
        siloBuildProgressTotal: null,
        fuelProgressTicks: null, // fuel runs automatically if there are parts
        rocketPartProgressTicks: null, // rocket parts runs automatically if there are parts
        rocketParts: 0, // max 100
        fuelParts: 0, // max 100
        rocketPartsRunning: false,
        fuelPartsRunning: false,
        checklist: {
            silo: false,
            rocket: false,
            launchpad: false,
            fuel: false,
            payload: false
        },
        buildingNow: null, // string, either 'silo', 'launchpad', or 'car'
        launched: false,
        launchedTicks: 0
    },
    reducers: {
        buildStepSilo(state, action) {
            const step = action.payload.step; // one of the checklist steps
            let ticksCost;
            switch (step){
                case 'silo':
                    ticksCost = rocketSiloData.ticksCost;
                    break;
                case 'launchpad':
                    ticksCost = launchPad.ticksCost;
                    break;
                case 'car':
                    ticksCost = car.ticksCost;
                    break;
                default:
                    throw Error('Invalid rocketsilo build step');
            }

            return {
                ...state,
                siloBuildProgressTicks: 0,
                siloBuildProgressTotal: ticksCost,
                buildingNow: step
            };
        },
        rocketPartFinish(state) {
            state.rocketParts += 1;
            state.rocketPartProgressTicks = 0;
            state.rocketPartsRunning = false;
            if (state.rocketParts >= 100) {
                state.checklist.rocket = true;
            }
        },
        rocketPartStart(state, action) {
            state.rocketPartProgressTicks = 0;
            state.rocketPartsRunning = true;
        },
        fuelPartFinish(state) {
            state.fuelParts += 1;
            state.fuelProgressTicks = 0;
            state.fuelPartsRunning = false;
            if (state.fuelParts >= 100) {
                state.checklist.fuel = true;
            }
        },
        fuelPartStart(state, action) {
            state.fuelProgressTicks = 0;
            state.fuelPartsRunning = true;
        },
        launchRocket(state) {
            state.launched = true;
        }
    },
    extraReducers: {
        [loadPlayer]: (state, action) => action.payload.playerData.rocketSilo,
        [productionTick]: (state, action) => {
            if (state.buildingNow) {
                if (state.siloBuildProgressTicks >= state.siloBuildProgressTotal) {
                    switch (state.buildingNow){
                        case 'silo':
                            state.checklist.silo = true;
                            break;
                        case 'launchpad':
                            state.checklist.launchpad = true;
                            break;
                        case 'car':
                            state.checklist.payload = true;
                            break;
                        default:
                            throw Error('Invalid rocketsilo buildingnow state');
                    }
                    state.buildingNow = null;
                } else {
                    state.siloBuildProgressTicks +=1 ;
                }
            }
            state.powered = action.payload.silo.powered;
            if (action.payload.silo.powered) {
                // rocket parts
                if (state.rocketPartsRunning) {
                    state.rocketPartProgressTicks += 1;
                }
                if (state.fuelPartsRunning) {
                    state.fuelProgressTicks += 1;
                }
            }

        }
    }
});

export const { buildStepSilo, rocketPartFinish, rocketPartStart, fuelPartFinish, fuelPartStart, launchRocket } = rocketSiloSlice.actions;

export default rocketSiloSlice.reducer;