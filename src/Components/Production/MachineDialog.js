import React, {Component} from 'react';
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
import {machines} from "../../gamedata/machines";
import MachineState from "../MachineState/MachineState";
import {sellMachine, toggleMachine} from "../../actions/production";
import {itemRecipes} from "../../gamedata/items";
import ProgressBar from "../ProgressBar/ProgressBar";
import {playerHasScience} from "../../helpers/ScienceHelper";


const mapStateToProps = state => ({
    production: state.production,
    science: state.science
});

const mapDispatchToProps = dispatch => ({
    toggleMachine: (id, on, nextItem) => {
        dispatch(toggleMachine(id, on, nextItem));
    },
    sellMachine: (techType, id) => {
        dispatch(sellMachine(techType, id));
    },
});

class MachineDialog extends Component {

    getMachine() {
        const {production} = this.props;

        if (!production.machineDialogOpen) {
            return false;
        }
        return production.machines.find(item => item.id === production.machineDialogMachineId);
    }

    getRecipes() {
        const { science} = this.props;
        const machine = this.getMachine();
        const machineData = machines[machine.techType];

        const recipes = [];
        for (let itemKey in itemRecipes) {
            if (itemRecipes.hasOwnProperty(itemKey)
                && itemRecipes[itemKey].type === machineData.type
                && playerHasScience(science.sciences, itemRecipes[itemKey].scienceRequired)) {
                recipes.push(itemKey);

            }
        }

        return recipes;
    }

    handleChangeRecipe = (event) => {
        const {toggleMachine} = this.props;
        const machine = this.getMachine();
        toggleMachine(machine.id, machine.on, event.target.value);
    };

    toggleMachine = () => {
        const {toggleMachine} = this.props;
        const machine = this.getMachine();
        if (machine.nextItem) {
            toggleMachine(machine.id, !machine.on, machine.nextItem);
        }

    };

    sellMachine() {
        const {sellMachine} = this.props;
        const machine = this.getMachine();
        sellMachine(machine.techType, machine.id)
    }

    render() {
        const machine = this.getMachine();
        if (!machine) {
            return null;
        }

        const machineData = machines[machine.techType];
        const completedPercentage = machine.on ? (machine.progressTicks * 100 / machine.ticksCost) : 0;

        return <div>
            <div className="machineName">{machineData.name}</div>
            <MachineState on={machine.on} powered={machine.powered} running={machine.running}/>
            <button onClick={this.toggleMachine}>Turn {machine.on ? 'OFF' : 'ON'}</button>
            <div>Select Recipe:
                <select value={machine.nextItem} onChange={this.handleChangeRecipe}>
                    {this.getRecipes().map(option => (<option key={option} value={option}>{option}</option>))}
                </select>
            </div>
            <div>Currentl progress: {machine.currentItem}<br/>
                <ProgressBar completedPercentage={completedPercentage}/>
            </div>
            <div className="sellMachine">
                <button onClick={() => this.sellMachine()}>Sell</button>
            </div>
        </div>
    }
}

MachineDialog.propTypes = {
    production: PropTypes.object.isRequired,
    science: PropTypes.object.isRequired,
    toggleMachine: PropTypes.func.isRequired,
    sellMachine: PropTypes.func.isRequired,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MachineDialog)
