import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import rootReducer from "../reducers";
import localStorageSync from "../middleware/localStorageSync";

const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware().concat(localStorageSync)
})

export default store;