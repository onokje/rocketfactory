import React, {Component} from 'react';
import PropTypes from "prop-types";
import {itemRecipes} from "../../gamedata/items";
import "./ItemRecipe.scss";
import ItemList from "../ItemList/ItemList";

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
        const {recipeKey, showToolTips} = this.props;
        const recipe = itemRecipes[recipeKey];

        return <div className="itemRecipe">
            {this.renderFuelItems()}
            <ItemList items={recipe.cost} label="" showToolTips={showToolTips} />
            <div className="arrow" />
            <ItemList items={[{"name" : recipeKey, "amount" : recipe.resultAmount}]} label="" showToolTips={showToolTips} />
        </div>
    }
}

ItemRecipe.propTypes = {
    recipeKey: PropTypes.object.isRequired,
    showToolTips: PropTypes.bool,
    fuelItems: PropTypes.array
};

ItemRecipe.defaultProps = {
    showToolTips: true,
    fuelItems: []
};

export default ItemRecipe;