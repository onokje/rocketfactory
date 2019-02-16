import React, {Component} from 'react';
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
import {buildPowerPlant} from "../../actions/power";
import {canAfford} from "../../helpers/InventoryHelper";
import {powerPlants} from "../../gamedata/machines";
import uuidv4 from "uuid/v4";
import PowerPlant from "../PowerPlant/PowerPlant";
import {playerHasScience} from "../../helpers/ScienceHelper";
import "./PowerProduction.scss";
import MachineBuildOption from "../MachineBuildOptions/MachineBuildOption";

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

    handleBuildPowerPlantClick(buildOption) {
        const {buildPowerPlant} = this.props;

        if (buildOption.hasScience && buildOption.canAfford) {
            const uuid = uuidv4();

            buildPowerPlant(buildOption.machineKey, uuid);
        } else {
            console.log('you cannot afford a power plant!');
        }

    };

    getBuildOptions() {
        const {science, inventory} = this.props;
        const options = [];

        for (let plant in powerPlants) {
            if (powerPlants.hasOwnProperty(plant)) {
                options.push({
                    machineKey: plant,
                    machineData: powerPlants[plant],
                    hasScience: playerHasScience(science.sciences, powerPlants[plant].scienceRequired),
                    canAfford: canAfford(inventory, powerPlants[plant].cost)
                });
            }
        }
        return options;
    }

    render() {
        const {player, power} = this.props;

        const totalPowerplants = power.powerPlants.length;


        if (player.initialized && player.tab === 'power') {

            return (
                <div className="defaultContainer powerContainer">
                    <div className="powerMainPanel">
                        <h1>Power production</h1>
                        {power.powerPlants.map(powerplant => (<PowerPlant key={powerplant.id} powerplant={powerplant}/>))}

                        {!totalPowerplants ? (<div>You do not have any power plants</div>) : ''}
                    </div>
                    <div className="powerSidePanel">
                        <h2>build options:</h2>
                        <div className="buildOptions">
                            {this.getBuildOptions().map(item => <MachineBuildOption
                                key={item.machineKey}
                                buildOption={item}
                                machineType="power"
                                onClick={() => this.handleBuildPowerPlantClick(item)}
                            />)}
                        </div>
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
