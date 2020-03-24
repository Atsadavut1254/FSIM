import React from 'react';
import { FormControl } from 'react-bootstrap';

class Project extends React.Component{
  onSelected = search =>{
    this.props.option(search);
  };

  render(){
    return(
      <React.Fragment>
        <FormControl as="select"
        id="admission_type"
        onChange={this.onSelected}
        value={this.props.value}>
          <option value="0">กรุณาเลือกโครงการที่รับเข้า</option>
          <option value="1">TCAS รอบ 1</option>
          <option value="2">TCAS รอบ 2</option>
          <option value="3">TCAS รอบ 3</option>
          <option value="4">TCAS รอบ 4</option>
          <option value="5">TCAS รอบ 5</option>
        </FormControl>
      </React.Fragment>
    );
  }
}

export default Project;