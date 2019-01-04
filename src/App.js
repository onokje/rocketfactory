import React, {Component} from 'react';
import './App.css';
import Header from "./Components/Header";
import storageAvailable from "./helpers/detectLocalstorage";
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
import {loadPlayer} from "./actions/player";
import NewPlayer from "./Components/NewPlayer";
import SideBar from "./Components/Sidebar";
import ResourceProduction from "./Components/ResourceProduction";
import PowerProduction from "./Components/PowerProduction";

const mapStateToProps = state => ({
    player: state.player
});

const mapDispatchToProps = dispatch => ({
    loadPlayer: (playerData) => {
        dispatch(loadPlayer(playerData));
    }
});

class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            localStorageLoaded: false
        }
    }

    componentDidMount(){

        if (storageAvailable) {
            const localStoragePlayer = localStorage.getItem('spaceClickerPlayerSession');
            if (localStoragePlayer) {
                this.props.loadPlayer(JSON.parse(localStoragePlayer));
            }

            this.setState({ localStorageLoaded: true });
        }

    }

    render() {

        if (!this.state.localStorageLoaded) {
            return (<div>Local storage is not enabled in your browser.</div>);
        }

        return (
            <div className="App">
                <Header/>
                <SideBar/>
                <NewPlayer/>
                <ResourceProduction/>
                <PowerProduction/>

            </div>
        );
    }
}

App.propTypes = {
    player: PropTypes.object.isRequired,
    loadPlayer: PropTypes.func.isRequired
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
