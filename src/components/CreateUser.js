import React, { Component } from "react";
import axios from "axios";
import Expire from './Expire';

class CreateUser extends Component {
  state = { email: "", password: "", type: "Clerk",showalert:false};
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
    axios.post("http://localhost:8000/api/createUser", this.state).then((res) => {
      if (res.data) {
        this.setState({showalert: true})
        
      }
    });
    e.preventDefault();
  };
  render() {
    return (
      <div className="login">
      <form onSubmit={this.handleSubmit}>
        <label>Email: </label>
        <input
          type="email"
          value={this.state.email}
          onChange={this.handleEmail}
          required
        />
        <br></br>
        <label>Password: </label>
        <input
          type="password"
          value={this.state.password}
          onChange={this.handlePassword}
          required
        />
        <br></br>
        <label>
          Type:
          <select value={this.state.type} onChange={this.handleType}>
            <option value="Manager">Manager</option>
            <option value="Clerk">Clerk</option>
            <option value="Owner">Owner</option>
          </select>
        </label>
        <br></br>
        <input type="submit" value="create User" />
      </form>
      {this.state.showalert &&(<Expire delay="3000">
              <div className="alert alert-success" role="alert">
                New user created
              </div></Expire>)}
      </div>
    );
  }
}

export default CreateUser;
