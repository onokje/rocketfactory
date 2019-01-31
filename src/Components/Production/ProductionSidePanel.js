import React, {Component} from 'react';
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
import {machines} from "../../gamedata/machines";
import {playerHasScience} from "../../helpers/ScienceHelper";
import {canAfford} from "../../helpers/InventoryHelper";
import {buildMachine} from "../../actions/production";
import MachineBuildOption from "../MachineBuildOptions/MachineBuildOption";
import HandCrafting from "./HandCrafting";


const mapStateToProps = state => ({
    production: state.production,
    science: state.science,
    inventory: state.inventory,
});

const mapDispatchToProps = dispatch => ({
    buildMachine: (productionType, techType, id) => {
        dispatch(buildMachine(productionType, techType, id));
    },

});

class ProductionSidePanel extends Component {

    getBuildOptions() {
        const {science, inventory} = this.props;
        const options = [];

        for (let machine in machines) {
            if (machines.hasOwnProperty(machine)) {
                options.push({
                    machineKey: machine,
                    machineData: machines[machine],
                    hasScience: playerHasScience(science.sciences, machines[machine].scienceRequired),
                    canAfford: canAfford(inventory, machines[machine].cost)
                });
            }
        }
        return options;
    }

    render() {

        return <div className="productionSidePanel">
            <h2>build options:</h2>
            <div className="buildOptions">
                {this.getBuildOptions().map(item => <MachineBuildOption buildOption={item}/>)}

            </div>
            <h2>Handcrafting:</h2>
            <HandCrafting/>

        </div>
    }
}

ProductionSidePanel.propTypes = {
    production: PropTypes.object.isRequired,
    science: PropTypes.object.isRequired,
    inventory: PropTypes.object.isRequired,
    buildMachine: PropTypes.func.isRequired,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductionSidePanel)
