import React from 'react';
import PropTypes from "prop-types";
import {rocketFuel} from "../../gamedata/rocketSilo";
import ItemList from "../ItemList/ItemList";

export default function RocketSiloFuel(props) {

    const { rocketSilo } = props;

    return (
        <div className="rocketSiloRocket">
            <h2>Rocket fueling progress:</h2>
            <p>Fuel loaded: { rocketSilo.fuelParts } / 100</p>
            <p>Fuel is loaded automatically if you have enough resources.</p>
            <ItemList items={rocketFuel.cost} />
        </div>
    );

}

RocketSiloFuel.defaultProps = {

};

RocketSiloFuel.propTypes = {
    rocketSilo: PropTypes.object.isRequired,
};