import {combineReducers} from 'redux';
import player from "./player";
import inventory from "./inventory";
import power from "./power";
import mining from "./mining";
import resourcemap from "./resourcemap";
import science from "./science";
import production from "./production";
import rocketSilo from "./rocketSilo";

export default combineReducers({
    player,
    inventory,
    power,
    mining,
    resourcemap,
    science,
    production,
    rocketSilo
});
