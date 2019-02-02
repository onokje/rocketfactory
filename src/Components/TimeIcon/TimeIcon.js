import React, { Component } from 'react';
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
import Tooltip from 'react-tooltip-lite';
import {icons} from "./../ItemIcon/icons";

const mapStateToProps = state => ({
    inventory: state.inventory
});

const mapDispatchToProps = dispatch => ({
});

class TimeIcon extends Component {

    renderIcon() {
        const {time, extraClasses} = this.props;
        const style = {background: `#999 url(${icons['time']}) no-repeat 3px 3px`};

        return <div
            className={`itemIcon ${extraClasses}`}
            style={style}
        >
            {time}
        </div>
    }

    render() {
        const {time, toolTip} = this.props;

        if (toolTip) {
            return (
                <Tooltip content={<p>This research takes {time}</p>}>
                    {this.renderIcon()}
                </Tooltip>
            );
        } else {
            return this.renderIcon();
        }

    }
}

TimeIcon.defaultProps = {
    toolTip: true,
};

TimeIcon.propTypes = {
    time: PropTypes.string,
    toolTip: PropTypes.bool,
    extraClasses: PropTypes.string,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TimeIcon)