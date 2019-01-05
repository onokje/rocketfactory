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
import mainGameTick from "./helpers/GameTicker";
import Smelting from "./Components/Smelting";

const mapStateToProps = state => ({
    player: state.player,
    inventory: state.inventory,
    power: state.power,
    smelting: state.smelting
});


class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            localStorageLoaded: false
        };
        this.mainTimer = 0;
    }

    componentDidMount(){

        if (storageAvailable) {
            const localStoragePlayer = localStorage.getItem('spaceClickerPlayerSession');
            if (localStoragePlayer) {
                this.props.dispatch(loadPlayer(JSON.parse(localStoragePlayer)));
            }

            this.setState({ localStorageLoaded: true });
            this.startTimer();
        }

    }

    mainTick = () => {
        const {dispatch, inventory, power, smelting} = this.props;
        mainGameTick(dispatch, inventory, power, smelting);
    };

    startTimer() {
        this.mainTimer = setInterval(this.mainTick, 1000);
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
                <Smelting/>

            </div>
        );
    }
}

App.propTypes = {
    player: PropTypes.object.isRequired,
    inventory: PropTypes.array.isRequired,
    power: PropTypes.object.isRequired,
    smelting: PropTypes.object.isRequired
};


export default connect(
    mapStateToProps, null
)(App)
