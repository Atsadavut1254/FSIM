import React, { Component } from "react";
import { Modal, Card, Grid } from "semantic-ui-react";
// import { FaThinkPeaks } from "react-icons/fa";

import TemplateBranchModal from "./TemplateBranchModal";
import GraphPie from "../Graph/GraphPie";
import GraphLine from "../Graph/GraphLine";
import GraphBar from "../Graph/GraphBar";
// import { Form } from "react-bootstrap";

class TemplateModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dept: 0,
      open: false
    };
  }

  onClose = () => {
    if (this.props.show) {
      this.props.state(false);
    }
  };

  render() {
    let { dept, open } = this.state;
    let branch = this.props.body.map(item => (
      <TemplateBranchModal item={item} />
    ));
    return (
      <React.Fragment>
        <Modal
          className="modal-center"
          open={this.props.show}
          onClose={this.onClose}
        >
          <Modal.Header className="text-center">
            <label>จำนวนนักศึกษาทุกชั้นปี{this.props.header}</label>
          </Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Grid columns={3} centered>
                <Grid.Row>{branch}</Grid.Row>

                <Grid.Row columns={2}>
                  <Grid.Column>
                    <Card className="card-circle-modal">
                      <Card.Content><GraphPie/></Card.Content>
                    </Card>
                  </Grid.Column>
                  <Grid.Row columns={2}>
                    <Grid.Column>
                      <Card className="card-twin-modal">
                        <Card.Content><GraphBar/></Card.Content>
                      </Card>
                    </Grid.Column>
                    <Grid.Column>
                      <Card className="card-twin-modal">
                        <Card.Content><GraphLine/></Card.Content>
                      </Card>
                    </Grid.Column>
                  </Grid.Row>
                </Grid.Row>
              </Grid>
            </Modal.Description>
          </Modal.Content>
        </Modal>
      </React.Fragment>
    );
  }
}

export default TemplateModal;
