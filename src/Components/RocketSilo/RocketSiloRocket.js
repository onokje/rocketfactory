import React from 'react';
import PropTypes from "prop-types";
import {rocketPart} from "../../gamedata/rocketSilo";
import ItemList from "../ItemList/ItemList";

export default function RocketSiloRocket(props) {

    const { rocketSilo } = props;

    return (
        <div className="rocketSiloRocket">
            <h2>Rocket building progress:</h2>
            <p>Rocket parts build: { rocketSilo.rocketParts } / 100</p>
            <p>Rocket parts are build automatically if you have enough resources.</p>
            <ItemList items={rocketPart.cost} />
        </div>
    );

}

RocketSiloRocket.defaultProps = {

};

RocketSiloRocket.propTypes = {
    rocketSilo: PropTypes.object.isRequired,
};