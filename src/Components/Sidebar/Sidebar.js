import React, { Component } from 'react';

import connect from "react-redux/es/connect/connect";
import Inventory from "../Inventory/Inventory";
import SideBarPower from "../SideBarPower/SideBarPower";
import PlayerCraftingBar from "../PlayerCraftingBar/PlayerCraftingBar";
import "./Sidebar.scss";
import SideBarScience from "./SideBarScience";

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
});

class SideBar extends Component {
    render() {

        return (
            <div className="sidebar">
                <h2>Sidebar!</h2>

                <Inventory/>
                <SideBarPower/>
                <SideBarScience/>
                <PlayerCraftingBar/>
            </div>
        );
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SideBar)
