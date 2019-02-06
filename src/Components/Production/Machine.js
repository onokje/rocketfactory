import React, {Component} from 'react';
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
import {machines} from "../../gamedata/machines";
import MachineState from "../MachineState/MachineState";
import {openMachineDialog, toggleMachine} from "../../actions/production";
import ProgressBar from "../ProgressBar/ProgressBar";
import ItemIcon from "../ItemIcon/ItemIcon";
import {itemRecipes} from "../../gamedata/items";
import {canAfford} from "../../helpers/InventoryHelper";

const mapStateToProps = state => ({
    science: state.science,
    inventory: state.inventory
});

const mapDispatchToProps = dispatch => ({
    toggleMachine: (id, on, nextItem) => {
        dispatch(toggleMachine(id, on, nextItem));
    },
    openMachineDialog: (id) => {
        dispatch(openMachineDialog(id));
    }
});

class Machine extends Component {

    toggleMachine = () => {
        const {machine, toggleMachine} = this.props;
        if (machine.nextItem) {
            toggleMachine(machine.id, !machine.on, machine.nextItem);
        }
    };

    render() {
        const {machine, openMachineDialog, inventory} = this.props;
        const machineData = machines[machine.techType];
        const completedPercentage = machine.on ? (machine.progressTicks * 100 / machine.ticksCost) : 0;
        let missingItems = false;
        let missingFuel = false;

        if (!machine.running && machine.nextItem) {
            const recipe = itemRecipes[machine.nextItem];
            if (!canAfford(inventory, recipe.cost)) {
                missingItems = true;
            }
            if (!canAfford(inventory, machineData.fuelCost)) {
                missingFuel = true;
            }
        }

        return <li key={machine.id} onClick={() => openMachineDialog(machine.id)}>
            <div className="machineName">{machineData.name}</div>
            <MachineState on={machine.on} powered={machine.powered} running={machine.running} missingItems={missingItems} missingFuel={missingFuel}/>
            <button onClick={this.toggleMachine}>Turn {machine.on ? 'OFF' : 'ON'}</button>

            <div>
                <ItemIcon item={machine.currentItem || machine.nextItem} />
                <ProgressBar completedPercentage={completedPercentage}/>
            </div>
        </li>
    }
}

Machine.propTypes = {
    science: PropTypes.object.isRequired,
    inventory: PropTypes.object.isRequired,
    machine: PropTypes.object.isRequired,
    toggleMachine: PropTypes.func.isRequired,
    openMachineDialog: PropTypes.func.isRequired,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Machine)
