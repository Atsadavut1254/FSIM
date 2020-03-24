import React, { Component } from "react";
import {
  Divider,
  Gride,
  Header,
  Container,
  Responsive,
  Image,
  Grid
} from "semantic-ui-react";
import ApiManage from "../../../Class/ApiManage";

import bgheader from "../../Image/bg-head.png";
import bgbottom from "../../Image/bottom-left.png";
import logo from "../../Image/60year-fsci.png";

class Math extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isLoaded: false
    };
  }

  componentWillMount() {
    ApiManage.get("admission/1/2560/1")
      .then(res => {
        let recive_data = res.data;
        if (recive_data.response === true) {
          this.setState({
            data: recive_data.data,
            isLoaded: true
          });
          console.log(this.state.data);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    let { isLoaded, data } = this.state;
    const show_data = data.map(data => {
      <React.Fragment>
        <div key={data.application_no}>
          <p>{data.firstname}</p>
          <p>{data.lastname}</p>
        </div>
      </React.Fragment>;
    });

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
          <Image size="massive" className="background-yellow" src={bgheader} />
          <Image size="massive" className="bottom-left" src={bgbottom} />
          <Container>
            <Image className="logo" src={logo} style={{ marginTop: "2vh" }} />
            <Header as="h4">ข้อมูลนักศึกษาภาควิชาคณิตศาสตร์</Header>
            <Divider />
            <Grid>
              
            </Grid>
          </Container>
        </Responsive>
      </React.Fragment>
    );
  }
}
