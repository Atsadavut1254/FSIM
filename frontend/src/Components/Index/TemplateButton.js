import React, { Component } from "react";

<<<<<<< HEAD
import { Button, Grid } from "semantic-ui-react";
=======
import { Button } from "semantic-ui-react";
>>>>>>> master

class TemplateButton extends Component {
  render() {
    return (
      <React.Fragment>
<<<<<<< HEAD
        <Grid columns={"equal"}>
          <Grid.Row >
            <Grid.Column>
              <Button href={this.props.item.url} color={this.props.item.color}>
                {this.props.item.name}
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
=======
        <Button href={this.props.item.url} color={this.props.item.color}>
            {this.props.item.name}
          </Button>
>>>>>>> master
      </React.Fragment>
    );
  }
}

export default TemplateButton;
