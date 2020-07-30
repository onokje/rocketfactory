import React from 'react';
import PropTypes from "prop-types";

export default function RocketLaunch({ rocketSilo, launchRocket }) {

    if (rocketSilo.launched) {
        return (
            <div className="rocketLaunch">
                <iframe title="launchVideo" width="560" height="315" src="https://www.youtube.com/embed/wbSwFU6tY1c?start=1308"
    frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen/>

            </div>
        );
    } else {
        return (
            <div className="rocketLaunch">
                <p>The Rocket is ready for launch!</p>
                <button onClick={() => launchRocket()}>LAUNCH ROCKET</button>
            </div>
        );
    }


}

RocketLaunch.defaultProps = {

};

RocketLaunch.propTypes = {
    rocketSilo: PropTypes.object.isRequired,
    launchRocket: PropTypes.func.isRequired
};
