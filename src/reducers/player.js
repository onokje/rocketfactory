const initialPlayerState = {
    initialized: false,
    tab: 'resourceProduction',
    handmining: false,
    handminingResource: null,
    handminingProgressTicks: 0,
    handminingTicksCost: 5,
    handcrafting: false,
    handcraftingItem: null,
    handcraftingProgressTicks: 0,
    handcraftingTicksCost: 5
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
            return {...state, handmining: true, handminingResource: action.resource, handminingTicksCost: 5};
        case 'HANDMINING_FINISH':
            return {...state, handmining: false, handminingResource: null, handminingProgressTicks: 0};
        case 'HANDCRAFTING_START':
            return {...state, handcrafting: true, handcraftingItem: action.item, handcraftingTicksCost: 5};
        case 'HANDCRAFTING_FINISH':
            return {...state, handcrafting: false, handcraftingItem: null, handcraftingProgressTicks: 0};
        case 'PRODUCTION_TICK':
            if (state.handmining) {
                const newTicks = state.handminingProgressTicks >= state.handminingTicksCost ? 0 : state.handminingProgressTicks + 1;
                return {...state, handminingProgressTicks: newTicks};
            }
            if (state.handcrafting) {
                const newTicks = state.handcraftingProgressTicks >= state.handcraftingTicksCost ? 0 : state.handcraftingProgressTicks + 1;
                return {...state, handcraftingProgressTicks: newTicks};
            }

            return state;

        default:
            return state;
    }
};

export default player;