const dropLeftReducer=(state=[], action)=>{
    switch(action.type){
        case "SET_DROP_MOVIES_LEFT":
            return action.payload;
        default:
            return state;
    }
}
export default dropLeftReducer