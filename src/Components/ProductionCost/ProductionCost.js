import React from 'react';
import PropTypes from "prop-types";
import "./ProductionCost.scss";
import ItemIcon from "../ItemIcon/ItemIcon";

function costItem(item, showToolTip) {
    return <ItemIcon item={item.name} amount={item.amount} showAvailable={true} toolTip={showToolTip} />
}

export default function ProductionCost(props) {

    const {items, label, showToolTips} = props;

    return (
        <div>
            <span>{label}</span>
            <div className="itemcost">
                {items.map(item => costItem(item, showToolTips))}
            </div>
        </div>
    );
}

ProductionCost.propTypes = {
    items: PropTypes.array.isRequired,
    label: PropTypes.string,
    showToolTips: PropTypes.bool
};

ProductionCost.defaultProps = {
    label: 'Cost to build:',
    showToolTips: true
};