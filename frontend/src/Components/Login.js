import React, { Component } from "react";
import {
  Form,
  Container,
  Button,
  Icon,
  Input,
  Grid,
  Image,
  Responsive,
  Header,
  Divider
} from "semantic-ui-react";
import bgyel from "../Components/Image/bg-head.png";
import bannerbot from "../Components/Image/bottom-left.png";
import logo from "../Components/Image/60year-fsci.png";

class Login extends Component {

  render() {
    return (
      <React.Fragment>
        <Responsive>
          <Image size="massive" className="background-yellow" src={bgyel} />
          <Image size="massive" className="bottom-left" src={bannerbot} />
          <Container>
            <Image
              className="logo"
              src={logo}
              style={{ "marginTop": "2vh" }}
            />
            <Grid
              textAlign="center"
              style={{ height: "90vh" }}
              verticalAlign="middle"
            >
              <Grid.Row>
                <Grid.Column
                  textAlign="center"
                  style={{ maxWidth: 450 }}
                  className="card-login"
                >
                  <Header as="h3">เข้าสู่ระบบ</Header>
                  <Divider />
                  <Form>
                    <Form.Field>
                      <Input
                        type="text"
                        placeholder="ชื่อผู้ใช้"
                        label={{ icon: "user" }}
                        labelPosition="left corner"
                      />
                    </Form.Field>
                    <Form.Field>
                      <Input
                        type="password"
                        placeholder="รหัสผ่าน"
                        label={{ icon: "lock" }}
                        labelPosition="left corner"
                      />
                    </Form.Field>
                    <Divider />
                    <div className="text-center">
                      <Button
                        onClick={this.onSubmit}
                        className="btn-paku"
                        color="yellow"
                        animated
                      >
                        <Button.Content visible>เข้าสู่ระบบ</Button.Content>
                        <Button.Content hidden>
                          <Icon name="arrow right" />
                        </Button.Content>
                      </Button>
                    </div>
                  </Form>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </Responsive>
      </React.Fragment>
    );
  }
}

export default Login;
