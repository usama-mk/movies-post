export const setMovies=(pl)=>{
    return {
        type: "SET_MOVIES",
        payload: pl
    }
}

export const setDropMoviesRight=(pl)=>{
    return {
        type: "SET_DROP_MOVIES_RIGHT",
        payload: pl
    }
}

export const setDropMoviesLeft=(pl)=>{
    return {
        type: "SET_DROP_MOVIES_LEFT",
        payload: pl
    }
}

export const setSelectedLeft=(pl)=>{
    return {
        type: "SET_SELECTED_LEFT",
        payload: pl
    }
}