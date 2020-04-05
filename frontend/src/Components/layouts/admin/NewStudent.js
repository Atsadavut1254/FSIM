import React, { Component, Fragment } from "react";

import { Container, Nav, Tab } from "react-bootstrap";
import { Header } from "semantic-ui-react";

import TabDialog from "../../admin/TabDialog";

class NewStudent extends Component{

    constructor(props) {
        super(props);
        this.state = {
            key: "SearchNewStudent",
            branch: []
        }
    }

    handleSelect = selectedTab => {
        this.setState({ key: selectedTab });
    };


    render() {
        return (
            <Fragment>
                <TabDialog dialogName={"Student"} tab1Name={"Tab1"} tab2Name={"Tab2"}/>
            </Fragment>
        );
    }
}

export default NewStudent