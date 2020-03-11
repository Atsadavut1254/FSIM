import React, { Component } from "react";
import {
  Header,
  Dropdown,
  Divider,
  Grid,
  Card,
  CardContent,
  Container,
  Responsive,
  Visibility,
  Image
} from "semantic-ui-react";

import bgyel from "../Image/bg-head.png";
import bannerbot from "../Image/bottom-left.png";


import AmountStudent from "./AmountStudent";
import GraphLine from "../Graph/Line";
import GraphHorizaontaBar from "../Graph/Horizonta";



const getWidth = () => {
  const isSSR = typeof window === "undefined";

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};

class Active_Recruitment extends Component {
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
          <Image size="massive" className="background-yellow" src={bgyel} />
          <Image size="massive" className="bottom-left" src={bannerbot} />
          <Container className="container my-5">
            <Header as="h5">
              ค้นหาการรับเข้าโดยสาขาวิชาและปีการศึกษา{" "}
              <Dropdown
                options={[
                  { key: "2560", value: "2560", text: "2560" },
                  { key: "2561", value: "2561", text: "2561" }
                ]}
                placeholder="Select"
                selection
              />
            </Header>

            <Divider />

            <Grid columns={2}>
              <Grid.Row stretched>
                <Grid.Column width={8}>
                  <Card className="card-default">
                    <Card.Header as="h5">
                      การแสดงจำนวนนักศึกษารับเข้าจากโครงการต่างๆทั้งหมด 1000 คน
                    </Card.Header>
                    <CardContent>
                      <GraphHorizaontaBar />
                    </CardContent>
                  </Card>
                </Grid.Column>
                <Grid.Column width={8}>
                  <Card className="card-default">
                    <Card.Header as="h5">
                      การแสดงจำนวนนักศึกษารับเข้าจากโครงการต่างๆ
                    </Card.Header>
                    <Card.Content>
                      <GraphLine />
                    </Card.Content>
                    <Card.Content>
                      <AmountStudent />
                    </Card.Content>
                  </Card>
                </Grid.Column>
              </Grid.Row>

              <Grid.Row>
                <Grid.Column width={8}>
                  <Card className="card-default">
                    <Card.Header as="h5">
                      การแสดงจำนวนนักศึกษารับเข้าจากโครงการ A
                    </Card.Header>
                    <Card.Content>
                      <GraphLine />
                    </Card.Content>
                    <Card.Content>
                      <AmountStudent />
                    </Card.Content>
                  </Card>
                </Grid.Column>
                <Grid.Column width={8}>
                  <Card className="card-default">
                    <Card.Header as="h5">
                      การแสดงจำนวนนักศึกษารับเข้าจากโครงการ B
                    </Card.Header>
                    <Card.Content>
                      <GraphLine />
                    </Card.Content>
                    <Card.Content>
                      <AmountStudent />
                    </Card.Content>
                  </Card>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </Responsive>
      </React.Fragment>
    );
  }
}

export default Active_Recruitment;
