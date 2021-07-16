import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { setMovies } from '../../actions';
import { FEATURED_API } from '../../Pages/Movies/Movies';
import './Movie.css'

function Movie({movie}) {
    const {title, poster_path, vote_average, id, overview}= movie
    const IMG_API= "HTTPS://image.tmdb.org/t/p/w1280";

    const [ddMovies, setDdMovies]= useState([])
    const [titleOpt, setTitleOpt]= useState(title)
    const [poster_pathOpt, SetPoster_pathOpt]= useState(poster_path)
    const [voteAverageOpt, setVoteAverageOpt]= useState(vote_average)
    const [overviewOpt, setOverviewOpt]= useState(overview)
    const dispatch= useDispatch()

    const getMoviesF= async (first, last)=>{
        if(first || last){
                    const moviesRes= await fetch(FEATURED_API);
                    const moviesObj= await moviesRes.json();
                    const moviesArray=moviesObj.results
                    const filterArray= moviesArray.filter((movie)=>{
                        if( (movie.title.replace(/ .*/,'')==first) || (getLastWord(movie.title)==last)){
                                return movie
                        }
                        
                    })
                    dispatch(setMovies(filterArray))
                  return  console.log(filterArray)
                    // setMovies(filterArray)
                }
        const moviesRes= await fetch(FEATURED_API);
        const moviesObj= await moviesRes.json();
        console.log(moviesObj)
        // setMovies(moviesObj.results)
    }

    

    // const {register, handleSubmit, errors, reset} = useForm();
    const getFirstWord=(totalWords)=>{ 
        console.log(totalWords)
        var firstWord = totalWords.replace(/ .*/,'');
        console.log(firstWord)
        return firstWord;

    }
    const getLastWord=(totalWords)=>{
        var n = totalWords.split(" ");
        return n[n.length - 1];
    
    }

     const getDropDownMovies= async ()=>{
        const moviesRes= await fetch(FEATURED_API);
        const moviesObj= await moviesRes.json();
        console.log(moviesObj)
        setDdMovies(moviesObj.results)
    }
    const setMovie=()=>{
        const movie= document.getElementById(id).value
        const movieObj= JSON.parse(movie)
        setTitleOpt(movieObj.title)
        SetPoster_pathOpt(movieObj.poster_path)
        setVoteAverageOpt(movieObj.vote_average)
        setOverviewOpt(movieObj.overview)
        console.log(`title: ${movieObj.title}`)
        //now get the first word or last word of title and set the movies to that which contains those 2 words
        getFirstWord(movieObj.title)
        console.log(getLastWord(movieObj.title))
        getMoviesF(getFirstWord(movieObj.title), getLastWord(movieObj.title))

        
         
    }

 

    useEffect(()=>{       
        getDropDownMovies()
        // getFirstWord(title)
    },[])
    return (
        <div className="movie">
             <div>
               <span>Select Category </span>
           <select onChange={setMovie} style={{margin:"10px", padding:"5px"}} id={id} name="category" 
           value={titleOpt}
        //    ref={register({required: true})}
           >
              {ddMovies.length>0 && ddMovies.map((movie)=>{
               return  (
                   <option  value={JSON.stringify(movie)} >{movie.title}</option>
               );
                  
              })}
            </select>
    
  </div>
            <img src={IMG_API + poster_pathOpt} alt={titleOpt} />
            <div className="movie info">
                <h3>{titleOpt}</h3>
                <h4>Ratings: {voteAverageOpt}</h4>
           
                <div className="overview">{overviewOpt}</div>
            </div>
        </div>
    )
}

export default Movie
