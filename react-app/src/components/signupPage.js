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
            username: '',
            email: '',
            password: '',
            nameError: '',
            emailErrot: '',
            passwordError: ''
        }
    }

    handleUsernameChange = (event) => {
        this.setState({
            username: event.target.value
        })
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

    validate = () => {
        let nameError, emailError, passwordError;

        if (!this.state.username) {
            nameError = "Username is Required"
        }

        if (!this.state.email) {
            emailError = "Email is Required"
        }
        else {
            if (!this.state.email.includes('@')) {
                emailError = "Invalid Email"
            }
        }

        if (!this.state.password) {
            passwordError = "Password is Required"
        }
        else {
            if (this.state.password.length < 8) {
                passwordError = "Password must have atleast 8 character"
            }
        }

        if (emailError || nameError || passwordError) {
            this.setState({ nameError, emailError, passwordError })
            return false
        }

        return true
    }
    handleSubmit = (event) => {

        //alert(`${this.state.username} logged in`)
        event.preventDefault()
        console.log(this.state)
        const isValid = this.validate();
        if (isValid) {
            axios.post("/api/register", this.state).then(response => {
                console.log(response)
            }).catch(error => {
                console.log(error)
            })
        }
    }

    render() {
        const { username, email, password } = this.state
        if (localStorage.getItem('isLoggedIn') === 'true') {
            return <Redirect to="/movies" />
        }
        return (
            <div className="container">
                <form style={style} onSubmit={this.handleSubmit}>
                    <div className="form-group"></div>
                    <div className="form-group">
                        <label>Username : </label>
                        <input type="text" className="form-control" value={username} placeholder="abc123"
                            onChange={this.handleUsernameChange} />
                    </div>
                    <div className="form-group text-danger">
                        {this.state.nameError}
                    </div>
                    <div className="form-group">
                        <label>Email : </label>
                        <input type="text" className="form-control" value={email} placeholder="abc123@xyz.com"
                            onChange={this.handleEmailChange} />
                    </div>
                    <div className="form-group text-danger">
                        {this.state.emailError}
                    </div>
                    <div className="form-group">
                        <label>Password : </label>
                        <input type="password" className="form-control" value={password}
                            onChange={this.handlePasswordChange} />
                    </div>
                    <div className="form-group text-danger">
                        {this.state.passwordError}
                    </div>

                    <input type="submit" value="register" /><br></br>
                    <a href="/Login">Already have account?</a>
                </form>
            </div>
        );
    }
}
export default LoginPage;