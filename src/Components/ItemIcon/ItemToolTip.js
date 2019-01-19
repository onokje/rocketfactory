import React, { Component } from 'react';
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
import {icons} from "./icons";
import "./ItemIcon.scss";
import {getItemAmountByName} from "../../helpers/InventoryHelper";
import itemNames from "./itemNames";
import {itemRecipes} from "../../helpers/gameData";
import ProductionCost from "../ProductionCost/ProductionCost";

const mapStateToProps = state => ({
    inventory: state.inventory
});

const mapDispatchToProps = dispatch => ({
});

class ItemToolTip extends Component {

    renderCraftingRecipe(){
        const {item} = this.props;
        if (itemRecipes.hasOwnProperty(item)) {
            const recipe = itemRecipes[item];
            return <div>
                <h2>How to make:</h2>
                <p>Type: {recipe.type}</p>
                <ProductionCost items={recipe.cost} label="Cost to make:" showToolTips={false} />
            </div>

        }
        return null;
    }

    render() {

        const {item, inventory} = this.props;
        const style = {background: `#999 url(${icons[item]}) no-repeat 3px 3px`};
        const recipe = itemRecipes.hasOwnProperty(item) ? itemRecipes[item] : false;

        return <div>
            <div className="itemToolTipIconAndName">
                <div className="icon" style={style} />
                <div className="itemName">{itemNames[item] || item}</div>
            </div>
            <p>You have: <b>{getItemAmountByName(inventory, item)}</b></p>
            <p>Handcraftable: {recipe && recipe.handcrafting ? 'Yes' : 'No'}</p>
            {this.renderCraftingRecipe()}

        </div>
    }
}

ItemToolTip.propTypes = {
    inventory: PropTypes.array.isRequired,
    item: PropTypes.string.isRequired,
    amount: PropTypes.number
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ItemToolTip)