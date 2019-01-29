const initialScienceState = {
    sciences: [],
    researching: false,
    researchingScienceId: null,
    researchingProgressTicks: null,
    researchingTicksCost: 0,
    selectedScience: null,
};

const science = (state = initialScienceState, action) => {
    switch (action.type) {
        case 'LOAD_PLAYER':
            return action.playerData.science;
        case 'SELECT_SCIENCE':
            return {...state, selectedScience: action.scienceId};
        case 'START_SCIENCE':
            return {
                ...state,
                researching: true,
                researchingScienceId: action.scienceId,
                researchingProgressTicks: 0,
                researchingTicksCost: action.ticksCost
            };
        case 'FINISH_SCIENCE':
            const sciences = JSON.parse(JSON.stringify(state.sciences));
            sciences.push(state.researchingScienceId)
            return {
                ...state,
                sciences: sciences,
                researching: false,
                researchingScienceId: null,
                researchingProgressTicks: 0,
                researchingTicksCost: 0
            };
        case 'PRODUCTION_TICK':
            if (state.researching) {
                const newTicks = state.researchingProgressTicks >= state.researchingTicksCost ? state.researchingTicksCost : state.researchingProgressTicks + 1;
                return {...state, researchingProgressTicks: newTicks};
            }

            return state;

        default:
            return state;
    }
};

export default science;