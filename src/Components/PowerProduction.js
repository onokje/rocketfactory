import React, {Component} from 'react';
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
import {buildPowerPlant} from "../actions/power";
import {canAfford} from "../helpers/InventoryHelper";
import {coalPowerPlantPrice} from "../helpers/gameData";


const mapStateToProps = state => ({
    player: state.player,
    resources: state.resources,
    power: state.power
});

const mapDispatchToProps = dispatch => ({
    buildPowerPlant: (powerType) => {
        dispatch(buildPowerPlant(powerType));
    },

});

class ResourceProduction extends Component {

    buildCoalPowerPlant = () => {
        const {resources, buildPowerPlant} = this.props;

        if (canAfford(coalPowerPlantPrice, resources)) {
            buildPowerPlant('coal');
        }


    };

    render() {
        const {player, resources, power} = this.props;

        if (player.initialized && player.tab === 'power') {
            return (
                <div className="defaultContainer">
                    <h1>Power production</h1>
                    <div className="simpleDivider">
                        <h2>Construct new coal Power plant</h2>
                        <div>Current Iron: <b>{resources.iron}</b></div>
                        <div>Current number of coal power plants: <b>{power.coalPowerPlants}</b></div>
                        <button onClick={this.buildCoalPowerPlant} >Build coal power plant!</button>
                    </div>

                </div>
            );
        }

        return null;

    }
}

ResourceProduction.propTypes = {
    player: PropTypes.object.isRequired,
    resources: PropTypes.object.isRequired,
    power: PropTypes.object.isRequired,
    buildPowerPlant: PropTypes.func.isRequired
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ResourceProduction)
