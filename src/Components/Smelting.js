import React, {Component} from 'react';
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";

import {canAfford} from "../helpers/InventoryHelper";

import ProductionCost from "./ProductionCost";
import {buildFurnace} from "../actions/smelting";
import {stoneFurnacePrice} from "../helpers/gameData";
import Furnace from "./Furnace";
import uuidv4 from "uuid/v4";

const mapStateToProps = state => ({
    player: state.player,
    inventory: state.inventory,
    power: state.power,
    smelting: state.smelting
});

const mapDispatchToProps = dispatch => ({
    buildFurnace: (furnaceType, name, id) => {
        dispatch(buildFurnace(furnaceType, name, id));
    },

});

class Smelting extends Component {

    buildStoneFurnace = () => {
        const {inventory, buildFurnace, smelting} = this.props;

        if (canAfford(inventory, stoneFurnacePrice)) {
            const uuid = uuidv4();
            const name = 'Stone furnace ' + (smelting.stoneFurnaces.length + 1);
            buildFurnace('stone', name, uuid);
        } else {
            console.log('you cannot afford a stone furnace!');
        }
    };

    render() {
        const {player, smelting} = this.props;

        const totalFurnaces = smelting.stoneFurnaces.length;

        if (player.initialized && player.tab === 'smelting') {
            return (
                <div className="defaultContainer">
                    <h1>Smelting</h1>
                    <div className="simpleDivider">
                        <h2>Construct new stone furnace</h2>
                        <ProductionCost priceObject={stoneFurnacePrice}/>
                        <button onClick={this.buildStoneFurnace} >Build stone furnace!</button>
                    </div>
                    <div className="simpleDivider">
                        <h2>Furnaces:</h2>
                        {smelting.stoneFurnaces.map(furnace => (<Furnace key={furnace.id} furnace={furnace}/>))}

                        {!totalFurnaces ? (<div>You do not have any furnaces</div>) : ''}
                    </div>

                </div>
            );
        }

        return null;

    }
}

Smelting.propTypes = {
    player: PropTypes.object.isRequired,
    inventory: PropTypes.array.isRequired,
    power: PropTypes.object.isRequired,
    buildFurnace: PropTypes.func.isRequired
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Smelting)
