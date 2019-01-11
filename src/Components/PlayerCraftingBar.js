import React, {Component} from 'react';
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
import ProgressBar from "./ProgressBar";


const mapStateToProps = state => ({
    player: state.player,
    // inventory: state.inventory,
    // power: state.power,
    // smelting: state.smelting
});

const mapDispatchToProps = dispatch => ({


});

class PlayerCraftingBar extends Component {


    render() {
        const {player} = this.props;

        if (player.handmining && player.handminingResource) {
            const completedPercentage = player.handmining ? (player.handminingProgressTicks * 100 / player.handminingTicksCost) : 0;

            return (
                <div className="playerCraftingBar">
                    <div>Currently Mining {player.handminingResource}</div>
                    <ProgressBar completedPercentage={completedPercentage}/>
                </div>
            );
        } else {
            return null;
        }

    }
}

PlayerCraftingBar.propTypes = {
    player: PropTypes.object.isRequired,

};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PlayerCraftingBar)
