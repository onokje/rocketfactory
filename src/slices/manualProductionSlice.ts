import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {productionTick} from "./productionSlice";
import {loadPlayer} from "./playerSlice";
import {ManualProductionState} from "../CommonTypes/state";
import {Item} from "../CommonTypes/Item";

const manualProductionSlice = createSlice({
    name: 'manualProduction',
    initialState: {
        handmining: false,
        handminingResource: null,
        handminingProgressTicks: 0,
        handminingTicksCost: 5,
        handcrafting: false,
        handcraftingItem: null,
        handcraftingProgressTicks: 0,
        handcraftingTicksCost: 5
    } as ManualProductionState, 
    reducers: {
        handminingStart(state, action: PayloadAction<{resource: string}>) {
            return {...state, handmining: true, handminingResource: action.payload.resource, handminingTicksCost: 5};
        },
        handminingFinish(state, action: PayloadAction<{itemsProduced: Item[]}>) {
            return {...state, handmining: false, handminingResource: null, handminingProgressTicks: 0};
        },
        handCraftingStart(state, action: PayloadAction<{item: string, itemCost: Item[]}>) {
            return {...state, handcrafting: true, handcraftingItem: action.payload.item, handcraftingTicksCost: 5};
        },
        handCraftingFinish(state, action: PayloadAction<{itemsProduced: Item[]}>) {
            return {...state, handcrafting: false, handcraftingItem: null, handcraftingProgressTicks: 0};
        }
    },
    extraReducers: builder => {
        builder
            .addCase(loadPlayer, (state, action) => action.payload.playerData.manualProduction)
            .addCase(productionTick, (state) => {
                if (state.handmining) {
                    state.handminingProgressTicks = state.handminingProgressTicks >= state.handminingTicksCost ? 0 : state.handminingProgressTicks + 1;
                }
                if (state.handcrafting) {
                    state.handcraftingProgressTicks = state.handcraftingProgressTicks >= state.handcraftingTicksCost ? 0 : state.handcraftingProgressTicks + 1;
                }
            });
    }

});

export const {
    handminingStart, handminingFinish, handCraftingStart, handCraftingFinish
} = manualProductionSlice.actions;

export default manualProductionSlice.reducer;