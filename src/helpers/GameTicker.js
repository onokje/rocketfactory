import {
    canAfford,
    multiplyItemsInItemsArray,
    removeItemFromInventory,
    removeItemsFromInventory
} from "./InventoryHelper";

import {machineProductionFinish, machineProductionStart, productionTick} from "../slices/productionSlice";
import {miningProductionFinish, miningProductionStart} from "../slices/miningSlice";
import {handCraftingFinish, handminingFinish} from "../slices/manualProductionSlice";
import {finishResearch} from "../slices/researchSlice";
import store from './store';
import {rocketFuel, rocketPart, rocketSiloData} from "../gamedata/rocketSilo";
import {fuelPartFinish, fuelPartStart, rocketPartFinish, rocketPartStart} from "../slices/rocketSiloSlice";
import {getItemRecipe, getMachineRecipe, getMineRecipe} from "../gamedata";


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
            const machineData = getMachineRecipe(machine.techType);
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
                    const recipe = getItemRecipe(machine.currentItem);
                    let itemsProduced = [];
                    itemsProduced.push({name: machine.currentItem, amount: recipe.resultAmount});
                    itemsProduced = multiplyItemsInItemsArray(itemsProduced, machineData.resultMultiplier);

                    dispatch(machineProductionFinish({id: machine.id, itemsProduced}));
                }

                if (machine.progressTicks === 0) {
                    // machine is starting with a new recipe, dispatch action to subtract the item cost from the inventory

                    //get recipe:
                    const recipe = getItemRecipe(machine.nextItem);
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
            let machineData = getMineRecipe(mine.techType);
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
        itemsProduced.push({name: manualProduction.handcraftingItem, amount: getItemRecipe(manualProduction.handcraftingItem).resultAmount});
        dispatch(handCraftingFinish({itemsProduced}));
    }
}

function researchTick(dispatch, research) {
    if (research.researching && research.researchingProgressTicks === research.researchingTicksCost) {
        dispatch(finishResearch());
    }
}

function runRocketSilo(inventory, rocketSilo, dispatch, powerBuffer) {
    const silo = { powered: false };

    // check if silo is build
    if (rocketSilo.checklist.silo) {
        if (powerBuffer >= rocketSiloData.powerUsage) {

            powerBuffer = powerBuffer - rocketSiloData.powerUsage;
            silo.powered = true;

            // check rocket parts
            if (rocketSilo.rocketParts < 100) {

                if (rocketSilo.rocketPartProgressTicks >= rocketPart.ticksCost) {
                    // rocket is ready with this batch, dispatch action to add result
                    dispatch(rocketPartFinish());
                }

                if (!rocketSilo.rocketPartProgressTicks) {
                    // silo is ready to start a new batch, dispatch action to subtract the item cost from the inventory
                    // get cost
                    const itemCost = rocketPart.cost.slice(0);

                    if (canAfford(inventory, itemCost)) {
                        dispatch(rocketPartStart({itemCost}));

                        inventory = removeItemsFromInventory(inventory, itemCost);
                    }
                }
            } else {
                // rocket is done, check fuel loading
                if (rocketSilo.fuelProgressTicks >= rocketFuel.ticksCost) {
                    // fuel loading is ready with this batch, dispatch action to add result
                    dispatch(fuelPartFinish());
                }

                if (!rocketSilo.fuelProgressTicks) {
                    // silo is ready to start a new batch, dispatch action to subtract the item cost from the inventory
                    const itemCost = rocketFuel.cost.slice(0);

                    if (canAfford(inventory, itemCost)) {
                        dispatch(fuelPartStart({itemCost}));

                        inventory = removeItemsFromInventory(inventory, itemCost);
                    }
                }
            }

        }
    }

    return {inventory, powerBuffer, silo}
}

export default function mainGameTick(dispatch) {
    const {player, inventory, power, production, mining, research, manualProduction, rocketSilo} = store.getState();

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

    const siloResult = runRocketSilo(newInventory, rocketSilo, dispatch, powerBuffer);
    const silo = siloResult.silo;
    powerBuffer = siloResult.powerBuffer;

    handmining(dispatch, manualProduction);
    handcrafting(dispatch, manualProduction);
    researchTick(dispatch, research);

    dispatch(productionTick({
        poweredMineIds,
        totalPowerProduced:ppResult.totalPowerProduced,
        itemsUsed: ppResult.totalItemsUsed,
        poweredPowerplants: ppResult.poweredPowerplants,
        poweredMachineIds: productionResult.poweredMachineIds,
        newBufferSize:powerBuffer,
        silo
    }));
}
