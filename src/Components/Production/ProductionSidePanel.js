import React, {Component} from 'react';
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
import {machines} from "../../gamedata/machines";
import {playerHasScience} from "../../helpers/ScienceHelper";
import {canAfford} from "../../helpers/InventoryHelper";
import {buildMachine} from "../../actions/production";
import MachineBuildOption from "../MachineBuildOptions/MachineBuildOption";
import HandCrafting from "./HandCrafting";
import { v4 as uuidv4 } from 'uuid';


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

    handleBuildMachineClick(buildOption){
        const {buildMachine} = this.props;

        if (buildOption.hasScience && buildOption.canAfford) {
            const uuid = uuidv4();

            buildMachine(buildOption.machineData.type, buildOption.machineKey, uuid);
        } else {
            console.log('Cannot build this machine...');
        }
    }

    render() {

        return <div className="productionSidePanel">
            <h2>build options:</h2>
            <div className="buildOptions">
                {this.getBuildOptions().map(item => <MachineBuildOption
                    key={item.machineKey}
                    buildOption={item}
                    machineType="production"
                    onClick={() => this.handleBuildMachineClick(item)}
                />)}

            </div>
            <h2>Handcrafting:</h2>
            <HandCrafting/>

        </div>
    }
}

ProductionSidePanel.propTypes = {
    production: PropTypes.object.isRequired,
    science: PropTypes.object.isRequired,
    inventory: PropTypes.array.isRequired,
    buildMachine: PropTypes.func.isRequired,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductionSidePanel)
