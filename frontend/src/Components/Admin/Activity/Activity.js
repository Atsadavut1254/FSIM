import React, { Component } from "react";
import SearchActivity from "./SearchActivity";
import AddActivity from "./AddActivity";
import { Responsive, Container, Tab } from "semantic-ui-react";

const getWidth = () => {
  const isSSR = typeof window === "undefined";

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};

class Activity extends Component {
  state = {
    key: "SearchActivity"
  };

  handleSelect = selectedtab => {
    this.setState({ key: selectedtab });
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
          <Container>
            <h3 style={{ marginBottom: "5%" }}>จัดการข้อมูลกิจกรรมรับเข้า</h3>
            <Tab.Container defaultActiveKey="SearchActivity">
              <Nav fill variant="tabs" activeKey={this.state.activeKey}>
                <Nav.Item
                  className={
                    this.state.key === "SearchActivity" ? null : "Tab2"
                  }
                >
                  <Nav.Link
                    eventKey="SearchActivity"
                    className={
                      this.state.key === "SearchActivity" ? null : "Tab2-text"
                    }
                  >
                    ดูข้อมูลกิจกรรม
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item
                  className={
                    this.state.key === "SearchActivity" ? "Tab2" : null
                  }
                >
                  <Nav.Link
                    className={
                      this.state.key === "SearchActivity" ? "Tab2-text" : null
                    }
                    eventKey="AddActivity"
                  >
                    เพิ่มข้อมูลกิจกรรม
                  </Nav.Link>
                </Nav.Item>
              </Nav>
              <Tab.Content className="TabContent"> 
                  <Tab.Pane eventKey="SearchActivity">
                      <SearchActivity/>
                  </Tab.Pane>
                  <Tab.Pane eventKey="AddActivity">
                      <AddActivity/>
                  </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </Container>
        </Responsive>
      </React.Fragment>
    );
  }
}
