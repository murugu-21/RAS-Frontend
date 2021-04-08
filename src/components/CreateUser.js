import React, { Component } from "react";
import axios from "axios";
import Alert from "./Alert";

class CreateUser extends Component {
  state = {
    email: "",
    password: "",
    type: "clerk",
    toggle: "far fa-eye",
    show: false,
    message: "",
    class: "",
  };
  handleEmail = (e) => {
    this.setState({ email: e.target.value });
  };
  handlePassword = (e) => {
    this.setState({ password: e.target.value });
  };
  handleType = (e) => {
    this.setState({ type: e.target.value });
  };
  handleSubmit = (e) => {
    axios
      .post("http://localhost:8000/api/createUser", this.state)
      .then((res) => {
        if (res.data) {
          this.setState({ show: false });
          this.setState({
            show: true,
            message: res.data[0],
            class: res.data[1],
          });
        }
      });
    e.preventDefault();
  };
  handleVisibility = () => {
    if (this.state.type === "password") {
      this.setState({
        type: "text",
        toggle: "far fa-eye  fa-lg fa-eye-slash fa-lg",
      });
    } else {
      this.setState({ type: "password", toggle: "far fa-eye fa-lg" });
    }
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>email: </label>
        <input
          type="email"
          value={this.state.email}
          onChange={this.handleEmail}
          required
        />
        <br></br>
        <label>password: </label>
        <input
          type={this.state.type}
          placeholder="Enter Password"
          value={this.state.password}
          onChange={this.handlePassword}
          required
        />
        <i
          className={this.state.toggle}
          id="togglePassword"
          onClick={this.handleVisibility}
        />
        <br></br>
        <label>
          type:
          <select value={this.state.type} onChange={(e) => this.handleType(e)}>
            <option value="manager">manager</option>
            <option value="clerk">clerk</option>
            <option value="owner">owner</option>
          </select>
        </label>
        <br></br>
        <input type="submit" value="create User" />
        <Alert
          show={this.state.show}
          time="5000"
          message={this.state.message}
          type={this.state.class}
        />
      </form>
    );
  }
}

export default CreateUser;
