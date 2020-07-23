import React, {Component} from 'react';
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
import {icons} from "../ItemIcon/icons";
import {selectCell} from "../../slices/resourceMapSlice";


const mapStateToProps = state => ({
    mining: state.mining,
    resourcemap: state.resourcemap
});

const mapDispatchToProps = {selectCell};

class Grid extends Component {

    renderCell(cell) {
        const {selectCell, resourcemap} = this.props;

        const styles = {};

        styles.top = cell.y * 40;
        styles.left = cell.x * 40;
        let cellClasses;

        if (cell.explored) {
            cellClasses = 'explored';
            const resource = cell.resource === 'oil' ? 'crudeOil' : cell.resource;
            styles.backgroundImage = `url(${icons[resource]})`;
        }
        if (resourcemap.exploring && resourcemap.exploringCoords.x === cell.x && resourcemap.exploringCoords.y === cell.y) {
            cellClasses = 'exploring';
        }

        if (resourcemap.mapSelected && resourcemap.mapSelected.x === cell.x && resourcemap.mapSelected.y === cell.y) {
            cellClasses = cellClasses + ' selected';
        }

        return <div
            className={cellClasses}
            key={cell.x + "-" + cell.y}
            style={styles}
            onClick={() => selectCell({x:cell.x, y:cell.y})}
        />;
    }

    render() {
        const {resourcemap} = this.props;

        return <div className="resourceMapGrid">
            {resourcemap.map.map(cell => this.renderCell(cell))}
        </div>;

    }
}

Grid.propTypes = {
    mining: PropTypes.object.isRequired,
    resourcemap: PropTypes.object.isRequired,
    selectCell: PropTypes.func.isRequired
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Grid)
