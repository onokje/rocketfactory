const initialCraftingState = {
    assemblers: [],

};

const findIdArray = (arr, id) => {
    return !!arr.find(item => item === id);
};

const crafting = (state = initialCraftingState, action) => {
    let assemblers;
    switch (action.type) {
        case 'LOAD_PLAYER':
            return action.playerData.crafting;
        case 'BUILD_ASSEMBLER':

            assemblers = JSON.parse(JSON.stringify(state.assemblers));
            assemblers.push({
                id: action.id,
                on: false,
                powered: false,
                running: false,
                nextItem: 'ironGear',
                currentItem: null,
                progressTicks: 0,
                ticksCost: 10,
                techType: action.techType
            });
            return {...state, assemblers: assemblers};
        case 'SELL_ASSEMBLER':
            return {...state, assemblers: state.assemblers.filter(assembler => assembler.id !== action.id)};
        case 'TOGGLE_ASSEMBLER':
            assemblers = state.assemblers.map(assembler => {
                return assembler.id === action.id ? {
                    ...assembler,
                    on: action.on,
                    nextItem: action.nextItem,
                    progressTicks: action.on ? assembler.progressTicks : 0
                } : assembler
            });

            return {...state, assemblers: assemblers};
        case 'PRODUCTION_TICK':
            assemblers = state.assemblers.map(assembler => {
                if (assembler.on) {
                    const powered = findIdArray(action.poweredAssemblerIds, assembler.id);
                    return assembler.running && powered? {
                        ...assembler,
                        powered: true,
                        progressTicks: assembler.progressTicks + 1
                    } : {...assembler, powered: powered}
                }
                return assembler;
            });

            return {...state, assemblers: assemblers};
        case 'ASSEMBLER_PRODUCTION_START':
            assemblers = state.assemblers.map(assembler => {
                return assembler.id === action.id ? {
                    ...assembler,
                    currentItem: action.currentItem,
                    running: true,
                } : assembler
            });

            return {...state, assemblers: assemblers};
        case 'ASSEMBLER_PRODUCTION_FINISH':
            assemblers = state.assemblers.map(assembler => {
                return assembler.id === action.id ? {
                    ...assembler,
                    running: false,
                    currentItem: null,
                    progressTicks: 0
                } : assembler
            });

            return {...state, assemblers: assemblers};
        default:
            return state;
    }
};

export default crafting;