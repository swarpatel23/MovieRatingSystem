import React from 'react';
import { Row,Col  } from 'antd';
import Movie from '../Movie/index'


const MovieLightList = ({list})=>{    
    //console.log('movies',movie);    
    return(  
        <Row>
        {
            list.map((movie,index)=>{
                return(                                            
                        <Col xs={24} md={{offset: 0,span:4}} style={{marginTop:"4em"}} key={index}>
                            <Movie movie={movie} key={movie._id} />
                        </Col>
            
                )}
        )}
        </Row>    
    )
};
export default MovieLightList;

