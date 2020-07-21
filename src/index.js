import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import * as serviceWorker from './serviceWorker';
import rootReducer from './reducers';
import localStorageSync from "./middleware/localStorageSync";
import './index.css';
import App from './App';

const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware().concat(localStorageSync)
})

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
