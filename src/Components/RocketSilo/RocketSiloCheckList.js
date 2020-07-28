import React from 'react';
import PropTypes from "prop-types";
import './RocketSiloCheckList.scss';

function checkListItem(val){
    return val ? <span className='ready'>READY</span> : <span className='notReady'>NOT READY</span>;
}

export default function RocketSiloCheckList({ checklist }) {

    return (
        <div className="rocketSiloChecklist">
            <h2>Rocket launch checklist:</h2>
            <ul className={`rocketSiloChecklist`}>
                <li>Rocket Silo build: {checkListItem(checklist.silo)} </li>
                <li>Rocket complete: {checkListItem(checklist.rocket)} </li>
                <li>Launchpad build: {checkListItem(checklist.launchpad)} </li>
                <li>Fuel loaded: {checkListItem(checklist.fuel)} </li>
                <li>Payload ready: {checkListItem(checklist.payload)} </li>
            </ul>
        </div>
    );

}

RocketSiloCheckList.defaultProps = {

};

RocketSiloCheckList.propTypes = {
    checklist: PropTypes.object.isRequired,
};