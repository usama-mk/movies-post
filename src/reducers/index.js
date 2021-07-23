import { combineReducers } from "redux";
import dropLeftReducer from "./dropLeft";
import dropRightReducer from "./dropRight";
import moviesReducer from "./movies";
import selectedLeftReducer from './selectedLeft'
 

const allReducers= combineReducers({
    movies: moviesReducer,
    ddRight: dropRightReducer,
    ddLeft: dropLeftReducer,
    selectedLeft: selectedLeftReducer
   
})

export default allReducers;