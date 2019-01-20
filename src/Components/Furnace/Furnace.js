import React, {Component} from 'react';
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
import {toggleFurnace} from "../../actions/smelting";
import ProgressBar from "../ProgressBar/ProgressBar";
import MachineState from "../MachineState/MachineState";


const mapStateToProps = state => ({
    // player: state.player,
    // inventory: state.inventory,
    // power: state.power,
    // smelting: state.smelting
});

const mapDispatchToProps = dispatch => ({
    toggleFurnace: (id, on, nextItem) => {
        dispatch(toggleFurnace(id, on, nextItem));
    },

});

class Furnace extends Component {

    handleSelectChange = (event) => {
        const {furnace, toggleFurnace} = this.props;
        toggleFurnace(furnace.id, furnace.on, event.target.value);
    };

    getSmeltingItems() {
        return ['ironPlate', 'copperPlate', 'steelPlate', 'brick'];
    }

    toggleFurnace = () => {
        const {furnace, toggleFurnace} = this.props;
        toggleFurnace(furnace.id, !furnace.on, furnace.nextItem);

    };

    renderFurnaceState() {
        const {furnace} = this.props;
        return <MachineState on={furnace.on} powered={furnace.powered} running={furnace.running}/>
    }

    render() {
        const {furnace} = this.props;
        const completedPercentage = furnace.on ? (furnace.progressTicks * 100 / furnace.ticksCost) : 0;

        return (
            <div key={furnace.id} className="furnace">
                <div>{furnace.techType} furnace</div>
                <div>{this.renderFurnaceState()} <button onClick={this.toggleFurnace}>Turn {furnace.on ? 'OFF' : 'ON'}</button></div>
                <div>Smelt items:
                    <select value={furnace.nextItem} onChange={this.handleSelectChange}>
                        {this.getSmeltingItems().map(option => (<option key={option} value={option}>{option}</option>))}
                    </select>
                </div>
                <div>Currently Smelting: {furnace.currentItem}<br/>
                <ProgressBar completedPercentage={completedPercentage}/>
                </div>
            </div>
        );

    }
}

Furnace.propTypes = {
    furnace: PropTypes.object.isRequired,
    toggleFurnace: PropTypes.func.isRequired
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Furnace)
