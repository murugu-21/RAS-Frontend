import axios from "axios";
import React, { Component } from "react";

import "./Addfooditems.css";

class Ingredients extends Component {
  state = {
    availablefood: [""],
    nameList: ["OIL"],
    quantityList: [0],
  };

  componentDidMount() {
    axios
      .post("http://localhost:8000/api/GetIngredients")
      .then((response) => {
        let userArr = response.data;

        if (userArr.length !== 0) {
          this.setState({ availablefood: userArr });
        }
      })

      .catch((error) => console.log(error));
  }

  handleadd = (e) => {
    let values = this.state.nameList.slice();
    let quantity = this.state.quantityList.slice();
    values.push("");
    quantity.push(0);
    this.setState({ nameList: values, quantityList: quantity });
    e.preventDefault();
  };

  handledelete = (index) => {
    let values = this.state.nameList.slice();
    let quantity = this.state.quantityList.slice();
    values.splice(index, 1);
    quantity.splice(index, 1);
    this.setState({ nameList: values, quantityList: quantity });
  };

  handlesubmit = (event) => {
    axios.post("/api/AddFoodItems", this.state).then((res) => {
      alert(res.data);
    });

    event.preventDefault();
  };

  checkAvailable = (index) => {
    return (item) => {
      if (this.state.nameList[index] === item) return true;
      return !this.state.nameList.includes(item);
    };
  };

  handleName = (event, index) => {
    let temp = [...this.state.nameList];
    temp[index] = event.target.value;
    this.setState({ nameList: temp });
  };
  handleQuantity = (event, index) => {
    let temp = this.state.quantityList;
    temp[index] = event.target.value;
    this.setState({ quantityList: temp });
  };
  render() {
    return (
      <form onSubmit={() => this.handlesubmit}>
        <div>
          {this.state.nameList.map((name, index) => {
            return (
              <div key={index}>
                <label>
                  {console.log(this.state.nameList[index])}
                  ingredient name:
                  <select
                    id={index}
                    value={this.state.nameList[index]}
                    onChange={(event) => {
                      this.handleName(event, index);
                    }}
                  >
                    {this.state.availablefood
                      .filter(this.checkAvailable(index))
                      .map((item, i) => {
                        return (
                          <option key={index * 1000 + i} value={item}>
                            {item}
                          </option>
                        );
                      })}
                  </select>
                </label>
                <label>
                  quantity:
                  <input
                    type="number"
                    name="quantity"
                    value={this.state.quantityList[index]}
                    onChange={(event) => {
                      this.handleQuantity(event, index);
                    }}
                    step="any"
                    required
                  />
                </label>
                <button type="button" onClick={() => this.handledelete(index)}>remove</button>
              </div>
            );
          })}

          <button type="button" onClick={(e) => this.handleadd(e)}>add</button>
        </div>
        <input type="submit" value="create food" />
      </form>
    );
  }
}

export default Ingredients;