import React, { Component } from 'react';
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
import ProgressBar from "../ProgressBar/ProgressBar";
import {switchTab} from "../../slices/playerSlice";

const mapStateToProps = state => ({
    resourceMap: state.resourcemap
});

const mapDispatchToProps = {switchTab};

class SideBarExploration extends Component {

    renderProgress() {
        const {resourceMap, switchTab} = this.props;

        if (resourceMap.exploring) {
            const completedPercentage = resourceMap.exploringProgressTicks * 100 / resourceMap.exploringProgressTicksTotal;
            return <ProgressBar completedPercentage={completedPercentage}/>
        }

        return <p>No exploration in progress! <button onClick={() => switchTab('resourceMap')}>Resource Map</button></p>
    }

    render() {
        const {resourceMap} = this.props;
        const coords = resourceMap.exploringCoords;
        return (
            <div className="sidebarExploration sidebarItem">
                <div>{resourceMap.exploring ? `Exploration progress: cell ${coords.x},${coords.y}` : ''}</div>
                {this.renderProgress()}
            </div>
        );
    }
}

SideBarExploration.propTypes = {
    resourceMap: PropTypes.object.isRequired,
    switchTab: PropTypes.func.isRequired
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SideBarExploration)
