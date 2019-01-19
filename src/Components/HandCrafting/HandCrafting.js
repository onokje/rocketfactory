import React, {Component} from 'react';
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
import {itemRecipes} from "../../helpers/gameData";
import {canAfford} from "../../helpers/InventoryHelper";
import {handCraftingStart} from "../../actions/player";
import ItemIcon from "../ItemIcon/ItemIcon";
import "./Handcrafting.scss";

const mapStateToProps = state => ({
    player: state.player,
    inventory: state.inventory
});

const mapDispatchToProps = dispatch => ({
    handCraftingStart: (item, itemCost) => {
        dispatch(handCraftingStart(item, itemCost));
    }
});

class HandCrafting extends Component {


    renderHandCraftingButton(entry) {
        if (entry[1].handcrafting) {
            const itemKey =  entry[0];
            const {player, handCraftingStart, inventory} = this.props;
            let onClick = null;

            if (!player.handmining && !player.handcrafting && canAfford(inventory, entry[1].cost)) {
                onClick = () => handCraftingStart(itemKey, entry[1].cost);
            }

            return <ItemIcon
                item={itemKey}
                amount={entry[1].resultAmount}
                onClick={onClick}
            />

        }
        return null;
    }

    render() {
        const {player} = this.props;

        if (player.initialized && player.tab === 'handcrafting') {
            return (
                <div className="defaultContainer">
                    <h1>Handcrafting</h1>
                    <div className="handcraftingButtons">
                        {Object.entries(itemRecipes).map(entry => this.renderHandCraftingButton(entry))}
                    </div>
                </div>
            );
        }

        return null;

    }
}

HandCrafting.propTypes = {
    player: PropTypes.object.isRequired,
    inventory: PropTypes.array.isRequired,
    handCraftingStart: PropTypes.func.isRequired
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HandCrafting)
