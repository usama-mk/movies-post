import { combineReducers } from "redux";
import dropLeftReducer from "./dropLeft";
import dropRightReducer from "./dropRight";
import moviesReducer from "./movies";
 

const allReducers= combineReducers({
    movies: moviesReducer,
    ddRight: dropRightReducer,
    ddLeft: dropLeftReducer
   
})

export default allReducers;