import {
    canAfford,
    multiplyItemsInItemsArray,
    removeItemFromInventory,
    removeItemsFromInventory
} from "./InventoryHelper";
import {itemRecipes} from "../gamedata/items";
import {machineProductionFinish, machineProductionStart, productionTick} from "../actions/production";
import {miningProductionFinish, miningProductionStart} from "../actions/mining";
import {handCraftingFinish, handminingFinish} from "../actions/player";
import {finishScience} from "../actions/science";
import {machines} from "../gamedata/machines";


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
                        if (buffer + 500 <= power.bufferMax) {
                            totalPowerProduced += 500;
                            buffer += 500;
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
                        if (buffer + 500 <= power.bufferMax) {
                            totalPowerProduced += 500;
                            buffer += 500;
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

function runProduction(inventory, production, dispatch, powerBuffer) {
    const poweredMachineIds = [];

    for (let machine of production.machines) {
        if (machine.on) {
            const machineData = machines[machine.techType];
            const powerUsage = machineData.powerUsage;
            let powered = false;

            // check if enough power is available
            if (!powerUsage || powerBuffer >= powerUsage) {
                powerBuffer = powerBuffer - powerUsage;
                powered = true;
                poweredMachineIds.push(machine.id);
            }

            if (powered) {

                if (machine.progressTicks === machine.ticksCost) {
                    // machine is ready with this recipe, dispatch action to add the result to the inventory

                    //get recipe:
                    const recipe = itemRecipes[machine.currentItem];
                    let itemsProduced = [];
                    itemsProduced.push({name: machine.currentItem, amount: recipe.resultAmount});
                    itemsProduced = multiplyItemsInItemsArray(itemsProduced, machineData.resultMultiplier);

                    dispatch(machineProductionFinish(machine.id, itemsProduced));
                }

                if (machine.progressTicks === 0) {
                    // machine is starting with a new recipe, dispatch action to subtract the item cost from the inventory

                    //get recipe:
                    const recipe = itemRecipes[machine.nextItem];
                    let itemCost = recipe.cost.slice(0);
                    itemCost = multiplyItemsInItemsArray(itemCost, machineData.resultMultiplier);

                    // add fuel cost if any
                    Array.prototype.push.apply(itemCost, machineData.fuelCost);


                    if (canAfford(inventory, itemCost)) {
                        dispatch(machineProductionStart(machine.id, machine.nextItem, itemCost));

                        inventory = removeItemsFromInventory(inventory, itemCost);
                    }
                }
            }
        }

    }

    return {inventory: inventory, powerBuffer: powerBuffer, poweredMachineIds: poweredMachineIds};
}

function runMines(inventory, mining, dispatch, powerBuffer) {
    const poweredMineIds = [];
    for (let mine of mining.mines) {
        if (mine.on) {
            let powered = false;
            let powerUsage;
            switch (mine.techType) {
                case 'coal1' : powerUsage = 0; break;// doesn't use power
                case 'electric1' : powerUsage = 40; break;
                case 'pump' : powerUsage = 45; break;
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

function scienceTick(dispatch, science){
    if (science.researching && science.researchingProgressTicks === science.researchingTicksCost) {
        dispatch(finishScience());
    }
}

export default function mainGameTick(dispatch, player, inventory, power, production, mining, science) {

    const ppResult = runPowerPlants(inventory, power);
    inventory = ppResult.inventory;
    let powerBuffer = ppResult.newBufferSize;

    const minesResult = runMines(inventory, mining, dispatch, powerBuffer);
    inventory = minesResult.inventory;
    powerBuffer = minesResult.powerBuffer;
    const poweredMineIds = minesResult.poweredMineIds;

    const productionResult = runProduction(inventory, production, dispatch, powerBuffer);
    inventory = productionResult.inventory;
    powerBuffer = productionResult.powerBuffer;

    handmining(dispatch, player);
    handcrafting(dispatch, player);
    scienceTick(dispatch, science);

    dispatch(productionTick(
        poweredMineIds,
        ppResult.totalPowerProduced,
        ppResult.totalItemsUsed,
        ppResult.poweredPowerplants,
        productionResult.poweredMachineIds,
        powerBuffer));
}
