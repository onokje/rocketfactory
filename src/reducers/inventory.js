import {
    assemblerPrices,
    furnacePrices,
    minePrices,
    powerPlantPrices,
} from "../helpers/gameData";
import {
    addItemsToInventory,
    addItemToInventory, multiplyItemsInItemsArray,
    removeItemsFromInventory
} from "../helpers/InventoryHelper";
import {sciences} from "../helpers/gameDataScience";

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
        case 'BUILD_FURNACE':
            itemCost = furnacePrices[action.techType].slice(0);
            return removeItemsFromInventory(state, itemCost);
        case 'BUILD_ASSEMBLER':
            itemCost = assemblerPrices[action.techType].slice(0);
            return removeItemsFromInventory(state, itemCost);
        case 'BUILD_MINE':
            itemCost = minePrices[action.techType].slice(0);
            return removeItemsFromInventory(state, itemCost);
        case 'SELL_FURNACE':
            itemsReturned = multiplyItemsInItemsArray(furnacePrices[action.techType].slice(0), 0.5);
            return addItemsToInventory(state, itemsReturned);
        case 'SELL_MINE':
            itemsReturned = multiplyItemsInItemsArray(minePrices[action.techType].slice(0), 0.5);
            return addItemsToInventory(state, itemsReturned);
        case 'SELL_ASSEMBLER':
            itemsReturned = multiplyItemsInItemsArray(assemblerPrices[action.techType].slice(0), 0.5);
            return addItemsToInventory(state, itemsReturned);
        case 'SELL_POWER_PLANT':
            itemsReturned = multiplyItemsInItemsArray(powerPlantPrices[action.techType].slice(0), 0.5);
            return addItemsToInventory(state, itemsReturned);
        case 'PRODUCTION_TICK':
            return removeItemsFromInventory(state, action.itemsUsed);
        case 'FURNACE_PRODUCTION_START':
        case 'MINING_PRODUCTION_START':
        case 'HANDCRAFTING_START':
        case 'ASSEMBLER_PRODUCTION_START':
            return removeItemsFromInventory(state, action.itemCost);
        case 'FURNACE_PRODUCTION_FINISH':
        case 'MINING_PRODUCTION_FINISH':
        case 'HANDMINING_FINISH':
        case 'HANDCRAFTING_FINISH':
        case 'ASSEMBLER_PRODUCTION_FINISH':
            return addItemsToInventory(state, action.itemsProduced);
        default:
            return state;
    }
};

export default inventory;