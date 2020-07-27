import {combineReducers} from 'redux';
import playerReducer from './../slices/playerSlice';
import manualProductionReducer from './../slices/manualProductionSlice';
import inventoryReducer from './../slices/inventorySlice';
import powerReducer from './../slices/powerSlice';
import miningReducer from './../slices/miningSlice';
import resourceMapReducer from './../slices/resourceMapSlice';
import scienceReducer from './../slices/scienceSlice';
import productionReducer from './../slices/productionSlice';
import rocketSiloReducer from './../slices/rocketSiloSlice';

export default combineReducers({
    player: playerReducer,
    inventory: inventoryReducer,
    power: powerReducer,
    mining: miningReducer,
    resourcemap: resourceMapReducer,
    science: scienceReducer,
    production: productionReducer,
    rocketSilo: rocketSiloReducer,
    manualProduction: manualProductionReducer
});
