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

class Machine extends Component {

    getRecipes() {
        const {machine, science} = this.props;
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
        const {machine, toggleMachine} = this.props;
        toggleMachine(machine.id, machine.on, event.target.value);
    };

    toggleMachine = () => {
        const {machine, toggleMachine} = this.props;
        if (machine.nextItem) {
            toggleMachine(machine.id, !machine.on, machine.nextItem);
        }

    };

    sellMachine() {
        const {machine, sellMachine} = this.props;
        sellMachine(machine.techType, machine.id)
    }

    render() {
        const {machine} = this.props;
        const machineData = machines[machine.techType];
        const completedPercentage = machine.on ? (machine.progressTicks * 100 / machine.ticksCost) : 0;

        return <li key={machine.id}>
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
        </li>
    }
}

Machine.propTypes = {
    science: PropTypes.object.isRequired,
    machine: PropTypes.object.isRequired,
    toggleMachine: PropTypes.func.isRequired,
    sellMachine: PropTypes.func.isRequired,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Machine)
