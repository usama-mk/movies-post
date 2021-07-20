const dropRightReducer=(state=[], action)=>{
    switch(action.type){
        case "SET_DROP_MOVIES_RIGHT":
            return action.payload;
        default:
            return state;
    }
}
export default dropRightReducer