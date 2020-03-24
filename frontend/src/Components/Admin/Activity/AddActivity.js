import React, { Component } from "react";
import { Form, Col, Row } from "react-bootstrap";
import { Button, Responsive } from "semantic-ui-react";
import Project from "../Options/Project";

const getWidth = () => {
  const isSSR = typeof window === "undefined";

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};

class Addactivity extends Component {
  state = {
    activity: "",
    project: 0
  };

  handleNewActivity = search => {
    this.setState({ activity: search.target.value });
  };

  handleProject = search => {
    this.setState({ project: search.target.value });
  };

  handleSubmit = event => {
    console.log(this.state);
  };

  handleReset = event => {
    this.setState({ activity: "", project: 0 });
  };

  render() {
    return (
      <React.Fragment>
        <Responsive
          getWidth={getWidth}
          minWidth={Responsive.onlyTablet.minWidth}
        >
          <Visibility
            once={false}
            onBottomPassed={this.showFixedMenu}
            onBottomPassedReverse={this.hideFixedMenu}
          ></Visibility>
          <Form style={{ padding: "5%" }}>
            <Row className="style-addData interval-top">
              <Col sm="3">
                <label>กิจกรรมรับเข้า</label>
              </Col>
              <Col sm="6">
                <Form.Control
                  type="text"
                  placeholder="กิจกรรมรับเข้าใหม่"
                  onChange={this.handleChangeNewActivity}
                  value={this.state.activity}
                />
              </Col>
            </Row>
            <Row className="style-addData interval-top">
              <Col sm="3">
                <label>ประเภทโครงการ</label>
              </Col>
              <Col sm="6">
                <Project
                  option={this.handleChangeProject}
                  value={this.state.project}
                />
              </Col>
            </Row>

            <div style={{ marginTop: "5%" }}>
              <Button
                className="btn-EditData interval-1"
                onClick={this.handleSearch}
              >
                เพิ่มโครงการ
              </Button>
              <Button
                className="btn-EditData interval-1"
                onClick={this.handleReset}
              >
                RESET
              </Button>

              <Button
                className="btn-info interval-1"
                onClick={this.handleSubmit}
              >
                SUBMIT
              </Button>
            </div>
          </Form>
        </Responsive>
      </React.Fragment>
    );
  }
}

export default Addactivity;