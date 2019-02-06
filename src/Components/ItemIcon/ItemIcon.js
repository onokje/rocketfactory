import React, { Component } from 'react';
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
import {icons} from "./icons";
import "./ItemIcon.scss";
import {getItemAmountByName} from "../../helpers/InventoryHelper";
import Tooltip from 'react-tooltip-lite';
import ItemToolTip from "./ItemToolTip";

const mapStateToProps = state => ({
    inventory: state.inventory
});

const mapDispatchToProps = dispatch => ({
});

class ItemIcon extends Component {

    renderIcon() {
        const {item, amount, showAvailable, inventory, onClick, extraClasses} = this.props;
        let classes = extraClasses;
        if (showAvailable) {
            const haveAmount = getItemAmountByName(inventory, item);
            if (haveAmount >= amount) {
                classes += ' itemGreen';
            } else {
                classes += ' itemRed';
            }
        }
        const displayAmount = amount > 1000 ? Math.floor(amount / 1000)+'k' : amount;
        const style = {backgroundImage: `url(${icons[item]})`};

        return <div
            onClick={onClick}
            className={`itemIcon ${classes}`}
            style={style}
        >
            {displayAmount}
        </div>
    }

    render() {
        const {item, toolTip, showScienceRequired} = this.props;

        if (toolTip) {
            return (
                <Tooltip content={<ItemToolTip item={item} showScienceRequired={showScienceRequired}/>}>
                    {this.renderIcon()}
                </Tooltip>
            );
        } else {
            return this.renderIcon();
        }

    }
}

ItemIcon.defaultProps = {
    toolTip: true,
    showAvailable: false,
    showScienceRequired: false
};

ItemIcon.propTypes = {
    inventory: PropTypes.array.isRequired,
    item: PropTypes.string.isRequired,
    amount: PropTypes.number,
    showAvailable: PropTypes.bool,
    onClick: PropTypes.func,
    toolTip: PropTypes.bool,
    showScienceRequired: PropTypes.bool,
    extraClasses: PropTypes.string,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ItemIcon)