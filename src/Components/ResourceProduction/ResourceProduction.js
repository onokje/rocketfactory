import React, {Component} from 'react';
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
import ProductionCost from "../ProductionCost/ProductionCost";
import {coalMine1Price, electricMine1Price} from "../../helpers/gameData";
import {canAfford} from "../../helpers/InventoryHelper";
import uuidv4 from "uuid/v4";
import {buildMine} from "../../actions/mining";
import Mine from "../Mine/Mine";
import {handminingStart} from "../../actions/player";

const mapStateToProps = state => ({
    player: state.player,
    inventory: state.inventory,
    power: state.power,
    mining: state.mining
});

const mapDispatchToProps = dispatch => ({
    handminingStart: (resourceType) => {
        dispatch(handminingStart(resourceType));
    },
    buildMine: (resourceType, techType, id) => {
        dispatch(buildMine(resourceType, techType, id));
    },


});

class ResourceProduction extends Component {

    buildMine(resourceType, techType, itemCost) {
        const {inventory, buildMine} = this.props;

        if (canAfford(inventory, itemCost)) {
            const uuid = uuidv4();
            buildMine(resourceType, techType, uuid);
        } else {
            console.log('you cannot afford this mine!');
        }
    };

    renderHandMining() {
        const {player, handminingStart} = this.props;
        let buttonsDisabled = false;
        if (player.handmining || player.handcrafting) {
            buttonsDisabled = true;
        }

        return <div className="simpleDivider">
            <h2>Mine by hand</h2>
            <button disabled={buttonsDisabled} onClick={() => handminingStart('iron')} >Mine iron!</button>
            <button disabled={buttonsDisabled} onClick={() => handminingStart('coal')} >Mine coal!</button>
            <button disabled={buttonsDisabled} onClick={() => handminingStart('stone')} >Mine stone!</button>
            <button disabled={buttonsDisabled} onClick={() => handminingStart('copper')} >Mine copper!</button>
        </div>;

    }

    render() {
        const {player, mining} = this.props;

        const totalMines = mining.mines.length;

        if (player.initialized && player.tab === 'resourceProduction') {
            return (
                <div className="defaultContainer">
                    <h1>Resource production</h1>
                    {this.renderHandMining()}

                    <div className="simpleDivider">
                        <h2>Construct coal-powered coal mine</h2>
                        <ProductionCost items={coalMine1Price}/>
                        <button onClick={() => this.buildMine('coal', 'coal1', coalMine1Price)} >Build coal-powered coal mine!</button>
                    </div>
                    <div className="simpleDivider">
                        <h2>Construct eletric iron ore mine</h2>
                        <ProductionCost items={electricMine1Price}/>
                        <button onClick={() => this.buildMine('iron', 'electric1', electricMine1Price)} >Build eletric iron ore mine</button>
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
    handminingStart: PropTypes.func.isRequired,
    buildMine: PropTypes.func.isRequired
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ResourceProduction)
