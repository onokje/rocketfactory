import React from 'react';
import PropTypes from "prop-types";
import './machineState.scss';

export default function MachineState(props) {

    const {on, powered, running, isPowerplant} = props;

    if (on) {
        if (powered) {
            return running ? <span className="on">Running</span> : <span className="waiting">Waiting</span>
        } else {
            if (isPowerplant){
                return <span className="waiting">Waiting</span>
            } else {
                return <span className="nopower">No power</span>;
            }

        }
    } else {
        return <span className="off">OFF</span>
    }
}

MachineState.defaultProps = {
    isPowerplant: false
};

MachineState.propTypes = {
    on: PropTypes.bool.isRequired,
    powered: PropTypes.bool.isRequired,
    running: PropTypes.bool.isRequired,
    isPowerplant: PropTypes.bool
};