import React from 'react';
import "./NameAndImageHeader.scss";
import PropTypes from "prop-types";


export default function NameAndImageHeader({name, imageSrc, imageStyles, largeIcon}) {
    const styles = imageStyles || {};
    styles.backgroundImage =  `url(${imageSrc})`;
    return <div className="nameAndImageHeader">
        <div className={`icon ${largeIcon ? ' largeIcon' : ''}`} style={styles} />
        <div className="name">{name}</div>
    </div>;
}

NameAndImageHeader.propTypes = {
    name: PropTypes.string.isRequired,
    imageStyles: PropTypes.object,
    imageSrc: PropTypes.string,
    largeIcon: PropTypes.bool
};