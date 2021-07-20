import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { setMovies } from '../../actions';
import { FEATURED_API, SEARCH_API } from '../../Pages/Movies/Movies';
import './Movie.css'

function Movie({movie, selectMovie, key, right, left, mid}) {
    const {title, poster_path, vote_average, id, overview}= movie
    const IMG_API= "HTTPS://image.tmdb.org/t/p/w1280";

    const [ddMovies, setDdMovies]= useState([])
    const [ddMoviesLeft, setDdMoviesLeft]= useState([])
    const [ddMoviesRight, setDdMoviesRight]= useState([])
    
    const [titleOpt, setTitleOpt]= useState(title)
    const [poster_pathOpt, SetPoster_pathOpt]= useState(poster_path)
    const [voteAverageOpt, setVoteAverageOpt]= useState(vote_average)
    const [overviewOpt, setOverviewOpt]= useState(overview)
    const dispatch= useDispatch()

    const getMoviesF= async (first, last)=>{
        if(first || last){
            dispatch(setMovies([]))
                    const moviesRes= await fetch(FEATURED_API);
                    const moviesObj= await moviesRes.json();
                    const moviesArray=moviesObj.results
                    const filterArray= moviesArray.filter((movie)=>{
                        if( (movie.title.replace(/ .*/,'')==first) || (getLastWord(movie.title)==last) || (movie.title.replace(/ .*/,'')==last) || (getLastWord(movie.title)==first)){
                                return movie
                        }
                        
                    })
                    dispatch(setMovies(filterArray))
                  return  filterArray
                    // setMovies(filterArray)
                }
        const moviesRes= await fetch(FEATURED_API);
        const moviesObj= await moviesRes.json();
        // console.log(moviesObj)
        // setMovies(moviesObj.results)
    }

    const getMoviesF2= async (first, last)=>{
        if(first || last){
            dispatch(setMovies([]))
                    const moviesRes= await fetch(SEARCH_API + first);
                    const moviesObj= await moviesRes.json();
                    const moviesArray=moviesObj.results
                    const filterArray= moviesArray.filter((movie)=>{
                        if( (movie.title.replace(/ .*/,'')==first) || (getLastWord(movie.title)==last) ){
                                return movie
                        }
                        
                    })
                    dispatch(setMovies(filterArray))
                    getMoviesLeft(first)
                    getMoviesRight(last)
                  return  filterArray
                    // setMovies(filterArray)
                }
        const moviesRes= await fetch(FEATURED_API);
        const moviesObj= await moviesRes.json();
        // console.log(moviesObj)
        // setMovies(moviesObj.results)
    }

    const getMoviesLeft= async (first)=>{
        if(first){
            // dispatch(setMovies([]))
                    const moviesRes= await fetch(SEARCH_API + first);
                    const moviesObj= await moviesRes.json();
                    const moviesArray=moviesObj.results
                    const filterArray= moviesArray.filter((movie)=>{
                        if( (movie.title.replace(/ .*/,'')==first)){
                                return movie
                        }
                        
                    })
                    setDdMoviesLeft(filterArray)
                    // console.log(`left DD: ${filterArray}`)
                    // dispatch(setMovies(filterArray))
                  return  JSON.stringify(filterArray)
                    // setMovies(filterArray)
                }
        const moviesRes= await fetch(FEATURED_API);
        const moviesObj= await moviesRes.json();
        
        // setMovies(moviesObj.results)
    }

    const getMoviesRight= async (last)=>{
        if(last){
            // dispatch(setMovies([]))
                    const moviesRes= await fetch(SEARCH_API + last);
                    const moviesObj= await moviesRes.json();
                    const moviesArray=moviesObj.results
                    const filterArray= moviesArray.filter((movie)=>{
                        // const get= getFirstWord(movie.title.replace(/ .*/,''))
                        // console.log(`thisssssss first from array: ${get} & last we search: ${last}`)
                        // if( (get==last)){        
                        //     console.log(`afterrrrrrr this title: ${movie.title}`)      
                        //         return movie
                        // }
                        console.log(`we are searching::  ${last.toLowerCase()}  ::for right and matching with ${movie.title.replace(/ .*/,'').toLowerCase()}`)
                        if(!( (movie.title.replace(/ .*/,'').toLowerCase() == last.toLowerCase()))){
                            console.log(`selected movie title: ${movie.title}`)
                            return movie
                    }
                   
                        
                    })
                    setDdMoviesRight(filterArray)
                    // console.log(`Right DD: ${JSON.stringify(filterArray)}`)
                    // dispatch(setMovies(filterArray))
                  return  JSON.stringify(filterArray)
                    // setMovies(filterArray)
                }
        const moviesRes= await fetch(FEATURED_API);
        const moviesObj= await moviesRes.json();
        
        // setMovies(moviesObj.results)
    }

    
    

    // const {register, handleSubmit, errors, reset} = useForm();
    const getFirstWord=(totalWords)=>{ 
        // console.log(totalWords)
        var firstWord = totalWords.replace(/ .*/,'');
        // console.log(`First Word of title: ${firstWord}`)
        return firstWord;

    }
    const getLastWord=(totalWords)=>{
        var n = totalWords.split(" ");
        return n[n.length - 1];
    
    }

     const getDropDownMovies= async ()=>{
         
        const moviesRes= await fetch(FEATURED_API);
        const moviesObj= await moviesRes.json();
        // console.log(moviesObj)
        setDdMovies(moviesObj.results)
       
        
    }
    const setMovie=()=>{  
        const movie= document.getElementById(id).value
       
        const movieObj= JSON.parse(movie)
        selectMovie(movieObj) 
        setTitleOpt(movieObj.title)
        SetPoster_pathOpt(movieObj.poster_path)
        setVoteAverageOpt(movieObj.vote_average)
        setOverviewOpt(movieObj.overview)
        // console.log(`title: ${movieObj.title}`)
        //now get the first word or last word of title and set the movies to that which contains those 2 words
        // getFirstWord(movieObj.title)
        console.log(`last word we will search: ${getLastWord(movieObj.title)}`)
        getMoviesF2(getFirstWord(movieObj.title), getLastWord(movieObj.title))
        
         
    }


    useEffect(()=>{       
   
       getDropDownMovies()
       console.log(`key: ${key}`)
       getMoviesLeft(getFirstWord(titleOpt))
        
       getMoviesRight(getLastWord(titleOpt))

        // getFirstWord(title)
    },[titleOpt])
    return (
        <div className="movie">
             <div className="selectWrapper" >
               <span>Select Movie </span>
           <select onChange={setMovie} style={{margin:"10px", padding:"5px"}} id={id} name="category" 
           value={titleOpt}
        //    ref={register({required: true})}
           >
               {/* key == 0 */}
              { left &&
               ddMoviesLeft.length>0 && ddMoviesLeft.map((movie, key)=>{
                if(key==0){
                    movie.title= titleOpt
                }
               
             return  (
                 <option  value={JSON.stringify(movie)} >{  movie.title}</option>
             );
                
            })
            
             
              }

              { mid &&
               ddMovies.length>0 && ddMovies.map((movie, key)=>{
                if(key==0){
                    movie.title= titleOpt
                }
               
             return  (
                 <option  value={JSON.stringify(movie)} >{  movie.title}</option>
             );
                
            })
            
             
              }

{ right &&
               ddMoviesRight.length>0 && ddMoviesRight.map((movie, key)=>{
                if(key==0){
                    movie.title= titleOpt
                }
               
             return  (
                 <option  value={JSON.stringify(movie)} >{  movie.title}</option>
             );
                
            })
            
             
              }
                

{/* {(key ==1) &&
              
             ddMovies.length>0 && ddMovies.map((movie, key)=>{
                if(key==0){
                    movie.title= titleOpt
                }
               
             return  (
                 <option  value={JSON.stringify(movie)} >{  movie.title}</option>
             );
                
            })
              }

{(key ==3) &&
              ddMoviesLeft.length>0? ddMoviesLeft.length>0 && ddMoviesLeft.map((movie, key)=>{
                if(key==0){
                    movie.title= titleOpt
                }
               
             return  (
                 <option  value={JSON.stringify(movie)} >{  movie.title}</option>
             );
                
            })
            :
             ddMovies.length>0 && ddMovies.map((movie, key)=>{
                if(key==0){
                    movie.title= titleOpt
                }
               
             return  (
                 <option  value={JSON.stringify(movie)} >{  movie.title}</option>
             );
                
            })
              } */}

            </select>

            
    
  </div>
            <img onClick={()=>{setMovie()}}  src={IMG_API + poster_pathOpt} alt={titleOpt} />
            <div className="movie info">
                <h3>{titleOpt}</h3>
                <h4>Ratings: {voteAverageOpt}</h4>
           
                <div  className="overview">{overviewOpt}</div>
            </div>
        </div>
    )
}

export default Movie
