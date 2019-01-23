import {
    canAfford,
    multiplyItemsInItemsArray,
    removeItemFromInventory,
    removeItemsFromInventory
} from "./InventoryHelper";
import {itemRecipes} from "./gameData";
import {productionTick} from "../actions/production";
import {furnaceProductionFinish, furnaceProductionStart} from "../actions/smelting";
import {miningProductionFinish, miningProductionStart} from "../actions/mining";
import {handCraftingFinish, handminingFinish} from "../actions/player";
import {assemblerProductionFinish, assemblerProductionStart} from "../actions/crafting";


function runPowerPlants(inventory, power) {
    let totalPowerProduced = 0;
    const poweredPowerplants = [];
    const coalRequired = [];
    const oilRequired = [];
    const totalItemsUsed = [];
    let buffer = power.bufferCurrent;

    for (let powerPlant of power.powerPlants){
        if (powerPlant.on) {


            switch (powerPlant.techType) {
                case 'coal':
                    coalRequired.push({name: 'coal', amount: 1});
                    if (canAfford(inventory, coalRequired)) { // can we afford a run for this pp?
                        // do we need it?
                        if (buffer + 5000 <= power.bufferMax) {
                            totalPowerProduced += 5000;
                            buffer += 5000;
                            totalItemsUsed.push({name: 'coal', amount: 1});
                            inventory = removeItemFromInventory(inventory, 'coal', 1);
                            poweredPowerplants.push(powerPlant.id);
                        }

                    }

                    break;
                case 'oil':
                    oilRequired.push({name: 'oil', amount: 1});
                    if (canAfford(inventory, oilRequired)) { // can we afford a run for this pp?
                        // do we need it?
                        if (buffer + 5000 <= power.bufferMax) {
                            totalPowerProduced += 5000;
                            buffer += 5000;
                            totalItemsUsed.push({name: 'oil', amount: 1});
                            inventory = removeItemFromInventory(inventory, 'oil', 1);
                            poweredPowerplants.push(powerPlant.id);
                        }
                    }

                    break;
                default:
                    throw Error('Invalid tech type found in run powerplant switch case');

            }
        }
    }

    return {inventory: inventory, totalPowerProduced: totalPowerProduced, totalItemsUsed: totalItemsUsed, poweredPowerplants: poweredPowerplants, newBufferSize: buffer};

}

function runFurnaces(inventory, smelting, dispatch, powerBuffer) {
    const poweredFurnaceIds = [];

    for (let furnace of smelting.furnaces) {
        if (furnace.on) {
            let powered = false;
            let powerUsage;
            switch (furnace.techType) {
                case 'stone' : powerUsage = 0; break;// doesn't use power
                case 'steel': powerUsage = 0; break;// doesn't use power
                case 'electric' : powerUsage = 600; break;
                default: throw Error('Invalid tech type found in run furnaces switch case');
            }

            // check if enough power is available
            if (!powerUsage || powerBuffer >= powerUsage) {
                powerBuffer = powerBuffer - powerUsage;
                powered = true;
                poweredFurnaceIds.push(furnace.id);
            }

            if (powered) {

                if (furnace.progressTicks === furnace.ticksCost) {
                    // furnace is ready with this recipe, dispatch action to add the result to the inventory

                    //get recipe:
                    const recipe = itemRecipes[furnace.currentItem];
                    let itemsProduced = [];
                    itemsProduced.push({name: furnace.currentItem, amount: recipe.resultAmount});

                    switch (furnace.techType) {
                        case 'steel': itemsProduced = multiplyItemsInItemsArray(itemsProduced, 2); break;// doesn't use power
                        case 'electric' : itemsProduced = multiplyItemsInItemsArray(itemsProduced, 4); break;
                        default:
                    }

                    dispatch(furnaceProductionFinish(furnace.id, itemsProduced));
                }

                if (furnace.progressTicks === 0) {
                    // furnace is starting with a new recipe, dispatch action to subtract the item cost from the inventory

                    //get recipe:
                    const recipe = itemRecipes[furnace.nextItem];
                    let itemCost = recipe.cost.slice(0);

                    switch (furnace.techType) {
                        case 'steel': itemCost = multiplyItemsInItemsArray(itemCost, 2); break;// doesn't use power
                        case 'electric' : itemCost = multiplyItemsInItemsArray(itemCost, 4); break;
                        default:
                    }

                    if (furnace.techType === 'stone' || furnace.techType === 'steel') {
                        itemCost.push({name: 'coal', amount: 1}); // added fuel cost for stone or steel furnace
                    }

                    if (canAfford(inventory, itemCost)) {
                        dispatch(furnaceProductionStart(furnace.id, furnace.nextItem, itemCost));

                        inventory = removeItemsFromInventory(inventory, itemCost);
                    }
                }
            }
        }


    }

    return {inventory: inventory, powerBuffer: powerBuffer, poweredFurnaceIds: poweredFurnaceIds};
}

function runMines(inventory, mining, dispatch, powerBuffer) {
    const poweredMineIds = [];
    for (let mine of mining.mines) {
        if (mine.on) {
            let powered = false;
            let powerUsage;
            switch (mine.techType) {
                case 'coal1' : powerUsage = 0; break;// doesn't use power
                case 'electric1' : powerUsage = 400; break;
                case 'pump' : powerUsage = 450; break;
                default: throw Error('Invalid tech type found in run mines switch case');
            }

            // check if enough power is available
            if (!powerUsage || powerBuffer >= powerUsage) {
                powerBuffer = powerBuffer - powerUsage;
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

    return {inventory: inventory, powerBuffer: powerBuffer, poweredMineIds: poweredMineIds};
}

function runCrafters(inventory, crafting, dispatch, powerBuffer) {
    const poweredAssemblerIds = [];
    for (let assembler of crafting.assemblers) {
        if (assembler.on) {
            let powered = false;
            let powerUsage;
            switch (assembler.techType) {
                case 'assembler1' : powerUsage = 300; break;
                default: throw Error('Invalid tech type found in run assemblers switch case');
            }

            // check if enough power is available
            if (powerBuffer >= powerUsage) {
                powerBuffer = powerBuffer - powerUsage;
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

    return {inventory: inventory, powerBuffer: powerBuffer, poweredAssemblerIds: poweredAssemblerIds};
}

function handmining(dispatch, player){
    if (player.handmining && player.handminingProgressTicks === player.handminingTicksCost) {
        const itemsProduced = [];
        itemsProduced.push({name: player.handminingResource, amount: 3});
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
    let powerBuffer = ppResult.newBufferSize;

    const minesResult = runMines(inventory, mining, dispatch, powerBuffer);
    inventory = minesResult.inventory;
    powerBuffer = minesResult.powerBuffer;
    const poweredMineIds = minesResult.poweredMineIds;

    const furnaceResult = runFurnaces(inventory, smelting, dispatch, powerBuffer);
    inventory = furnaceResult.inventory;
    powerBuffer = furnaceResult.powerBuffer;
    const poweredFurnaceIds = furnaceResult.poweredFurnaceIds;

    const craftingResult = runCrafters(inventory, crafting, dispatch, powerBuffer);
    powerBuffer = craftingResult.powerBuffer;

    handmining(dispatch, player);
    handcrafting(dispatch, player);

    dispatch(productionTick(
        poweredMineIds,
        poweredFurnaceIds,
        ppResult.totalPowerProduced,
        ppResult.totalItemsUsed,
        ppResult.poweredPowerplants,
        craftingResult.poweredAssemblerIds,
        powerBuffer));
}
