import React, {Component} from 'react';
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
import {machines} from "../../gamedata/machines";
import ProgressBar from "../ProgressBar/ProgressBar";
import ItemIcon from "../ItemIcon/ItemIcon";
import {itemRecipes} from "../../gamedata/items";
import {canAfford, multiplyItemsInItemsArray} from "../../helpers/InventoryHelper";
import {machineIcons} from "./machineIcons";
import MachineStateV2 from "../MachineState/MachineStateV2";
import {getMachineState} from "../../helpers/machineStateHelper";
import {openMachineDialog} from "../../slices/productionSlice";

const mapStateToProps = state => ({
    inventory: state.inventory
});

const mapDispatchToProps = {openMachineDialog};

class Machine extends Component {

    render() {
        const {machine, openMachineDialog, inventory} = this.props;
        const machineData = machines[machine.techType];
        const completedPercentage = machine.on ? (machine.progressTicks * 100 / machine.ticksCost) : 0;
        let missingItems = false;
        let missingFuel = false;

        if (!machine.running && machine.nextItem) {
            const recipe = itemRecipes[machine.nextItem];
            if (!canAfford(inventory, multiplyItemsInItemsArray(recipe.cost, machineData.resultMultiplier))) {
                missingItems = true;
            }
            if (!canAfford(inventory, machineData.fuelCost)) {
                missingFuel = true;
            }
        }
        const styles = {};
        styles.backgroundImage = `url(${machineIcons[machine.techType]})`;

        return <li key={machine.id} onClick={() => openMachineDialog({id:machine.id})}>
            <div className="machineImage" style={styles}>
                {machine.currentItem || machine.nextItem ? <ItemIcon extraClasses="itemIcon-trans" item={machine.currentItem || machine.nextItem} /> : null}
            </div>
            <MachineStateV2
                stateClass={getMachineState(machineData, machine, missingItems, missingFuel)}
                styles={{position: 'absolute', top: 10, left: 10}}
            />
            <div>
                <ProgressBar completedPercentage={completedPercentage}/>
            </div>
        </li>
    }
}

Machine.propTypes = {
    inventory: PropTypes.array.isRequired,
    machine: PropTypes.object.isRequired,
    openMachineDialog: PropTypes.func.isRequired,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Machine)
