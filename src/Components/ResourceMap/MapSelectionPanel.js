import React, {Component} from 'react';
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
import {findSectorByCoords} from "../../helpers/ResourceMapHelpers";
import ProgressBar from "../ProgressBar/ProgressBar";
import {exploreStart} from "../../actions/resourcemap";
import {handminingStart} from "../../actions/player";
import {buildMine} from "../../actions/mining";


const mapStateToProps = state => ({
    player: state.player,
    inventory: state.inventory,
    power: state.power,
    mining: state.mining,
    resourcemap: state.resourcemap
});

const mapDispatchToProps = dispatch => ({
    exploreStart: (x, y) => {
        dispatch(exploreStart(x, y))
    },
    handminingStart: (resourceType) => {
        dispatch(handminingStart(resourceType));
    },
    buildMine: (resourceType, techType, id) => {
        dispatch(buildMine(resourceType, techType, id));
    },
});

class MapSelectionPanel extends Component {


    renderExploreButton() {
        const {resourcemap, exploreStart} = this.props;
        if (resourcemap.mapSelected) {
            const selectedCell = findSectorByCoords(resourcemap.map, resourcemap.mapSelected.x, resourcemap.mapSelected.y);

            if (!selectedCell.explored) {
                if (resourcemap.exploring) {
                    const completedPercentage = resourcemap.exploringProgressTicks * 100 / resourcemap.exploringProgressTicksTotal;
                    if (resourcemap.exploringCoords.x === selectedCell.x && resourcemap.exploringCoords.y === selectedCell.y) {
                        return <div>
                            <div>Currently exploring this sector</div>
                            <ProgressBar completedPercentage={completedPercentage}/>
                        </div>
                    } else {


                        return <div>
                            <div>Currently exploring another sector</div>
                            <ProgressBar completedPercentage={completedPercentage}/>
                        </div>
                    }


                }

                return <button onClick={() => exploreStart(selectedCell.x, selectedCell.y)}>Explore!</button>
            }
        }
        return null;
    }

    renderHandminingOptions(resource) {
        if (resource === 'none' || resource === 'base') {
            return null;
        }
        if (resource === 'oil') {
            return <div>Oil cannot be mined by hand</div>;
        }

        const {player, handminingStart} = this.props;
        let buttonDisabled = false;
        if (player.handmining || player.handcrafting) {
            buttonDisabled = true;
        }

        return <div className="simpleDivider">
            <h2>Mine by hand</h2>
            <button disabled={buttonDisabled} onClick={() => handminingStart(resource)} >Mine {resource}!</button>
        </div>;
    }

    renderMiningOptions() {
        const {resourcemap} = this.props;
        if (resourcemap.mapSelected) {
            const selectedCell = findSectorByCoords(resourcemap.map, resourcemap.mapSelected.x, resourcemap.mapSelected.y);

            if (selectedCell.explored) {
                return this.renderHandminingOptions(selectedCell.resource)
                // find mine

                // if mine, display

                // else show build options


            }
        }
        return null;
    }

    render() {
        const {resourcemap} = this.props;

        if (resourcemap.mapSelected) {

            const selectedCell = findSectorByCoords(resourcemap.map, resourcemap.mapSelected.x, resourcemap.mapSelected.y);
            return <div className="mapSelectionPanel">
                <h2>Selected sector: {selectedCell.x},{selectedCell.y}</h2>
                <div>Resource: {selectedCell.explored ? selectedCell.resource : 'unexplored'}</div>
                {this.renderExploreButton()}
                {this.renderMiningOptions()}
            </div>
        }

        return <div className="mapSelectionPanel">
            Select a sector on the map
        </div>;

    }
}

MapSelectionPanel.propTypes = {
    player: PropTypes.object.isRequired,
    inventory: PropTypes.array.isRequired,
    power: PropTypes.object.isRequired,
    mining: PropTypes.object.isRequired,
    resourcemap: PropTypes.object.isRequired,
    exploreStart: PropTypes.func.isRequired,
    handminingStart: PropTypes.func.isRequired,
    buildMine: PropTypes.func.isRequired
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MapSelectionPanel)
