import React from 'react'
import {Link} from 'react-router-dom';
import { Card,Tooltip } from 'antd';
const { Meta } = Card;

const Movies = ({movie})=>{    
    //console.log('movies',movie);    
    let id = movie._id;
    if(id===undefined)
        id = '123';
    return(      
        <Tooltip placement="top" title={movie.name}>
        <Link to={`/Movie/${movie._id}`}>
    <Card
    hoverable
    style={{margin: '0.5em'}}
    cover={<div style={{
        maxHeight: "300px", 
        overflow: "hidden",
        
    }}>
        {/* <img alt={movie.name} src={movie.poster} style={{width:"inherit", height: "100%"}}/> */}
        <div style={{
            backgroundColor: 'black',
            backgroundImage:`url(${movie.poster})`,
            backgroundPosition:"top center",
            backgroundRepeat: "no-repeat",
            backgroundSize: 'cover',
            height: '400px'
        }}>

        </div>
        </div>}
  >
    <Meta title={movie.name} description={movie.rated} />
  </Card>
        </Link>
        </Tooltip>
    )
};
export default Movies;