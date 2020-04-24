import React from 'react';
import { Input } from 'antd';
const { Search } = Input;


function SearchTitle (props) {
    
    const handleValueChange = (event)=>{        
        //getMovieByName
        console.log(event.target.value);
        fetch('/api/getMovieByName?name='+event.target.value,{
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }  
          }).then(res=>{              
                res.json().then(data=>{       
                    console.log('change movie data', data);                                                                                     
                    props.triggerParentUpdate(data.movies);
                })    
        })        

    };    
    return(
        <Search
            placeholder="Search..."
            onChange={handleValueChange}            
            style={{ width: "100%", height: "43px", marginRight: "0em", paddingTop: "0px", fontSize: "1.5em" }}      
        />
    )
}
export default SearchTitle;