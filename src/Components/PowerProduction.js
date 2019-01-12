import React, {Component} from 'react';
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
import {buildPowerPlant} from "../actions/power";
import {canAfford} from "../helpers/InventoryHelper";
import {coalPowerPlantPrice} from "../helpers/gameData";
import ProductionCost from "./ProductionCost";
import uuidv4 from "uuid/v4";
import PowerPlant from "./PowerPlant";


const mapStateToProps = state => ({
    player: state.player,
    inventory: state.inventory,
    power: state.power
});

const mapDispatchToProps = dispatch => ({
    buildPowerPlant: (powerType, id) => {
        dispatch(buildPowerPlant(powerType, id));
    },

});

class PowerProduction extends Component {

    buildCoalPowerPlant = () => {
        const {inventory, buildPowerPlant} = this.props;

        if (canAfford(inventory, coalPowerPlantPrice)) {
            const uuid = uuidv4();

            buildPowerPlant('coal', uuid);
        } else {
            console.log('you cannot afford a power plant!');
        }


    };

    render() {
        const {player, power} = this.props;

        const totalPowerplants = power.powerPlants.length;

        if (player.initialized && player.tab === 'power') {
            return (
                <div className="defaultContainer">
                    <h1>Power production</h1>
                    <div className="simpleDivider">
                        <h2>Construct new coal Power plant</h2>
                        <ProductionCost items={coalPowerPlantPrice}/>
                        <button onClick={this.buildCoalPowerPlant} >Build coal power plant!</button>
                    </div>
                    <div className="simpleDivider">
                        <h2>Power plants:</h2>
                        {power.powerPlants.map(powerplant => (<PowerPlant key={powerplant.id} powerplant={powerplant}/>))}

                        {!totalPowerplants ? (<div>You do not have any power plants</div>) : ''}
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
