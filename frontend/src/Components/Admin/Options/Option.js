import React, { Component } from 'react';

class Option extends Component{
  render(){
    return(
      <React.Fragment>
        <option value={this.props.item.id}></option>
      </React.Fragment>
    );
  }
}

export default option;