import React, {Component} from 'react';
import './App.css';
import Header from "./Components/Header/Header";
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
import NewPlayer from "./Components/NewPlayer/NewPlayer";
import SideBar from "./Components/Sidebar/Sidebar";
import PowerProduction from "./Components/PowerProduction/PowerProduction";
import mainGameTick from "./helpers/GameTicker";
import Smelting from "./Components/Smelting/Smelting";
import HandCrafting from "./Components/HandCrafting/HandCrafting";
import Crafting from "./Components/Crafting/Crafting";
import ResourceMap from "./Components/ResourceMap/ResourceMap";
import Science from "./Components/Science/Science";

const mapStateToProps = state => ({
    player: state.player,
    inventory: state.inventory,
    power: state.power,
    smelting: state.smelting,
    mining: state.mining,
    crafting: state.crafting
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
        const {dispatch, player, inventory, power, smelting, mining, crafting} = this.props;
        mainGameTick(dispatch, player, inventory, power, smelting, mining, crafting);
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
                    <ResourceMap/>
                    <PowerProduction/>
                    <Smelting/>
                    <HandCrafting/>
                    <Crafting/>
                    <Science/>

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
    mining:PropTypes.object.isRequired,
    crafting:PropTypes.object.isRequired
};


export default connect(
    mapStateToProps, null
)(App)
