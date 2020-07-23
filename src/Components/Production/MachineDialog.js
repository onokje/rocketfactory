import React, {Component} from 'react';
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
import {machines} from "../../gamedata/machines";
import {itemRecipes} from "../../gamedata/items";
import ProgressBar from "../ProgressBar/ProgressBar";
import {playerHasScience} from "../../helpers/ScienceHelper";
import "./MachineDialog.scss";
import ItemIcon from "../ItemIcon/ItemIcon";
import ItemRecipe from "../ItemRecipe/ItemRecipe";
import {canAfford} from "../../helpers/InventoryHelper";
import {
    closeMachineDialog,
    closeMachineDialogSelector,
    openMachineDialogSelector,
    sellMachine,
    toggleMachine
} from "../../slices/productionSlice";

const mapStateToProps = state => ({
    production: state.production,
    inventory: state.inventory,
    science: state.science
});

const mapDispatchToProps = {
    closeMachineDialog,
    closeMachineDialogSelector,
    openMachineDialogSelector,
    sellMachine,
    toggleMachine
};

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
        for (let recipeKey in itemRecipes) {
            if (itemRecipes.hasOwnProperty(recipeKey) && itemRecipes[recipeKey].type === machineData.type) {
                recipes.push({
                    recipeKey,
                    recipe: itemRecipes[recipeKey],
                    hasScience: playerHasScience(science.sciences, itemRecipes[recipeKey].scienceRequired)
                });
            }
        }

        return recipes;
    }

    toggleMachine = () => {
        const {toggleMachine} = this.props;
        const machine = this.getMachine();
        if (machine.nextItem) {
            toggleMachine({id: machine.id, on:!machine.on, nextItem:machine.nextItem});
        }
    };

    sellMachine() {
        const {sellMachine} = this.props;
        const machine = this.getMachine();
        sellMachine({id: machine.id});
    }

    renderRecipeButton(recipe) {
        const machine = this.getMachine();
        const {science, toggleMachine} = this.props;

        let onClick = null;
        const hasPlayerScience = playerHasScience(science.sciences, recipe.recipe.scienceRequired);
        let extraClasses = !hasPlayerScience ? 'notCraftable' : '';
        extraClasses += machine.nextItem === recipe.recipeKey ? ' itemSelected' : '';

        if (hasPlayerScience) {
            onClick = () => toggleMachine(machine.id, machine.on, recipe.recipeKey);
        }

        return <ItemIcon
            key={recipe.recipeKey}
            item={recipe.recipeKey}
            amount={recipe.recipe.resultAmount}
            onClick={onClick}
            showScienceRequired={!hasPlayerScience}
            extraClasses={extraClasses}
        />

    }

    renderRecipeSelector() {
        const {production, closeMachineDialogSelector} = this.props;

        if (production.machineDialogSelectorOpen) {
            return <div className="selectRecipe">Select Recipe:
                <div className="itembuttons">
                    {this.getRecipes().map(recipe => this.renderRecipeButton(recipe))}
                </div>
                <button onClick={() => closeMachineDialogSelector()}>Back</button>
            </div>
        }
        return null;

    }

    renderCurrentProgress() {
        const {production, openMachineDialogSelector} = this.props;
        const machine = this.getMachine();
        const completedPercentage = machine.on ? (machine.progressTicks * 100 / machine.ticksCost) : 0;
        const machineData = machines[machine.techType];

        if (!production.machineDialogSelectorOpen) {

            if (machine.currentItem || machine.nextItem) {
                return <div className="currentProgress">

                    <ItemRecipe
                        recipeKey={machine.currentItem || machine.nextItem}
                        fuelItems={machineData.fuelCost}
                        machineMultiplier={machineData.resultMultiplier} />
                    <ProgressBar completedPercentage={completedPercentage}/>
                    <div>
                        Next item: <ItemIcon item={machine.nextItem}/> <button onClick={() => openMachineDialogSelector()}>Change recipe</button>
                    </div>
                </div>
            } else {
                return <div>
                    <button onClick={() => openMachineDialogSelector()}>Change recipe</button>
                    <p>Select a recipe to begin production.</p>
                </div>
            }
        }

        return null;

    }

    renderMachineState() {
        const {production} = this.props;
        const machine = this.getMachine();

        if (!production.machineDialogSelectorOpen) {
            return <>
                <button onClick={this.toggleMachine}>Turn {machine.on ? 'OFF' : 'ON'}</button>
            </>
        }
        return false;
    }

    renderSellMachine() {
        const {production} = this.props;

        if (!production.machineDialogSelectorOpen) {
            return <div className="sellMachine">
                <button onClick={() => this.sellMachine()}>Sell</button>
            </div>
        }
        return false;
    }

    getMachineStateMessage(){
        const {inventory} = this.props;
        const machine = this.getMachine();
        const machineData = machines[machine.techType];

        if (!machine.on) {
            return <span className="off">OFF</span>;
        }
        if (!machine.powered) {
            return <span className="nopower">No power!</span>;
        }

        if (!machine.running && machine.nextItem) {
            const recipe = itemRecipes[machine.nextItem];
            if (!canAfford(inventory, recipe.cost)) {
                return <span className="noItems">Missing items!</span>;
            }
            if (!canAfford(inventory, machineData.fuelCost)) {
                return <span className="nopower">Missing fuel!</span>;
            }
        }
        return null;
    }

    render() {
        const {closeMachineDialog} = this.props;
        const machine = this.getMachine();
        if (!machine) {
            return null;
        }

        const machineData = machines[machine.techType];

        return <>
            <div className="overlay" />
            <div className="machinedialogContainer">
                <div className="machinedialog">
                    <div className="machineTitle">
                        {machineData.name}
                        <div className="machineStateMessage">{this.getMachineStateMessage()}</div>
                        <div className="closebutton" onClick={() => closeMachineDialog()}>X</div>
                    </div>

                    {this.renderMachineState()}

                    {this.renderRecipeSelector()}
                    {this.renderCurrentProgress()}
                    {this.renderSellMachine()}

                </div>
            </div>
        </>
    }
}

MachineDialog.propTypes = {
    production: PropTypes.object.isRequired,
    inventory: PropTypes.array.isRequired,
    science: PropTypes.object.isRequired,
    toggleMachine: PropTypes.func.isRequired,
    sellMachine: PropTypes.func.isRequired,
    closeMachineDialog: PropTypes.func.isRequired,
    openMachineDialogSelector: PropTypes.func.isRequired,
    closeMachineDialogSelector: PropTypes.func.isRequired,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MachineDialog)
