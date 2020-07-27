import React, { Component } from 'react';
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
import ProgressBar from "../ProgressBar/ProgressBar";
import {switchTab} from "../../slices/playerSlice";

const mapStateToProps = state => ({
    research: state.research
});

const mapDispatchToProps = {switchTab};

class SideBarResearch extends Component {

    renderProgress() {
        const {research, switchTab} = this.props;

        if (research.researching && research.researchingTicksCost > 0) {
            const completedPercentage = research.researchingProgressTicks * 100 / research.researchingTicksCost;
            return <ProgressBar completedPercentage={completedPercentage}/>
        }

        return <p>No research in progress! <button onClick={() => switchTab('research')}>Research</button></p>
    }

    render() {
        const {research} = this.props;
        return (
            <div className="sidebarResearch sidebarItem">
                <div>Research progress: {research.researchingResearchId}</div>
                {this.renderProgress()}
            </div>
        );
    }
}

SideBarResearch.propTypes = {
    research: PropTypes.object.isRequired,
    switchTab: PropTypes.func.isRequired
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SideBarResearch)
