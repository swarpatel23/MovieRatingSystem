import React from 'react'
import Card from 'react-bootstrap/Card'
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import ListGroup from 'react-bootstrap/ListGroup'
import {Link} from 'react-router-dom'
export const Review = ({reviews})=>{        
    return(      
    <>  
        {
        reviews.map((review)=>{            
            return(
            <Card>                
                <Card.Body>
                    <Card.Title>{review.heading}</Card.Title>
                    <Card.Text>                                    
                    {review.review}            
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