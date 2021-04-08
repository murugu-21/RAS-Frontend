import React, { Component } from "react";
class Dashboard extends Component {
  state = {};
  render() {
    const type = sessionStorage["type"];
    if (type === "owner") {
      return this.props.history.push("/Owner");
    } else if (type === "manager") {
      return this.props.history.push("/Manager");
    } else if (type === "clerk") {
      return this.props.history.push("/Clerk");
    }
    return <h1>Page not found</h1>;
  }
}

export default Dashboard;
