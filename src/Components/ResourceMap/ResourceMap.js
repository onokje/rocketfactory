import React, {useEffect} from 'react';
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
import Grid from "./Grid";
import "./ResourceMap.scss";
import MapSelectionPanel from "./MapSelectionPanel";
import {createMap} from "../../slices/resourceMapSlice";

const mapStateToProps = state => ({
    player: state.player,
    resourcemap: state.resourcemap
});

const mapDispatchToProps = {createMap};

const ResourceMap = ({player, resourcemap, createMap}) => {

    useEffect(() => {
        // Update the document title using the browser API
        if (!resourcemap.map.length) {
            createMap();
        }
    });

    if (player.initialized && player.tab === 'resourceMap') {
        if (!resourcemap.map.length) {
            return <div className="defaultContainer">
                <h1>Resource map</h1>
                <p>Initializing...</p>
            </div>
        }

        return (
            <div className="defaultContainer">
                <h1>Resource map</h1>
                <div className="mapcontainer">
                    <Grid/>
                    <MapSelectionPanel/>
                </div>
            </div>
        );
    }
    return null;
}

ResourceMap.propTypes = {
    player: PropTypes.object.isRequired,
    resourcemap: PropTypes.object.isRequired,
    createMap: PropTypes.func.isRequired
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ResourceMap)
