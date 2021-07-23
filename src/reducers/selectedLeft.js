const selectedLeftReducer=(state=[], action)=>{
    switch(action.type){
        case "SET_SELECTED_LEFT":
            return action.payload;
        default:
            return state;
    }
}
export default selectedLeftReducer