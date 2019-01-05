import {canAfford} from "./InventoryHelper";
import {powerProductionTick} from "../actions/power";
import {itemRecipes} from "./gameData";
import {productionFinish, productionStart} from "../actions/inventory";
import {productionTick} from "../actions/production";


function runPowerPlants(inventory, power, dispatch) {
    let totalPowerProduced = 0;

    //coal
    const coalRequired = power.coalPowerPlants; // coal power plants use 1 coal per tick
    const itemsRequired = [];
    const itemsUsed = [];
    itemsRequired.push({name: 'coal', amount: coalRequired});
    if (canAfford(inventory, itemsRequired)) {
        totalPowerProduced += (power.coalPowerPlants * 5000);
        itemsUsed.push({name: 'coal', amount: coalRequired});
    }
    dispatch(powerProductionTick(totalPowerProduced, itemsUsed));

    return totalPowerProduced;

}

function runStoneFurnaces(inventory, smelting, dispatch) {
    for (let furnace of smelting.stoneFurnaces) {
        if (furnace.on && furnace.progressTicks === furnace.ticksCost) {
            // furnace is ready with this recipe, dispatch action to add the result to the inventory

            //get recipe:
            const recipe = itemRecipes[furnace.item];
            const items = [];
            items.push(furnace.item, recipe.resultAmount);

            dispatch(productionFinish(items));
        }

        if (furnace.on && furnace.progressTicks === 0) {
            // furnace is starting with a new recipe, dispatch action to subtract the item cost from the inventory

            //get recipe:
            const recipe = itemRecipes[furnace.item];
            const itemCost = recipe.cost;
            itemCost.push({name: 'coal', amount: 1}); // added fuel cost for stone furnace

            dispatch(productionStart(itemCost));
        }
    }
}


export default function mainGameTick(dispatch, inventory, power, smelting) {

    const powerProduced = runPowerPlants(inventory, power, dispatch);

    runStoneFurnaces(inventory, smelting, dispatch);


    dispatch(productionTick());
}
