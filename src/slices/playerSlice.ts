import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {PlayerState, RootStateInterface} from "../CommonTypes/state";

interface LoadPlayerAction {
    playerData: RootStateInterface
}

const playerSlice = createSlice({
    name: 'player',
    initialState: {
        initialized: false,
        tab: 'resourceMap',
    } as PlayerState,
    reducers: {
        newPlayer(state) {
            state.initialized = true;
        },
        loadPlayer(state, action: PayloadAction<LoadPlayerAction>) {
            return action.payload.playerData.player;
        },
        switchTab(state, action: PayloadAction<string>) {
            state.tab = action.payload;
        },
    },
});

export const {
    newPlayer, loadPlayer, switchTab
} = playerSlice.actions;

export default playerSlice.reducer;