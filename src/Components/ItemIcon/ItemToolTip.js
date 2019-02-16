import React, { Component } from 'react';
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
import {icons} from "./icons";
import "./ItemIcon.scss";
import {getItemAmountByName} from "../../helpers/InventoryHelper";
import {itemRecipes} from "../../gamedata/items";
import ScienceItem from "../Science/ScienceItem";
import ItemRecipe from "../ItemRecipe/ItemRecipe";
import NameAndImageHeader from "../NameAndImageHeader/NameAndImageHeader";

const mapStateToProps = state => ({
    inventory: state.inventory
});

const mapDispatchToProps = dispatch => ({
});

class ItemToolTip extends Component {

    renderCraftingRecipe(){
        const {item} = this.props;
        if (itemRecipes.hasOwnProperty(item) && itemRecipes[item].type !== 'resource') {
            const recipe = itemRecipes[item];
            return <div>
                <h2>How to make:</h2>
                <p>Type: {recipe.type}{recipe.handcrafting ? ', handcrafting' : ''}</p>
                <ItemRecipe recipeKey={item} showToolTips={false} />
            </div>

        }
        return null;
    }

    renderScienceRequired() {
        const {item, showScienceRequired} = this.props;
        if (showScienceRequired) {
            return <div className="requiredScienceMissing">
                <div>Required Science missing:</div>
                <ScienceItem
                    scienceId={itemRecipes[item].scienceRequired}
                    extraClass={'scienceItemRed'}
                />
            </div>
        }
        return null;
    }

    render() {

        const {item, inventory} = this.props;

        return <div>
            <NameAndImageHeader name={itemRecipes[item].name || item} imageSrc={icons[item]}/>
            <p>You have: <b>{getItemAmountByName(inventory, item)}</b></p>

            {this.renderCraftingRecipe()}
            {this.renderScienceRequired()}

        </div>
    }
}

ItemToolTip.propTypes = {
    inventory: PropTypes.array.isRequired,
    item: PropTypes.string.isRequired,
    amount: PropTypes.number,
    showScienceRequired: PropTypes.bool,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ItemToolTip)