import React, {Component} from 'react';
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
import {canAfford} from "../../helpers/InventoryHelper";
import {powerPlants} from "../../gamedata/machines";
import { v4 as uuidv4 } from 'uuid';
import PowerPlant from "../PowerPlant/PowerPlant";
import {playerHasResearch} from "../../helpers/ResearchHelper";
import "./PowerProduction.scss";
import MachineBuildOption from "../MachineBuildOptions/MachineBuildOption";
import {buildPowerPlant} from "../../slices/powerSlice";

const mapStateToProps = state => ({
    player: state.player,
    research: state.research,
    inventory: state.inventory,
    power: state.power
});

const mapDispatchToProps = {buildPowerPlant};

class PowerProduction extends Component {

    handleBuildPowerPlantClick(buildOption) {
        const {buildPowerPlant} = this.props;

        if (buildOption.hasResearch && buildOption.canAfford) {
            const uuid = uuidv4();

            buildPowerPlant({techType: buildOption.machineKey, id:uuid});
        } else {
            console.log('you cannot afford a power plant!');
        }

    };

    getBuildOptions() {
        const {research, inventory} = this.props;
        const options = [];

        for (let plant in powerPlants) {
            if (powerPlants.hasOwnProperty(plant)) {
                options.push({
                    machineKey: plant,
                    machineData: powerPlants[plant],
                    hasResearch: playerHasResearch(research.researchComplete, powerPlants[plant].researchRequired),
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
    research: PropTypes.object.isRequired,
    inventory: PropTypes.array.isRequired,
    power: PropTypes.object.isRequired,
    buildPowerPlant: PropTypes.func.isRequired
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PowerProduction)
