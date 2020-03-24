import React, { Component } from "react";

import { Button } from "semantic-ui-react";

class TemplateButton extends Component {
  render() {
    return (
      <React.Fragment>
        <Button href={this.props.item.url} color={this.props.item.color}>
            {this.props.item.name}
          </Button>
      </React.Fragment>
    );
  }
}

export default TemplateButton;
