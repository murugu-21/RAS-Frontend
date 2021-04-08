import axios from "axios";
import React, { Component } from "react";

import "./Addfooditems.css";

class Addfooditems extends Component {
  state = {
    availablefood: [],
    foodname: "",
    price: 0,
    priceclass: "hidden",
    ingredients: { Batter: 0 },
    newingredients: [{ ingredientname: "", quantity: 0 }],
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

  handle_existingingredients = (index, event) => {
    const values = [...this.state.ingredients];
    values[index][event.target.name] = event.target.value;
    this.setState({ ingredients: values });
    const values1 = [...this.state.availablefood];
    values1.splice(values1.indexOf(event.target.value), 1);
    console.log(values1, this.state.availablefood);
    this.setState({ availablefood: values1 });
  };

  handlenewingredients = (index, event) => {
    const values = [...this.state.newingredients];
    values[index][event.target.name] = event.target.value;
    this.setState({ newingredients: values });
  };

  handleadd = () => {
    const values = this.state.ingredients;
    values[""] = 0;
    this.setState({ ingredients: values });
  };

  handledelete = () => {
    const values = this.state.ingredients;

    if (values.length != 1) {
      values.pop();
    }
    this.setState({ ingredients: values });
  };

  handlenewadd = () => {
    const values = [
      ...this.state.newingredients,
      { ingredientname: "", quantity: 0 },
    ];
    this.setState({ newingredients: values });
  };

  handlenewdelete = () => {
    const values = [...this.state.newingredients];

    values.pop();

    this.setState({ newingredients: values });
  };

  handlesubmit = (event) => {
    axios.post("http://localhost:8000/api/AddFoodItems", this.state).then((res) => {
      alert(res.data);
    });

    event.preventDefault();
  };

  render() {
    return (
      <div className="addfood">
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
              <input type="number" onChange={this.handleprice}></input>
            </label>
          </span>
          <div>
            {Object.keys(this.state.ingredients).map((inputfield, index) => {
              return (
                <div key={index}>
                  <label>
                    ingredientname:
                    {/* <input type="text" name="ingredientname" value={this.state.ingredients[index].ingredientname} onChange={(event)=>{this.handleingredients(index,event)}} required/> */}
                    <select
                      id="ingredientlist"
                      name="ingredientname"
                      onChange={(event) =>
                        this.handle_existingingredients(index, event)
                      }
                    >
                      {this.state.availablefood.map((item, i) => {
                        return (
                          <option
                            key={this.state.availablefood[i]}
                            value={this.state.availablefood[i]}
                          >
                            {this.state.availablefood[i]}
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
                      value={this.state.ingredients[index]}
                      onChange={(event) => {
                        this.handle_existingingredients(index, event);
                      }}
                      step="any"
                      required
                    />
                  </label>
                  {/*             
            <button onClick={this.handleadd}>add</button>
            <button onClick={(event)=>this.handledelete(index)}>remove</button> */}
                </div>
              );
            })}

            <button onClick={this.handleadd}>add</button>
            <button onClick={this.handledelete}>remove</button>
          </div>

          <div>
            <h4>TO ADD NEW INGREDIENTS THAT ARE NOT AVAILABLE IN INVENTORY </h4>

            {this.state.newingredients.map((inputfield, index) => {
              return (
                <div key={index}>
                  <label>
                    ingredientname:
                    <input
                      type="text"
                      name="ingredientname"
                      value={this.state.newingredients[index].ingredientname}
                      onChange={(event) => {
                        this.handlenewingredients(index, event);
                      }}
                      required
                    />
                  </label>
                  <label>
                    quantity:
                    <input
                      type="number"
                      name="quantity"
                      value={this.state.newingredients[index].quantity}
                      onChange={(event) => {
                        this.handlenewingredients(index, event);
                      }}
                      step="any"
                      required
                    />
                  </label>
                </div>
              );
            })}

            <button onClick={this.handlenewadd}>add</button>
            <button onClick={this.handlenewdelete}>remove</button>
          </div>

          <input type="submit" name="login_submit" value="submit" />
        </form>
      </div>
    );
  }
}

export default Addfooditems;
