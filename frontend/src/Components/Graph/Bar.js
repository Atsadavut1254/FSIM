import React, { Component } from "react";

import { Bar } from 'react-chartjs-2';

const option = {
  //////// Don't delete this
  // scales: {
  //   xAxes: [{
  //     stacked: true
  //   }],
  //   yAxes: [{
  //     stacked: true
  //   }]
  // },


  plugins: {
    // Change options for ALL labels of THIS CHART
    datalabels: {
      color: '#000000',
      anchor: 'end'
    }
  }
}

class Barchart extends Component {

  constructor(props) {
    super(props)
    this.state = {
      labels: [],
      datasets: []
    }
  }

  componentDidMount() {
    let { data } = this.props

    if (data !== undefined) {
      if (data.length !== 0) {
        this.setState(data)
      }
    }

  }

  render() {
    let { data } = this.props
    return (
      <React.Fragment>
        {data !== undefined && <Bar data={data.length === 0 ? this.state : data} options={option} />}
      </React.Fragment>
    );
  }
}

export default Barchart;
