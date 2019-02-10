import React, {Component} from 'react';
import PropTypes from "prop-types";
import {itemRecipes} from "../../gamedata/items";
import "./ItemRecipe.scss";
import ItemList from "../ItemList/ItemList";
import {multiplyItemsInItemsArray} from "../../helpers/InventoryHelper";

class ItemRecipe extends Component {

    renderFuelItems() {
        const {showToolTips, fuelItems} = this.props;

        if (fuelItems && fuelItems.length) {
            return <>
                <ItemList items={fuelItems} label="" showToolTips={showToolTips} />
                <div className="plus">+</div>
                </>
        }

        return null;
    }

    render() {
        const {recipeKey, showToolTips, machineMultiplier} = this.props;
        const recipe = itemRecipes[recipeKey];
        const cost = multiplyItemsInItemsArray(recipe.cost, machineMultiplier);
        const resultAmount = recipe.resultAmount * machineMultiplier;

        return <div className="itemRecipe">
            {this.renderFuelItems()}
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
}

ItemRecipe.propTypes = {
    recipeKey: PropTypes.object.isRequired,
    showToolTips: PropTypes.bool,
    fuelItems: PropTypes.array,
    machineMultiplier: PropTypes.number
};

ItemRecipe.defaultProps = {
    showToolTips: true,
    fuelItems: [],
    machineMultiplier: 1
};

export default ItemRecipe;