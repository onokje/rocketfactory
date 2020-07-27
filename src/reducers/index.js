import {combineReducers} from 'redux';
import playerReducer from './../slices/playerSlice';
import manualProductionReducer from './../slices/manualProductionSlice';
import inventoryReducer from './../slices/inventorySlice';
import powerReducer from './../slices/powerSlice';
import miningReducer from './../slices/miningSlice';
import resourceMapReducer from './../slices/resourceMapSlice';
import researchReducer from '../slices/researchSlice';
import productionReducer from './../slices/productionSlice';
import rocketSiloReducer from './../slices/rocketSiloSlice';

export default combineReducers({
    player: playerReducer,
    inventory: inventoryReducer,
    power: powerReducer,
    mining: miningReducer,
    resourcemap: resourceMapReducer,
    research: researchReducer,
    production: productionReducer,
    rocketSilo: rocketSiloReducer,
    manualProduction: manualProductionReducer
});
