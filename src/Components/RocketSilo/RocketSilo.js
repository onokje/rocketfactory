import React, {Component} from 'react';
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";

import {playerHasResearch} from "../../helpers/ResearchHelper";
import RocketSiloRocket from "./RocketSiloRocket";
import RocketSiloCheckList from "./RocketSiloCheckList";
import ProgressBar from "../ProgressBar/ProgressBar";
import ItemList from "../ItemList/ItemList";
import {rocketSiloData} from "../../gamedata/rocketSilo";
import {canAfford} from "../../helpers/InventoryHelper";
import "./rocketsilo.scss";
import RocketSiloFuel from "./RocketSiloFuel";
import {buildStepSilo, launchRocket} from "../../slices/rocketSiloSlice";
import RocketSiloOps from "./RocketSiloOps";
import ResearchItem from "../Research/ResearchItem";
import RocketLaunch from "./RocketLaunch";


const mapStateToProps = state => ({
    player: state.player,
    research: state.research,
    inventory: state.inventory,
    rocketSilo: state.rocketSilo
});

const mapDispatchToProps = {buildStepSilo, launchRocket};

class RocketSilo extends Component {

    handleBuildSiloClick() {
        const {buildStepSilo} = this.props;
        buildStepSilo({step:'silo'});
    }

    render() {
        const {player, research, inventory, rocketSilo, launchRocket} = this.props;

        if (player.initialized && player.tab === 'silo') {

            if (rocketSilo.checklist.silo) {
                // silo building is done

                const {silo, rocket, launchpad, fuel, payload} = rocketSilo.checklist;

                if (silo && rocket && launchpad && fuel && payload) {
                    return (
                        <div className="defaultContainer rocketSiloContainer">
                            <RocketSiloOps />
                            <RocketSiloCheckList checklist={rocketSilo.checklist}/>
                            <RocketLaunch launchRocket={launchRocket} rocketSilo={rocketSilo} />

                        </div>
                    );
                }

                return (
                    <div className="defaultContainer rocketSiloContainer">
                        <RocketSiloOps />
                        <RocketSiloCheckList checklist={rocketSilo.checklist}/>

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
                    const hasResearch = playerHasResearch(research.researchComplete, rocketSiloData.researchRequired);
                    const canBuild = hasResearch && canAfford(inventory, rocketSiloData.cost);

                    return (
                        <div className="defaultContainer rocketSiloContainer">
                            <div className="rocketSiloBuildSilo">
                                <div>
                                    <p>This is the rocket silo screen. You need to build your rocket silo first before you can start building your rocket.</p>

                                    <ItemList items={rocketSiloData.cost} label="cost to build:"/>

                                    <button disabled={!canBuild} onClick={() => this.handleBuildSiloClick()}>Build silo</button>

                                    {hasResearch ? '' : <>
                                        <p>Missing research:</p>
                                        <ResearchItem
                                            key={rocketSiloData.researchRequired}
                                            researchId={rocketSiloData.researchRequired}
                                            extraClass={playerHasResearch(research.researchComplete, rocketSiloData.researchRequired) ? 'researchItemGreen' : 'researchItemRed'}
                                        />
                                        </>
                                    }
                                </div>

                            </div>


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
    research: PropTypes.object.isRequired,
    inventory: PropTypes.array.isRequired,
    rocketSilo: PropTypes.object.isRequired,
    buildStepSilo: PropTypes.func.isRequired
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RocketSilo)
