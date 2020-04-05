import React, { Component, Fragment } from "react";

import { Container, Nav, NavItem, NavLink, TabContainer, TabContent, TabPane } from "react-bootstrap";
import { Header } from "semantic-ui-react";

class TabDialog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dialogName: props.dialogName,
            tab1Name: props.tab1Name,
            tab2Name: props.tab2Name,
            tab1Pane: props.tab1Pane,
            tab2Pane: props.tab2Pane,
            key: "tab1"
        }
    }

    handleSelect = selectTab => {
        this.setState({
            key: selectTab
        })
    }

    render() {
        let { dialogName, tab1Name, tab2Name, tab1Pane, tab2Pane } = this.state
        return (
            <Fragment>
                <Container>
                    <Header as="h3" style={{ marginBottom: "5%" }}>
                        {dialogName}
                    </Header>

                    <TabContainer defaultActiveKey="tab1">
                        <Nav fill={true} variant={"tabs"} activeKey={this.state.activeKey} onSelect={this.handleSelect}>
                            <NavItem className={this.state.key === "tab1" ? null : "Tab2"}>
                                <NavLink eventKey="tab1" className={this.state.key === "tab1" ? null : "Tab2-text"}>
                                    {tab1Name}
                                </NavLink>
                            </NavItem>
                            <NavItem className={this.state.key === "tab1" ? "Tab2" : null} >
                                <NavLink eventKey="tab2" className={this.state.key === "tab1" ? "Tab2-text" : null}>
                                    {tab2Name}
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <TabContent>
                            <TabPane eventKey="tab1">
                                {tab1Pane}
                            </TabPane>
                            <TabPane eventKey="tab2">
                                {tab2Pane}
                            </TabPane>
                        </TabContent>
                    </TabContainer>
                </Container>
            </Fragment>
        );
    }

}

export default TabDialog