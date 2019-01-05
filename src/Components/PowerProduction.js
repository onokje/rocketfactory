import React, {Component} from 'react';
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
import {buildPowerPlant} from "../actions/power";
import {canAfford} from "../helpers/InventoryHelper";
import {coalPowerPlantPrice} from "../helpers/gameData";
import ProductionCost from "./ProductionCost";


const mapStateToProps = state => ({
    player: state.player,
    inventory: state.inventory,
    power: state.power
});

const mapDispatchToProps = dispatch => ({
    buildPowerPlant: (powerType) => {
        dispatch(buildPowerPlant(powerType));
    },

});

class PowerProduction extends Component {

    buildCoalPowerPlant = () => {
        const {inventory, buildPowerPlant} = this.props;

        if (canAfford(inventory, coalPowerPlantPrice)) {
            buildPowerPlant('coal');
        } else {
            console.log('you cannot afford a power plant!');
        }


    };

    render() {
        const {player, power} = this.props;

        if (player.initialized && player.tab === 'power') {
            return (
                <div className="defaultContainer">
                    <h1>Power production</h1>
                    <div className="simpleDivider">
                        <h2>Construct new coal Power plant</h2>
                        <ProductionCost priceObject={coalPowerPlantPrice}/>
                        <div>Current number of coal power plants: <b>{power.coalPowerPlants}</b></div>
                        <button onClick={this.buildCoalPowerPlant} >Build coal power plant!</button>
                    </div>

                </div>
            );
        }

        return null;

    }
}

PowerProduction.propTypes = {
    player: PropTypes.object.isRequired,
    inventory: PropTypes.array.isRequired,
    power: PropTypes.object.isRequired,
    buildPowerPlant: PropTypes.func.isRequired
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PowerProduction)
