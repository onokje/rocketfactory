import React from 'react';
import PropTypes from "prop-types";
import "./ProgressBar.scss";

export default function ProgressBar(props) {

    const {completedPercentage} = props;

    return (
        <div className="progressbar">
            <div className="bar" style={{width: completedPercentage + '%'}} />
        </div>
    );
}

ProgressBar.propTypes = {
    completedPercentage: PropTypes.number.isRequired
};