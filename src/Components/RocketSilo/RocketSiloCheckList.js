import React from 'react';
import PropTypes from "prop-types";

function check(val){
    return val ? 'true' : 'false';
}

export default function RocketSiloCheckList(props) {

    const { rocketSilo } = props;

    return (
        <div className="rocketSiloChecklist">
            <h2>Rocket launch checklist:</h2>
            <ul>
                <li>Silo: {check(rocketSilo.checklist.silo)} </li>
                <li>Rocket: {check(rocketSilo.checklist.rocket)} </li>
                <li>Launchpad: {check(rocketSilo.checklist.launchpad)} </li>
                <li>Fuel: {check(rocketSilo.checklist.fuel)} </li>
                <li>Payload ready: {check(rocketSilo.checklist.payload)} </li>
            </ul>
        </div>
    );

}

RocketSiloCheckList.defaultProps = {

};

RocketSiloCheckList.propTypes = {
    rocketSilo: PropTypes.object.isRequired,
};