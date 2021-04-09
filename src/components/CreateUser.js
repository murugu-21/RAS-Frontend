import React, { Component } from "react";
import axios from "axios";
import Alert from "./Alert";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
class CreateUser extends Component {
  state = {
    email: "",
    password: "",
    type: "clerk",
    toggle: "far fa-eye",
    pass_type: "password",
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
    if (this.state.pass_type === "password") {
      this.setState({
        pass_type: "text",
        toggle: "far fa-eye  fa-lg fa-eye-slash fa-lg",
      });
    } else {
      this.setState({ pass_type: "password", toggle: "far fa-eye fa-lg" });
    }
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit} className="user">
        <label>email: </label>
        <input
          type="email"
          value={this.state.email}
          placeholder="Enter email"
          onChange={(e) => this.handleEmail(e)}
          required
          style={{ width: "88%" }}
        />
        <i className="far fa-user-circle fa-lg"></i>
        <br></br>
        <label>password: </label>
        <input
          type={this.state.pass_type}
          placeholder="Enter Password"
          value={this.state.password}
          onChange={(e) => this.handlePassword(e)}
          required
          style={{ width: "88%", height: "50px" }}
        />
        <i
          className={this.state.toggle}
          id="togglePassword"
          onClick={this.handleVisibility}
        />
        <br></br>
        <FormControl component="fieldset">
          <FormLabel component="legend">TYPE:</FormLabel>
          <RadioGroup
            aria-label="gender"
            name="file"
            value={this.state.type}
            onChange={(e) => this.handleType(e)}
            row
          >
            <FormControlLabel
              value="manager"
              control={<Radio />}
              label="Manager"
              labelPlacement="bottom"
            />
            <FormControlLabel
              value="clerk"
              control={<Radio />}
              label="Clerk"
              labelPlacement="bottom"
            />
            <FormControlLabel
              value="owner"
              control={<Radio />}
              label="Owner"
              labelPlacement="bottom"
            />
          </RadioGroup>
        </FormControl>

        <Alert
          show={this.state.show}
          time="5000"
          message={this.state.message}
          type={this.state.class}
        />

        <input type="submit" value="create User" />
      </form>
    );
  }
}

export default CreateUser;
