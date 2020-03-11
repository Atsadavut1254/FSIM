import React, { Component } from "react";
import {
  Menu,
  Responsive,
  Visibility,
  Container,
  Dropdown
} from "semantic-ui-react";

const getWidth = () => {
  const isSSR = typeof window === "undefined";

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};

class Nav extends Component {
  state = {};
  hideFixedMenu = () => this.setState({ fixed: false });
  showFixedMenu = () => this.setState({ fixed: true });

  render() {
    const { children } = this.props;
    const { fixed } = this.state;

    return (
      <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Menu
            secondary={!fixed}
            size="large"
          >
            <Container>
              <Menu.Menu position="right" >
                <Menu.Item as="a" href="/"  name="หน้าหลัก">
                  หน้าหลัก
                </Menu.Item>

                <Dropdown item as="a" text="ข้อมูลนักศึกษา">
                  <Dropdown.Menu>
                    <Dropdown.Item >
                      ภาควิชาคณิตศาสตร์
                    </Dropdown.Item>
                    <Dropdown.Item >
                      ภาควิชาฟิสิกส์
                    </Dropdown.Item>
                    <Dropdown.Item >
                      ภาควิชาจุลชีววิทยา
                    </Dropdown.Item>
                    <Dropdown.Item >ภาควิชาเคมี</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

                <Dropdown item as="a" text="กิจกรรมประชาสัมพันธ์นักศึกษา">
                  <Dropdown.Menu>
                    <Dropdown.Item >
                      สรุปข้อมูลประชาสัมพันธ์
                    </Dropdown.Item>
                    <Dropdown.Item >สรุปข้อมูลรับเข้า</Dropdown.Item>
                    <Dropdown.Item >
                      สรุปข้อมูลโครงการรับเข้า
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <Menu.Item as="a" name="ข้อมูลศิษย์เก่า"  />
              </Menu.Menu>
            </Container>
          </Menu>
        </Visibility>
        {children}
      </Responsive>
    );
  }
}

export default Nav;
