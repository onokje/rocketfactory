const initialPlayerState = {
    initialized: false,
    tab: 'resourceProduction',
    handmining: false,
    handminingResource: null,
    handminingProgressTicks: 0,
    handminingTicksCost: 5
};

const player = (state = initialPlayerState, action) => {
    switch (action.type) {
        case 'NEW_PLAYER':
            return {
                ...state,
                initialized: true
            };
        case 'LOAD_PLAYER':
            return action.playerData.player;
        case 'SWITCH_TAB':
            return {...state, tab: action.tab};
        case 'HANDMINING_START':
            return {...state, handmining: true, handminingResource: action.resource};
        case 'HANDMINING_FINISH':
            return {...state, handmining: false, handminingResource: null, handminingProgressTicks: 0};
        case 'PRODUCTION_TICK':
            if (state.handmining) {
                return {...state, handminingProgressTicks: state.handminingProgressTicks + 1};
            } else {
                return state;
            }
        default:
            return state;
    }
};

export default player;