import {createSlice} from '@reduxjs/toolkit'
import {productionTick} from "./productionSlice";

const playerSlice = createSlice({
    name: 'player',
    initialState: {
        initialized: false,
        tab: 'resourceMap',
        handmining: false,
        handminingResource: null,
        handminingProgressTicks: 0,
        handminingTicksCost: 5,
        handcrafting: false,
        handcraftingItem: null,
        handcraftingProgressTicks: 0,
        handcraftingTicksCost: 5
    },
    reducers: {
        newPlayer(state) {
            state.initialized = true;
        },
        loadPlayer(state, action) {
            return action.payload.playerData.player;
        },
        switchTab(state, action) {
            state.tab = action.payload.tab;
        },
        handminingStart(state, action) {
            return {...state, handmining: true, handminingResource: action.payload.resource, handminingTicksCost: 5};
        },
        handminingFinish(state, action) {
            return {...state, handmining: false, handminingResource: null, handminingProgressTicks: 0};
        },
        handCraftingStart(state, action) {
            return {...state, handcrafting: true, handcraftingItem: action.payload.item, handcraftingTicksCost: 5};
        },
        handCraftingFinish(state, action) {
            return {...state, handcrafting: false, handcraftingItem: null, handcraftingProgressTicks: 0};
        }
    },
    extraReducers: {
        [productionTick]: (state) => {
            if (state.handmining) {
                state.handminingProgressTicks = state.handminingProgressTicks >= state.handminingTicksCost ? 0 : state.handminingProgressTicks + 1;
            }
            if (state.handcrafting) {
                state.handcraftingProgressTicks = state.handcraftingProgressTicks >= state.handcraftingTicksCost ? 0 : state.handcraftingProgressTicks + 1;
            }
        }
    }
});

export const {
    newPlayer, loadPlayer, switchTab, handminingStart, handminingFinish, handCraftingStart, handCraftingFinish
} = playerSlice.actions;

export default playerSlice.reducer;