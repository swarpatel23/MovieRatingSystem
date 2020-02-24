import Carousel from 'react-bootstrap/Carousel'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup'


import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme=>({    
    slide: {
        padding: 15,
        minHeight: 100,
        color: '#fff',
      },
      slide1: {
        backgroundColor: '#FEA900',
      },
      slide2: {
        backgroundColor: '#B3DC4A',
      },
      slide3: {
        backgroundColor: '#6AC0FF',
      },
      photocard: {
        maxWidth: 225,        
        maxHeight: "18vh",
        backgroundColor: 'rgba(0, 0, 0, 0)',
        padding: "5px 10px",        
        border: "none",         
        overflow: "hidden",
      },
      cardimg:{        
        overflow: "hidden",
      },
}));
function chunk(array, size) {
  const chunked_arr = [];
  for (let i = 0; i < array.length; i++) {
    const last = chunked_arr[chunked_arr.length - 1];
    if (!last || last.length === size) {
      chunked_arr.push([array[i]]);
    } else {
      last.push(array[i]);
    }
  }
  return chunked_arr;
}

export default function CarouselSlider(params){
    const classes = useStyles();
    let imageurl = params.imageurl;
    if(imageurl == undefined)
      imageurl = [];
    console.log("imageurl ",imageurl);
    let perslide = 4
    let chunks = chunk(imageurl, perslide);
    console.log(chunks);
    let carouselslides = chunks.map((arr)=>{
      let temp = arr.map((img)=>{
        return(
          <Card className = {classes.photocard}>
            <Card.Img className={classes.cardimg} variant="top" src={img.msrc} />    
          </Card>    
        )
      })
      return(
        <Carousel.Item>   
            <CardGroup>
                {temp}
            </CardGroup>
        </Carousel.Item>
      )
    });
    return (                          
        <>
         <Carousel indicators={false} controls={true} interval={3500}>
            {/* <Carousel.Item>   
              <CardGroup>
                <Card className = {classes.photocard}>
                  <Card.Img className={classes.cardimg} variant="top" src="https://m.media-amazon.com/images/M/MV5BMjI3MzI1ODMwOF5BMl5BanBnXkFtZTgwNzA2OTMwNzE@._V1_QL50_SY500_CR0,0,749,500_AL_.jpg" />    
                </Card>    
                <Card className = {classes.photocard}>
                  <Card.Img className={classes.cardimg} variant="top" src="https://m.media-amazon.com/images/M/MV5BMjAzNzAwNzAzOV5BMl5BanBnXkFtZTgwODA2OTMwNzE@._V1_QL50_SY500_CR0,0,618,500_AL_.jpg" />    
                </Card>    
                <Card className = {classes.photocard}>
                  <Card.Img className={classes.cardimg}  variant="top" src="https://m.media-amazon.com/images/M/MV5BMTg1MzI3ODQ5NV5BMl5BanBnXkFtZTgwOTA2OTMwNzE@._V1_QL50_SY500_CR0,0,749,500_AL_.jpg" />    
                </Card>    
                <Card className = {classes.photocard}>
                  <Card.Img className={classes.cardimg} variant="top" src="https://m.media-amazon.com/images/M/MV5BMTQ5NzcwMjQxMF5BMl5BanBnXkFtZTgwMDE2OTMwNzE@._V1_QL50_SY500_CR0,0,749,500_AL_.jpg" />    
                </Card>                    
              </CardGroup>
            </Carousel.Item>              */}
            {carouselslides}
          </Carousel>
        </>
    );
    
}
