import React from 'react';
import ProgressBar from "../ProgressBar/ProgressBar";
import {canAfford} from "../../helpers/InventoryHelper";
import {car, launchPad} from "../../gamedata/rocketSilo";
import ItemList from "../ItemList/ItemList";
import connect from "react-redux/es/connect/connect";
import {buildStepSilo} from "../../slices/rocketSiloSlice";

const mapStateToProps = state => ({
    inventory: state.inventory,
    rocketSilo: state.rocketSilo
});

const mapDispatchToProps = {buildStepSilo};

const RocketSiloOps = ({inventory, rocketSilo, buildStepSilo}) => {

    const handleBuildLaunchpadClick = () => {
        buildStepSilo({step:'launchpad'});
    }

    const handleBuildCarClick = () => {
        buildStepSilo({step:'car'});
    }

    const renderOpsCar = () => {

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

                        <button disabled={!canBuild} onClick={() => handleBuildCarClick()}>Build car</button>

                    </div>
                );
            }
        }
    }

    const renderOpsLaunchPad = () => {

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

                        <button disabled={!canBuild} onClick={() => handleBuildLaunchpadClick()}>Build launchpad</button>

                    </>
                );
            }
        }
    }

    return (
        <div className="rocketSiloOps">
            <h2>Rocket silo operations</h2>
            <p>Silo power: {rocketSilo.powered ? 'Yes' : 'No'}</p>
            {renderOpsLaunchPad()}
            {renderOpsCar()}
        </div>
    );
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RocketSiloOps)
