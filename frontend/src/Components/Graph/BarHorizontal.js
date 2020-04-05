import React, { Component } from 'react';
import { HorizontalBar } from 'react-chartjs-2';

const option = {
  plugins: {
    // Change options for ALL labels of THIS CHART
    datalabels: {
      color: '#000000',
      anchor: 'end'
    }
  }
}

class Horizontal extends Component {

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
        {data !== undefined && <HorizontalBar data={data.length === 0 ? this.state : data} options={option} />}
      </React.Fragment>
    );
  }
}

export default Horizontal;

