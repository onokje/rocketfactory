import React, {Component} from 'react';
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
import {mineResource} from "../actions/resources";

const mapStateToProps = state => ({
    player: state.player,
    resources: state.resources
});

const mapDispatchToProps = dispatch => ({
    mineResource: (resourceType) => {
        dispatch(mineResource(resourceType));
    },

});

class ResourceProduction extends Component {

    render() {
        const {player, resources, mineResource} = this.props;

        if (player.initialized && player.tab === 'resourceProduction') {
            return (
                <div className="defaultContainer">
                    <h1>Resource production</h1>
                    <div className="simpleDivider">
                        <h2>Mine iron by hand</h2>
                        <div>Current Iron: <b>{resources.iron}</b></div>
                        <div>Maximum Iron storage: <b>{resources.resourceStorage}</b></div>
                        <button onClick={() => mineResource('iron')} >Mine!</button>
                    </div>

                    <div className="simpleDivider">
                        <h2>Mine coal by hand</h2>
                        <div>Current Coal: <b>{resources.coal}</b></div>
                        <div>Maximum Coal storage: <b>{resources.resourceStorage}</b></div>
                        <button onClick={() => mineResource('coal')} >Mine!</button>
                    </div>
                </div>
            );
        }

        return null;

    }
}

ResourceProduction.propTypes = {
    player: PropTypes.object.isRequired,
    resources: PropTypes.object.isRequired,
    mineResource: PropTypes.func.isRequired
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ResourceProduction)
