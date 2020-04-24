import React, {useState, useEffect} from 'react'
import { Row,Col } from 'antd';
import axios from 'axios';
import Movie from '../Movie/index'
function WatchLater(){    
    const [laterlist, setLaterlist] = useState([]);
    useEffect(() => {
        if(localStorage.getItem("user")){
            let user = JSON.parse(localStorage.getItem("user"));            
            let values = {ids:user.favourite_list};
            console.log("values", values);
            axios.post("/api/getMovieDetailsWithIds", values).then(response => {
                setLaterlist(response.data.movies);            
            });
        }                
    },[])    
    return(
        <>
            <h1 style={{textAlign:"center", marginTop: 4}}>Watch Later</h1> 
            <Row>
            {laterlist.map((m,index)=><Col xs={24} md={{offset: 0,span:4}} style={{marginTop:"4em"}} key={index}><Movie movie={m}/></Col>)}             
            </Row>
        </>
    )
}
export default WatchLater;