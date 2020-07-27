import {createSlice} from '@reduxjs/toolkit';
import {loadPlayer} from "./playerSlice";
import {productionTick} from "./productionSlice";


const researchSlice = createSlice({
    name: 'research',
    initialState: {
        researchComplete: [],
        researching: false,
        researchingResearchId: null,
        researchingProgressTicks: null,
        researchingTicksCost: 0,
        selectedResearch: null,
    },
    reducers: {
        startResearch(state, action) {
            return {
                ...state,
                researching: true,
                researchingResearchId: action.payload.researchId,
                researchingProgressTicks: 0,
                researchingTicksCost: action.payload.ticksCost
            };
        },
        finishResearch(state) {
            state.researchComplete.push(state.researchingResearchId)
            state.researching = false;
            state.researchingResearchId = null;
            state.researchingProgressTicks = 0;
            state.researchingTicksCost = 0;

        },
        selectResearch(state, action) {
            state.selectedResearch =  action.payload.researchId;
        }
    },
    extraReducers: {
        [loadPlayer]: (state, action) => action.payload.playerData.research,
        [productionTick]: (state) => {
            if (state.researching) {
                state.researchingProgressTicks = state.researchingProgressTicks >= state.researchingTicksCost ?
                    state.researchingTicksCost : state.researchingProgressTicks + 1;
            }
        }
    }
});

export const { startResearch, finishResearch, selectResearch } = researchSlice.actions;

export default researchSlice.reducer;