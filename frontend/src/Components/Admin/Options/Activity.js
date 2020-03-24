import React, { Component } from 'react';
import { FormControl } from 'react-bootstrap';

class Activity extends Component{
  onSelected = (search) =>{
    this.props.option(search)
  }

  render(){
    return(
      <React.Fragment>
        <FormControl as="select" onChange={this.onSelected}>
          <option value='0'>ชื่อกิจกรรมรับเข้า</option>
          <option value='Scicamp'>Sci Camp</option>
        </FormControl>
      </React.Fragment>
    );
  }
}

export default Activity;