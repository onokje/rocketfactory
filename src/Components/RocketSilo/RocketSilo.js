import React, {Component} from 'react';
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";

import {playerHasScience} from "../../helpers/ScienceHelper";
import RocketSiloRocket from "./RocketSiloRocket";
import RocketSiloCheckList from "./RocketSiloCheckList";
import ProgressBar from "../ProgressBar/ProgressBar";
import ItemList from "../ItemList/ItemList";
import {rocketSiloData} from "../../gamedata/rocketSilo";
import {canAfford} from "../../helpers/InventoryHelper";
import {buildStepSilo} from "../../actions/rocketSilo";


const mapStateToProps = state => ({
    player: state.player,
    science: state.science,
    inventory: state.inventory,
    rocketSilo: state.rocketSilo
});

const mapDispatchToProps = dispatch => ({
    buildStepSilo: (step) => {
        dispatch(buildStepSilo(step));
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
        const {player, science, inventory, rocketSilo} = this.props;


        if (player.initialized && player.tab === 'silo') {

            if (rocketSilo.checklist.silo) {
                // silo building is done
                return (
                    <div className="defaultContainer rocketSiloContainer">
                        <RocketSiloRocket rocketSilo={rocketSilo}/>
                        <RocketSiloCheckList rocketSilo={rocketSilo}/>

                    </div>
                );
            } else {
                // silo building is not done yet
                if (rocketSilo.buildingNow === 'silo') {
                    // silo is under construction. show progress

                    const completedPercentage = rocketSilo.siloBuildProgressTicks * 100 / rocketSilo.siloBuildProgressTotal;

                    return (
                        <div className="defaultContainer rocketSiloContainer">
                            <p>Silo is building. progress:</p>
                            <ProgressBar completedPercentage={completedPercentage} />

                        </div>
                    );
                } else {
                    // silo is not yet under construction
                    const hasScience = playerHasScience(science.sciences, rocketSiloData.scienceRequired);
                    const canBuild = hasScience && canAfford(inventory, rocketSiloData.cost);

                    return (
                        <div className="defaultContainer rocketSiloContainer">
                            <p>Build silo:</p>

                            <ItemList items={rocketSiloData.cost} label="cost to build:"/>

                            <button disabled={!canBuild}>Build silo</button>

                        </div>
                    );
                }
            }


        }

        return null;

    }
}

RocketSilo.propTypes = {
    player: PropTypes.object.isRequired,
    science: PropTypes.object.isRequired,
    inventory: PropTypes.array.isRequired,
    rocketSilo: PropTypes.object.isRequired,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RocketSilo)
