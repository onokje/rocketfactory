import {coalMine1Price, coalPowerPlantPrice, stoneFurnacePrice} from "../helpers/gameData";
import {
    addItemsToInventory,
    addItemToInventory,
    removeItemsFromInventory
} from "../helpers/InventoryHelper";

const initialInventoryState = [];

const inventory = (state = initialInventoryState, action) => {
    switch (action.type) {
        case 'LOAD_PLAYER':
            return action.playerData.inventory;
        case 'MINE_RESOURCE':
            return addItemToInventory(state, action.resourceType, 1);
        case 'BUILD_POWER_PLANT':
            switch (action.powerType) {
                case 'coal':

                    return removeItemsFromInventory(state, coalPowerPlantPrice);

                default:
                    return state;
            }
        case 'BUILD_FURNACE':
            switch (action.furnaceType) {
                case 'stone':

                    return removeItemsFromInventory(state, stoneFurnacePrice);

                default:
                    return state;
            }
        case 'BUILD_MINE':
            switch (action.resourceType) {
                case 'coal':

                    return removeItemsFromInventory(state, coalMine1Price);

                default:
                    return state;
            }
        case 'PRODUCTION_TICK':
            return removeItemsFromInventory(state, action.itemsUsed);
        case 'FURNACE_PRODUCTION_START':
        case 'MINING_PRODUCTION_START':
            return removeItemsFromInventory(state, action.itemCost);
        case 'FURNACE_PRODUCTION_FINISH':
        case 'MINING_PRODUCTION_FINISH':
        case 'HANDMINING_FINISH':
            return addItemsToInventory(state, action.itemsProduced);
        default:
            return state;
    }
};

export default inventory;