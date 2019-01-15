import React, { Component } from 'react';
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";


const mapStateToProps = state => ({
    player: state.player
});

const mapDispatchToProps = dispatch => ({

});

class Header extends Component {
    render() {
        return (
            <header>
                <div className="mainTitle">Space Clicker!</div>
                <div className="playerName">Welcome, {this.props.player.name ? this.props.player.name : 'new-guy'}</div>
            </header>
        );
    }
}

Header.propTypes = {
    player: PropTypes.object.isRequired
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header)