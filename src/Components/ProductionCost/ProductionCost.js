import React from 'react';
import PropTypes from "prop-types";
import "./ProductionCost.scss";

function costItem(item) {
    return (<li key={item.name}>{item.name} : {item.amount}</li>);
}

export default function ProductionCost(props) {

    const {items, label} = props;

    return (
        <div>
            <span>{label}</span>
            <ul className="itemcost">
                {items.map(item => costItem(item))}
            </ul>
        </div>
    );
}

ProductionCost.propTypes = {
    items: PropTypes.array.isRequired,
    label: PropTypes.string
};

ProductionCost.defaultProps = {
    label: 'Cost to build:'
};