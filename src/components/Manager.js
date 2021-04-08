import React, { Component } from "react";
import axios from 'axios';
import Statisticalreport from "./statisticalreport";
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';

var fileDownload = require('js-file-download');

class Manager extends Component {
  state = {
    date : "",
    file : "sales_report",
    format: "pdf"
  };

  handleChange = (event) =>{
    console.log(event.target.name)
    this.setState({...this.state, [event.target.name]: event.target.value});
  }

  async post()
  {
    // const instance = axios.create({ timeout: 10000 });
    // await instance.post("http://localhost:8000/api/CreateExcel",{
    //     date : this.state.date,
    //     file : this.state.file
    //   })
    await axios.get("http://localhost:8000/api/get_excel",{
      params: {
        filename: this.state.file
      }
    }).then((res)=>{
        fileDownload(res.data, this.state.file+"."+this.state.format);}
      )

  }

  handleSubmit = (event) => {
    if(this.state.format === 'pdf')
    {
      console.log(this.state.date)
      axios.post("http://localhost:8000/api/CreatePdf",{
        date : this.state.date,
        file : this.state.file,
        
      })
      .then((res) => {
        const file = new Blob(
              [res.data], 
              {type: 'application/pdf'});
            const fileURL = URL.createObjectURL(file);
            //console.log(fileURL)
            window.open(fileURL,"Mypdf.pdf");
      });  
    }

    else if(this.state.format === 'csv')
    {
      axios.post("http://localhost:8000/api/CreateCsv",{
        date : this.state.date,
        file : this.state.file
      })
      .then((res) => {
        console.log(res)
        fileDownload(res.data, this.state.file+"."+this.state.format);
      });
    }
    else{
      console.log("hello")
      axios.post("http://localhost:8000/api/CreateExcel",{
         date : this.state.date,
         file : this.state.file,
       },{responseType: 'arraybuffer',})
       .then((res) => {
        var blob = new Blob([res.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        console.log(blob)
        fileDownload(blob, this.state.file+"."+this.state.format);
       }).catch( err => console.log(err));
    }
  }

  render() {

    return (
      <div style={{width: "100%" , overflow: "visible"}}>
        <h1>Manager</h1>
      <div style={{width: "60%", float: "left"}}><Statisticalreport/></div>
      <div style={{marginLeft: "70%"}}>
        <h2>Download reports</h2>
        <form className="generateFile">
        <p>Enter date:</p>
        <TextField
          onChange = {this.handleChange}
          value = {this.state.date}
          variant="outlined"
          id="outlined-search"
          name="date"
          //label="From Date" 
          type="date"
          required
        /><br/><br/>
        
        <FormControl component="fieldset">
          <FormLabel component="legend">Choose file:</FormLabel>
          <RadioGroup aria-label="gender" name="file" value={this.state.file} onChange={this.handleChange} row>
            <FormControlLabel value="sales_report" control={<Radio />} label="Sales Report" labelPlacement="bottom"/>
            <FormControlLabel value="purchase_report" control={<Radio />} label="Purchase Report" labelPlacement="bottom"/>
            <FormControlLabel value="gross_income" control={<Radio />} label="Gross Income" labelPlacement="bottom"/>
          </RadioGroup>
        </FormControl><br/><br/>

        {/* <select name="file" onChange={this.handleChange} value={this.state.file} required>
          <option value="sales_report">Sales Report</option>
          <option value="purchase_report">Purchase Report</option>
          <option value="gross_income">Gross Income</option>
        </select> */}

        <FormControl component="fieldset">
          <FormLabel component="legend">Choose type:</FormLabel>
          <RadioGroup aria-label="gender" name="format" value={this.state.format} onChange={this.handleChange} row>
            <FormControlLabel value="pdf" control={<Radio />} label="PDF" labelPlacement="bottom"/>
            <FormControlLabel value="csv" control={<Radio />} label="CSV" labelPlacement="bottom"/>
            <FormControlLabel value="xlsx" control={<Radio />} label="XLSX" labelPlacement="bottom"/>
          </RadioGroup>
        </FormControl><br/><br/>

        {/* <label htmlFor="format" >Choose file:</label>
        <select name="format" onChange={this.handleChange} value={this.state.format} required>
          <option value="pdf">PDF</option>
          <option value="csv">CSV</option>
          <option value="xlsx">XLSX</option>
        </select> */}

        <Button
          name = "generate_file_submit"
          value = "Submit"
          color="primary"
          variant="contained"
          onClick={this.handleSubmit}
        >Submit</Button>
        </form> 
        
      </div>
      </div>
    );
  }
}

export default Manager;
