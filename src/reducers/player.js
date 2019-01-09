const initialPlayerState = {
    initialized: false,
    tab: 'resourceProduction'
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
        default:
            return state;
    }
};

export default player;