import React, {Component} from 'react';
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
import ProgressBar from "../ProgressBar/ProgressBar";
import {toggleAssembler} from "../../actions/crafting";
import {itemRecipes} from "../../helpers/gameData";
import MachineState from "../MachineState/MachineState";


const mapStateToProps = state => ({
    // player: state.player,
    // inventory: state.inventory,
    // power: state.power,
    // smelting: state.smelting
});

const mapDispatchToProps = dispatch => ({
    toggleAssembler: (id, on, nextItem) => {
        dispatch(toggleAssembler(id, on, nextItem));
    },

});

class Assembler extends Component {

    handleSelectChange = (event) => {
        const {assembler, toggleAssembler} = this.props;
        toggleAssembler(assembler.id, assembler.on, event.target.value);
    };

    getAssemblerRecipes() {
        const items = [];
        Object.entries(itemRecipes).forEach(entry => {
            if (entry[1].type === 'crafting') {
                items.push(entry[0]);
            }
        });
        return items;
    }

    toggleAssembler = () => {
        const {assembler, toggleAssembler} = this.props;
        toggleAssembler(assembler.id, !assembler.on, assembler.nextItem);

    };

    renderAssemblerState() {
        const {assembler} = this.props;
        return <MachineState on={assembler.on} powered={assembler.powered} running={assembler.running}/>
    }

    render() {
        const {assembler} = this.props;
        const completedPercentage = assembler.on ? (assembler.progressTicks * 100 / assembler.ticksCost) : 0;

        return (
            <div key={assembler.id} className="assembler">
                <div>Assembler</div>
                <div>{this.renderAssemblerState()} <button onClick={this.toggleAssembler}>Turn {assembler.on ? 'OFF' : 'ON'}</button></div>
                <div>Craft items:
                    <select value={assembler.nextItem} onChange={this.handleSelectChange}>
                        {this.getAssemblerRecipes().map(option => (<option key={option} value={option}>{option}</option>))}
                    </select>
                </div>
                <div>Currently Crafting: {assembler.currentItem}<br/>
                    <ProgressBar completedPercentage={completedPercentage}/>
                </div>
            </div>
        );

    }
}

Assembler.propTypes = {
    assembler: PropTypes.object.isRequired,
    toggleAssembler: PropTypes.func.isRequired
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Assembler)
