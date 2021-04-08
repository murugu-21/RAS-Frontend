import React, { Component } from 'react';
import axios from 'axios'

class AddNewIngredients extends Component {
    state = {newingredients:[{ingredientname:""}]}

    handlenewingredients=(index,event)=>{

        const values=[...this.state.newingredients];
        values[index][event.target.name]=event.target.value;
        this.setState({newingredients:values});
    };

    handlenewadd=()=>{

        const values=[...this.state.newingredients,{ingredientname:""}];
        this.setState({newingredients:values});
  
    };

    handlenewdelete=()=>{
        
        const values=[...this.state.newingredients];


        if(values.length!=1)
        values.pop() 
        
        this.setState({newingredients:values});

    };

    handlesubmit=(event)=>
    {

        let j;
        let k;
        let flag=0;

        for (j = 0; j < this.state.newingredients.length; j++) {
            for (k = j+1; k < this.state.newingredients.length; k++) {
                if ( this.state.newingredients[j]['ingredientname'] === this.state.newingredients[k]['ingredientname'] ) {
                    flag=1
                    alert("same items are given")
                }
            }

        }
        if(flag===0){
        axios.
        post("http://localhost:8000/api/AddIngredients",this.state).
        then((res) => {
             
              alert(res.data);
            
          });


        event.preventDefault();
        }
        event.preventDefault();
    };





    render() { 
        return (
       
            <div>
            <form onSubmit={this.handlesubmit}>
            {this.state.newingredients.map((inputfield,index)=>{
            return(
            <div key={index}>
            <label>ingredientname:
            <input type="text" name="ingredientname" value={this.state.newingredients[index].ingredientname} onChange={(event)=>{this.handlenewingredients(index,event)}} required/>
            </label>
            </div>
            );})
            
            }
            <button type="button" onClick={this.handlenewadd}>add</button>
            <button  type="button" onClick={this.handlenewdelete}>remove</button> 

            <input type="submit"  name="login_submit" value="submit" />  
            

            <a href="/HOME" className="btn btn-primary">back</a>
            </form>
            </div> 
          );
        }

    }

 
export default AddNewIngredients;