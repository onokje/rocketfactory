import React, {Component} from 'react';
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
import {canAfford} from "../../helpers/InventoryHelper";
import { v4 as uuidv4 } from 'uuid';
import {buildMine} from "../../actions/mining";
import {handminingStart} from "../../actions/player";
import {createMap} from "../../actions/resourcemap";
import Grid from "./Grid";
import "./ResourceMap.scss";
import MapSelectionPanel from "./MapSelectionPanel";

const mapStateToProps = state => ({
    player: state.player,
    inventory: state.inventory,
    power: state.power,
    mining: state.mining,
    resourcemap: state.resourcemap
});

const mapDispatchToProps = dispatch => ({
    createMap: () => {
        dispatch(createMap())
    },
    handminingStart: (resourceType) => {
        dispatch(handminingStart(resourceType));
    },
    buildMine: (resourceType, techType, id) => {
        dispatch(buildMine(resourceType, techType, id));
    },


});

class ResourceMap extends Component {

    buildMine(resourceType, techType, itemCost) {
        const {inventory, buildMine} = this.props;

        if (canAfford(inventory, itemCost)) {
            const uuid = uuidv4();
            buildMine(resourceType, techType, uuid);
        } else {
            console.log('you cannot afford this mine!');
        }
    };


    render() {
        const {player, resourcemap, createMap} = this.props;

        if (player.initialized && player.tab === 'resourceMap') {
            if (!resourcemap.map.length) {
                createMap();
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
}

ResourceMap.propTypes = {
    player: PropTypes.object.isRequired,
    inventory: PropTypes.array.isRequired,
    power: PropTypes.object.isRequired,
    mining: PropTypes.object.isRequired,
    resourcemap: PropTypes.object.isRequired,
    handminingStart: PropTypes.func.isRequired,
    buildMine: PropTypes.func.isRequired,
    createMap: PropTypes.func.isRequired
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ResourceMap)
