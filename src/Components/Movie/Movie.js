import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setDropMoviesLeft, setDropMoviesRight, setMovies } from '../../actions';
import { FEATURED_API, SEARCH_API } from '../../Pages/Movies/Movies';
import ph from '../../Assets/placeholder.jpg'
import './Movie.css'

function Movie({movie, selectMovie, key, right, left, mid, selectedMovie}) {
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
    const dr = useSelector((state)=> state.ddRight)
 

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
                }
        const moviesRes= await fetch(FEATURED_API);
        const moviesObj= await moviesRes.json();
    }

    const getMoviesLeft= async (first)=>{
        if(first){
                    const moviesRes= await fetch(SEARCH_API + first);
                    const moviesObj= await moviesRes.json();
                    const moviesArray=moviesObj.results
                    const filterArray= moviesArray.filter((movie)=>{
                        if( (getLastWord(movie.title).toLowerCase()==first.toLowerCase())){
                            console.log(`left movies titles: ${movie.title}`)
                                return movie
                        }
                        
                    })
                    setDdMoviesLeft(filterArray)
                    dispatch(setDropMoviesLeft(filterArray))
                  return  JSON.stringify(filterArray)
                }
        const moviesRes= await fetch(FEATURED_API);
        const moviesObj= await moviesRes.json();
        
    }

    const getMoviesRight= async (last)=>{
        if(last){
                    const moviesRes= await fetch(SEARCH_API + last);
                    const moviesObj= await moviesRes.json();
                    const moviesArray=moviesObj.results
                    var tempArr=[]
                    const filterArray= moviesArray.filter((movie)=>{
                        console.log(`we are searching::  ${last.toLowerCase()}  ::for right and matching with ${movie.title.replace(/ .*/,'').toLowerCase()}`)
                        if( (movie.title.replace(/ .*/,'').toLowerCase() == last.toLowerCase())){
                            console.log(`selected movie title: ${movie.title}`)
                            tempArr.push(movie)
                            return movie
                    }
                   
                        
                    })
                    setDdMoviesRight(filterArray)
                    dispatch(setDropMoviesRight(filterArray))
                  return  JSON.stringify(filterArray)
                }
        const moviesRes= await fetch(FEATURED_API);
        const moviesObj= await moviesRes.json();
        

    }

    
    const getFirstWord=(totalWords)=>{ 
        var firstWord = totalWords.replace(/ .*/,'');
        return firstWord;

    }
    const getLastWord=(totalWords)=>{
        var n = totalWords.split(" ");
        return n[n.length - 1];
    
    }

     const getDropDownMovies= async ()=>{
         
        const moviesRes= await fetch(FEATURED_API);
        const moviesObj= await moviesRes.json();
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
        console.log(`last word we will search: ${getLastWord(movieObj.title)}`)
        const f= getFirstWord(movieObj.title)
        const l= getLastWord(movieObj.title)
        getMoviesF2(f, l)
        console.log(`DRR : ${dr}`)
        
         
    }

    const [check, setCheck]= useState(false)
    useEffect(()=>{       
   
       getDropDownMovies()
       console.log(`key: ${key}`)
      
       do{
        getMoviesLeft(getFirstWord(titleOpt))
      }while(check)


    },[])
    return (
        <div className="movie">
             <div className="selectWrapper" >
               <span>Select Movie </span>
           <select onChange={setMovie} style={{margin:"10px", padding:"5px"}} id={id} className="select" name="category" 
           value={titleOpt}
      
           >
              { left &&
               ddMoviesLeft.length>0 && ddMoviesLeft.map((movie, key)=>{
               
               
             return  (
                 <option  value={JSON.stringify(movie)} >{  movie.title}</option>
             );
                
            })
            
             
              }

              { mid &&
               ddMovies.length>0 && ddMovies.map((movie, key)=>{
                if(key==0){
                    movie.title= selectedMovie?.title
                }
               
             return  (
                 <option  value={JSON.stringify(movie)} >{  movie.title}</option>
             );
                
            })
            
             
              }

{ right &&
               dr.length>0 && dr.map((movie, key)=>{
                
               
             return  (
                 <option  value={JSON.stringify(movie)} >{  movie.title}</option>
             );
                
            })
            
             
              }
                

            </select>
        
           
            
    
  </div>

             {
               left &&
               <div>
                    <img   src={ddMoviesLeft[0] ? IMG_API + ddMoviesLeft[0]?.poster_path: ph} alt={titleOpt} />
            <div className="movie info">
                <h3>{ddMoviesLeft[0]?.title}</h3>
                <h4>Ratings: {ddMoviesLeft[0]?.vote_average}</h4>
           
                <div  className="overview">{ddMoviesLeft[0]?.overview}</div>
            </div>
               </div>
           }
           {
               mid &&
               <div>
                    <img   src={selectedMovie?IMG_API + selectedMovie?.poster_path: ph} alt={titleOpt} />
            <div className="movie info">
                <h3>{ selectedMovie?.title}</h3>
                <h4>Ratings: { selectedMovie?.vote_average}</h4>
           
                <div  className="overview">{ selectedMovie?.overview}</div>
            </div>
               </div>
           }

{
               right &&
               <div>
                    <img  src={dr[0]?IMG_API + dr[0]?.poster_path:ph} alt={titleOpt} />
            <div className="movie info">
                <h3>{dr[0]?.title}</h3>
                <h4>Ratings: {dr[0]?.vote_average}</h4>
           
                <div  className="overview">{dr[0]?.overview}</div>
            </div>
               </div>
           }
        </div>
    )
}

export default Movie
