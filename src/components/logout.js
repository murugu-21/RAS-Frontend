import React, { Component } from 'react';
import { Redirect } from 'react-router';

class LogOut extends Component {
    state = {};
    handleClick = () => {
      
      window.location.href = "/";
    };
    render() {
      return (
        <div> 
          {sessionStorage.clear()} 
          <Redirect to="/"/>
        </div>
      );
    }
  }
  
  export default LogOut;