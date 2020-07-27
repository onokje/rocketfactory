import React, {Component} from 'react';
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
import {researches} from "../../gamedata/research";
import {researchIcons} from "./researchIcons";
import "./Research.scss";
import {playerHasAllResearches, playerHasResearch} from "../../helpers/ResearchHelper";
import {selectResearch} from "../../slices/researchSlice";


const mapStateToProps = state => ({
    player: state.player,
    research: state.research
});

const mapDispatchToProps = {selectResearch};

class ResearchList extends Component {

    renderResearch(entry) {
        const researchId = entry[0];
        const currentResearchData = entry[1];
        const {research, selectResearch} = this.props;

        const canLearn = playerHasAllResearches(research.researchComplete, currentResearchData.requiredResearch);
        const hasLearned = playerHasResearch(research.researchComplete, researchId);
        let className = hasLearned ? 'hasLearned' : canLearn ? '' : 'notLearnable';
        className = research.selectedResearch === researchId ? className + ' selected' : className;

        return <li key={researchId} onClick={() => selectResearch({researchId})} className={`researchItem ${className}`} >
            <img alt={researchId} src={researchIcons[researchId]} />
            <div className="researchName"> {currentResearchData.name}</div>
        </li>;
    }

    render() {
        return (
            <div className="researchListContainer">
                <ul className="researchList">
                {Object.entries(researches).map(entry => this.renderResearch(entry))}
                </ul>
            </div>
        );

    }
}

ResearchList.propTypes = {
    player: PropTypes.object.isRequired,
    research: PropTypes.object.isRequired,
    selectResearch: PropTypes.func.isRequired
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ResearchList)
