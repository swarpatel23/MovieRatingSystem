import React from 'react'
import Card from 'react-bootstrap/Card'
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import ListGroup from 'react-bootstrap/ListGroup'
import {Link} from 'react-router-dom'
export const Movies = ({movies})=>{    
    console.log(movies);    
    return(      
    <>  
        {
        movies.map((movie)=>{
            let tourl = movie._id;
            return(
            <Card>
                <Link to={`/movie/${tourl}`}>
                <Card.Img variant="top" src={movie.poster} />
                </Link>
                <Card.Body>
                    <Card.Title>{movie.name}</Card.Title>
                    <Card.Text>
                        {movie.release_year}
                    </Card.Text>
                </Card.Body>
            </Card>
        )})
        }
    </>
    )
};
/*            
            */