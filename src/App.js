import React, {Component} from 'react';
import './App.css';
import Header from "./Components/Header";
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
import NewPlayer from "./Components/NewPlayer";
import SideBar from "./Components/Sidebar";
import ResourceProduction from "./Components/ResourceProduction";
import PowerProduction from "./Components/PowerProduction";
import mainGameTick from "./helpers/GameTicker";
import Smelting from "./Components/Smelting";
import PlayerCraftingBar from "./Components/PlayerCraftingBar";

const mapStateToProps = state => ({
    player: state.player,
    inventory: state.inventory,
    power: state.power,
    smelting: state.smelting,
    mining: state.mining
});


class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            localStorageLoaded: false
        };
    }

    componentDidMount(){
        this.startTimer();
    }

    mainTick = () => {
        const {dispatch, player, inventory, power, smelting, mining} = this.props;
        mainGameTick(dispatch, player, inventory, power, smelting, mining);
    };

    startTimer() {
        this.mainTimer = setInterval(this.mainTick, 1000);
    }

    render() {

        if (!this.props.player.initialized) {
            return (
                <div className="App">
                    <NewPlayer/>
                </div>
            );
        } else {
            return (
                <div className="App">
                    <Header/>
                    <SideBar/>
                    <NewPlayer/>
                    <ResourceProduction/>
                    <PowerProduction/>
                    <Smelting/>
                    <PlayerCraftingBar/>

                </div>
            );
        }

    }
}

App.propTypes = {
    player: PropTypes.object.isRequired,
    inventory: PropTypes.array.isRequired,
    power: PropTypes.object.isRequired,
    smelting: PropTypes.object.isRequired,
    mining:PropTypes.object.isRequired
};


export default connect(
    mapStateToProps, null
)(App)
