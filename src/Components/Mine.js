import React, {Component} from 'react';
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
import ProgressBar from "./ProgressBar";
import {toggleMine} from "../actions/mining";


const mapStateToProps = state => ({
    // player: state.player,
    // inventory: state.inventory,
    // power: state.power,
    // smelting: state.smelting
});

const mapDispatchToProps = dispatch => ({
    toggleMine: (mineId, on) => {
        dispatch(toggleMine(mineId, on));
    },

});

class Mine extends Component {

    toggleMine = () => {
        const {mine, toggleMine} = this.props;
        toggleMine(mine.id, !mine.on);
    };

    renderMineState() {
        const {mine} = this.props;
        if (mine.on) {
            if (mine.powered) {
                return mine.running ? <span className="on">Running</span> : <span className="waiting">Waiting</span>
            } else {
                return mine.running ? <span className="nopower">No power</span> : <span className="waiting">Waiting</span>;
            }
        } else {
            return <span className="off">OFF</span>
        }
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
            </div>
        );

    }
}

Mine.propTypes = {
    mine: PropTypes.object.isRequired,
    toggleMine: PropTypes.func.isRequired
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Mine)
