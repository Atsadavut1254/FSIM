import React, { Component } from "react";

import { Button, Grid } from "semantic-ui-react";

class TemplateButton extends Component {
  render() {
    return (
      <React.Fragment>
        <Grid columns={"equal"}>
          <Grid.Row >
            <Grid.Column>
              <Button href={this.props.item.url} color={this.props.item.color}>
                {this.props.item.name}
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </React.Fragment>
    );
  }
}

export default TemplateButton;
