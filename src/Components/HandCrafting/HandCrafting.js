import React, {Component} from 'react';
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
import {itemRecipes} from "../../helpers/gameData";
import {canAfford} from "../../helpers/InventoryHelper";
import {handCraftingStart} from "../../actions/player";


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
            let buttonDisabled = false;
            if (player.handmining || player.handcrafting) {
                buttonDisabled = true;
            }
            if (!canAfford(inventory, entry[1].cost)) {
                buttonDisabled = true;

            }

            return <button key={itemKey} disabled={buttonDisabled}
                           onClick={() => handCraftingStart(itemKey, entry[1].cost)}>{itemKey}</button>;
        }
        return null;
    }

    render() {
        const {player} = this.props;

        if (player.initialized && player.tab === 'handcrafting') {
            return (
                <div className="defaultContainer">
                    <h1>Handcrafting</h1>
                    {Object.entries(itemRecipes).map(entry => this.renderHandCraftingButton(entry))}

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
