import { combineReducers } from "redux";
import moviesReducer from "./movies";

const allReducers= combineReducers({
    movies: moviesReducer
})

export default allReducers;