import React, {Component} from 'react';
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
import {selectCell} from "../../actions/resourcemap";

const mapStateToProps = state => ({
    mining: state.mining,
    resourcemap: state.resourcemap
});

const mapDispatchToProps = dispatch => ({
    selectCell: (x, y) => {
        dispatch(selectCell(x, y))
    },
});

class Grid extends Component {

    renderCell(cell) {
        const {selectCell, resourcemap} = this.props;

        const top = cell.y * 40;
        const left = cell.x * 40;
        let cellClasses;

        if (cell.explored) {
            cellClasses = cell.resource;
        }
        if (resourcemap.mapSelected && resourcemap.mapSelected.x === cell.x && resourcemap.mapSelected.y === cell.y) {
            cellClasses = cellClasses + ' selected';
        }

        return <div
            className={cellClasses}
            key={cell.x + "-" + cell.y}
            style={{top: top, left: left}}
            onClick={() => selectCell(cell.x, cell.y)}
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