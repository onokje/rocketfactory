import React, {Component} from 'react';
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";

import {canAfford} from "../../helpers/InventoryHelper";
import {startScience} from "../../actions/science";

import {sciences, scienceTicksMuliplier} from "../../gamedata/science";
import {itemRecipes} from "../../gamedata/items";
import {scienceIcons} from "./scienceIcons";
import "./Science.scss";
import {playerHasAllSciences, playerHasScience} from "../../helpers/ScienceHelper";
import ItemList from "../ItemList/ItemList";
import ItemIcon from "../ItemIcon/ItemIcon";
import ScienceItem from "./ScienceItem";


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

class ScienceSelectionPanel extends Component {

    onStartScience(scienceId) {
        const {inventory, science, startScience} = this.props;

        const selectedScience = sciences[scienceId];
        if (canAfford(inventory, selectedScience.cost)
            && !science.researching
            && !playerHasScience(science.sciences, scienceId)
            && playerHasAllSciences(science.sciences, selectedScience.requiredScience)) {
            startScience(scienceId, selectedScience.time * scienceTicksMuliplier);
        } else {
            console.log('cannot learn science ' + scienceId);
        }
    };

    renderScienceRequired(sciencesRequired) {
        const {science} = this.props;
        if (!sciencesRequired.length) {
            return <p>None</p>
        }

        return sciencesRequired.map(scienceRequiredId => <ScienceItem
            scienceId={scienceRequiredId}
            extraClass={playerHasScience(science.sciences, scienceRequiredId) ? 'scienceItemGreen' : 'scienceItemRed'}
        />);
    }

    renderScienceUnlocks(scienceId) {
        const sciencesUnlocked = [];

        for (const science in sciences) {
            if (sciences.hasOwnProperty(science)) {
                if (sciences[science].requiredScience.find(
                    requiredScienceId => requiredScienceId === scienceId)
                ) {
                    sciencesUnlocked.push(science);
                }
            }
        }

        return sciencesUnlocked.map(scienceId => <ScienceItem scienceId={scienceId}/>);
    }

    renderUnlocksItems(scienceId) {
        const itemsUnlocked = [];

        for (const item in itemRecipes) {
            if (itemRecipes.hasOwnProperty(item)) {
                if (itemRecipes[item].scienceRequired === scienceId) {
                    itemsUnlocked.push(item);
                }
            }
        }

        return itemsUnlocked.map(item => <ItemIcon item={item}/>);
    }

    renderScience(scienceId) {
        const currentScienceData = sciences[scienceId];
        const {inventory, science} = this.props;
        let onClick;

        const canLearn = playerHasAllSciences(science.sciences, currentScienceData.requiredScience);
        const hasScience = playerHasScience(science.sciences, scienceId);
        if (canLearn && canAfford(inventory, currentScienceData.cost)) {
            onClick = () => this.onStartScience(scienceId);
        }

        return <>
            <div className="scienceHeader">
                <div className="scienceIcon"> <img alt={currentScienceData.name} src={scienceIcons[scienceId]} /></div>
                <div className="scienceName"> {currentScienceData.name}</div>
            </div>
            <div className="scienceInfo">

                {hasScience ? <div>Research complete</div> : <>
                <ItemList
                    items={currentScienceData.cost}
                    label={'Cost to research:'}
                    time={currentScienceData.time + 'm'}
                />
                <div className="scienceRequiredContainer">
                    <div>Research required:</div>
                    <div className="scienceRequired">{this.renderScienceRequired(currentScienceData.requiredScience)}</div>
                </div>
                </>}
                <div className="scienceUnlocksContainer">
                    <div>Requirement for:</div>
                    <div className="scienceUnlocks">{this.renderScienceUnlocks(scienceId)}</div>
                </div>
                <div className="unlocksItemsContainer">
                    <div>Unlocks items:</div>
                    <div className="unlocksItems">{this.renderUnlocksItems(scienceId)}</div>
                </div>
                {!hasScience ? <button onClick={onClick}>Learn now</button> : ''}

            </div>
        </>;
    }

    render() {
        const {science} = this.props;

        return (
            <div className="scienceSelectionPanel">
                {science.selectedScience ?
                    this.renderScience(science.selectedScience)
                    : <p>Select a research on the left</p>}

            </div>
        );

    }
}

ScienceSelectionPanel.propTypes = {
    player: PropTypes.object.isRequired,
    science: PropTypes.object.isRequired,
    inventory: PropTypes.array.isRequired,
    startScience: PropTypes.func.isRequired
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ScienceSelectionPanel)
