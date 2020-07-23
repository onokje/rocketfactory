import React, {Component} from 'react';
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
import ProgressBar from "../ProgressBar/ProgressBar";

import MachineState from "../MachineState/MachineState";
import {sellMine, toggleMine} from "../../slices/miningSlice";


const mapStateToProps = state => ({
    // player: state.player,
    // inventory: state.inventory,
    // power: state.power,
    // smelting: state.smelting
});

const mapDispatchToProps = {sellMine, toggleMine};

class Mine extends Component {

    toggleMine = () => {
        const {mine, toggleMine} = this.props;
        toggleMine({mineId: mine.id, on: !mine.on});
    };

    sellMine() {
        const {mine, sellMine} = this.props;
        sellMine({id: mine.id});
    }

    renderMineState() {
        const {mine} = this.props;
        return <MachineState on={mine.on} powered={mine.powered} running={mine.running}/>
    }

    getMineTypeName() {
        const {mine} = this.props;
        return 'Mine ' + mine.techType + ' (' + mine.resourceType + ')';
    }

    render() {
        const {mine} = this.props;
        const completedPercentage = mine.on ? (mine.progressTicks * 100 / mine.ticksCost) : 0;

        return (
            <div key={mine.id} className="furnace">
                <div>{this.getMineTypeName()}</div>
                <div>{this.renderMineState()} <button onClick={this.toggleMine}>Turn {mine.on ? 'OFF' : 'ON'}</button></div>
                <ProgressBar completedPercentage={completedPercentage}/>
                <div className="sellMachine">
                    <button onClick={() => this.sellMine()}>Sell</button>
                </div>
            </div>
        );

    }
}

Mine.propTypes = {
    mine: PropTypes.object.isRequired,
    toggleMine: PropTypes.func.isRequired,
    sellMine: PropTypes.func.isRequired
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Mine)
