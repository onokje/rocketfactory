import {canAfford, removeItemFromInventory, removeItemsFromInventory} from "./InventoryHelper";
import {powerProductionTick} from "../actions/power";
import {itemRecipes} from "./gameData";
import {productionTick} from "../actions/production";
import {furnaceProductionFinish, furnaceProductionStart} from "../actions/smelting";
import {miningProductionFinish, miningProductionStart} from "../actions/mining";


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

function runMines(inventory, mining, dispatch) {
    for (let mine of mining.mines) {
        if (mine.on) {
            if (mine.techType === 'coal1') {
                // doesn't use power

            } else {
                // check if enough power is available


            }

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

    return inventory;
}


export default function mainGameTick(dispatch, inventory, power, smelting, mining) {

    const ppResult = runPowerPlants(inventory, power, dispatch);
    inventory = ppResult.inventory;

    inventory = runStoneFurnaces(inventory, smelting, dispatch);

    inventory = runMines(inventory, mining, dispatch);


    dispatch(productionTick());
}
