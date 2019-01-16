import React, { Component } from 'react';
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
import "./Header.scss";
import {switchTab} from "../../actions/player";

const mapStateToProps = state => ({
    player: state.player
});

const mapDispatchToProps = dispatch => ({
    switchTab: (tab) => {
        dispatch(switchTab(tab));
    },

});

class Header extends Component {
    render() {

        const {player, switchTab} = this.props;
        return (
            <header>
                <div className="mainTitle">Rocketfactory!</div>
                <nav className="tabs">
                    <div className={player.tab === 'resourceProduction' ? 'active' : ''} onClick={() => switchTab('resourceProduction')}>
                        Resource production
                    </div>
                    <div className={player.tab === 'power' ? 'active' : ''}  onClick={() => switchTab('power')}>
                        Power production
                    </div>
                    <div className={player.tab === 'smelting' ? 'active' : ''}  onClick={() => switchTab('smelting')}>
                        Smelting
                    </div>
                    <div className={player.tab === 'handcrafting' ? 'active' : ''}  onClick={() => switchTab('handcrafting')}>
                        Handcrafting
                    </div>
                    <div className={player.tab === 'crafting' ? 'active' : ''}  onClick={() => switchTab('crafting')}>
                        Automated crafting
                    </div>
                </nav>

            </header>
        );
    }
}

Header.propTypes = {
    player: PropTypes.object.isRequired,
    switchTab: PropTypes.func.isRequired
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header)