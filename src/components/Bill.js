import React, { Component } from "react";
import axios from "axios";
import printJS from "print-js";
class Bill extends Component {
  componentDidMount() {
    console.log(this.props.data.order);
    axios
      .post("http://localhost:8000/api/BillGenerator", this.props.data, {
        responseType: "arraybuffer",
      })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        printJS(url);
      })
      .catch((error) => console.log(error));
  }
  render() {
    console.log("success")
    return <div />;
  }
}

export default Bill;
