import React, { Component } from 'react';
import axios from "axios";

class Otp extends Component {
    state = { 
        number: '',
        error: "",
     }
 
    handleChange = (event) => {
        this.setState({ number: event.target.value });
    }

    handleSubmit = (event) => {
        axios
          .post("http://localhost:8000/api/OtpValidation", {
            email: sessionStorage.getItem("requestEmail"),
            number: this.state.number,
          })
          .then((res) => {
              console.log(res.data.cango);
            if (res.data.cango) {
                sessionStorage.setItem("otp_valid","yes");
                this.props.history.push("/changePassword");              
            } else {
              this.setState({error: res.data});
            }
          });
        event.preventDefault();
    }
    
    render() { 
        return ( 
            <div>
                <h1>Enter OTP</h1>
                <form onSubmit={this.handleSubmit}  className="login">
                    <input 
                        type="number"
                        onChange={this.handleChange}
                        value={this.state.number}
                        placeholder="Enter OTP"
                        required
                    />
                    <p className="error">{this.state.error}</p>
                    <input type="submit" name="login_submit" value="submit" />
                    <a href="/">Login</a>
                </form>
            </div> 
            
            );
 
    }
}
 
export default Otp;