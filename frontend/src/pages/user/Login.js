import React, { Component, Fragment } from "react";
import {
  Responsive,
  Visibility,
  Container,
  Button,
  Form,
  Grid,
  Header,
  Image
} from "semantic-ui-react";

import { Row, Col } from 'react-bootstrap'

// redux
import { connect } from "react-redux";

// redux action
import { login } from "../../redux/action/authAction";

import bgyel from "../../img/bg-head.png";
import bannerbot from "../../img/bottom-left.png";

import ReactModal from "../../components/ReactModal"

const getWidth = () => {
  const isSSR = typeof window === "undefined";

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};

class Login extends Component {
  handleLogin = (event) => {
    event.preventDefault();
    const element = event.target.elements;

    const userData = {
      username: element.username.value,
      password: element.password.value,
    };
    this.props.login(userData, this.props.history);
  };

  render() {
    const { children } = this.props;

    return (
      <Fragment>
        <ReactModal />
        <Responsive
          getWidth={getWidth}
        // minWidth={Responsive.onlyTablet.minWidth}
        >
          <Visibility
            once={false}
            onBottomPassed={this.showFixedMenu}
            onBottomPassedReverse={this.hideFixedMenu}
          >
            <Image size="massive" className="fs-bg-tp-yellow" src={bgyel} />
            <Image size="massive" className="fs-bg-bt-yellow" src={bannerbot} />
            <Container>
              <Grid
                textAlign="center"
                // style={{ height: "100vh" }}
                verticalAlign="middle"
                className="card my-5 fs-cd-login"
                centered
              >
                <Row>
                  <Col xs={12} lg={12} sm={12} style={{ maxWidth: 350 }}>
                    <Header as="h2" color="teal" textAlign="center">
                      เข้าสู่ระบบ
                  </Header>
                    <Form size="large" onSubmit={this.handleLogin}>
                      <Form.Input
                        fluid
                        id="username"
                        name="username"
                        type="text"
                        required
                        placeholder="username"
                      />
                      <Form.Input
                        fluid
                        id="password"
                        name="password"
                        type="password"
                        required
                        placeholder="password"
                      />
                      <Button color="grey" fluid size="large">
                        Login
                    </Button>
                    </Form>
                  </Col>
                </Row>
              </Grid>

            </Container>
          </Visibility>
          {children}
        </Responsive>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
  login: (data) => dispatch(login(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
