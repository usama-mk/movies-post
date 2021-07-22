import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setMovies } from "../../actions";
import Movie from "../../Components/Movie/Movie";
import "./Movies.css";

function Movies() {
 

  const [selectedMovie, setSelectedMovie] = useState("");
  const [interest, setInterest] = useState("");
  const [synopsis , setSynopsis ] = useState("");
  const dr = useSelector((state)=> state.ddRight)
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
        MovieTitle: selectedMovie.title,
        PostTitle: interest,
        Synopsis: synopsis
    }
    const postObj2= JSON.stringify(postObj)
    const response = await fetch("http://cinemashers.com/api/cinemash/", {
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
      toast.success('🚀 Successfully added the data to the database ', {
      position: "bottom-center",
      autoClose: true,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
      clearInputs()
     
    });
  };

  const clearInputs=()=>{
    setInterest('')
    setSynopsis('')
    // setSelectedMovie('')
  }

 

  useEffect(() => {
    getMovies();
  }, []);
  return (
    <div className="moviesWrapper">
    
      {movies.length > 0 ? (
        <div className="movies">
          {movies.map((movie, key) => {
          if(key<3){
            return (
              <div>
                <Movie movie={movie} right={(key==2)?true:false}  left={(key==0)?true:false} mid={(key==1)?true:false} selectMovie={selectMovie} selectedMovie={selectedMovie} />
              </div>
            );
          }
          })}

         
        </div>
      ) : (
        "Fetching Data.."
      )}

      {movies.length > 0 && (
        <div className="moviesData">
          <h1 className="center">{`${selectedMovie && selectedMovie?.title} ${dr[0]?.title ? dr[0]?.title:''}`}</h1>
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
            <ToastContainer />
          </div>
        </div>
      )}
    </div>
  );
}

export const FEATURED_API =
  "https://api.themoviedb.org/3/discover/movie?/sort_by=popularity.dsc&api_key=04c35731a5ee918f014970082a0088b1&page=1,2,3";

  export const SEARCH_API =
  "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

export default Movies;
