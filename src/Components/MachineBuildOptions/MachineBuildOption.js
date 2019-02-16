import React, {Component} from 'react';
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
import "./MachineBuildOptions.scss";
import Tooltip from "react-tooltip-lite";
import MachineBuildOptionToolTip from "./MachineBuildOptionToolTip";
import {machineIcons} from "../Production/machineIcons";

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});

class MachineBuildOption extends Component {

    render() {
        const {buildOption, machineType, onClick} = this.props;

        const canBuild = buildOption.hasScience && buildOption.canAfford;
        const styles = canBuild ? {cursor: 'pointer'} : {};
        styles.backgroundImage = `url(${machineIcons[buildOption.machineKey]})`;
        let extraClasses = buildOption.hasScience ? '' : ' missingScience';
        return <Tooltip content={<MachineBuildOptionToolTip
                buildOption={buildOption}
                machineType={machineType}
                />}>
            <div
                className={`buildOption ${extraClasses}`}
                key={buildOption.machineKey}
                onClick={canBuild ? onClick : null}
                style={styles}
            />
        </Tooltip>

    }
}

MachineBuildOption.propTypes = {
    buildOption: PropTypes.object.isRequired,
    machineType: PropTypes.string.isRequired,
    onClick: PropTypes.func
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MachineBuildOption)
