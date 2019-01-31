import React, {Component} from 'react';
import './App.css';
import Header from "./Components/Header/Header";
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
import NewPlayer from "./Components/NewPlayer/NewPlayer";
import SideBar from "./Components/Sidebar/Sidebar";
import PowerProduction from "./Components/PowerProduction/PowerProduction";
import mainGameTick from "./helpers/GameTicker";
import ResourceMap from "./Components/ResourceMap/ResourceMap";
import Science from "./Components/Science/Science";
import Production from "./Components/Production/Production";

const mapStateToProps = state => ({
    player: state.player,
    inventory: state.inventory,
    power: state.power,
    production: state.production,
    mining: state.mining,
    science: state.science
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
        const {dispatch, player, inventory, power, production, mining, science} = this.props;
        mainGameTick(dispatch, player, inventory, power, production, mining, science);
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
                    <Production/>
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
    production: PropTypes.object.isRequired,
    mining:PropTypes.object.isRequired,
    science: PropTypes.object.isRequired
};

export default connect(
    mapStateToProps, null
)(App)
