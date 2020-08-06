import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import rootReducer from "../slices/rootReducer";
import localStorageSync from "../middleware/localStorageSync";

const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware().concat(localStorageSync)
})

export type AppDispatch = typeof store.dispatch;
export default store;