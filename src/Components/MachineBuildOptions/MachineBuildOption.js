import React, {Component} from 'react';
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
import {buildMachine} from "../../actions/production";
import uuidv4 from "uuid/v4";
import ItemList from "../ItemList/ItemList";


const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
    buildMachine: (productionType, techType, id) => {
        dispatch(buildMachine(productionType, techType, id));
    },

});

class MachineBuildOption extends Component {

    buildMachineClick(){
        const {buildMachine, buildOption} = this.props;
        const canBuild = buildOption.hasScience && buildOption.canAfford;

        if (!canBuild) {
            console.log ('Cannot build this machine...');
        } else {
            const uuid = uuidv4();
            buildMachine(buildOption.machineData.type, buildOption.machineKey, uuid);
        }
    }

    render() {
        const {buildOption} = this.props;

        const canBuild = buildOption.hasScience && buildOption.canAfford;
        let extraClasses = buildOption.hasScience ? '' : ' missingScience';
        return <div
            className={`buildOption ${extraClasses}`}
            key={buildOption.machineKey}
            onClick={canBuild ? () => this.buildMachineClick() : null}
        >
            <b>{buildOption.machineData.name}</b><br />
            <ItemList items={buildOption.machineData.cost}/>
        </div>

    }
}

MachineBuildOption.propTypes = {
    buildOption: PropTypes.object.isRequired,
    buildMachine: PropTypes.func.isRequired,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MachineBuildOption)
