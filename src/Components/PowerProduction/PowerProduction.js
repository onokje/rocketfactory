import React, {Component} from 'react';
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
import {buildPowerPlant} from "../../actions/power";
import {canAfford} from "../../helpers/InventoryHelper";
import {powerPlantPrices} from "../../gamedata/machines";
import ItemList from "../ItemList/ItemList";
import uuidv4 from "uuid/v4";
import PowerPlant from "../PowerPlant/PowerPlant";
import {playerHasScience} from "../../helpers/ScienceHelper";

const mapStateToProps = state => ({
    player: state.player,
    science: state.science,
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
        const {player, power, science} = this.props;

        const totalPowerplants = power.powerPlants.length;


        if (player.initialized && player.tab === 'power') {

            if (!playerHasScience(science.sciences, 'electricity')){
                return <div className="defaultContainer">
                    <h1>Power production</h1>
                    <p>Research electricity first.</p>
                </div>
            }

            return (
                <div className="defaultContainer">
                    <h1>Power production</h1>
                    <div className="simpleDivider">
                        <h2>Build coal Power plant</h2>
                        <ItemList items={powerPlantPrices['coal']}/>
                        <button onClick={() => this.buildPowerPlant('coal')} >Build coal power plant!</button>
                    </div>
                    <div className="simpleDivider">
                        <h2>Build oil power plant</h2>
                        <ItemList items={powerPlantPrices['oil']}/>
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
    science: PropTypes.object.isRequired,
    inventory: PropTypes.array.isRequired,
    power: PropTypes.object.isRequired,
    buildPowerPlant: PropTypes.func.isRequired
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PowerProduction)
