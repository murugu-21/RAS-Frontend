import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Alert from "./Alert";
class ChangePassword extends Component {
  state = {
    password: "",
    cnf_password: "",
    show: false,
    message: "",
    type: "",
  };

  handleChange = (event) => {
    this.setState({ password: event.target.value });
  };

  handleChange1 = (event) => {
    this.setState({ cnf_password: event.target.value });
  };

  handleSubmit = (event) => {
    if (this.state.password !== this.state.cnf_password) {
      this.setState({ show: false }, () => {
        this.setState({
          show: true,
          message: "Passwords don't match",
          type: "info",
        });
      });
    } else {
      axios
        .post("http://localhost:8000/api/ChangePassword", {
          email: sessionStorage.getItem("requestEmail"),
          password: this.state.password,
        })
        .then((res) => {
          if (res.data.cango) {
            this.setState({ show: false });
            this.setState({
              show: true,
              message: "Password changed",
              type: "success",
            });
            sessionStorage.removeItem("requestEmail");
            sessionStorage.removeItem("otp_valid");
            this.props.history.push("/");
          } else {
            this.setState({ show: false });
            this.setState({
              show: true,
              message: res.data[0],
              type: res.data[1],
            });
          }
        });
    }
    event.preventDefault();
  };

  render() {
    if (sessionStorage.getItem("otp_valid")) {
      return (
        <div id="login">
          <div className="changePassword">
            <form
              onSubmit={this.handleSubmit}
              className="createuser"
              style={{ marginTop: "10%" }}
            >
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
              <Alert
                time="5000"
                show={this.state.show}
                message={this.state.message}
                type={this.state.type}
              />
              <input type="submit" name="login_submit" value="submit" />
              <a href="/">Login</a>
            </form>
          </div>
        </div>
      );
    } else {
      return <Redirect to="/" />;
    }
  }
}

export default ChangePassword;
