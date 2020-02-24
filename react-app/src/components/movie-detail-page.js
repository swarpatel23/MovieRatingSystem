import React, {useState, useEffect} from 'react'
import BlurBackground from './BlurBackground'
import {MovieContent} from './MovieContent'
import {useParams} from 'react-router-dom'

export default function MovieDetail(){
    const [movie, setMovie] = useState([]);
    let { id } = useParams();
    const [backgroundimg , setBackgroundImg] = useState("https://lh3.googleusercontent.com/proxy/8hszFt31dSXbjp11Sh_9cVM5hT_WuCkvGuIlRMSL2lVAy5GdtCoOo1ukV8-xHbRaBS_WkImBzX6ykJU-S9oGcVe1dfhkLPH2G0iTSW7wCGY");
    useEffect(()=>{
        console.log('id', id);
        fetch('/api/getMovieDetails?id='+id,{
          headers : { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
          }  
        }).then(res=>{
            
              res.json().then(data=>{       
                  console.log('movie', data);                                             
                  setMovie(data.movie);
                  setBackgroundImg(data.movie.images[0].src);
              })    
        })
    },[])
    return(
        <div>       
            <BlurBackground source={backgroundimg}/>
            <div style={{position:"relative",width:"100%",}}>
            {/* top:"65px", */}
            <MovieContent source={movie.poster} movie={movie}/>                                                                                     
            </div>                                                                 
        </div>        
    );
}