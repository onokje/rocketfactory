import React from 'react';
import PropTypes from "prop-types";
import "./ItemList.scss";
import ItemIcon from "../ItemIcon/ItemIcon";
import TimeIcon from "../TimeIcon/TimeIcon";

export default function ItemList(props) {

    const {items, label, showToolTips, time, showAvailable, smallIcons} = props;

    return (
        <>
            {label ? <div className="ItemListLabel">{label}</div> : ''}
            <div className="horizontalItemList">
                {time ? <TimeIcon time={time}/> : ''}
                {items.map(item => <ItemIcon
                    extraClasses={smallIcons ? ' itemIconSmall' : ''}
                    key={item.name}
                    item={item.name}
                    amount={item.amount}
                    showAvailable={showAvailable}
                    toolTip={showToolTips}/>)}
            </div>
        </>
    );
}

ItemList.propTypes = {
    items: PropTypes.array.isRequired,
    label: PropTypes.string,
    showToolTips: PropTypes.bool,
    time: PropTypes.string,
    showAvailable: PropTypes.bool,
    smallIcons: PropTypes.bool
};

ItemList.defaultProps = {
    showToolTips: true,
    showAvailable: true,
    smallIcons: false
};