import React, { Component } from "react";
import SetButton from "./SetButton";
import { Container, Responsive, Visibility, Divider, Header } from "semantic-ui-react";

const getWidth = () => {
  const isSSR = typeof window === "undefined";

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};

class Main extends Component {
  Redirect(event) {
    this.props.history.push(event.url);
  }

  render() {
    const url = [
      {
        id: 1,
        name: "ข้อมูลนักศึกษารับเข้า",
        detail: "ระบบตรวจสอบการรับเข้าในรอบต่างๆ",
        url: "/",
        icon: "add user"
      },
      {
        id: 2,
        name: "กิจกรรม",
        detail:
          "ระบบตรวจสอบกิจกรรมการรับเข้า รวมไปถึงกิจกรรมประชาสัมพันธ์นักศึกษา",
        url: "/",
        icon: ""
      },
      {
        id: 3,
        name: "โครงการรับเข้า",
        detail: "ระบบตรวจสอบโครงการรับเข้า",
        url: "/",
        icon: ""
      }
    ];
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
          <Container  className="card-admission" style={{"margin-top":"5vh"}} >
            <Header as='h2' style={{color:"#3BB3A9",padding:"20px"}}>จัดการข้อมูลการรับเข้า</Header>
            <Divider/>
            {
              url.map((item)=>
              <SetButton item={item} Redirect={this.Redirect.bind(this)} key={item.id}/>)
            }
          </Container>
        </Responsive>
      </React.Fragment>
    );
  }
}

export default Main;
