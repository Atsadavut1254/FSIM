import React, {Component, Fragment} from "react";

import {Container} from "semantic-ui-react";
import {Nav, Tab} from "react-bootstrap";

import SearchActivity from "../../admin/SearchActivity";
import AddActivity from "../../admin/AddActivity";
import TabDialog from '../../admin/TabDialog'

class Activity extends Component {

    constructor(props) {
        super(props);
        this.state = {
            key: "SearchActivity"
        }
    }

    handleSelect = selectedTab => {
        this.setState({
            key: selectedTab
        })
    }

    render() {
        return (
            <Fragment>
                <TabDialog
                    dialogName="จัดการข้อมูลกิจกรรมรับเข้า"
                    tab1Name="ดูข้อมูลกิจกรรม"
                    tab2Name="เพิ่มข้อมูลกิจกรรม"
                    tab1Pane={<SearchActivity />}
                    tab2Pane={<AddActivity />}
                />
                {/* <Container className="card-admin">
                    <h3 style={{marginBottom: "5%"}}>จัดการข้อมูลกิจกรรมรับเข้า</h3>
                    <Tab.Container defaultActiveKey="SearchActivity">
                        <Nav fill={true} variant="tabs" activeKey={this.state.activeKey} onSelect={this.handleSelect}>
                            <Nav.Item className={this.state.key === "SearchActivity" ? null : "Tab2"}>
                                <Nav.Link
                                    eventKey="SearchActivity"
                                    className={
                                        this.state.key === "SearchActivity" ? null : "Tab2-text"
                                    }
                                >ดูข้อมูลกิจกรรม
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
                                <SearchActivity />
                            </Tab.Pane>
                            <Tab.Pane eventKey="AddActivity">
                                <AddActivity />
                            </Tab.Pane>
                        </Tab.Content>
                    </Tab.Container>
                </Container> */}
            </Fragment>
        );
    }
}

export default Activity