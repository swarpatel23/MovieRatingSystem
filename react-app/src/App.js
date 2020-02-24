import React from 'react'
import { Component } from 'react'
import Header from './components/Header'
import HomePage from './components/home-page'
import MovieDetail from './components/movie-detail-page'
import LoginPage from './components/Login-page'
import signupPage from './components/signupPage'
import ContactPage from './components/contact-us-page'
import MovieListPage from './components/movie-list-page'
import { BrowserRouter as Router, Route } from 'react-router-dom'

class App extends Component {
    render() {
        return (
            <Router>
                <Header />
                <Route path="/" exact component={HomePage} />
                <Route path="/Login" exact component={LoginPage} />
                <Route path="/signup" exact component={signupPage} />
                <Route path="/movies" component={MovieListPage} />
                <Route path="/Contact" component={ContactPage} />
                <Route path="/movie/:id" component={MovieDetail} />
            </Router>
        );
    }
}
export default App;