import React, { Component } from "react";
import axios from "axios";
import Alert from "./Alert";
class ShowUsers extends Component {
  state = {
    result: [],
    value: "",
    show: false,
    message: "",
    class: "",
  };
  componentDidMount() {
    axios

      .post("http://localhost:8000/api/getUsers")

      .then((response) => {
        let userArr = response.data;

        if (userArr.length !== 0) {
          this.setState({ result: userArr });
        }
      })

      .catch((error) => console.log(error));
  }
  handleSubmit = (e) => {
    axios

      .post("http://localhost:8000/api/getUsers")

      .then((response) => {
        let userArr = response.data;

        if (userArr.length !== 0) {
          this.setState({ result: userArr });
        }
      })

      .catch((error) => console.log(error));
  };
  handleOperation = (item) => {
    if (item.type === "owner") {
      this.setState({ show: false });
      this.setState({
        show: true,
        message: "Owner cannot be deleted",
        class: "danger",
      });
    } else {
      axios

        .post("http://localhost:8000/api/deleteUsers", { email: item.email })

        .then((response) => {
          let userArr = response.data;

          if (userArr.length !== 0 && typeof userArr === "object") {
            this.setState({ result: userArr });
          } else {
            this.setState({ show: false });
            this.setState({ show: true, message: userArr, class: "warning" });
          }
        })

        .catch((error) => console.log(error));
    }
  };
  render() {
    return (
      <div label="Users">
        <table>
          <thead>
            <tr>
              <th>Email</th>
              <th>type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.result.map((item) => {
              return (
                <tr key={item.email}>
                  <td>{item.email}</td>
                  <td>{item.type}</td>
                  <td>
                    {" "}
                    <button
                      className="buttondecor"
                      onClick={() => this.handleOperation(item)}
                    >
                      <i className="fa fa-trash"></i> remove{" "}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Alert
          show={this.state.show}
          message={this.state.message}
          time="5000"
          type={this.state.class}
        />
      </div>
    );
  }
}

export default ShowUsers;
