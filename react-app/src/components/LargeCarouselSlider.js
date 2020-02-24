import Carousel from 'react-bootstrap/Carousel'
import { makeStyles } from '@material-ui/core/styles';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import React, { useState } from 'react';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import throttle from 'lodash.throttle';

import  { useEffect } from 'react';
import CarouselItem from 'react-bootstrap/CarouselItem';

const useStyles = makeStyles(theme=>({    
      card: {
        backgroundColor:"rgba(29,29,29,1)",
        // boxShadow: "0px 0px 0px 0px rgba(0, 0, 0, 0)",
        boxShadow: "0px 0px 0px rgba(36, 36, 36, 0)",
        borderRadius:"0px",
      },
      media: {
        height: "350px",
      },
      cardcontent:{
          backgroundColor:"rgba(29,29,29,1)",
      },      
      cardname:{
          color: "white",
          fontFamily: "Nunito",
          fontSize: "1.28em"          
      },
      cardrole:{
          color:"rgba(154,154,154,1)",
          fontFamily: "Nunito",
          fontSize: "1em"
      }
}));
function chunk(array, size) {
    const chunked_arr = [];
    if(array!=undefined){
    for (let i = 0; i < array.length; i++) {
      const last = chunked_arr[chunked_arr.length - 1];
      if (!last || last.length === size) {
        chunked_arr.push([array[i]]);
      } else {
        last.push(array[i]);
      }
    }
    }   
    return chunked_arr;
}

export default function LargeCarouselSlider(params){
  //  const [cols, setCols] = useState(2);
    // useEffect(() => {        
    //     fetch("/api/getData", {
    //         headers : { 
    //           'Content-Type': 'application/json',
    //           'Accept': 'application/json'
    //          }
      
    //       }).then(resp=>
    //         resp.json().then(data=>{console.log(data)})  
    //     );
    // }, []);

    const classes = useStyles();
    let perslide = params.perslide;
    const castlist = params.cast.persons;
    
    const col_perslide = {1:12,2:6,3:4,4:3,6:2};
    let cols = col_perslide[params.perslide]    
    //setCols(col_perslide[params.perslide] );
    let size = window.innerWidth;
    //console.log('params.cast', params.cast);

    if(size<768)
        cols = 12;
    else if(size>= 768 && size <=992)
        cols = 4;
    else if(size >992 && size <=1200)
        cols = 3;
    else 
        cols = 2;            
  //  let carouselslides = null, namelist = null;    
   /* carouselslides = chunks.map((batch) =>{
        namelist = this.batch.map((cast)=>{
            return(
            <Col xs={{span:cols}}>        
                <Card className={classes.card}>
                <CardActionArea>
                    <CardMedia className={classes.media} image={cast.image} title={cast.name}/>
                    <CardContent className={classes.cardcontent}>
                        <Typography  className={classes.cardname} component="p" noWrap>{cast.name}</Typography>
                        <Typography className={classes.cardrole} component="p" noWrap>{cast.role}</Typography>
                    </CardContent>
                </CardActionArea>            
                </Card>
            </Col>
            )
        });
        return(
            {namelist}
        )
    });
 */
 let chunks = chunk(castlist, perslide);
    console.log(chunks);

let carouselslides = chunks.map((arr)=>{
    let temp = arr.map((cast)=>{
        return(
            <Col xs={{span:cols}}>        
            <Card className={classes.card}>
            <CardActionArea>
                <CardMedia className={classes.media} image={cast.image} title={cast.name}/>
                <CardContent className={classes.cardcontent}>
                    <Typography  className={classes.cardname} component="p" noWrap>{cast.name}</Typography>
                    <Typography className={classes.cardrole} component="p" noWrap>{cast.role}</Typography>
                </CardContent>
            </CardActionArea>            
            </Card>
        </Col>
        )
    })
    return(    
        <CarouselItem>   
            <Row>
            {temp}
            </Row>
        </CarouselItem>
    )
    }); 
    return (                          
        <>           
            <Carousel indicators={false}>
                {carouselslides}
            </Carousel>
        </>
    );
    
}
