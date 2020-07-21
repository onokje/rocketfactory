import { createSlice } from '@reduxjs/toolkit'
import {
    addItemsToInventory,
    multiplyItemsInItemsArray,
    removeItemsFromInventory
} from "../helpers/InventoryHelper";
import {sciences} from "../gamedata/science";
import {machines, minePrices, powerPlants} from "../gamedata/machines";
import {handCraftingFinish, handCraftingStart, handminingFinish, loadPlayer} from "./playerSlice";
import {startScience} from "./scienceSlice";
import {buildPowerPlant, sellPowerPlant} from "./powerSlice";
import {
    buildMachine,
    machineProductionFinish,
    machineProductionStart,
    productionTick,
    sellMachine
} from "./productionSlice";
import {buildMine, miningProductionFinish, miningProductionStart, sellMine} from "./miningSlice";

const inventorySlice = createSlice({
    name: '',
    initialState: [],
    reducers: {},
    extraReducers: {
        [loadPlayer]: (state, action) => action.payload.playerData.inventory,
        [startScience]: (state, action) => {
            const itemCost = sciences[action.payload.scienceId].cost.slice(0);
            removeItemsFromInventory(state, itemCost);
        },
        [buildPowerPlant]: (state, action) => {
            const itemCost = powerPlants[action.payload.techType].cost.slice(0);
            removeItemsFromInventory(state, itemCost);
        },
        [sellPowerPlant]: (state, action) => {
            const itemsReturned = multiplyItemsInItemsArray(powerPlants[action.payload.techType].cost.slice(0), 0.5);
            addItemsToInventory(state, itemsReturned);
        },
        [buildMachine]: (state, action) => {
            const itemCost = machines[action.payload.techType].cost.slice(0);
            removeItemsFromInventory(state, itemCost);
        },
        [buildMine]: (state, action) => {
            const itemCost = minePrices[action.payload.techType].cost.slice(0);
            removeItemsFromInventory(state, itemCost);
        },
        [sellMine]: (state, action) => {
            const itemsReturned = multiplyItemsInItemsArray(minePrices[action.payload.techType].cost.slice(0), 0.5);
            addItemsToInventory(state, itemsReturned);
        },
        [sellMachine]: (state, action) => {
            const itemsReturned = multiplyItemsInItemsArray(machines[action.payload.techType].cost.slice(0), 0.5);
            addItemsToInventory(state, itemsReturned);
        },
        [productionTick]: (state, action) => {
            removeItemsFromInventory(state, action.payload.itemsUsed);
        },
        [machineProductionStart]: (state, action) => removeItemsFromInventory(state, action.payload.itemCost),
        [miningProductionStart]: (state, action) => removeItemsFromInventory(state, action.payload.itemCost),
        [handCraftingStart]: (state, action) => removeItemsFromInventory(state, action.payload.itemCost),
        [machineProductionFinish]: (state, action) => addItemsToInventory(state, action.payload.itemsProduced),
        [miningProductionFinish]: (state, action) => addItemsToInventory(state, action.payload.itemsProduced),
        [handminingFinish]: (state, action) => addItemsToInventory(state, action.payload.itemsProduced),
        [handCraftingFinish]: (state, action) => addItemsToInventory(state, action.payload.itemsProduced),
    }
});


export default inventorySlice.reducer;