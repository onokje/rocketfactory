import React, {Component} from 'react';
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
import {mineResource} from "../actions/inventory";
import ProductionCost from "./ProductionCost";
import {coalMine1Price} from "../helpers/gameData";
import {canAfford} from "../helpers/InventoryHelper";
import uuidv4 from "uuid/v4";
import {buildMine} from "../actions/mining";
import Mine from "./Mine";

const mapStateToProps = state => ({
    player: state.player,
    inventory: state.inventory,
    power: state.power,
    mining: state.mining
});

const mapDispatchToProps = dispatch => ({
    mineResource: (resourceType) => {
        dispatch(mineResource(resourceType));
    },
    buildMine: (resourceType, techType, id) => {
        dispatch(buildMine(resourceType, techType, id));
    },


});

class ResourceProduction extends Component {

    buildCoalMine = () => {
        const {inventory, buildMine} = this.props;

        if (canAfford(inventory, coalMine1Price)) {
            const uuid = uuidv4();
            buildMine('coal', 'coal1', uuid);
        } else {
            console.log('you cannot afford a coal powered coal mine!');
        }
    };

    render() {
        const {player, mineResource, mining} = this.props;

        const totalMines = mining.mines.length;

        if (player.initialized && player.tab === 'resourceProduction') {
            return (
                <div className="defaultContainer">
                    <h1>Resource production</h1>
                    <div className="simpleDivider">
                        <h2>Mine by hand</h2>
                        <button onClick={() => mineResource('iron')} >Mine iron!</button>
                        <button onClick={() => mineResource('coal')} >Mine coal!</button>
                        <button onClick={() => mineResource('stone')} >Mine stone!</button>
                        <button onClick={() => mineResource('copper')} >Mine copper!</button>
                    </div>

                    <div className="simpleDivider">
                        <h2>Construct coal-powered coal mine</h2>
                        <ProductionCost items={coalMine1Price}/>
                        <button onClick={this.buildCoalMine} >Build coal-powered coal mine!</button>
                    </div>

                    <div className="simpleDivider">
                        <h2>Mines:</h2>
                        {mining.mines.map(mine => (<Mine key={mine.id} mine={mine}/>))}

                        {!totalMines ? (<div>You do not have any mines</div>) : ''}
                    </div>

                </div>
            );
        }

        return null;

    }
}

ResourceProduction.propTypes = {
    player: PropTypes.object.isRequired,
    inventory: PropTypes.array.isRequired,
    power: PropTypes.object.isRequired,
    mining: PropTypes.object.isRequired,
    mineResource: PropTypes.func.isRequired,
    buildMine: PropTypes.func.isRequired
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ResourceProduction)
