const initialScienceState = {
    sciences: [],
    researching: false,
    researchingScienceId: null,
    researchingProgressTicks: null,
    researchingTicksCost: 0,
};

const science = (state = initialScienceState, action) => {
    switch (action.type) {
        case 'LOAD_PLAYER':
            return action.playerData.science;
        case 'START_SCIENCE':
            return {
                ...state,
                researching: true,
                researchingScienceId: action.scienceId,
                researchingProgressTicks: 0,
                researchingTicksCost: action.ticksCost
            };
        case 'FINISH_SCIENCE':
            return {
                ...state,
                sciences: state.sciences.slice(0).push(action.scienceId),
                researching: false,
                researchingScienceId: null,
                researchingProgressTicks: 0,
                researchingTicksCost: 0
            };
        case 'PRODUCTION_TICK':
            if (state.researching) {
                const newTicks = state.researchingProgressTicks >= state.researchingTicksCost ? 0 : state.researchingProgressTicks + 1;
                return {...state, researchingProgressTicks: newTicks};
            }

            return state;

        default:
            return state;
    }
};

export default science;