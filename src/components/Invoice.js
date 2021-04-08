import axios from "axios";
import React, { Component } from "react";
import printJS from "print-js";
import "./Addfooditems.css";

class Invoice extends Component {
  state = {
    availablefood: [],
    priceList: ["1"],
    nameList: ["OIL"],
    quantityList: ["1"],
    addNew: false,
    show: false,
    message: "",
    class: "",
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
  }

  handleprice = (event, index) => {
    let temp = [...this.state.priceList];
    temp[index] = event.target.value;
    this.setState({ priceList: temp });
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
    let price = this.state.priceList.slice();
    values.push(this.state.availablefood.filter(this.checkAvailable(-1))[0]);
    quantity.push(1);
    price.push(1);
    this.setState({
      nameList: values,
      quantityList: quantity,
      priceList: price,
    });
    e.preventDefault();
  };

  handledelete = (index) => {
    let values = this.state.nameList.slice();
    let quantity = this.state.quantityList.slice();
    let price = this.state.priceList.slice();
    if (values.length !== 1 && quantity.length !== 1) {
      values.splice(index, 1);
      quantity.splice(index, 1);
      price.splice(index, 1);
    }
    this.setState({
      nameList: values,
      quantityList: quantity,
      priceList: price,
    });
  };

  checkAvailable = (index) => {
    return (item) => {
      if (this.state.nameList[index] === item) return true;
      return !this.state.nameList.includes(item);
    };
  };

  handlesubmit = (event) => {
    axios
      .post("http://localhost:8000/api/GenerateInvoice", this.state, {
        responseType: "blob",
      })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        printJS(url, "image");
      });

    event.preventDefault();
  };

  render() {
    return (
      <div className="addfood">
        <h1 className="title">Invoice</h1>
        <div>
          <form onSubmit={this.handlesubmit} className="contact-form row">
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

                  <br />
                  <br />
                  <br />
                  <br />
                  <br />

                  <label className="label">
                    ingredientprice:
                    <input
                      name="price"
                      type="number"
                      value={this.state.priceList[index]}
                      onChange={(event) => {
                        this.handleprice(event, index);
                      }}
                      min="0"
                      step="any"
                    ></input>
                  </label>
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
                  value="genarate cheque"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default Invoice;
