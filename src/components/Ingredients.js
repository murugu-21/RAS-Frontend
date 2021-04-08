import axios from "axios";
import React, { Component } from "react";
import "./Addfooditems.css";
import Alert from "./Alert.js";

import Complement from "./Complement";

class Ingredients extends Component {
  state = {
    availablefood: [],
    foodname: "",
    price: 0,
    priceclass: "visible",
    nameList: ["OIL"],
    quantityList: [1],
    newingredients: [{ ingredientname: "" }],
    addNew: false,
    show: false,
    message: "",
    class: "",
    availableComplement: [],
    complement: ["chutney"],
    selectedImage: null,
  };

  handleSelectedImage = (event) => {
    this.setState({ selectedImage: event.target.files[0] });
  };

  checkAvailableComplement = (index) => {
    return (item) => {
      if (this.state.complement[index] === item) return true;
      return !this.state.complement.includes(item);
    };
  };

  handlenewingredients = (index, event) => {
    const values = [...this.state.newingredients];
    values[index][event.target.name] = event.target.value;
    this.setState({ newingredients: values });
  };

  handlenewadd = () => {
    const values = [...this.state.newingredients, { ingredientname: "" }];
    this.setState({ newingredients: values });
  };

  handlenewdelete = () => {
    const values = [...this.state.newingredients];

    if (values.length !== 1) values.pop();

    this.setState({ newingredients: values });
  };

  handleNew = (event) => {
    let j;
    let k;
    let flag = 0;

    for (j = 0; j < this.state.newingredients.length; j++) {
      for (k = j + 1; k < this.state.newingredients.length; k++) {
        if (
          this.state.newingredients[j]["ingredientname"] ===
            this.state.newingredients[k]["ingredientname"] ||
          this.state.newingredients[j]["ingredientname"].length === 0
        ) {
          flag = 1;
          break;
        }
      }

      if (flag === 1) break;
    }

    if (flag === 1) {
      alert("same ingredients given ");
      const r = ["same items given", "warning"];
      this.setState({ addNew: false, show: true, message: r[0], class: r[1] });
    }
    if (flag === 0) {
      axios
        .post("http://localhost:8000/api/AddIngredients", this.state)
        .then((res) => {
          this.setState({ show: false });
          this.setState({
            addNew: false,
            show: true,
            message: res.data[0],
            class: res.data[1],
          });
          this.getIngredients();
        });

      event.preventDefault();
    }

    this.setState({ addNew: false, show: false, message: "", class: "" });

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
    this.setState({ complement: ["CHUTNEY"] });
    this.setState({ priceclass: "visible" });
  };

  handlecloseprice = () => {
    this.setState({ complement: [] });
    this.setState({ price: 0 });
    this.setState({ selectedImage: null });
    this.setState({ priceclass: "hidden" });
  };

  handleName = (event, index) => {
    let temp = [...this.state.nameList];
    temp[index] = event.target.value;
    this.setState({ nameList: temp });
  };

  handleComplementName = (event, index) => {
    let temp = [...this.state.complement];
    temp[index] = event.target.value;
    this.setState({ complement: temp });
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
        this.setState({ show: false });
        this.setState({
          show: true,
          message: res.data[0],
          class: res.data[1],
        });

        if (
          this.state.priceclass === "visible" &&
          this.state.message === "food created"
        ) {
          const fd = new FormData();
          console.log(this.state.selectedImage);
          fd.append(
            "image",
            this.state.selectedImage,
            this.state.selectedImage.name
          );
          fd.append("name", this.state.selectedImage, this.state.foodname);
          axios.post("http://localhost:8000/api/image", fd).then((res) => {
            console.log(res.data);
          });
        }
      });

    this.setState({ addNew: false, show: false, message: "", class: "" });

    event.preventDefault();
  };

  handleAddComplement = (e) => {
    let values = this.state.complement.slice();
    values.push(
      this.state.availableComplement.filter(
        this.checkAvailableComplement(-1)
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
      <div className="addfood ">
        <h1 className="title">ADD FOOD</h1>
        <br />
        <br />
        <br />
        <div>
          <form onSubmit={this.handlesubmit} className="contact-form row">
            <div className="form-field col-lg-12">
              <label className="label">
                foodname:
                <input
                  className="input-text js-input"
                  type="text"
                  onChange={this.handlefoodname}
                  value={this.state.foodname}
                  placeholder="foodname"
                  required
                />
              </label>
            </div>
            <div className="form-field col-5">
              <label className="label" htmlFor="complementary">
                complementary
                <input
                  type="radio"
                  id="complementary"
                  name="fooditem"
                  value="complementary"
                  onClick={this.handlecloseprice}
                ></input>
              </label>
            </div>
            <div className="form-field col-5">
              <label className="label" htmlFor="fooditem">
                fooditem
                <input
                  type="radio"
                  id="fooditem"
                  name="fooditem"
                  value="food"
                  onClick={this.handleopenprice}
                  defaultChecked="true"
                ></input>
              </label>
            </div>
            <div className="form-field col-lg-12">
              <span className={this.state.priceclass}>
                <label className="label">
                  price:
                  <input
                    className="input-text js-input"
                    type="number"
                    onChange={this.handleprice}
                    min="0"
                    step="any"
                  ></input>
                </label>
              </span>
            </div>
            {this.state.priceclass === "visible" && (
              <Complement
                complement={this.state.complement}
                availableComplement={this.state.availableComplement}
                addComplement={(e) => this.handleAddComplement(e)}
                removeComplement={(index) => this.handleRemoveComplement(index)}
                handleComplementName={(event, index) =>
                  this.handleComplementName(event, index)
                }
                handleImage={(event) => this.handleSelectedImage(event)}
              />
            )}
            {this.state.nameList.map((name, index) => {
              return (
                <div key={index} className="dropdowns form-field col-12">
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
                              {item.toUpperCase()}
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
                      className="removebtn"
                      onClick={() => this.handledelete(index)}
                    >
                      <i class="fa fa-trash" />
                    </button>
                  )}
                </div>
              );
            })}
            <div className="form-field col-lg-12">
              <button
                className="add-btn"
                type="button"
                onClick={(e) => this.handleadd(e)}
              >
                add
              </button>
            </div>
            <div className="form-field col-lg-12">
              <div className="container">
                <input
                  className="submit-btn"
                  type="submit"
                  value="create food"
                />
              </div>
            </div>
          </form>

          <Alert
            show={this.state.show}
            time="5000"
            type={this.state.class}
            message={this.state.message}
          />
        </div>

        <div>
          <form className="contact-form row" onSubmit={this.handleNew}>
            {this.state.newingredients.map((inputfield, index) => {
              return (
                <div key={index} className="form-field col-lg-6">
                  <div className="form-field col-lg-12">
                    <label className="label">
                      ingredientname:
                      <input
                        type="text"
                        name="ingredientname"
                        className="input-text js-input"
                        value={this.state.newingredients[index].ingredientname}
                        onChange={(event) => {
                          this.handlenewingredients(index, event);
                        }}
                        required
                      />
                    </label>
                  </div>
                </div>
              );
            })}
            <div className="form-field col-3">
              <button
                type="button"
                className="add-btn"
                onClick={this.handlenewadd}
              >
                add
              </button>
            </div>
            <div className="form-field col-3">
              <button
                className="add-btn"
                type="button"
                onClick={this.handlenewdelete}
              >
                remove
              </button>
            </div>
            <div className="form-field col-lg-12">
              <div className="container">
                <input className="add-btn" type="submit" value="Add" />
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default Ingredients;
