import React, { Component } from 'react';

import connect from "react-redux/es/connect/connect";
import Inventory from "../Inventory/Inventory";
import SideBarPower from "./SideBarPower";
import PlayerCraftingBar from "../PlayerCraftingBar/PlayerCraftingBar";
import "./Sidebar.scss";
import SideBarResearch from "./SideBarResearch";

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
});

class SideBar extends Component {
    render() {

        return (
            <div className="sidebar">
                <Inventory/>
                <SideBarPower/>
                <SideBarResearch/>
                <PlayerCraftingBar/>
            </div>
        );
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SideBar)
