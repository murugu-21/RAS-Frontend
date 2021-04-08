import React, { Component } from "react";
import axios from "axios";
import Expire from './Expire';

class Users extends Component {
  state = { result: [] };
  
  
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
        {this.state.showalert && (<Expire delay="3000">
              <div className="alert alert-danger" role="alert">
                Owner cannot be deleted
              </div></Expire>)}
        
      </div>
    );
  }
}

export default Users;
