import React, { Component } from 'react';
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
import ProgressBar from "../ProgressBar/ProgressBar";

const mapStateToProps = state => ({
    science: state.science
});

const mapDispatchToProps = dispatch => ({
});

class SideBarScience extends Component {

    renderProgress() {
        const {science} = this.props;

        if (science.researching && science.researchingTicksCost > 0) {
            const completedPercentage = science.researchingProgressTicks * 100 / science.researchingTicksCost;
            return <ProgressBar completedPercentage={completedPercentage}/>
        }

        return <p>Select a new research</p>
    }

    render() {
        const {science} = this.props;
        return (
            <div className="sidebarScience">
                <div>Research progress: {science.researchingScienceId}</div>
                {this.renderProgress()}
            </div>
        );
    }
}

SideBarScience.propTypes = {
    science: PropTypes.object.isRequired
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SideBarScience)
