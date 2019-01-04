import React, {Component} from 'react';
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
import {newPlayer} from "./../actions/player";

const mapStateToProps = state => ({
    player: state.player
});

const mapDispatchToProps = dispatch => ({
    newPlayer: (name) => {
        dispatch(newPlayer(name));
    }
});

class NewPlayer extends Component {


    onSubmit = (e) => {
        e.preventDefault();
        this.props.newPlayer(e.target.elements.namedItem('new_player_name').value);
    };

    render() {
        if (!this.props.player.initialized) {
            return (
                <div className="defaultContainer newPlayer">
                    <h1>Welcome, new player!</h1>

                    <form onSubmit={this.onSubmit}>
                        <label htmlFor="new_player_name">What is your name?</label>
                        <input required="required" name="player_name" id="new_player_name" type="text" />
                        <button type="submit">Ok, lets play!</button>
                    </form>

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
