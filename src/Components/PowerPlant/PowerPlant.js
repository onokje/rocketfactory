import React, {Component} from 'react';
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
import MachineState from "../MachineState/MachineState";
import {togglePowerplant} from "../../slices/powerSlice";


const mapStateToProps = state => ({

});

const mapDispatchToProps = {togglePowerplant};

class PowerPlant extends Component {

    togglePowerplant = () => {
        const {powerplant, togglePowerplant} = this.props;
        togglePowerplant({powerPlantId: powerplant.id, on: !powerplant.on});
    };

    renderPowerplantState() {
        const {powerplant} = this.props;
        return <MachineState on={powerplant.on} powered={powerplant.powered} running={true} isPowerplant={true} />

    }

    render() {
        const {powerplant} = this.props;

        return (
            <div key={powerplant.id} className="powerplant">
                <div>{powerplant.techType} power plant</div>
                <div>{this.renderPowerplantState()} <button onClick={this.togglePowerplant}>Turn {powerplant.on ? 'OFF' : 'ON'}</button></div>
            </div>
        );

    }
}

PowerPlant.propTypes = {
    powerplant: PropTypes.object.isRequired,
    togglePowerplant: PropTypes.func.isRequired
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PowerPlant)
