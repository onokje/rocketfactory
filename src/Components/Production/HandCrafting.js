import React, {Component} from 'react';
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
import {itemRecipes} from "../../gamedata/items";
import {canAfford} from "../../helpers/InventoryHelper";
import ItemIcon from "../ItemIcon/ItemIcon";
import {playerHasScience} from "../../helpers/ScienceHelper";
import {handCraftingStart} from "../../slices/manualProductionSlice";

const mapStateToProps = state => ({
    player: state.player,
    science: state.science,
    inventory: state.inventory
});

const mapDispatchToProps = {handCraftingStart};

class HandCrafting extends Component {

    renderHandCraftingButton(entry) {
        if (entry[1].handcrafting) {
            const itemKey =  entry[0];
            const {player, handCraftingStart, inventory, science} = this.props;
            let onClick = null;
            const hasPlayerScience = playerHasScience(science.sciences, entry[1].scienceRequired);
            const extraClasses = !hasPlayerScience ? 'notCraftable' : '';

            if (
                !player.handmining
                && !player.handcrafting
                && canAfford(inventory, entry[1].cost)
                && hasPlayerScience) {
                onClick = () => handCraftingStart({item: itemKey, itemCost:entry[1].cost});
            }

            return <ItemIcon
                key={itemKey}
                item={itemKey}
                amount={entry[1].resultAmount}
                onClick={onClick}
                showScienceRequired={!hasPlayerScience}
                extraClasses={extraClasses}
            />

        }
        return null;
    }

    render() {
        return (

            <div className="itembuttons">
                {Object.entries(itemRecipes).map(entry => this.renderHandCraftingButton(entry))}
            </div>

        );

    }
}

HandCrafting.propTypes = {
    player: PropTypes.object.isRequired,
    science: PropTypes.object.isRequired,
    inventory: PropTypes.array.isRequired,
    handCraftingStart: PropTypes.func.isRequired
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HandCrafting)
