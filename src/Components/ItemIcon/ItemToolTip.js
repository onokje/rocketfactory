import React, { Component } from 'react';
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
import {icons} from "./icons";
import "./ItemIcon.scss";
import {getItemAmountByName} from "../../helpers/InventoryHelper";
import itemNames from "./itemNames";
import {itemRecipes} from "../../gamedata/items";
import ScienceItem from "../Science/ScienceItem";
import ItemRecipe from "../ItemRecipe/ItemRecipe";

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
                <p>Type: {recipe.type}{recipe.handcrafting ? ', handcrafting' : ''}</p>
                <ItemRecipe recipeKey={item} showToolTips={false} />
            </div>

        }
        return null;
    }

    renderScienceRequired() {
        const {item, showScienceRequired} = this.props;
        if (showScienceRequired) {
            return <div>
                <div>Science required:</div>
                <ScienceItem scienceId={itemRecipes[item].scienceRequired} />
            </div>
        }
        return null;
    }

    render() {

        const {item, inventory} = this.props;
        const style = {background: `#999 url(${icons[item]}) no-repeat 3px 3px`};

        return <div>
            <div className="itemToolTipIconAndName">
                <div className="itemIcon" style={style} />
                <div className="itemName">{itemNames[item] || item}</div>
            </div>
            <p>You have: <b>{getItemAmountByName(inventory, item)}</b></p>

            {this.renderCraftingRecipe()}
            {this.renderScienceRequired()}

        </div>
    }
}

ItemToolTip.propTypes = {
    inventory: PropTypes.array.isRequired,
    item: PropTypes.string.isRequired,
    amount: PropTypes.number,
    showScienceRequired: PropTypes.bool,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ItemToolTip)