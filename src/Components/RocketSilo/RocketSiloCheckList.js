import React from 'react';
import PropTypes from "prop-types";

export default function RocketSiloCheckList(props) {

    const { rocketSilo } = this.props;

    return (
        <div className="rocketSiloChecklist">
            <ul>
                <li>Silo: {rocketSilo.checklist.silo} </li>
                <li>Rocket: {rocketSilo.checklist.rocket} </li>
                <li>Launchpad: {rocketSilo.checklist.launchpad} </li>
                <li>Fuel: {rocketSilo.checklist.fuel} </li>
                <li>Payload ready: {rocketSilo.checklist.payload} </li>
            </ul>
        </div>
    );

}

RocketSiloCheckList.defaultProps = {

};

RocketSiloCheckList.propTypes = {
    rocketSilo: PropTypes.object.isRequired,
};