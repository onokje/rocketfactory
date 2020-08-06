import React from 'react';
import "./ItemRecipe.scss";
import ItemList from "../ItemList/ItemList";
import {multiplyItemsInItemsArray} from "../../helpers/InventoryHelper";
import {Item} from "../../CommonTypes/Item";
import {getItemRecipe} from "../../gamedata";

type ItemRecipeProps = {
    recipeKey: string,
    showToolTips?: boolean
    fuelItems?: Item[],
    machineMultiplier?: number
}

export default function ItemRecipe(props: ItemRecipeProps){

    const {recipeKey, showToolTips = true, fuelItems = [], machineMultiplier = 1} = props;

    const renderFuelItems = () => {
        if (fuelItems && fuelItems.length) {
            return <>
                <ItemList items={fuelItems} label="" showToolTips={showToolTips} />
                <div className="plus">+</div>
                </>
        }
        return null;
    }

    const recipe = getItemRecipe(recipeKey);
    const cost = multiplyItemsInItemsArray(recipe.cost, machineMultiplier);
    const resultAmount = recipe.resultAmount ? (recipe.resultAmount * machineMultiplier) : 0;

    return <div className="itemRecipe">
        {renderFuelItems()}
        <ItemList items={cost} label="" showToolTips={showToolTips} />
        <div className="arrow" />
        <ItemList
            items={[{"name" : recipeKey, "amount" : resultAmount}]}
            label=""
            showToolTips={showToolTips}
            showAvailable={false}
        />
    </div>

}

