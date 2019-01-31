import {
    machines,
    minePrices,
    powerPlantPrices,
} from "../gamedata/machines";
import {
    addItemsToInventory,
    addItemToInventory, multiplyItemsInItemsArray,
    removeItemsFromInventory
} from "../helpers/InventoryHelper";
import {sciences} from "../gamedata/science";

const initialInventoryState = [];
let itemCost, itemsReturned;

const inventory = (state = initialInventoryState, action) => {
    switch (action.type) {
        case 'LOAD_PLAYER':
            return action.playerData.inventory;
        case 'MINE_RESOURCE':
            return addItemToInventory(state, action.resourceType, 1);
        case 'START_SCIENCE':
            itemCost = sciences[action.scienceId].cost;
            return removeItemsFromInventory(state, itemCost);
        case 'BUILD_POWER_PLANT':
            itemCost = powerPlantPrices[action.techType];
            return removeItemsFromInventory(state, itemCost);
        case 'BUILD_MACHINE':
            itemCost = machines[action.techType].cost.slice(0);
            return removeItemsFromInventory(state, itemCost);
        case 'BUILD_MINE':
            itemCost = minePrices[action.techType].slice(0);
            return removeItemsFromInventory(state, itemCost);
        case 'SELL_MINE':
            itemsReturned = multiplyItemsInItemsArray(minePrices[action.techType].slice(0), 0.5);
            return addItemsToInventory(state, itemsReturned);
        case 'SELL_MACHINE':
            itemsReturned = multiplyItemsInItemsArray(machines[action.techType].cost.slice(0), 0.5);
            return addItemsToInventory(state, itemsReturned);
        case 'SELL_POWER_PLANT':
            itemsReturned = multiplyItemsInItemsArray(powerPlantPrices[action.techType].slice(0), 0.5);
            return addItemsToInventory(state, itemsReturned);
        case 'PRODUCTION_TICK':
            return removeItemsFromInventory(state, action.itemsUsed);
        case 'MACHINE_PRODUCTION_START':
        case 'MINING_PRODUCTION_START':
        case 'HANDCRAFTING_START':
            return removeItemsFromInventory(state, action.itemCost);
        case 'MACHINE_PRODUCTION_FINISH':
        case 'MINING_PRODUCTION_FINISH':
        case 'HANDMINING_FINISH':
        case 'HANDCRAFTING_FINISH':
            return addItemsToInventory(state, action.itemsProduced);
        default:
            return state;
    }
};

export default inventory;