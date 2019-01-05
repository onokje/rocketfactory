import React from 'react';
import PropTypes from "prop-types";

function costItem(item) {
    return (<div key={item.name}>{item.name} : {item.amount}</div>);
}

export default function ProductionCost(props) {

    const {priceObject} = props;

    return (
        <div className="productionCost">
            <span>Cost to build:</span>
            {priceObject.map(item => costItem(item))}
        </div>
    );
}

ProductionCost.propTypes = {
    priceObject: PropTypes.array.isRequired
};