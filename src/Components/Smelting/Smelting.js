import React, {Component} from 'react';
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";

import {canAfford} from "../../helpers/InventoryHelper";

import ProductionCost from "../ProductionCost/ProductionCost";
import {buildFurnace} from "../../actions/smelting";
import {furnacePrices} from "../../helpers/gameData";
import Furnace from "../Furnace/Furnace";
import uuidv4 from "uuid/v4";

const mapStateToProps = state => ({
    player: state.player,
    inventory: state.inventory,
    power: state.power,
    smelting: state.smelting
});

const mapDispatchToProps = dispatch => ({
    buildFurnace: (furnaceType, id) => {
        dispatch(buildFurnace(furnaceType, id));
    },

});

class Smelting extends Component {

    buildFurnace(techType) {
        const {inventory, buildFurnace} = this.props;

        const itemCost = furnacePrices[techType].slice(0);

        if (canAfford(inventory, itemCost)) {
            const uuid = uuidv4();
            buildFurnace(techType, uuid);
        } else {
            console.log('you cannot afford a stone furnace!');
        }
    };

    render() {
        const {player, smelting} = this.props;

        const totalFurnaces = smelting.furnaces.length;

        if (player.initialized && player.tab === 'smelting') {
            return (
                <div className="defaultContainer">
                    <h1>Smelting</h1>
                    <div className="simpleDivider">
                        <h2>Construct new stone furnace</h2>
                        <ProductionCost items={furnacePrices['stone']}/>
                        <button onClick={() => this.buildFurnace('stone')} >Build stone furnace!</button>
                    </div>
                    <div className="simpleDivider">
                        <h2>Construct new steel furnace</h2>
                        <ProductionCost items={furnacePrices['steel']}/>
                        <button onClick={() => this.buildFurnace('steel')} >Build steel furnace!</button>
                    </div>
                    <div className="simpleDivider">
                        <h2>Construct new electric furnace</h2>
                        <ProductionCost items={furnacePrices['electric']}/>
                        <button onClick={() => this.buildFurnace('electric')} >Build electric furnace!</button>
                    </div>
                    <div className="simpleDivider">
                        <h2>Furnaces:</h2>
                        {smelting.furnaces.map(furnace => (<Furnace key={furnace.id} furnace={furnace}/>))}

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
