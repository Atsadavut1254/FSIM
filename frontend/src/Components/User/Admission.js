import React, { Component } from "react";
import {
  Header,
  Dropdown,
  Divider,
  Grid,
  Card,
  Responsive,
  Container,
  Visibility
} from "semantic-ui-react";

import TemplateAd from "./TemplateAdmission";
import GraphLine from "../Graph/Line";
import GraphBar from "../Graph/Bar";


const getWidth = () => {
  const isSSR = typeof window === "undefined";

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};


class Admission extends Component {
  constructor(props) {
    super(props);
    this.state = {
      receive_data: []
    };
  }

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
          <Container>
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

            <Grid>
              <Grid.Row>
                <Card fluid>
                  <TemplateAd />
                </Card>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={8}>
                  <Card className="card-default">
                    <Card.Header as="h5">
                      กราฟแสดงเปรียบเทียบจำนวนนักเรียนที่รับเข้าในโครงการต่างๆประจำปี
                      2560
                    </Card.Header>
                    <Card.Content>
                      <GraphBar />
                    </Card.Content>
                  </Card>
                </Grid.Column>
                <Grid.Column width={8}>
                  <Card className="card-default">
                    <Card.Header as="h5">
                      กราฟแสดงผลการศึกษาโครงการต่างๆ ประจำปี 2560
                    </Card.Header>
                    <Card.Content>
                      <GraphBar />
                    </Card.Content>
                  </Card>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row fluid>
                <Grid.Column width={16}>
                  <Card className="card-default">
                    <Card.Header as="h5">
                      กราฟแสดงค่าเฉลี่ยเกรดของแต่ละโครงการประจำปีการศึกษา 2560
                    </Card.Header>
                    <Card.Content>
                      <GraphLine />
                    </Card.Content>
                  </Card>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={8}>
                  <Card className="card-default">
                    <Card.Header as="h5">
                      กราฟแสดงโรงเรียนที่เข้าศึกษา 5 โรงเรียนแรก
                      ที่เข้าศึกษามากที่สุด
                    </Card.Header>
                    <Card.Content>
                      <GraphBar />
                    </Card.Content>
                  </Card>
                </Grid.Column>
                <Grid.Column width={8}>
                  <Card className="card-default">
                    <Card.Header as="h5">
                      10 อันดับโรงเรียนที่เข้าศึกษามากที่สุด
                    </Card.Header>
                    <Card.Content>
                      <GraphLine />
                    </Card.Content>
                  </Card>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={8}>
                  <Card className="card-default">
                    <Card.Header as="h5">
                      กราฟเปรียบเทียบจำนวนนักเรียนที่เข้าศึกษาแบ่งตามโรงเรียน
                      ประจำปี 2560 และ 2561
                    </Card.Header>
                    <Card.Content>
                      <GraphLine />
                    </Card.Content>
                  </Card>
                </Grid.Column>
                <Grid.Column width={8}>
                  <Card className="card-default">
                    <Card.Header as="h5">
                      กราฟเปรียบเทียบจำนวนนักเรียนที่เข้าศึกษาแบ่งตามโครงการประจำปี
                      2560 และ 2561
                    </Card.Header>
                    <Card.Content>
                      <GraphLine />
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

export default Admission;