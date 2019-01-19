import {
    coalPowerPlantPrice,
    furnacePrices,
    minePrices,
} from "../helpers/gameData";
import {
    addItemsToInventory,
    addItemToInventory,
    removeItemsFromInventory
} from "../helpers/InventoryHelper";

const initialInventoryState = [];
let itemCost;

const inventory = (state = initialInventoryState, action) => {
    switch (action.type) {
        case 'LOAD_PLAYER':
            return action.playerData.inventory;
        case 'MINE_RESOURCE':
            return addItemToInventory(state, action.resourceType, 1);
        case 'BUILD_POWER_PLANT':
            switch (action.techType) {
                case 'coal':

                    return removeItemsFromInventory(state, coalPowerPlantPrice);

                default:
                    return state;
            }
        case 'BUILD_FURNACE':
            itemCost = furnacePrices[action.techType].slice(0);
            return removeItemsFromInventory(state, itemCost);

        case 'BUILD_MINE':

            itemCost = minePrices[action.techType].slice(0);
            return removeItemsFromInventory(state, itemCost);

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