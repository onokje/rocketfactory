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
                    <div className={player.tab === 'resourceMap' ? 'active' : ''} onClick={() => switchTab('resourceMap')}>
                        Resource Map
                    </div>
                    <div className={player.tab === 'power' ? 'active' : ''}  onClick={() => switchTab('power')}>
                        Power
                    </div>
                    <div className={player.tab === 'production' ? 'active' : ''}  onClick={() => switchTab('production')}>
                        Production
                    </div>
                    <div className={player.tab === 'science' ? 'active' : ''}  onClick={() => switchTab('science')}>
                        Research
                    </div>
                    <div className={player.tab === 'silo' ? 'active' : ''}  onClick={() => switchTab('silo')}>
                        Rocket Silo
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