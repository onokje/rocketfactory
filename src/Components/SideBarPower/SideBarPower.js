import React, {Component} from 'react';
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";

const mapStateToProps = state => ({
    power: state.power
});

class SideBarPower extends Component {


    render() {
        const {power} = this.props;

        return (
            <div className="SideBarPower">

                <h2>Power overview:</h2>
                Produced last tick: <b>{power.powerProducedLastTick}</b> kW<br/>
                Used last tick: <b>{power.powerUsedLastTick}</b> kW<br/>
                Buffer (size/max: <b>{power.bufferCurrent} / {power.bufferMax}</b> kW<br/>
            </div>
        );

    }
}

SideBarPower.propTypes = {
    power: PropTypes.object.isRequired
};

export default connect(
    mapStateToProps,
    null
)(SideBarPower)
