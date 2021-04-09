import React, { Component } from "react";
import axios from "axios";

class Forgot_password extends Component {
  state = {
    email: "",
    error: "",
  };

  handleChange = (event) => {
    this.setState({ email: event.target.value });
  };

  handleSubmit = (event) => {
    sessionStorage.setItem("requestEmail", this.state.email);
    axios
      .post("http://localhost:8000/api/ForgotPassword", {
        email: this.state.email,
      })
      .then((res) => {
        console.log(res.data.cango);
        if (res.data.cango) {
          this.props.history.push("/Otp");
        } else {
          this.setState({ error: this.state.email + res.data });
        }
      });
    event.preventDefault();
  };

  render() {
    return (
      <div id="login">
        <div className="changePassword">
          <form
            onSubmit={this.handleSubmit}
            className="createuser"
            style={{ marginTop: "10%" }}
          >
            <label>Enter Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              onChange={this.handleChange}
              value={this.state.email}
              required
            />
            <p className="error">{this.state.error}</p>
            <input type="submit" name="login_submit" value="submit" />
            <a href="/">Login</a>
          </form>
        </div>
      </div>
    );
  }
}

export default Forgot_password;
