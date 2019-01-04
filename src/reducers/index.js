import {combineReducers} from 'redux';
import player from "./player";
import resources from "./resources";
import power from "./power";

export default combineReducers({
    player,
    resources,
    power
});
