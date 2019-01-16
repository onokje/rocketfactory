import {canAfford, removeItemFromInventory, removeItemsFromInventory} from "./InventoryHelper";
import {itemRecipes} from "./gameData";
import {productionTick} from "../actions/production";
import {furnaceProductionFinish, furnaceProductionStart} from "../actions/smelting";
import {miningProductionFinish, miningProductionStart} from "../actions/mining";
import {handCraftingFinish, handminingFinish} from "../actions/player";
import {assemblerProductionFinish, assemblerProductionStart} from "../actions/crafting";


function runPowerPlants(inventory, power) {
    let totalPowerProduced = 0;
    const poweredPowerplants = [];
    const itemsRequired = [];
    const totalItemsUsed = [];

    for (let powerPlant of power.powerPlants){
        if (powerPlant.on) {
            switch (powerPlant.techType) {
                case 'coal':
                    itemsRequired.push({name: 'coal', amount: 1});
                    if (canAfford(inventory, itemsRequired)) {
                        totalPowerProduced += 5000;
                        totalItemsUsed.push({name: 'coal', amount: 1});

                        inventory = removeItemFromInventory(inventory, 'coal', 1);
                        poweredPowerplants.push(powerPlant.id);
                    }

                    break;
                default:
                    throw Error('Invalid tech type found in run powerplant switch case');

            }
        }
    }

    return {inventory: inventory, totalPowerProduced: totalPowerProduced, totalItemsUsed: totalItemsUsed, poweredPowerplants: poweredPowerplants};

}

function runFurnaces(inventory, smelting, dispatch, powerLeft) {
    const poweredFurnaceIds = [];

    for (let furnace of smelting.furnaces) {
        if (furnace.on) {
            let powered = false;
            let powerUsage;
            switch (furnace.techType) {
                case 'stone' : powerUsage = 0; break;// doesn't use power
                case 'electric1' : powerUsage = 400; break;
                default: throw Error('Invalid tech type found in run furnaces switch case');
            }

            // check if enough power is available
            if (!powerUsage || powerLeft >= powerUsage) {
                powerLeft = powerLeft - powerUsage;
                powered = true;
                poweredFurnaceIds.push(furnace.id);
            }

            if (powered) {

                if (furnace.progressTicks === furnace.ticksCost) {
                    // furnace is ready with this recipe, dispatch action to add the result to the inventory

                    //get recipe:
                    const recipe = itemRecipes[furnace.currentItem];
                    const itemsProduced = [];
                    itemsProduced.push({name: furnace.currentItem, amount: recipe.resultAmount});

                    dispatch(furnaceProductionFinish(furnace.id, itemsProduced));
                }

                if (furnace.progressTicks === 0) {
                    // furnace is starting with a new recipe, dispatch action to subtract the item cost from the inventory

                    //get recipe:
                    const recipe = itemRecipes[furnace.nextItem];
                    const itemCost = recipe.cost.slice(0);

                    if (furnace.techType === 'stone') {
                        itemCost.push({name: 'coal', amount: 1}); // added fuel cost for stone furnace
                    }

                    if (canAfford(inventory, itemCost)) {
                        dispatch(furnaceProductionStart(furnace.id, furnace.nextItem, itemCost));

                        inventory = removeItemsFromInventory(inventory, itemCost);
                    }
                }
            }
        }


    }

    return {inventory: inventory, powerLeft: powerLeft, poweredFurnaceIds: poweredFurnaceIds};
}

