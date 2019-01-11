import {canAfford, removeItemFromInventory, removeItemsFromInventory} from "./InventoryHelper";
import {powerProductionTick} from "../actions/power";
import {itemRecipes} from "./gameData";
import {productionTick} from "../actions/production";
import {furnaceProductionFinish, furnaceProductionStart} from "../actions/smelting";
import {miningProductionFinish, miningProductionStart} from "../actions/mining";
import {handminingFinish} from "../actions/player";


function runPowerPlants(inventory, power, dispatch) {
    let totalPowerProduced = 0;

    //coal
    const itemsRequired = [];
    const itemsUsed = [];

    for (let coalPlant of power.coalPowerPlants){
        if (coalPlant.on) {
            itemsRequired.push({name: 'coal', amount: 1});
            if (canAfford(inventory, itemsRequired)) {
                totalPowerProduced += 5000;
                itemsUsed.push({name: 'coal', amount: 1});

                inventory = removeItemFromInventory(inventory, 'coal', 1);
            }
        }
    }





    dispatch(powerProductionTick(totalPowerProduced, itemsUsed));

    return {inventory: inventory, totalPowerProduced: totalPowerProduced};

}

function runStoneFurnaces(inventory, smelting, dispatch) {
    for (let furnace of smelting.stoneFurnaces) {
        if (furnace.on && furnace.progressTicks === furnace.ticksCost) {
            // furnace is ready with this recipe, dispatch action to add the result to the inventory

            //get recipe:
            const recipe = itemRecipes[furnace.currentItem];
            const itemsProduced = [];
            itemsProduced.push({name: furnace.currentItem, amount: recipe.resultAmount});

            dispatch(furnaceProductionFinish(furnace.id, itemsProduced));
        }

        if (furnace.on && furnace.progressTicks === 0) {
            // furnace is starting with a new recipe, dispatch action to subtract the item cost from the inventory

            //get recipe:
            const recipe = itemRecipes[furnace.nextItem];
            const itemCost = recipe.cost.slice(0);
            itemCost.push({name: 'coal', amount: 1}); // added fuel cost for stone furnace

            if (canAfford(inventory, itemCost)) {
                dispatch(furnaceProductionStart(furnace.id, furnace.nextItem, itemCost));

                inventory = removeItemsFromInventory(inventory, itemCost);
            }
        }
    }

    return inventory;
}

function runMines(inventory, mining, dispatch, powerLeft) {
    const poweredMineIds = [];
    for (let mine of mining.mines) {
        if (mine.on) {
            let powered = false;
            let powerUsage;
            switch (mine.techType) {
                case 'coal1' : powerUsage = 0; break;// doesn't use power
                case 'electric1' : powerUsage = 150; break;
                default: powerUsage = 0;
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
                    }
                }
            }
        }
    }

    return {inventory: inventory, powerLeft: powerLeft, poweredMineIds: poweredMineIds};
}

function handmining(dispatch, inventory, player){
    if (player.handmining && player.handminingProgressTicks === player.handminingTicksCost) {
        const itemsProduced = [];
        itemsProduced.push({name: player.handminingResource, amount: 5});
        dispatch(handminingFinish(itemsProduced));
    }
}


export default function mainGameTick(dispatch, player, inventory, power, smelting, mining) {

    const ppResult = runPowerPlants(inventory, power, dispatch);
    inventory = ppResult.inventory;
    let powerLeft = ppResult.totalPowerProduced;

    inventory = runStoneFurnaces(inventory, smelting, dispatch);

    const minesResult = runMines(inventory, mining, dispatch, powerLeft);
    inventory = minesResult.inventory;
    powerLeft = minesResult.powerLeft;
    const poweredMineIds = minesResult.poweredMineIds;

    // assemblers here

    handmining(dispatch, inventory, player);

    dispatch(productionTick(poweredMineIds));
}
