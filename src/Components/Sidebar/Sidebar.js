import React, { Component } from 'react';
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
import {switchTab} from "../../actions/player";
import Inventory from "../Inventory/Inventory";
import SideBarPower from "../SideBarPower/SideBarPower";
import PlayerCraftingBar from "../PlayerCraftingBar/PlayerCraftingBar";

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
    switchTab: (tab) => {
        dispatch(switchTab(tab));
    },

});

class SideBar extends Component {
    render() {
        const {switchTab} = this.props;
        return (
            <div className="sidebar">
                <h2>Sidebar!</h2>
                <nav className="tabs">
                    <div onClick={() => switchTab('resourceProduction')}>
                        Resource production
                    </div>
                    <div onClick={() => switchTab('power')}>
                        Power production
                    </div>
                    <div onClick={() => switchTab('smelting')}>
                        Smelting
                    </div>
                    <div onClick={() => switchTab('handcrafting')}>
                        Handcrafting
                    </div>
                    <div onClick={() => switchTab('crafting')}>
                        Automated crafting
                    </div>
                </nav>

                <Inventory/>
                <SideBarPower/>
                <PlayerCraftingBar/>
            </div>
        );
    }
}

SideBar.propTypes = {
    switchTab: PropTypes.func.isRequired
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SideBar)
