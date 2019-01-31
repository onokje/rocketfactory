import React, {Component} from 'react';
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";

import "./Production.scss";
import ProductionMachines from "./ProductionMachines";
import ProductionSidePanel from "./ProductionSidePanel";

const mapStateToProps = state => ({
    player: state.player
});

const mapDispatchToProps = dispatch => ({
});

class Production extends Component {
    render() {
        const {player} = this.props;

        if (player.initialized && player.tab === 'production') {

            return (
                <div className="defaultContainer productionContainer">
                    <ProductionMachines/>
                    <ProductionSidePanel/>
                </div>
            );
        }

        return null;
    }
}

Production.propTypes = {
    player: PropTypes.object.isRequired,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Production)
