import React, {Component} from 'react';
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
import ProgressBar from "../ProgressBar/ProgressBar";
import "./PlayerCraftingBar.scss";
import ItemIcon from "../ItemIcon/ItemIcon";
import pick from '../../images/pick.png';

const mapStateToProps = state => ({
    manualProduction: state.manualProduction
});

const mapDispatchToProps = dispatch => ({

});

class PlayerCraftingBar extends Component {

    render() {
        const {manualProduction} = this.props;

        if (manualProduction.handmining && manualProduction.handminingResource) {
            const completedPercentage = manualProduction.handmining ? (manualProduction.handminingProgressTicks * 100 / manualProduction.handminingTicksCost) : 0;

            return (
                <div className="playerCraftingBar">
                    <div className={`playerCraftingBarInner`}>
                        <img src={pick}  alt={`mining`}/>
                        <ItemIcon toolTip={false} item={manualProduction.handminingResource} />
                    </div>
                    <ProgressBar completedPercentage={completedPercentage}/>
                </div>
            );
        }
        if (manualProduction.handcrafting && manualProduction.handcraftingItem) {
            const completedPercentage = manualProduction.handcrafting ? (manualProduction.handcraftingProgressTicks * 100 / manualProduction.handcraftingTicksCost) : 0;

            return (
                <div className="playerCraftingBar">
                    <div>Crafting: {manualProduction.handcraftingItem}</div>
                    <ProgressBar completedPercentage={completedPercentage}/>
                </div>
            );
        }


        return null;
    }
}

PlayerCraftingBar.propTypes = {
    manualProduction: PropTypes.object.isRequired,

};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PlayerCraftingBar)
