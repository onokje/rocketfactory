import React, {Component} from 'react';
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";

import {playerHasScience} from "../../helpers/ScienceHelper";
import RocketSiloRocket from "./RocketSiloRocket";
import RocketSiloCheckList from "./RocketSiloCheckList";
import ProgressBar from "../ProgressBar/ProgressBar";
import ItemList from "../ItemList/ItemList";
import {rocketSiloData, launchPad, car} from "../../gamedata/rocketSilo";
import {canAfford} from "../../helpers/InventoryHelper";
import "./rocketsilo.scss";
import RocketSiloFuel from "./RocketSiloFuel";
import {buildStepSilo} from "../../slices/rocketSiloSlice";


const mapStateToProps = state => ({
    player: state.player,
    science: state.science,
    inventory: state.inventory,
    rocketSilo: state.rocketSilo
});

const mapDispatchToProps = {buildStepSilo};

class RocketSilo extends Component {

    handleBuildSiloClick(){
        const {buildStepSilo} = this.props;
        buildStepSilo({step:'silo'});
    }

    handleBuildLaunchpadClick(){
        const {buildStepSilo} = this.props;
        buildStepSilo({step:'launchpad'});
    }

    handleBuildCarClick(){
        const {buildStepSilo} = this.props;
        buildStepSilo({step:'car'});
    }

    renderOpsCar() {
        const {inventory, rocketSilo} = this.props;

        if (!rocketSilo.checklist.payload) {
            if (rocketSilo.buildingNow === 'car') {
                // launchpad is building now, show progress
                const completedPercentage = rocketSilo.siloBuildProgressTicks * 100 / rocketSilo.siloBuildProgressTotal;
                return (
                    <div>
                        <p>Payload is building. progress:</p>
                        <ProgressBar completedPercentage={completedPercentage} />
                    </div>
                );

            } else {
                const canBuild = canAfford(inventory, car.cost);

                return (
                    <div>
                        <p>Build cherry-red electric sportscar (payload):</p>

                        <ItemList items={car.cost} label="cost to build:"/>

                        <button disabled={!canBuild} onClick={() => this.handleBuildCarClick()}>Build car</button>

                    </div>
                );
            }
        }
    }

    renderOpsLaunchPad() {
        const {inventory, rocketSilo} = this.props;

        if (!rocketSilo.checklist.launchpad) {
            if (rocketSilo.buildingNow === 'launchpad') {
                // launchpad is building now, show progress
                const completedPercentage = rocketSilo.siloBuildProgressTicks * 100 / rocketSilo.siloBuildProgressTotal;
                return (
                    <>
                        <p>Launchpad is building. progress:</p>
                        <ProgressBar completedPercentage={completedPercentage} />
                    </>
                );

            } else {
                const canBuild = canAfford(inventory, launchPad.cost);

                return (
                    <>
                        <p>Build launchpad:</p>

                        <ItemList items={launchPad.cost} label="cost to build:"/>

                        <button disabled={!canBuild} onClick={() => this.handleBuildLaunchpadClick()}>Build launchpad</button>

                    </>
                );
            }
        }
    }

    renderOps() {
        return (
            <div className="rocketSiloOps">
                <h2>Rocket silo operations</h2>
                {this.renderOpsLaunchPad()}
                {this.renderOpsCar()}
            </div>
        );
    }


    render() {
        const {player, science, inventory, rocketSilo} = this.props;


        if (player.initialized && player.tab === 'silo') {

            if (rocketSilo.checklist.silo) {
                // silo building is done
                return (
                    <div className="defaultContainer rocketSiloContainer">
                        {this.renderOps()}
                        <RocketSiloCheckList rocketSilo={rocketSilo}/>

                        <RocketSiloRocket rocketSilo={rocketSilo}/>
                        <RocketSiloFuel rocketSilo={rocketSilo} />

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

                            <button disabled={!canBuild} onClick={() => this.handleBuildSiloClick()}>Build silo</button>

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
    buildStepSilo: PropTypes.func.isRequired
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RocketSilo)
