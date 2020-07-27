import {researchIcons} from "./researchIcons";
import {researches} from "../../gamedata/research";
import React from "react";
import PropTypes from "prop-types";
import "./ResearchItem.scss";

export default function researchItem(props) {
    const {researchId, extraClass} = props;

    if (researches.hasOwnProperty(researchId)) {
        return <div className={`researchItem ${extraClass}`}>
            <img alt={researchId} src={researchIcons[researchId]} />
            <div className="name"> {researches[researchId].name}</div>
        </div>
    } else {
        console.log('invalid research id passed: ' + researchId);
    }
    return null;
}

researchItem.propTypes = {
    researchId: PropTypes.string.isRequired,
    extraClass: PropTypes.string
};