import React from 'react';
import Navbar from './Components/Navbar'
import './App.css'
import {
  BrowserRouter as Router,  
  Route,
} from "react-router-dom";

import Home from './Components/NavPages/Home'
import MovieList from './Components/NavPages/MovieList'
import Contactus from './Components/NavPages/ContactUs'

import SignUp from './Components/NavPages/SignUp'
import Login from './Components/NavPages/Login'
// import Details from './Components/Movie/Details';
import MovieDetails from './Components/Movie/MovieDetails';
import WatchLater from './Components/NavPages/WatchLater';


function App() {
  return (
    <Router>
      <Navbar />
      <Route path="/" exact component={Home}/>
      <Route path="/Contactus" exact component={Contactus}/>
      <Route path="/Movies/:category" exact component={MovieList}/>      
      <Route path="/Signup" exact component={SignUp}/>
      <Route path="/Login" exact component={Login}/>
      <Route path="/WatchLater" exact component={WatchLater}/>

      <Route path="/Movie/:id" exact component={MovieDetails}/>
    </Router>    
  );
}

export default App;
