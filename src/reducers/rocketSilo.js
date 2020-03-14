import {car, launchPad, rocketSiloData} from "../gamedata/rocketSilo";

const initialRocketSiloState = {
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

};

const rocketSilo = (state = initialRocketSiloState, action) => {
    switch (action.type) {
        case 'LOAD_PLAYER':
            return action.playerData.rocketSilo || initialRocketSiloState;
        case 'BUILD_STEP_SILO':
            const step = action.step; // one of the checklist steps
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
        case 'PRODUCTION_TICK':
            let siloBuildProgressTicks = state.siloBuildProgressTicks;
            const checklist = {...state.checklist};
            let buildingNow = state.buildingNow;

            if (state.buildingNow) {

                if (state.siloBuildProgressTicks >= state.siloBuildProgressTotal) {
                    buildingNow = null;
                    switch (state.buildingNow){
                        case 'silo':
                            checklist.silo = true;
                            break;
                        case 'launchpad':
                            checklist.launchpad = true;
                            break;
                        case 'car':
                            checklist.payload = true;
                            break;
                        default:
                            throw Error('Invalid rocketsilo buildingnow state');
                    }
                }

                siloBuildProgressTicks +=1 ;
            }

            return {...state, checklist, buildingNow, siloBuildProgressTicks};

        default:
            return state;
    }
};

export default rocketSilo;