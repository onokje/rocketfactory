import React from 'react';
import PropTypes from "prop-types";
import './machineState.scss';

export default function MachineStateV2(props) {

    const {stateClass, text, styles} = props;

    if (text) {
        return <div style={styles} className="machineStateText"><span className={stateClass}>{stateClass}</span></div>;
    } else {
        return <div style={styles} className="machineState"><span className={stateClass} /></div>;
    }
}

MachineStateV2.states = ['running', 'off', 'noitems', 'nofuel', 'waiting', 'nopower'];

MachineStateV2.defaultProps = {
    text: false,
    styles: {},
};

MachineStateV2.propTypes = {
    stateClass: PropTypes.oneOf(MachineStateV2.states),
    text: PropTypes.bool,
    styles: PropTypes.object
};
