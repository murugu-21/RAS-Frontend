import React, { Component } from "react";
import './table.css';
import axios from "axios";
import Tabs from "./Tabs.js"
import "./Tab.css";
import CustomAlert from './CustomAlert';



class Owner extends Component {

  state = { result: [], email: "", password: "", type: "Clerk",showalert:false};

  componentDidMount() {

    

    axios

      .post("http://localhost:8000/api/getUsers")

      .then((response) => {

        let userArr = response.data;

        if (userArr.length !== 0) {

          
          this.setState({result:userArr});
  
        }

      })

      .catch((error) => console.log(error));


  }

  handleEmail = (e) => {
    this.setState({ email: e.target.value });
  };
  handlePassword = (e) => {
    this.setState({ password: e.target.value });
  };
  handleType = (e) => {
    this.setState({ type: e.target.value });
  };


  handleSubmit = (e) => {

    setTimeout(()=>{
    axios.post("http://localhost:8000/api/createUser", {
      email: this.state.email,
      password: this.state.password,
      type:this.state.type
    })
    .then((res) => {
      if (res.data) {
        alert(this.state.email + res.data);
      }
    }
    )
  },1)

  axios

  .post("http://localhost:8000/api/getUsers")

  .then((response) => {

    let userArr = response.data;

    if (userArr.length !== 0) {

      
      this.setState({result:userArr});

    }

  })

  .catch((error) => console.log(error));
  };

  handleOperation=(item)=>{

    if(item.type==="Owner")
    { 
        this.setState({showalert:true});
    }

    else{

    console.log(item);
    axios

    .post("http://localhost:8000/api/deleteUsers",{email:item.email})

    .then((response) => {

      let userArr = response.data;

      if (userArr.length !== 0) {

        
        this.setState({result:userArr});

      }

    })

    .catch((error) => console.log(error));

  }

}

  render() {

    let addmodalclose=()=>this.setState({showalert:false});

    return (
      <Tabs>
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
         <CustomAlert show={this.state.showalert}
           onHide={addmodalclose}
         />
        
      </div>

      <div label="Create User">
        <form onSubmit={this.handleSubmit}>
          <label>email: </label>
          <input
            type="email"
            value={this.state.email}
            onChange={this.handleEmail}
            required
          />
          <br></br>
          <label>password: </label>
          <input
            type="password"
            value={this.state.password}
            onChange={this.handlePassword}
            placeholder="password"
            required
          />
          <br></br>
          <label>
            type:
            <select value={this.state.type} onChange={this.handleType}>
              <option value="Manager">Manager</option>
              <option value="Clerk">Clerk</option>
              <option value="Owner">Owner</option>
            </select>
          </label>
          <br></br>
          <input type="submit" value="create User" />
        </form>
      </div>
     
    </Tabs>
    
    );

}

}



export default Owner;