import React from 'react';
import PropTypes from "prop-types";
import './machineState.scss';

export default function MachineState(props) {

    const {on, powered, running, isPowerplant, missingItems, missingFuel} = props;

    if (on) {
        if (powered) {
            if (running) {
                return <span className="on">Running</span>;
            }
            if (missingItems) {
                return <span className="noItems">Missing items!</span>;
            }
            return missingFuel ? <span className="nopower">Missing fuel!</span> : <span className="on">Running</span>
        } else {
            if (isPowerplant){
                return <span className="waiting">Waiting</span>
            } else {
                return <span className="nopower">No power!</span>;
            }

        }
    } else {
        return <span className="off">OFF</span>
    }
}

MachineState.defaultProps = {
    isPowerplant: false,
    missingItems: false,
    missingFuel: false
};

MachineState.propTypes = {
    on: PropTypes.bool.isRequired,
    powered: PropTypes.bool.isRequired,
    running: PropTypes.bool.isRequired,
    missingItems: PropTypes.bool,
    missingFuel: PropTypes.bool,
    isPowerplant: PropTypes.bool
};