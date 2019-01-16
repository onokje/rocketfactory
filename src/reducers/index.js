import {combineReducers} from 'redux';
import player from "./player";
import inventory from "./inventory";
import power from "./power";
import smelting from "./smelting";
import mining from "./mining";
import crafting from "./crafting";
import resourcemap from "./resourcemap";

export default combineReducers({
    player,
    inventory,
    power,
    smelting,
    mining,
    crafting,
    resourcemap
});