function runMines(inventory, mining, dispatch, powerLeft) {
    const poweredMineIds = [];
    for (let mine of mining.mines) {
        if (mine.on) {
            let powered = false;
            let powerUsage;
            switch (mine.techType) {
                case 'coal1' : powerUsage = 0; break;// doesn't use power
                case 'electric1' : powerUsage = 350; break;
                default: throw Error('Invalid tech type found in run mines switch case');
            }

            // check if enough power is available
            if (!powerUsage || powerLeft >= powerUsage) {
                powerLeft = powerLeft - powerUsage;
                powered = true;
                poweredMineIds.push(mine.id);
            }

            if (powered) {

                if (mine.progressTicks === mine.ticksCost) {
                    // mine is ready with this batch, dispatch action to add result to the inventory

                    const itemsProduced = [];
                    itemsProduced.push({name: mine.resourceType, amount: 5});

                    dispatch(miningProductionFinish(mine.id, itemsProduced));
                }

                if (mine.progressTicks === 0) {
                    // mine is starting with a new batch, dispach start action.

                    const itemCost = [];
                    if (mine.techType === 'coal1') {
                        itemCost.push({name: 'coal', amount: 1}); // added fuel cost for coal powered mines
                    }

                    if (canAfford(inventory, itemCost)) {
                        dispatch(miningProductionStart(mine.id, itemCost));
                        inventory = removeItemsFromInventory(inventory, itemCost);
                    }
                }
            }
        }
    }

    return {inventory: inventory, powerLeft: powerLeft, poweredMineIds: poweredMineIds};
}

function runCrafters(inventory, crafting, dispatch, powerLeft) {
    const poweredAssemblerIds = [];
    for (let assembler of crafting.assemblers) {
        if (assembler.on) {
            let powered = false;
            let powerUsage;
            switch (assembler.techType) {
                case 'tier1' : powerUsage = 250; break;
                default: throw Error('Invalid tech type found in run mines switch case');
            }

            // check if enough power is available
            if (powerLeft >= powerUsage) {
                powerLeft = powerLeft - powerUsage;
                powered = true;
                poweredAssemblerIds.push(assembler.id);
            }

            if (powered) {

                if (assembler.progressTicks === assembler.ticksCost) {
                    // assembler is ready with this batch, dispatch action to add result to the inventory

                    const itemsProduced = [];
                    itemsProduced.push({name: assembler.currentItem, amount: itemRecipes[assembler.currentItem].resultAmount});

                    dispatch(assemblerProductionFinish(assembler.id, itemsProduced));
                }

                if (assembler.progressTicks === 0) {
                    // assembler is starting with a new batch, dispach start action.

                    const itemCost = JSON.parse(JSON.stringify(itemRecipes[assembler.nextItem].cost));

                    if (canAfford(inventory, itemCost)) {
                        dispatch(assemblerProductionStart(assembler.id, assembler.nextItem, itemCost));
                        inventory = removeItemsFromInventory(inventory, itemCost);
                    }
                }
            }
        }
    }

    return {inventory: inventory, powerLeft: powerLeft, poweredAssemblerIds: poweredAssemblerIds};
}

function handmining(dispatch, player){
    if (player.handmining && player.handminingProgressTicks === player.handminingTicksCost) {
        const itemsProduced = [];
        itemsProduced.push({name: player.handminingResource, amount: 5});
        dispatch(handminingFinish(itemsProduced));
    }
}

function handcrafting(dispatch, player){
    if (player.handcrafting && player.handcraftingProgressTicks === player.handcraftingTicksCost) {
        const itemsProduced = [];
        itemsProduced.push({name: player.handcraftingItem, amount: itemRecipes[player.handcraftingItem].resultAmount});
        dispatch(handCraftingFinish(itemsProduced));
    }
}

export default function mainGameTick(dispatch, player, inventory, power, smelting, mining, crafting) {

    const ppResult = runPowerPlants(inventory, power);
    inventory = ppResult.inventory;
    let powerLeft = ppResult.totalPowerProduced;

    const minesResult = runMines(inventory, mining, dispatch, powerLeft);
    inventory = minesResult.inventory;
    powerLeft = minesResult.powerLeft;
    const poweredMineIds = minesResult.poweredMineIds;

    const furnaceResult = runFurnaces(inventory, smelting, dispatch, powerLeft);
    inventory = furnaceResult.inventory;
    powerLeft = furnaceResult.powerLeft;
    const poweredFurnaceIds = furnaceResult.poweredFurnaceIds;

    const craftingResult = runCrafters(inventory, crafting, dispatch, powerLeft);
    powerLeft = craftingResult.powerLeft;

    handmining(dispatch, player);
    handcrafting(dispatch, player);

    dispatch(productionTick(
        poweredMineIds,
        poweredFurnaceIds,
        ppResult.totalPowerProduced,
        powerLeft,
        ppResult.totalItemsUsed,
        ppResult.poweredPowerplants,
        craftingResult.poweredAssemblerIds));
}
