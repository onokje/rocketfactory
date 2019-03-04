import React, {Component} from 'react';
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";

import {canAfford} from "../../helpers/InventoryHelper";
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

class RocketSilo extends Component {

    handleBuildSiloClick(){

    }

    handleBuildLaunchpadClick(){

    }

    handleBuildCarClick(){

    }


    render() {
        const {player, power} = this.props;

        const totalPowerplants = power.powerPlants.length;


        if (player.initialized && player.tab === 'power') {

            return (
                <div className="defaultContainer rocketSiloContainer">
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

RocketSilo.propTypes = {
    player: PropTypes.object.isRequired,
    science: PropTypes.object.isRequired,
    inventory: PropTypes.array.isRequired,
    power: PropTypes.object.isRequired,
    buildPowerPlant: PropTypes.func.isRequired
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RocketSilo)
