import React, {useEffect} from 'react';
import './App.css';
import Header from "./Components/Header/Header";
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
import NewPlayer from "./Components/NewPlayer/NewPlayer";
import SideBar from "./Components/Sidebar/Sidebar";
import PowerProduction from "./Components/PowerProduction/PowerProduction";
import mainGameTick from "./helpers/GameTicker";
import ResourceMap from "./Components/ResourceMap/ResourceMap";
import Research from "./Components/Research/Research";
import Production from "./Components/Production/Production";
import MachineDialog from "./Components/Production/MachineDialog";
import RocketSilo from "./Components/RocketSilo/RocketSilo";

const mapStateToProps = state => ({
    player: state.player,
});

const App = ({dispatch, player}) => {

    useEffect(() => {
        const interval = setInterval(() => {
            mainGameTick(dispatch);
        }, 1000);
        return () => clearInterval(interval);
    }, [dispatch]);

    if (!player.initialized) {
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
                <Research/>
                <MachineDialog/>
                <RocketSilo/>

            </div>
        );
    }
}

App.propTypes = {
    player: PropTypes.object.isRequired,
};

export default connect(
    mapStateToProps, null
)(App)
