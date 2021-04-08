import React, { Component } from "react";
import "../App.css";
import axios from "axios";
import {Redirect} from 'react-router-dom';

class Login extends Component {
  state = {
    email: "",
    password: "",
    type: "password",
    toggle: "far fa-eye",
    EmailError: "",
    pass_error: "",
  };

  handleChange1 = (event) => {
    this.setState({ email: event.target.value });
  };

  handleChange2 = (event) => {
    this.setState({ password: event.target.value });
  };

  handleSubmit = (event) => {
    axios
      .post("http://localhost:8000/api/loginCheck", {
        email: this.state.email,
        password: this.state.password,
      })
      .then((res) => {
        if (res.data.type) {
          window.sessionStorage.setItem("email", res.data.email);
          window.sessionStorage.setItem("type", res.data.type);  
          window.location.reload();
              
        } else {
          if (res.data.err === "email"){
            this.setState({ EmailError: res.data.msg});
            this.setState({ pass_error: ""});
          }
          else{
            this.setState({ pass_error: res.data.msg});
            this.setState({ EmailError: ""});
          }
        }
      });
    event.preventDefault();
  };

  handleVisibility = () => {
    if (this.state.type === "password") {
      this.setState({ type: "text", toggle: "far fa-eye  fa-lg fa-eye-slash fa-lg" });
    } else {
      this.setState({ type: "password", toggle: "far fa-eye fa-lg" });
    }
  };

  render() {
    if (window.sessionStorage.getItem("email") != null) {
      return (<Redirect to="/Demo" />  ) ;   
    }

    return (
      <div id="login">
        <div className="bg-img"></div>
        <form onSubmit={this.handleSubmit} className="login">
          <img
            src="https://www.fit2work.com.au/assets/img/avatars/LoginIconAppl.png"
            alt="profilepic"
            className="avatar"
          />
          <h1>Login</h1>
          <p>Email :</p>
          <input
            type="email"
            placeholder="Enter Email"
            onChange={this.handleChange1}
            value={this.state.email}
            required
          />
          <i className="far fa-user-circle fa-lg"></i>
          <p className="error">{this.state.EmailError && <i class="fa fa-exclamation-circle fa-s" aria-hidden="true"></i>}{"  "+this.state.EmailError}</p>
          <p>Password :</p>
          <input
            type={this.state.type}
            placeholder="Enter Password"
            onChange={this.handleChange2}
            value={this.state.password}
            required
          />
          <i
            className={this.state.toggle}
            id="togglePassword"
            onClick={this.handleVisibility}
          />
          <p className="error">{this.state.pass_error && <i class="fa fa-exclamation-circle fa-s" aria-hidden="true"></i>}{"  "+this.state.pass_error}</p>
          <input type="submit" name="login_submit" value="Submit" />
          <a href="/ForgotPassword">Forgot password</a>
        </form>
      </div>
    );
  }
}

export default Login;
