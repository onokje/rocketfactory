import React, {Component} from 'react';
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
import {machines} from "../../gamedata/machines";
import {playerHasResearch} from "../../helpers/ResearchHelper";
import {canAfford} from "../../helpers/InventoryHelper";
import MachineBuildOption from "../MachineBuildOptions/MachineBuildOption";
import HandCrafting from "./HandCrafting";
import { v4 as uuidv4 } from 'uuid';
import {buildMachine} from "../../slices/productionSlice";


const mapStateToProps = state => ({
    production: state.production,
    research: state.research,
    inventory: state.inventory,
});

const mapDispatchToProps = {buildMachine};

class ProductionSidePanel extends Component {

    getBuildOptions() {
        const { research, inventory} = this.props;
        const options = [];

        for (let machine in machines) {
            if (machines.hasOwnProperty(machine)) {
                options.push({
                    machineKey: machine,
                    machineData: machines[machine],
                    hasResearch: playerHasResearch(research.researchComplete, machines[machine].researchRequired),
                    canAfford: canAfford(inventory, machines[machine].cost)
                });
            }
        }
        return options;
    }

    handleBuildMachineClick(buildOption){
        const {buildMachine} = this.props;

        if (buildOption.hasResearch && buildOption.canAfford) {
            const uuid = uuidv4();

            buildMachine({productionType: buildOption.machineData.type, techType:buildOption.machineKey, id: uuid});
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
    research: PropTypes.object.isRequired,
    inventory: PropTypes.array.isRequired,
    buildMachine: PropTypes.func.isRequired,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductionSidePanel)
