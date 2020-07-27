import React from 'react';
import PropTypes from "prop-types";
import "./ProgressBar.scss";

export default function ProgressBar({completedPercentage, extraClasses}) {

    return (
        <div className={`progressbar ${extraClasses}`}>
            <div className="bar" style={{width: completedPercentage + '%'}} />
        </div>
    );
}

ProgressBar.propTypes = {
    completedPercentage: PropTypes.number.isRequired,
    extraClasses: PropTypes.string
};