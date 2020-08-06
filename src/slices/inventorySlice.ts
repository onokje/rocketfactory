import { createSlice } from '@reduxjs/toolkit'
import {
    addItemsToInventory,
    multiplyItemsInItemsArray,
    removeItemsFromInventory
} from "../helpers/InventoryHelper";

import {loadPlayer} from "./playerSlice";
import {handCraftingFinish, handCraftingStart, handminingFinish} from "./manualProductionSlice";
import {startResearch} from "./researchSlice";
import {buildPowerPlant, sellPowerPlant} from "./powerSlice";
import {
    buildMachine,
    machineProductionFinish,
    machineProductionStart,
    productionTick,
    sellMachine
} from "./productionSlice";
import {buildMine, miningProductionFinish, miningProductionStart, sellMine} from "./miningSlice";
import {fuelPartStart, rocketPartStart} from "./rocketSiloSlice";
import {Item} from "../CommonTypes/Item";
import {getMachineRecipe, getMineRecipe, getPowerPlantRecipe, getResearch} from "../gamedata";

type InitialInventoryState = Item[];

const inventorySlice = createSlice({
    name: 'inventory',
    initialState: [] as InitialInventoryState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(loadPlayer, (state, action) => action.payload.playerData.inventory)
            .addCase(startResearch, (state, action) => {
                const itemCost = getResearch(action.payload.researchId).cost;
                return removeItemsFromInventory(state, itemCost);
            })
            .addCase(buildPowerPlant, (state, action) => {
                const itemCost = getResearch(action.payload.techType).cost;
                return removeItemsFromInventory(state, itemCost);
            })
            .addCase(sellPowerPlant, (state, action) => {
                const itemsReturned = multiplyItemsInItemsArray(getPowerPlantRecipe(action.payload.techType).cost, 0.5);
                return addItemsToInventory(state, itemsReturned);
            })
            .addCase(buildMachine, (state, action) => {
                const itemCost = getMachineRecipe(action.payload.techType).cost;
                return removeItemsFromInventory(state, itemCost);
            })
            .addCase(buildMine, (state, action) => {
                const itemCost = getMineRecipe(action.payload.techType).cost;
                return removeItemsFromInventory(state, itemCost);
            })
            .addCase(sellMine, (state, action) => {
                const itemsReturned = multiplyItemsInItemsArray(getMineRecipe(action.payload.techType).cost, 0.5);
                return addItemsToInventory(state, itemsReturned);
            })
            .addCase(sellMachine, (state, action) => {
                const itemsReturned = multiplyItemsInItemsArray(getMachineRecipe(action.payload.techType).cost, 0.5);
                return addItemsToInventory(state, itemsReturned);
            })
            .addCase(productionTick, (state, action) => {
                return removeItemsFromInventory(state, action.payload.itemsUsed);
            })
            .addCase(machineProductionStart, (state, action) => removeItemsFromInventory(state, action.payload.itemCost))
            .addCase(miningProductionStart, (state, action) => removeItemsFromInventory(state, action.payload.itemCost))
            .addCase(handCraftingStart, (state, action) => removeItemsFromInventory(state, action.payload.itemCost))
            .addCase(machineProductionFinish, (state, action) => addItemsToInventory(state, action.payload.itemsProduced))
            .addCase(miningProductionFinish, (state, action) => addItemsToInventory(state, action.payload.itemsProduced))
            .addCase(handminingFinish, (state, action) => addItemsToInventory(state, action.payload.itemsProduced))
            .addCase(handCraftingFinish, (state, action) => addItemsToInventory(state, action.payload.itemsProduced))
            .addCase(rocketPartStart, (state, action) => removeItemsFromInventory(state, action.payload.itemCost))
            .addCase(fuelPartStart, (state, action) => removeItemsFromInventory(state, action.payload.itemCost));
    }
});


export default inventorySlice.reducer;