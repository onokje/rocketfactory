import React, {Component} from 'react';
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
import {buildMachine} from "../../actions/production";
import uuidv4 from "uuid/v4";


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
        return <div
            className="buildOption"
            key={buildOption.machineKey}
            onClick={canBuild ? () => this.buildMachineClick() : null}
        >
            <b>{buildOption.machineData.name}</b><br />
            Has science: {buildOption.hasScience ? 'yes' : 'no'} <br />
            Can afford: {buildOption.canAfford ? 'yes' : 'no'} <br />
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
