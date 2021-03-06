import React, {Component} from 'react';
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
import storageAvailable from "../../helpers/detectLocalstorage";
import {loadPlayer, newPlayer} from "../../slices/playerSlice";

const mapStateToProps = state => ({
    player: state.player
});

const mapDispatchToProps = {loadPlayer, newPlayer};

class NewPlayer extends Component {

    startNewGame = () => {
        this.props.newPlayer();
    };

    loadGame = () => {
        const localStoragePlayer = localStorage.getItem('spaceClickerPlayerSession');
        this.props.loadPlayer({playerData: JSON.parse(localStoragePlayer)});
    };

    renderLoadGameButton() {
        if (storageAvailable) {
            const localStoragePlayer = localStorage.getItem('spaceClickerPlayerSession');
            if (localStoragePlayer) {
                return <div><button onClick={this.loadGame}>Resume game</button></div>
            }

            return false;
        } else {
            return <div>
                Warning: Local browser storage is not available on your device.
                Game progress can not be saved.
                If you close your browser, all game progress will be lost.</div>
        }
    }

    render() {
        if (!this.props.player.initialized) {

            return (
                <div className="defaultContainer newPlayer">
                    <h1>Welcome to Rocket factory!</h1>
                    <div><button onClick={this.startNewGame}>Start new Game</button></div>
                    {this.renderLoadGameButton()}
                </div>
            );
        }

        return null;

    }
}

NewPlayer.propTypes = {
    player: PropTypes.object.isRequired,
    newPlayer: PropTypes.func.isRequired
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewPlayer)
