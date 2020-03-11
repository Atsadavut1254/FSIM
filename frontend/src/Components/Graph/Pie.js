import React, { Component } from "react";

import {Pie} from 'react-chartjs-2';


const data = {
	labels: [
		'Red',
		'Blue',
		'Yellow'
	],
	datasets: [{
		data: [300, 50, 100],
		backgroundColor: [
		'#FF6384',
		'#36A2EB',
		'#FFCE56'
		],
		hoverBackgroundColor: [
		'#FF6384',
		'#36A2EB',
		'#FFCE56'
		]
	}]
};


class Piechart extends Component {
  
    render() {
        return (
            <React.Fragment>
                 <Pie data={data} />
            </React.Fragment>
        );
    }
}

export default Piechart;
