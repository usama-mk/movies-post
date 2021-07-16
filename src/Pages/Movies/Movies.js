import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMovies } from "../../actions";
import Movie from "../../Components/Movie/Movie";
import "./Movies.css";

function Movies() {
 

  const [selectedMovie, setSelectedMovie] = useState("");
  const [interest, setInterest] = useState("");
  const [synopsis , setSynopsis ] = useState("");
  const movies = useSelector((state) => state.movies);
  const dispatch = useDispatch();
  const getMovies = async () => {
    const moviesRes = await fetch(FEATURED_API);
    const moviesObj = await moviesRes.json();
    console.log(moviesObj);
    dispatch(setMovies(moviesObj.results));
  };
  const selectMovie = (movie) => {
    setSelectedMovie(movie);
    console.log(`on movie click ${movie.title}`);
  };
  const postData = async () => {
    const postObj= {
        title: selectedMovie.title,
        interest: interest,
        synopsis: synopsis
    }
    const postObj2= JSON.stringify(postObj)
    const response = await fetch("https://reqbin.com/echo/post/json", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin' : '*'
      },
      body: postObj2,
    });

    response.json().then((data) => {
      console.log(data);
    });
  };
  useEffect(() => {
    getMovies();
  }, []);
  return (
    <div className="moviesWrapper">
      {movies.length > 0 ? (
        <div className="movies">
          {movies.map((movie) => {
            return (
              <div className="pointer" onClick={() => selectMovie(movie)}>
                <Movie movie={movie} />
              </div>
            );
          })}
        </div>
      ) : (
        "Fetching Data.."
      )}

      {movies.length > 0 && (
        <div className="moviesData">
          <h1 className="center">{selectedMovie.title}</h1>
          <h5>
            Title of the post - This should be a joke or clue or something to
            catch peoples interest
          </h5>
          <input className="input" type="text" value={interest} onChange={(e)=> setInterest(e.target.value)} />

          <h5>
            New Synopsis - The story line two or more films that should start
            with the first film and continue seamlessly into the second
          </h5>
          <input className="input height" type="text" value={synopsis} onChange={(e)=> setSynopsis(e.target.value)} />
          <div className="postButtonWrapper">
            <div className="postButton pointer" onClick={postData}>
              POST
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// export const getMovies= async (title)=>{
//     if(title){
//         const moviesRes= await fetch(FEATURED_API);
//         const moviesObj= await moviesRes.json();
//         const moviesArray=moviesObj.results
//         moviesArray.filter((movie)=>{
//             if(movie.title)
//             return
//         })
//         setMovies(moviesObj.results)
//     }
//     const moviesRes= await fetch(FEATURED_API);
//     const moviesObj= await moviesRes.json();
//     console.log(moviesObj)
//     return(moviesObj.results)
// }
export const FEATURED_API =
  "https://api.themoviedb.org/3/discover/movie?/sort_by=popularity.dsc&api_key=04c35731a5ee918f014970082a0088b1&page=1,2,3";

  export const SEARCH_API =
  "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

export default Movies;
