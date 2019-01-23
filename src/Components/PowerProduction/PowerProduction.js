import React, {Component} from 'react';
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
import {buildPowerPlant} from "../../actions/power";
import {canAfford} from "../../helpers/InventoryHelper";
import {powerPlantPrices} from "../../helpers/gameData";
import ProductionCost from "../ProductionCost/ProductionCost";
import uuidv4 from "uuid/v4";
import PowerPlant from "../PowerPlant/PowerPlant";


const mapStateToProps = state => ({
    player: state.player,
    inventory: state.inventory,
    power: state.power
});

const mapDispatchToProps = dispatch => ({
    buildPowerPlant: (techType, id) => {
        dispatch(buildPowerPlant(techType, id));
    },

});

class PowerProduction extends Component {

    buildPowerPlant(techType) {
        const {inventory, buildPowerPlant} = this.props;

        if (canAfford(inventory, powerPlantPrices[techType])) {
            const uuid = uuidv4();

            buildPowerPlant(techType, uuid);
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
                        <h2>Build coal Power plant</h2>
                        <ProductionCost items={powerPlantPrices['coal']}/>
                        <button onClick={() => this.buildPowerPlant('coal')} >Build coal power plant!</button>
                    </div>
                    <div className="simpleDivider">
                        <h2>Build oil power plant</h2>
                        <ProductionCost items={powerPlantPrices['oil']}/>
                        <button onClick={() => this.buildPowerPlant('oil')} >Build oil power plant</button>
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
