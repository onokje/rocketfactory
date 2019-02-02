import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from './../reducers';
import thunkMiddleware from 'redux-thunk'
import localStorageSync from "./../middleware/localStorageSync";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(
        thunkMiddleware, // lets us dispatch() functions
        localStorageSync
    ))
);

export default store;