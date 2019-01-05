import {combineReducers} from 'redux';
import player from "./player";
import inventory from "./inventory";
import power from "./power";
import smelting from "./smelting";

export default combineReducers({
    player,
    inventory,
    power,
    smelting
});
