const initialRocketSiloState = {
    running: false,
    siloBuildProgressTicks: null,
    siloBuildProgressTotal: null,
    checklist: {
        silo: false,
        rocket: false,
        launchpad: false,
        fuel: false,
    }
};

const rocketSilo = (state = initialRocketSiloState, action) => {
    switch (action.type) {
        case 'LOAD_PLAYER':
            return action.playerData.rocketSilo;
        case 'BUILD_STEP_SILO':
            const step = action.step; // one of the checklist steps
            return {...state, running: true};

        default:
            return state;
    }
};

export default rocketSilo;