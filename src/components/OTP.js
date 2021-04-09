import React, { Component } from "react";
import axios from "axios";
import Alert from "./Alert";
class Otp extends Component {
  state = {
    number: "",
    error: "",
    show: false,
    message: "",
    type: "",
  };

  handleChange = (event) => {
    this.setState({ number: event.target.value });
  };

  handleSubmit = (event) => {
    axios
      .post("http://localhost:8000/api/OtpValidation", {
        email: sessionStorage.getItem("requestEmail"),
        number: this.state.number,
      })
      .then((res) => {
        if (res.data.cango) {
          sessionStorage.setItem("otp_valid", "yes");
          this.props.history.push("/changePassword");
        } else {
          this.setState({ show: false });
          this.setState({
            show: true,
            message: res.data[0],
            type: res.data[1],
          });
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
            <input
              type="number"
              onChange={this.handleChange}
              value={this.state.number}
              placeholder="Enter OTP"
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
  }
}

export default Otp;
