import React, {Component} from 'react';
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
import {canAfford} from "../../helpers/InventoryHelper";
import {researches, researchTicksMultiplier} from "../../gamedata/research";
import {itemRecipes} from "../../gamedata/items";
import {researchIcons} from "./researchIcons";
import "./Research.scss";
import {playerHasAllResearches, playerHasResearch} from "../../helpers/ResearchHelper";
import ItemList from "../ItemList/ItemList";
import ItemIcon from "../ItemIcon/ItemIcon";
import ResearchItem from "./ResearchItem";
import NameAndImageHeader from "../NameAndImageHeader/NameAndImageHeader";
import {startResearch} from "../../slices/researchSlice";


const mapStateToProps = state => ({
    player: state.player,
    research: state.research,
    inventory: state.inventory
});

const mapDispatchToProps = {startResearch};

class ResearchSelectionPanel extends Component {

    onStartResearch(researchId) {
        const {inventory, research, startResearch} = this.props;

        const selectedResearch = researches[researchId];
        if (canAfford(inventory, selectedResearch.cost)
            && !research.researching
            && !playerHasResearch(research.researchComplete, researchId)
            && playerHasAllResearches(research.researchComplete, selectedResearch.requiredResearch)) {
            startResearch({researchId, ticksCost: selectedResearch.time * researchTicksMultiplier});
        } else {
            console.log('cannot learn research ' + researchId);
        }
    };

    renderResearchRequired(researchRequired) {
        const {research} = this.props;
        if (!researchRequired.length) {
            return <p>None</p>
        }

        return researchRequired.map(researchRequiredId => <ResearchItem
            key={researchRequiredId}
            researchId={researchRequiredId}
            extraClass={playerHasResearch(research.researchComplete, researchRequiredId) ? 'researchItemGreen' : 'researchItemRed'}
        />);
    }

    renderResearchUnlocks(researchId) {
        const researchesUnlocked = [];

        for (const research in researches) {
            if (researches.hasOwnProperty(research)) {
                if (researches[research].requiredResearch.find(
                    requiredResearchId => requiredResearchId === researchId)
                ) {
                    researchesUnlocked.push(research);
                }
            }
        }

        return researchesUnlocked.map(researchId => <ResearchItem key={researchId} researchId={researchId}/>);
    }

    renderUnlocksItems(researchId) {
        const itemsUnlocked = [];

        for (const item in itemRecipes) {
            if (itemRecipes.hasOwnProperty(item)) {
                if (itemRecipes[item].researchRequired === researchId) {
                    itemsUnlocked.push(item);
                }
            }
        }

        return itemsUnlocked.map(item => <ItemIcon extraClasses={' itemIconSmall'} key={item} item={item}/>);
    }

    renderResearch(researchId) {
        const currentResearchData = researches[researchId];
        const {inventory, research} = this.props;
        let onClick;

        const canLearn = playerHasAllResearches(research.researchComplete, currentResearchData.requiredResearch);
        const hasResearch = playerHasResearch(research.researchComplete, researchId);
        if (canLearn && canAfford(inventory, currentResearchData.cost)) {
            onClick = () => this.onStartResearch(researchId);
        }

        return <>
            <NameAndImageHeader name={currentResearchData.name} imageSrc={researchIcons[researchId]} largeIcon={true} />
            <div className="researchInfo">

                {hasResearch ? <div>Research complete</div> : <>
                <ItemList
                    items={currentResearchData.cost}
                    label={'Cost to research:'}
                    time={currentResearchData.time + 'm'}
                />
                <div className="researchRequiredContainer">
                    <div>Research required:</div>
                    <div className="researchRequired">{this.renderResearchRequired(currentResearchData.requiredResearch)}</div>
                </div>
                </>}
                <div className="researchUnlocksContainer">
                    <div>Requirement for:</div>
                    <div className="researchUnlocks">{this.renderResearchUnlocks(researchId)}</div>
                </div>
                <div className="unlocksItemsContainer">
                    <div>Unlocks items:</div>
                    <div className="unlocksItems">{this.renderUnlocksItems(researchId)}</div>
                </div>
                {!hasResearch ? <button onClick={onClick}>Learn now</button> : ''}

            </div>
        </>;
    }

    render() {
        const {research} = this.props;

        return (
            <div className="researchSelectionPanel">
                {research.selectedResearch ?
                    this.renderResearch(research.selectedResearch)
                    : <p>Select a research on the left</p>}
            </div>
        );

    }
}

ResearchSelectionPanel.propTypes = {
    player: PropTypes.object.isRequired,
    research: PropTypes.object.isRequired,
    inventory: PropTypes.array.isRequired,
    startResearch: PropTypes.func.isRequired
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ResearchSelectionPanel)
