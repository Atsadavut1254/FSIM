import React, { Component } from 'react';
import { HorizontalBar } from 'react-chartjs-2';

import { Row, Col } from 'react-bootstrap';

import MediaQuery from 'react-responsive'
import { minDeviceWidth } from '../../Constant'

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
        <MediaQuery minDeviceWidth={minDeviceWidth}>
          <Row>
            <Col>
              {data !== undefined && <HorizontalBar data={data.length === 0 ? this.state : data} options={option} />}
            </Col>
          </Row>
        </MediaQuery>
        <MediaQuery maxDeviceWidth={minDeviceWidth - 1}>
          <Row>
            <Col xs={12} lg={4} md={4} sm={12}>
              {data !== undefined && <HorizontalBar data={data.length === 0 ? this.state : data} options={option} />}
            </Col>
          </Row>
        </MediaQuery >
      </React.Fragment >
    );
  }
}

export default Horizontal;

