import { combineReducers } from "redux";
import dropRightReducer from "./dropRight";
import moviesReducer from "./movies";
 

const allReducers= combineReducers({
    movies: moviesReducer,
    ddRight: dropRightReducer
   
})

export default allReducers;