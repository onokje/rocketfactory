import React, { Component } from 'react';
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
import Inventory from "../Inventory/Inventory";
import SideBarPower from "../SideBarPower/SideBarPower";
import PlayerCraftingBar from "../PlayerCraftingBar/PlayerCraftingBar";
import "./Sidebar.scss";

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
                <PlayerCraftingBar/>
            </div>
        );
    }
}

SideBar.propTypes = {

};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SideBar)
