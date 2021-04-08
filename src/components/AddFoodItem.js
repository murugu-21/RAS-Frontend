import axios from "axios";
import React, { Component } from "react";
import Alert from "./Alert";
import "./Addfooditems.css";
import Complement from "./Complement";
import checkAvailableComplement from "./Complement";

class AddFoodItem extends Component {
  state = {
    availablefood: [],
    foodname: "",
    price: 0,
    priceclass: "hidden",
    nameList: ["OIL"],
    quantityList: [1],
    ingredientname: "",
    show: false,
    message: "",
    class: "",
    availableComplement: [],
    complement: [""],
  };

  handlenew = (event) => {
    axios
      .post("http://localhost:8000/api/AddIngredients", {
        name: this.state.ingredientname,
      })
      .then((response) => {
        this.setState({ show: false });
        this.setState({
          show: true,
          message: response.data[0],
          class: response.data[1],
        });
        this.getIngredients();
      });

    event.preventDefault();
  };

  getIngredients = () => {
    axios

      .post("http://localhost:8000/api/GetIngredients")

      .then((response) => {
        let userArr = response.data;

        if (userArr.length !== 0) {
          this.setState({ availablefood: userArr });
        }
      })

      .catch((error) => console.log(error));
  };
  componentDidMount() {
    this.getIngredients();
    axios.post("http://localhost:8000/api/GetComplement").then((response) => {
      let data = response.data;
      if (data !== 0) {
        this.setState({ availableComplement: data });
      }
    });
  }

  handlefoodname = (e) => {
    this.setState({ foodname: e.target.value });
  };

  handleprice = (e) => {
    this.setState({ price: e.target.value });
  };

  handleopenprice = () => {
    this.setState({ priceclass: "visible" });
  };

  handlecloseprice = () => {
    this.setState({ price: 0 });
    this.setState({ priceclass: "hidden" });
  };

  handleName = (event, index) => {
    let temp = [...this.state.nameList];
    temp[index] = event.target.value;
    this.setState({ nameList: temp });
  };
  handleQuantity = (event, index) => {
    let temp = [...this.state.quantityList];
    temp[index] = event.target.value;
    this.setState({ quantityList: temp });
  };

  handleadd = (e) => {
    let values = this.state.nameList.slice();
    let quantity = this.state.quantityList.slice();
    values.push(this.state.availablefood.filter(this.checkAvailable(-1))[0]);
    quantity.push(1);
    this.setState({ nameList: values, quantityList: quantity });
    e.preventDefault();
  };

  handledelete = (index) => {
    let values = this.state.nameList.slice();
    let quantity = this.state.quantityList.slice();
    if (values.length !== 1 && quantity.length !== 1) {
      values.splice(index, 1);
      quantity.splice(index, 1);
    }
    this.setState({ nameList: values, quantityList: quantity });
  };

  checkAvailable = (index) => {
    return (item) => {
      if (this.state.nameList[index] === item) return true;
      return !this.state.nameList.includes(item);
    };
  };

  handlesubmit = (event) => {
    axios
      .post("http://localhost:8000/api/AddFoodItems", this.state)
      .then((res) => {
        alert(res.data);
      });

    event.preventDefault();
  };

  handleAddComplement = (e) => {
    let values = this.state.complement.slice();
    values.push(
      this.state.availableComplement.filter(
        checkAvailableComplement(-1)
      )[0]
    );
    this.setState({ complement: values });
    e.preventDefault();
  };

  handleRemoveComplement = (index) => {
    let values = this.state.complement.slice();
    if (values.length !== 1) {
      values.splice(index, 1);
    }
    this.setState({ complement: values });
  };

  render() {
    return (
      <div className="addfood">
        <h1 className="title">ADD FOOD</h1>
        <form onSubmit={this.handlesubmit}>
          <label>
            foodname:
            <input
              type="text"
              onChange={this.handlefoodname}
              value={this.state.foodname}
              placeholder="foodname"
              required
            />
          </label>
          <br />
          <br />
          <br />
          <label htmlFor="complementary">complementary</label>
          <input
            type="radio"
            id="complementary"
            name="fooditem"
            value="complementary"
            onClick={this.handlecloseprice}
          ></input>
          <br />
          <label htmlFor="fooditem">fooditem</label>
          <input
            type="radio"
            id="fooditem"
            name="fooditem"
            value="food"
            onClick={this.handleopenprice}
          ></input>
          <br />
          <span className={this.state.priceclass}>
            <label>
              price:
              <input type="number" onChange={this.handleprice} min="5"></input>
            </label>
          </span>
          {this.state.priceclass === "visible" && (
            <Complement
              complement={this.state.complement}
              availableComplement={this.state.availableComplement}
              addComplement={(e) => this.handleAddComplement(e)}
              removeComplement={(index) => this.handleRemoveComplement(index)}
            />
          )}
          {this.state.nameList.map((name, index) => {
            return (
              <div key={index}>
                <label>
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
                            {console.log(item)}
                            {item.toString().toUpperCase()}
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
                    min="0.0001"
                    required
                  />
                </label>
                {index !== 0 && (
                  <button
                    type="button"
                    onClick={() => this.handledelete(index)}
                  >
                    remove
                  </button>
                )}
              </div>
            );
          })}
          <button type="button" onClick={(e) => this.handleadd(e)}>
            add
          </button>
          <input type="submit" value="create food" />
        </form>
        <h1>Add new Ingredients here</h1>
        <br />
        <form onSubmit={(e) => this.handlenew(e)}>
          <label>
            ingredientname:
            <input
              type="text"
              name="ingredientname"
              value={this.state.ingredientname}
              onChange={(event) => {
                this.setState({ ingredientname: event.target.value });
              }}
              required
            />
          </label>
          <input type="submit" value="Add" />
          <Alert
            show={this.state.show}
            time="5000"
            type={this.state.class}
            message={this.state.message}
          />
        </form>
      </div>
    );
  }
}
export default AddFoodItem;
