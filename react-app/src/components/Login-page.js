import React from 'react'
import { Component } from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'


const style = {
    color: 'white',
}

class LoginPage extends Component {

    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: '',
            Error: '',
        }

    }

    handleEmailChange = (event) => {
        this.setState({
            email: event.target.value
        })
    }
    handlePasswordChange = (event) => {
        this.setState({
            password: event.target.value
        })
    }
    handleSubmit = (event) => {

        //alert(`${this.state.username} logged in`)
        event.preventDefault()
        console.log(this.state)

        axios.post("/api/login", this.state).then(response => {
            console.log(response)
            localStorage.setItem('username', response.data.user.username);
            localStorage.setItem('email', response.data.user.email);
            localStorage.setItem('isLoggedIn', true)
            window.location.reload(false);
        }).catch(error => {
            console.log(error.response)
            let Error = error.response.data
            this.setState({ Error })
            //localStorage.setItem('isLoggedIn', undefined)
        })



    }

    render() {
        const { email, password, Error } = this.state
        if (localStorage.getItem('isLoggedIn') === 'true') {
            return <Redirect to="/movies" />
        }
        return (
            <>
                <div className="container">

                    <form style={style} onSubmit={this.handleSubmit}>
                        <div className="form-group text-danger">
                            {Error}
                        </div>
                        <div className="form-group">
                            <label>Email : </label>
                            <input className="form-control" type="text" value={email}
                                onChange={this.handleEmailChange} />
                        </div>
                        <div className="form-group">
                            <label>Password : </label>
                            <input type="password" className="form-control" value={password}
                                onChange={this.handlePasswordChange} />
                        </div>

                        <input className="form-group" type="submit" /><br></br>
                        <a href="/signup">Don't have Account?signup</a>
                    </form>
                </div>
            </>
        );
    }
}
export default LoginPage;