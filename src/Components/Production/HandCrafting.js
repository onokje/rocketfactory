import React, {Component} from 'react';
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
import {itemRecipes} from "../../gamedata/items";
import {canAfford} from "../../helpers/InventoryHelper";
import ItemIcon from "../ItemIcon/ItemIcon";
import {playerHasResearch} from "../../helpers/ResearchHelper";
import {handCraftingStart} from "../../slices/manualProductionSlice";

const mapStateToProps = state => ({
    manualProduction: state.manualProduction,
    research: state.research,
    inventory: state.inventory
});

const mapDispatchToProps = {handCraftingStart};

class HandCrafting extends Component {

    renderHandCraftingButton(entry) {
        if (entry[1].handcrafting) {
            const itemKey =  entry[0];
            const {manualProduction, handCraftingStart, inventory, research} = this.props;
            let onClick = null;
            const hasResearch = playerHasResearch(research.researchComplete, entry[1].researchRequired);
            const extraClasses = !hasResearch ? 'notCraftable' : '';

            if (
                !manualProduction.handmining
                && !manualProduction.handcrafting
                && canAfford(inventory, entry[1].cost)
                && hasResearch) {
                onClick = () => handCraftingStart({item: itemKey, itemCost:entry[1].cost});
            }

            return <ItemIcon
                key={itemKey}
                item={itemKey}
                amount={entry[1].resultAmount}
                onClick={onClick}
                showResearchRequired={!hasResearch}
                extraClasses={extraClasses}
            />

        }
        return null;
    }

    render() {
        return (

            <div className="itembuttons">
                {Object.entries(itemRecipes).map(entry => this.renderHandCraftingButton(entry))}
            </div>

        );

    }
}

HandCrafting.propTypes = {
    manualProduction: PropTypes.object.isRequired,
    research: PropTypes.object.isRequired,
    inventory: PropTypes.array.isRequired,
    handCraftingStart: PropTypes.func.isRequired
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HandCrafting)
