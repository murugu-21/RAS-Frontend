import React, { Component } from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import Expire from './Expire';

class ChangePassword extends Component {
    state = { 
        password : '',
        cnf_password : '',
        error: '',
        showalert: false,
     }

    handleChange = (event) => {
        this.setState({ password: event.target.value });
    }

    handleChange1 = (event) => {
        this.setState({ cnf_password: event.target.value });
    }

    handleSubmit = (event) => {
        if(this.state.password !== this.state.cnf_password ){
            this.setState({error: "Passwords dont match"});
        }
        else{

            axios
            .post("http://localhost:8000/api/ChangePassword", {
                email: sessionStorage.getItem("requestEmail"),
                password: this.state.password,
            })
            .then((res) => {
                console.log(res.data.cango);
                if (res.data.cango) {
                    alert("password changed...!")
                    sessionStorage.removeItem("requestEmail");
                    sessionStorage.removeItem("otp_valid");
                    this.props.history.push("/");              
                } else {
                    this.setState({showalert: true})
                }
            });
            event.preventDefault();
        }
    }
    
    render() { 
        if(sessionStorage.getItem("otp_valid"))
        {
        return (
         <div>
            <h1>Change Password</h1>
            <form onSubmit={this.handleSubmit}  className="login">
                <p>Enter Password</p>
                <input 
                    type="password"
                    onChange={this.handleChange}
                    value={this.state.password}
                    placeholder="Enter Password"
                    required
                />
                <p>Confirm password</p>
                <input 
                    type="password"
                    onChange={this.handleChange1}
                    value={this.state.cnf_password}
                    placeholder="Re-enter password"
                    required
                />
                <p className="error">{this.state.error}</p>
                <input type="submit" name="login_submit" value="submit" />
                <a href="/">Login</a>
            </form>
            {this.state.showalert &&(<Expire delay="3000">
              <div className="alert alert-success" role="alert">
                New user created
              </div></Expire>)}
        </div> 
        );
        }
        else{
            return <Redirect to="/" />; 
        }
    }
}
 
export default ChangePassword;