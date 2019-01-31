import {scienceIcons} from "./scienceIcons";
import {sciences} from "../../gamedata/science";
import React from "react";
import PropTypes from "prop-types";
import "./ScienceItem.scss";

export default function scienceItem(props) {
    const {scienceId, extraClass} = props;

    if (sciences.hasOwnProperty(scienceId)) {
        return <div className={`scienceItem ${extraClass}`}>
            <img alt={scienceId} src={scienceIcons[scienceId]} />
            <div className="name"> {sciences[scienceId].name}</div>
        </div>
    } else {
        console.log('invalid science id passed: ' + scienceId);
    }
    return null;
}

scienceItem.propTypes = {
    scienceId: PropTypes.string.isRequired,
    extraClass: PropTypes.string
};