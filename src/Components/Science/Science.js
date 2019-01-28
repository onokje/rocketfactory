import React, {Component} from 'react';
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";

import {canAfford} from "../../helpers/InventoryHelper";
import {startScience} from "../../actions/science";

import {sciences, scienceTicksMuliplier} from "../../helpers/gameDataScience";
import {scienceIcons} from "./scienceIcons";
import "./Science.scss";
import {playerHasAllSciences, playerHasScience} from "../../helpers/ScienceHelper";
import ProductionCost from "../ProductionCost/ProductionCost";


const mapStateToProps = state => ({
    player: state.player,
    science: state.science,
    inventory: state.inventory
});

const mapDispatchToProps = dispatch => ({
    startScience: (scienceId, ticksCost) => {
        dispatch(startScience(scienceId, ticksCost));
    },

});

class Science extends Component {

    onStartScience(scienceId) {
        const {inventory, science, startScience} = this.props;

        const selectedScience = sciences[scienceId];
        if (canAfford(inventory, selectedScience.cost)
            && !playerHasScience(science.sciences, scienceId)
            && playerHasAllSciences(science.sciences, selectedScience.requiredScience)) {
            startScience(scienceId, selectedScience.time * scienceTicksMuliplier);
        } else {
            console.log('cannot learn science ' + scienceId);
        }
    };

    renderScience(entry) {
        const scienceId = entry[0];
        const currentScienceData = entry[1];
        const {inventory, science} = this.props;
        let onClick;

        const canLearn = playerHasAllSciences(science.sciences, currentScienceData.requiredScience);
        if (canLearn && canAfford(inventory, currentScienceData.cost)) {
            onClick = () => this.onStartScience(scienceId);
        }

        return <div key={scienceId} onClick={onClick} className={`scienceItem ${canLearn ? 'learnable' : ''}`}>
            <div className="scienceIcon"> <img src={scienceIcons[scienceId]} /></div>
            <div className="scienceInfo">
                <div className="scienceName"> {currentScienceData.name}</div>
                <ProductionCost items={currentScienceData.cost} label={'Cost to research:'}/>

            </div>
        </div>;
    }

    render() {
        const {player} = this.props;




        if (player.initialized && player.tab === 'science') {
            return (
                <div className="defaultContainer">
                    <h1>Research</h1>
                    {Object.entries(sciences).map(entry => this.renderScience(entry))}
                </div>
            );
        }

        return null;

    }
}

Science.propTypes = {
    player: PropTypes.object.isRequired,
    science: PropTypes.object.isRequired,
    inventory: PropTypes.array.isRequired,
    startScience: PropTypes.func.isRequired
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Science)
