import { configureStore } from "@reduxjs/toolkit";
import toDoReducer from "./reducers.js/todoReducer";


export const store = configureStore({
    reducer: {
        todo : toDoReducer,
    }
})