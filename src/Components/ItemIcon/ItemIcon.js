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
    render() {

        const {item, amount, showAvailable, inventory, onClick, toolTip} = this.props;
        let bgColor = '999';
        if (showAvailable) {
            const haveAmount = getItemAmountByName(inventory, item);
            if (haveAmount >= amount) {
                bgColor = '090';
            } else {
                bgColor = '900';
            }
        }
        const displayAmount = amount > 1000 ? Math.floor(amount / 1000)+'k' : amount;

        const style = {background: `#${bgColor} url(${icons[item]}) no-repeat 3px 3px`};

        if (toolTip) {
            return (
                <Tooltip content={<ItemToolTip item={item}/>}>
                    <div onClick={onClick} className="icon" style={style}>{displayAmount}</div>
                </Tooltip>
            );
        } else {
            return <div onClick={onClick} className="icon" style={style}>{displayAmount}</div>
        }

    }
}

ItemIcon.defaultProps = {
    toolTip: true,
    showAvailable: false
};

ItemIcon.propTypes = {
    inventory: PropTypes.array.isRequired,
    item: PropTypes.string.isRequired,
    amount: PropTypes.number,
    showAvailable: PropTypes.bool,
    onClick: PropTypes.func,
    toolTip: PropTypes.bool
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ItemIcon)