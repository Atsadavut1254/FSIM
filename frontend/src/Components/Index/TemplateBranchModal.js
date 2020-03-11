import React, { Component } from "react";
import { Header, Grid } from "semantic-ui-react";

class TemplateBranchModal extends Component {
  render() {
    return (
      <React.Fragment>
        <Grid.Column className="rectangle-30">
          <Header as="h4">{this.props.item.title}</Header>
          <p className='rectangle-40'>{this.props.item.data} คน</p> 
        </Grid.Column>
      </React.Fragment>
    );
  }
}

export default TemplateBranchModal;
