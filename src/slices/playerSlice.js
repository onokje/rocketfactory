import {createSlice} from '@reduxjs/toolkit'

const playerSlice = createSlice({
    name: 'player',
    initialState: {
        initialized: false,
        tab: 'resourceMap',
    },
    reducers: {
        newPlayer(state) {
            state.initialized = true;
        },
        loadPlayer(state, action) {
            return action.payload.playerData.player;
        },
        switchTab(state, action) {
            state.tab = action.payload;
        },
    },
});

export const {
    newPlayer, loadPlayer, switchTab
} = playerSlice.actions;

export default playerSlice.reducer;