import React, {Component} from 'react';
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
import {togglePowerplant} from "../actions/power";


const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
    togglePowerplant: (id, on) => {
        dispatch(togglePowerplant(id, on));
    },

});

class PowerPlant extends Component {

    togglePowerplant = () => {
        const {powerplant, togglePowerplant} = this.props;
        togglePowerplant(powerplant.id, !powerplant.on);

    };

    render() {
        const {powerplant} = this.props;

        return (
            <div key={powerplant.id} className="powerplant">
                <div>name: {powerplant.name}</div>
                <div>{powerplant.on ? 'ON' : 'OFF'} <button onClick={this.togglePowerplant}>Turn {powerplant.on ? 'OFF' : 'ON'}</button></div>
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
