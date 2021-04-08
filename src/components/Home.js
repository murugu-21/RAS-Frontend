import React, { Component } from "react";
import Navbar from "./sidebar.js";
import Manager from "./Manager.js";
import Clerk from "./Clerk.js";
import Owner from "./Owner.js";

class Home extends Component {


  render() {
    const type= sessionStorage["type"];
    return (
      <div>
        <Navbar/>
        {type!==null &&<div>
        <div>{type === "Owner" && <Owner />}</div> 
        <div>{type === "Manager" && <Manager />}</div>
        <div>{type === "Clerk" && <Clerk />}</div></div>}
      </div>

    );
  }
}

export default Home;
