import {createSlice} from '@reduxjs/toolkit';
import {loadPlayer} from "./playerSlice";
import {productionTick} from "./productionSlice";
import {car, launchPad, rocketSiloData} from "../gamedata/rocketSilo";

const rocketSiloSlice = createSlice({
    name: 'rocketSilo',
    initialState: {
        running: false,
        siloBuildProgressTicks: null, // ticks for silo itself, launchpad or car
        siloBuildProgressTotal: null,
        fuelProgressTicks: null, // fuel runs automatically if there are parts
        rocketPartProgressTicks: null, // rocket parts runs automatically if there are parts
        rocketParts: 0, // max 100
        fuelParts: 0, // max 100
        checklist: {
            silo: false,
            rocket: false,
            launchpad: false,
            fuel: false,
            payload: false
        },
        buildingNow: null, // string, either 'silo', 'launchpad', or 'car'
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
        }
    },
    extraReducers: {
        [loadPlayer]: (state, action) => action.payload.playerData.rocketSilo,
        [productionTick]: (state) => {
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
                }
                state.siloBuildProgressTicks +=1 ;
            }
        }
    }
});

export const { buildStepSilo } = rocketSiloSlice.actions;

export default rocketSiloSlice.reducer;