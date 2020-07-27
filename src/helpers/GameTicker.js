import {
    canAfford,
    multiplyItemsInItemsArray,
    removeItemFromInventory,
    removeItemsFromInventory
} from "./InventoryHelper";
import {itemRecipes} from "../gamedata/items";
import {machines, minePrices} from "../gamedata/machines";

import {machineProductionFinish, machineProductionStart, productionTick} from "../slices/productionSlice";
import {miningProductionFinish, miningProductionStart} from "../slices/miningSlice";
import {handCraftingFinish, handminingFinish} from "../slices/manualProductionSlice";
import {finishScience} from "../slices/scienceSlice";
import store from '../helpers/store';


function runPowerPlants(inventory, power) {
    let totalPowerProduced = 0;
    const poweredPowerplants = [];
    const coalRequired = [];
    const oilRequired = [];
    const totalItemsUsed = [];
    let buffer = power.bufferCurrent;

    for (let powerPlant of power.powerPlants) {
        if (powerPlant.on) {

            switch (powerPlant.techType) {
                case 'coalPower':
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
                case 'oilPower':
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

    return {
        inventory: inventory,
        totalPowerProduced: totalPowerProduced,
        totalItemsUsed: totalItemsUsed,
        poweredPowerplants: poweredPowerplants,
        newBufferSize: buffer
    };

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

                if (machine.progressTicks >= machine.ticksCost) {
                    // machine is ready with this recipe, dispatch action to add the result to the inventory

                    //get recipe:
                    const recipe = itemRecipes[machine.currentItem];
                    let itemsProduced = [];
                    itemsProduced.push({name: machine.currentItem, amount: recipe.resultAmount});
                    itemsProduced = multiplyItemsInItemsArray(itemsProduced, machineData.resultMultiplier);

                    dispatch(machineProductionFinish({id: machine.id, itemsProduced}));
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
                        dispatch(machineProductionStart({id: machine.id, currentItem: machine.nextItem, itemCost}));

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
            let machineData = minePrices[mine.techType];
            let powerUsage = machineData.powerUsage;

            // check if enough power is available
            if (!powerUsage || powerBuffer >= powerUsage) {
                powerBuffer = powerBuffer - powerUsage;
                powered = true;
                poweredMineIds.push(mine.id);
            }

            if (powered) {

                if (mine.progressTicks >= mine.ticksCost) {
                    // mine is ready with this batch, dispatch action to add result to the inventory

                    const itemsProduced = [];
                    itemsProduced.push({name: mine.resourceType, amount: 5});

                    dispatch(miningProductionFinish({mineId: mine.id, itemsProduced}));
                }

                if (mine.progressTicks === 0) {
                    // mine is starting with a new batch, dispach start action.

                    const itemCost = [];
                    // add fuel cost if any
                    Array.prototype.push.apply(itemCost, machineData.fuelCost);

                    if (canAfford(inventory, itemCost)) {
                        dispatch(miningProductionStart({mineId: mine.id, itemCost}));
                        inventory = removeItemsFromInventory(inventory, itemCost);
                    }
                }
            }
        }
    }

    return {inventory: inventory, powerBuffer: powerBuffer, poweredMineIds: poweredMineIds};
}

function handmining(dispatch, manualProduction) {
    if (manualProduction.handmining && manualProduction.handminingProgressTicks === manualProduction.handminingTicksCost) {
        const itemsProduced = [];
        itemsProduced.push({name: manualProduction.handminingResource, amount: 3});
        dispatch(handminingFinish({itemsProduced}));
    }
}

function handcrafting(dispatch, manualProduction) {
    if (manualProduction.handcrafting && manualProduction.handcraftingProgressTicks === manualProduction.handcraftingTicksCost) {
        const itemsProduced = [];
        itemsProduced.push({name: manualProduction.handcraftingItem, amount: itemRecipes[manualProduction.handcraftingItem].resultAmount});
        dispatch(handCraftingFinish({itemsProduced}));
    }
}

function scienceTick(dispatch, science) {
    if (science.researching && science.researchingProgressTicks === science.researchingTicksCost) {
        dispatch(finishScience());
    }
}

export default function mainGameTick(dispatch) {

    const {player, inventory, power, production, mining, science, manualProduction} = store.getState();
    if (!player.initialized) {
        return;
    }
    const ppResult = runPowerPlants(inventory, power);
    let newInventory = ppResult.inventory;
    let powerBuffer = ppResult.newBufferSize;

    const minesResult = runMines(newInventory, mining, dispatch, powerBuffer);
    newInventory = minesResult.inventory;
    powerBuffer = minesResult.powerBuffer;
    const poweredMineIds = minesResult.poweredMineIds;

    const productionResult = runProduction(newInventory, production, dispatch, powerBuffer);
    newInventory = productionResult.inventory;
    powerBuffer = productionResult.powerBuffer;

    handmining(dispatch, manualProduction);
    handcrafting(dispatch, manualProduction);
    scienceTick(dispatch, science);

    dispatch(productionTick({
        poweredMineIds,
        totalPowerProduced:ppResult.totalPowerProduced,
        itemsUsed: ppResult.totalItemsUsed,
        poweredPowerplants: ppResult.poweredPowerplants,
        poweredMachineIds: productionResult.poweredMachineIds,
        newBufferSize:powerBuffer
    }));
}
