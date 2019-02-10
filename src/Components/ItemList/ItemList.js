import React from 'react';
import PropTypes from "prop-types";
import "./ItemList.scss";
import ItemIcon from "../ItemIcon/ItemIcon";
import TimeIcon from "../TimeIcon/TimeIcon";

export default function ItemList(props) {

    const {items, label, showToolTips, time, showAvailable} = props;

    return (
        <div>
            <span>{label}</span>
            <div className="horizontalItemList">
                {time ? <TimeIcon time={time}/> : ''}
                {items.map(item => <ItemIcon item={item.name} amount={item.amount} showAvailable={showAvailable} toolTip={showToolTips} />)}
            </div>
        </div>
    );
}

ItemList.propTypes = {
    items: PropTypes.array.isRequired,
    label: PropTypes.string,
    showToolTips: PropTypes.bool,
    time: PropTypes.string,
    showAvailable: PropTypes.bool
};

ItemList.defaultProps = {
    label: 'Cost to build:',
    showToolTips: true,
    showAvailable: true
};