import React, { Component } from "react";
import { Bar, Doughnut} from "react-chartjs-2";
import "./statisticalreport.css";
import axios from "axios";

class Statisticalreport extends Component {
  state = {
    chartdata: {
      labels: [],
      datasets: [
        {
          label: "",
          data: [],
        },
      ],
    },
  };

  componentDidMount() {
    axios

      .post("http://localhost:8000/api/GetSalesGraph")

      .then((response) => {
        let chartdata = response.data;
        this.setState({ chartdata: chartdata });
      })

      .catch((error) => console.log(error));
  }

  render() {
    return (
      <div>

      <div className="charts">
        <div className="first chart">
          <Doughnut
            data={this.state.chartdata}
            options={{ responsive: true, maintainAspectRatio: false }}
          />
        </div>
        <div className="secondchart">
          <Bar
            data={this.state.chartdata}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: { yAxes: [{ ticks: { beginAtZero: true } }] },
            }}
          />
        </div>
      </div>
      </div>
    );
  }
}

export default Statisticalreport;
