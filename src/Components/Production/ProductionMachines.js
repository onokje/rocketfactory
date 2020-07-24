import React, {Component} from 'react';
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
import Machine from "./Machine";

const mapStateToProps = state => ({
    production: state.production
});

const mapDispatchToProps = dispatch => ({
});

class ProductionMachines extends Component {
    render() {
        const {production} = this.props;

        return <div className="productionMachines">
            <h1>Production machines</h1>
            <ul className="machineList">
            {production.machines.filter(machine => machine.productionType === 'smelting').map(machine => <Machine key={machine.id} machine={machine}/>)}
            </ul>
            <ul className="machineList">
                {production.machines.filter(machine => machine.productionType === 'crafting').map(machine => <Machine key={machine.id} machine={machine}/>)}
            </ul>
            <ul className="machineList">
                {production.machines.filter(machine => machine.productionType === 'refinary' || machine.productionType === 'chemicalPlant').map(machine => <Machine key={machine.id} machine={machine}/>)}
            </ul>
        </div>
    }
}

ProductionMachines.propTypes = {
    production: PropTypes.object.isRequired,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductionMachines)
