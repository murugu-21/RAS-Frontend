import React, { Component } from "react";
import "../App.css";
import axios from "axios";

class Login extends Component {
  state = {
    email: "",
    password: "",
  };

  handleChange1 = (event) => {
    this.setState({ email: event.target.value });
  };

  handleChange2 = (event) => {
    this.setState({ password: event.target.value });
  };

  handleSubmit = (event) => {
    axios
      .post("/api/loginCheck", {
        email: this.state.email,
        password: this.state.password,
      })
      .then((res) => {
        if (res.data["type"] === "Owner") {
          localStorage.setItem("email", res.data["email"]);
          localStorage.setItem("type", res.data["Owner"]);
          alert(res.data);
        } else if (res.data["type"] === "Manager") {
          alert(res.data);
        } else if (res.data["type"] === "Clerk") {
          alert(res.data);
        } else {
          alert(res.data);
        }
      });
    event.preventDefault();
  };

  render() {
    console.log(localStorage.getItem("email"));
    if (localStorage.getItem("email") === "admin@gmail.com") {
      return <h1>Welcome</h1>;
    }
    return (
      <div className="login">
        <img
          src="https://www.fit2work.com.au/assets/img/avatars/LoginIconAppl.png"
          alt="profilepic"
          className="avatar"
        />
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <p>Email :</p>
          <input
            type="email"
            placeholder="Enter Email"
            onChange={this.handleChange1}
            value={this.state.email}
            required
          />
          <p>Password :</p>
          <input
            type="password"
            placeholder="Enter Password"
            onChange={this.handleChange2}
            value={this.state.password}
            required
          />
          <input type="submit" name="login_submit" value="submit" />
          <a href="#">Forgot password</a>
        </form>
      </div>
    );
  }
}

export default Login;
