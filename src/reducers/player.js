const initialPlayerState = {
    name: null,
    credits: 1000,
    initialized: false,
    tab: 'resourceProduction'
};

const player = (state = initialPlayerState, action) => {
    switch (action.type) {
        case 'NEW_PLAYER':
            return {
                ...state,
                name: action.name,
                initialized: true
            };
        case 'LOAD_PLAYER':
            return {...state, ...action.playerData.player};
        case 'SWITCH_TAB':
            return {...state, tab: action.tab};
        default:
            return state;
    }
};

export default player;