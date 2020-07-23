import React, {Component} from 'react';
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
import {sciences} from "../../gamedata/science";
import {scienceIcons} from "./scienceIcons";
import "./Science.scss";
import {playerHasAllSciences, playerHasScience} from "../../helpers/ScienceHelper";
import {selectScience} from "../../slices/scienceSlice";


const mapStateToProps = state => ({
    player: state.player,
    science: state.science
});

const mapDispatchToProps = {selectScience};

class ScienceList extends Component {

    renderScience(entry) {
        const scienceId = entry[0];
        const currentScienceData = entry[1];
        const {science, selectScience} = this.props;

        const canLearn = playerHasAllSciences(science.sciences, currentScienceData.requiredScience);
        const hasLearned = playerHasScience(science.sciences, scienceId);
        let className = hasLearned ? 'hasLearned' : canLearn ? '' : 'notLearnable';
        className = science.selectedScience === scienceId ? className + ' selected' : className;

        return <li key={scienceId} onClick={() => selectScience({scienceId})} className={`scienceItem ${className}`} >
            <img alt={scienceId} src={scienceIcons[scienceId]} />
            <div className="scienceName"> {currentScienceData.name}</div>
        </li>;
    }

    render() {
        return (
            <div className="scienceListContainer">
                <ul className="scienceList">
                {Object.entries(sciences).map(entry => this.renderScience(entry))}
                </ul>
            </div>
        );

    }
}

ScienceList.propTypes = {
    player: PropTypes.object.isRequired,
    science: PropTypes.object.isRequired,
    selectScience: PropTypes.func.isRequired
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ScienceList)
