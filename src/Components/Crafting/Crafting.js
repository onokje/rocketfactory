import React, {Component} from 'react';
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";

import {canAfford} from "../../helpers/InventoryHelper";
import ProductionCost from "../ProductionCost/ProductionCost";
import uuidv4 from "uuid/v4";
import {buildAssembler} from "../../actions/crafting";
import {assemblerPrices} from "../../helpers/gameData";
import Assembler from "../Assembler/Assembler";
import {playerHasScience} from "../../helpers/ScienceHelper";

const mapStateToProps = state => ({
    player: state.player,
    science: state.science,
    inventory: state.inventory,
    crafting: state.crafting
});

const mapDispatchToProps = dispatch => ({
    buildAssembler: (techType, id) => {
        dispatch(buildAssembler(techType, id));
    },

});

class Crafting extends Component {

    buildAssembler = (techType) => {
        const {inventory, buildAssembler} = this.props;

        if (canAfford(inventory, assemblerPrices[techType])) {
            const uuid = uuidv4();
            buildAssembler(techType, uuid);
        } else {
            console.log('you cannot afford this assembler!');
        }
    };

    render() {
        const {player, crafting, science} = this.props;
        const totalAssemblers = crafting.assemblers.length;

        if (player.initialized && player.tab === 'crafting') {

            if (!playerHasScience(science.sciences, 'automation1')){
                return <div className="defaultContainer">
                    <h1>Automated crafting</h1>
                    <p>Research Automation 1 first.</p>
                </div>
            }

            return (
                <div className="defaultContainer">
                    <h1>Automated crafting</h1>
                    <div className="simpleDivider">
                        <h2>Construct new assembler</h2>
                        <ProductionCost items={assemblerPrices['assembler1']}/>
                        <button onClick={() => this.buildAssembler('assembler1')} >Build assembler</button>
                    </div>
                    <div className="simpleDivider">
                        <h2>Assemblers:</h2>
                        {crafting.assemblers.map(assembler => (<Assembler key={assembler.id} assembler={assembler}/>))}

                        {!totalAssemblers ? (<div>You do not have any assemblers</div>) : ''}
                    </div>
                </div>
            );
        }

        return null;

    }
}

Crafting.propTypes = {
    player: PropTypes.object.isRequired,
    science: PropTypes.object.isRequired,
    inventory: PropTypes.array.isRequired,
    crafting: PropTypes.object.isRequired,
    buildAssembler: PropTypes.func.isRequired
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Crafting)
