import React, {Component} from 'react';
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
import {mineResource} from "../actions/inventory";

const mapStateToProps = state => ({
    player: state.player
});

const mapDispatchToProps = dispatch => ({
    mineResource: (resourceType) => {
        dispatch(mineResource(resourceType));
    },

});

class ResourceProduction extends Component {

    render() {
        const {player, mineResource} = this.props;

        if (player.initialized && player.tab === 'resourceProduction') {
            return (
                <div className="defaultContainer">
                    <h1>Resource production</h1>
                    <div className="simpleDivider">
                        <h2>Mine by hand</h2>
                        <button onClick={() => mineResource('iron')} >Mine iron!</button>
                        <button onClick={() => mineResource('coal')} >Mine coal!</button>
                        <button onClick={() => mineResource('stone')} >Mine stone!</button>
                    </div>

                </div>
            );
        }

        return null;

    }
}

ResourceProduction.propTypes = {
    player: PropTypes.object.isRequired,
    mineResource: PropTypes.func.isRequired
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ResourceProduction)
