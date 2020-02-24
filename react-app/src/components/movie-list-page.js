import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Movies} from './Movies';
import CardColumns from 'react-bootstrap/CardColumns'

const useStyles = makeStyles({
  
});

export default function MovieListPage() {
  const classes = useStyles();
  const [movies, setMovies] = useState([]);
  useEffect(()=>{
      fetch('/api/getMovieIdList',{
        headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }  
      }).then(res=>{
            res.json().then(data=>{                
                setMovies(data.movies);
            })
      })
  },[])
  return (
    <CardColumns>
        <Movies movies={movies} />
    </CardColumns>
  );
}
