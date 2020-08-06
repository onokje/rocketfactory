import {combineReducers} from 'redux';
import playerReducer from './playerSlice';
import manualProductionReducer from './manualProductionSlice';
import inventoryReducer from './inventorySlice';
import powerReducer from './powerSlice';
import miningReducer from './miningSlice';
import resourceMapReducer from './resourceMapSlice';
import researchReducer from './researchSlice';
import productionReducer from './productionSlice';
import rocketSiloReducer from './rocketSiloSlice';

const rootReducer =  combineReducers({
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
export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>