import React, {Component} from 'react';
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
import {findMineByCoords, findSectorByCoords} from "../../helpers/ResourceMapHelpers";
import ProgressBar from "../ProgressBar/ProgressBar";
import {exploreStart} from "../../actions/resourcemap";
import {handminingStart} from "../../actions/player";
import {buildMine} from "../../actions/mining";
import Mine from "../Mine/Mine";
import {minePrices} from "../../gamedata/machines";
import {canAfford} from "../../helpers/InventoryHelper";
import uuidv4 from "uuid/v4";
import {playerHasScience} from "../../helpers/ScienceHelper";
import {icons} from "../ItemIcon/icons";
import MachineBuildOption from "../MachineBuildOptions/MachineBuildOption";


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

    buildMine(techType, selectedCell) {
        const {inventory, buildMine} = this.props;

        const itemCost = minePrices[techType].cost.slice(0);
        if (canAfford(inventory, itemCost)) {
            const uuid = uuidv4();
            buildMine(selectedCell.resource, techType, uuid, selectedCell.x, selectedCell.y);
        } else {
            console.log('you cannot afford this mine!');
        }
    };

    renderHandminingOptions(resource) {
        if (resource === 'none' || resource === 'base' || resource === 'oil') {
            return null;
        }

        const {player, handminingStart} = this.props;
        let buttonDisabled = false;
        if (player.handmining || player.handcrafting) {
            buttonDisabled = true;
        }

        return <div className="simpleDivider">
            <h2>Mine by hand</h2>
            <button disabled={buttonDisabled} onClick={() => handminingStart(resource)} >Mine {resource}</button>
        </div>;
    }

    getBuildOptions(selectedCell) {
        const {science, inventory} = this.props;
        const options = [];

        for (let mine in minePrices) {
            if (minePrices.hasOwnProperty(mine)) {
                if ((selectedCell.resource === 'oil' && minePrices[mine].type === 'pump')
                    || (selectedCell.resource !== 'oil' && minePrices[mine].type !== 'pump')) {
                    options.push({
                        machineKey: mine,
                        machineData: minePrices[mine],
                        hasScience: playerHasScience(science.sciences, minePrices[mine].scienceRequired),
                        canAfford: canAfford(inventory, minePrices[mine].cost)
                    });
                }

            }
        }
        return options;
    }

    renderMines(selectedCell){
        if (selectedCell.resource === 'none' || selectedCell.resource === 'base') {
            return null;
        }

        const {mining} = this.props;
        const mine = findMineByCoords(mining.mines, selectedCell.x, selectedCell.y);
        if (mine) {
            return <Mine key={mine.id} mine={mine}/>
        } else {
            return <div>

                <h2>build options:</h2>
                <div className="buildOptions">
                    {this.getBuildOptions(selectedCell).map(item => <MachineBuildOption
                        key={item.machineKey}
                        buildOption={item}
                        machineType="mine"
                        onClick={() => this.buildMine(item.machineKey, selectedCell)}
                    />)}

                </div>

            </div>

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
