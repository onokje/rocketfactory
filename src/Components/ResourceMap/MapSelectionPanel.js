import React, {Component} from 'react';
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
import {findMineByCoords, findSectorByCoords} from "../../helpers/ResourceMapHelpers";
import ProgressBar from "../ProgressBar/ProgressBar";
import {exploreStart} from "../../actions/resourcemap";
import {handminingStart} from "../../actions/player";
import {buildMine} from "../../actions/mining";
import Mine from "../Mine/Mine";
import ItemList from "../ItemList/ItemList";
import {minePrices} from "../../gamedata/machines";
import {canAfford} from "../../helpers/InventoryHelper";
import uuidv4 from "uuid/v4";
import {playerHasScience} from "../../helpers/ScienceHelper";
import {icons} from "../ItemIcon/icons";


const mapStateToProps = state => ({
    player: state.player,
    science: state.science,
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
    buildMine: (resourceType, techType, id, x, y) => {
        dispatch(buildMine(resourceType, techType, id, x, y));
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
                        return <div className="exploring">
                            <div>Currently exploring this sector</div>
                            <ProgressBar completedPercentage={completedPercentage}/>
                        </div>
                    } else {


                        return <div className="exploring">
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

    buildMine(resourceType, techType, selectedCell) {
        const {inventory, buildMine} = this.props;

        const itemCost = minePrices[techType].slice(0);
        if (canAfford(inventory, itemCost)) {
            const uuid = uuidv4();
            buildMine(resourceType, techType, uuid, selectedCell.x, selectedCell.y);
        } else {
            console.log('you cannot afford this mine!');
        }
    };

    renderHandminingOptions(resource) {
        if (resource === 'none' || resource === 'base') {
            return null;
        }
        if (resource === 'oil') {
            return null;
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

    renderMines(selectedCell){
        if (selectedCell.resource === 'none' || selectedCell.resource === 'base') {
            return null;
        }

        const {mining, science} = this.props;
        const mine = findMineByCoords(mining.mines, selectedCell.x, selectedCell.y);
        if (mine) {
            return <Mine key={mine.id} mine={mine}/>
        } else {
            if (selectedCell.resource === 'oil') {
                return <div>
                    <div className="simpleDivider">
                        <h2>Build oil pump</h2>
                        <ItemList items={minePrices['pump']}/>
                        <button onClick={() => this.buildMine(selectedCell.resource, 'pump', selectedCell)} >Build</button>
                    </div>

                </div>
            } else {
                return <div>
                    <div className="simpleDivider">
                        <h2>Build coal-powered {selectedCell.resource} mine</h2>
                        <ItemList items={minePrices['coal1']}/>
                        <button onClick={() => this.buildMine(selectedCell.resource, 'coal1', selectedCell)} >Build</button>
                    </div>
                    {playerHasScience(science.sciences, 'electricity') ?
                    <div className="simpleDivider">
                        <h2>Build electric {selectedCell.resource} mine</h2>
                        <ItemList items={minePrices['electric1']}/>
                        <button onClick={() => this.buildMine(selectedCell.resource, 'electric1', selectedCell)} >Build</button>
                    </div> : ''}
                </div>
            }

        }

    }

    renderMiningOptions() {
        const {resourcemap} = this.props;
        if (resourcemap.mapSelected) {
            const selectedCell = findSectorByCoords(resourcemap.map, resourcemap.mapSelected.x, resourcemap.mapSelected.y);

            if (selectedCell.explored) {

                return <div>
                    {this.renderHandminingOptions(selectedCell.resource)}
                    {this.renderMines(selectedCell)}
                </div>

            }
        }
        return null;
    }

    renderSectorContents(selectedCell) {
        const styles = {};

        if (selectedCell.explored) {
            if (selectedCell.resource === 'none') {
                return <div className="sectorContents">
                    <div className="resourceIcon"> </div>
                    <p>This sector doesn't contain any resources.</p>
                </div>
            } else {
                styles.backgroundImage = `url(${icons[selectedCell.resource]})`;
                return <div className="sectorContents">
                    <div className="resourceNameAndIcon">
                        <div className="resourceIcon" style={styles} />
                        <div className="resourceName">{selectedCell.resource}</div>
                    </div>
                    <p>
                        This sector contains {selectedCell.resource}. {selectedCell.resource === 'oil' ? 'Oil cannot be mined by hand.' : 'Mine this by hand, or build an automated miner.'}
                        </p>
                </div>
            }
        } else {
            return <div className="sectorContents">This sector is currently unexplored. Explore it first to see if it contains any resources!</div>
        }

    }

    render() {
        const {resourcemap} = this.props;

        if (resourcemap.mapSelected) {

            const selectedCell = findSectorByCoords(resourcemap.map, resourcemap.mapSelected.x, resourcemap.mapSelected.y);
            return <div className="mapSelectionPanel">
                <h2>Selected sector: {selectedCell.x},{selectedCell.y}</h2>
                {this.renderSectorContents(selectedCell)}
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
    science: PropTypes.object.isRequired,
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
