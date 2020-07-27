import React, {Component} from 'react';
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
import {icons} from "../ItemIcon/icons";
import {selectCell} from "../../slices/resourceMapSlice";
import MachineStateV2 from "../MachineState/MachineStateV2";
import ProgressBar from "../ProgressBar/ProgressBar";


const mapStateToProps = state => ({
    mining: state.mining,
    resourceMap: state.resourcemap
});

const mapDispatchToProps = {selectCell};

class Grid extends Component {


    renderMininigActivityOnCell (cell) {
        const {mining} = this.props;

        const mineOnCell = mining.mines.find(mine => mine.x === cell.x && mine.y === cell.y);
        if (mineOnCell) {
            let stateClass
            if (mineOnCell.off) {
                stateClass = 'off';
            } else {
                if (mineOnCell.powered ) {
                    stateClass = 'running';
                } else {
                    stateClass = 'nopower';
                }
            }

            const completedPercentage = mineOnCell.on ? (mineOnCell.progressTicks * 100 / mineOnCell.ticksCost) : 0;

            return <div className={`gridCellMine`}>
                <MachineStateV2 stateClass={stateClass} />
                <ProgressBar completedPercentage={completedPercentage} extraClasses={'progressbar_mini'}/>
            </div>;
        }
        return null;
    }

    renderCell(cell) {
        const {selectCell, resourceMap} = this.props;

        const styles = {};

        styles.top = cell.y * 40;
        styles.left = cell.x * 40;
        let cellClasses;

        if (cell.explored) {
            cellClasses = 'explored';
            const resource = cell.resource === 'oil' ? 'crudeOil' : cell.resource;
            styles.backgroundImage = `url(${icons[resource]})`;
        }
        if (resourceMap.exploring && resourceMap.exploringCoords.x === cell.x && resourceMap.exploringCoords.y === cell.y) {
            cellClasses = 'exploring';
        }

        if (resourceMap.mapSelected && resourceMap.mapSelected.x === cell.x && resourceMap.mapSelected.y === cell.y) {
            cellClasses = cellClasses + ' selected';
        }

        return <div
            className={cellClasses}
            key={cell.x + "-" + cell.y}
            style={styles}
            onClick={() => selectCell({x:cell.x, y:cell.y})}
        >{this.renderMininigActivityOnCell(cell)}</div>;
    }

    render() {
        const {resourceMap} = this.props;

        return <div className="resourceMapGrid">
            {resourceMap.map.map(cell => this.renderCell(cell))}
        </div>;

    }
}

Grid.propTypes = {
    mining: PropTypes.object.isRequired,
    resourceMap: PropTypes.object.isRequired,
    selectCell: PropTypes.func.isRequired
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Grid)
