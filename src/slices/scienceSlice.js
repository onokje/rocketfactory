import {createSlice} from '@reduxjs/toolkit';
import {loadPlayer} from "./playerSlice";
import {productionTick} from "./productionSlice";


const scienceSlice = createSlice({
    name: 'science',
    initialState: {
        sciences: [],
        researching: false,
        researchingScienceId: null,
        researchingProgressTicks: null,
        researchingTicksCost: 0,
        selectedScience: null,
    },
    reducers: {
        startScience(state, action) {
            return {
                ...state,
                researching: true,
                researchingScienceId: action.payload.scienceId,
                researchingProgressTicks: 0,
                researchingTicksCost: action.payload.ticksCost
            };
        },
        finishScience(state) {
            state.sciences.push(state.researchingScienceId)
            state.researching = false;
            state.researchingScienceId = null;
            state.researchingProgressTicks = 0;
            state.researchingTicksCost = 0;

        },
        selectScience(state, action) {
            state.selectedScience =  action.payload.scienceId;
        }
    },
    extraReducers: {
        [loadPlayer]: (state, action) => action.payload.playerData.science,
        [productionTick]: (state) => {
            if (state.researching) {
                state.researchingProgressTicks = state.researchingProgressTicks >= state.researchingTicksCost ?
                    state.researchingTicksCost : state.researchingProgressTicks + 1;
            }
        }
    }
});

export const { startScience, finishScience, selectScience } = scienceSlice.actions;

export default scienceSlice.reducer;