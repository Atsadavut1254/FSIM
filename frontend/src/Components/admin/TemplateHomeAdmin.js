import React, { Component, Fragment } from "react";

import {
    Container,
    Divider,
    Header,
    Image,
    Grid,
    Button, Icon
} from "semantic-ui-react";

const SetOfButton = ({ item }) => (
    <Fragment>
        <Grid columns={2} relaxed='very' style={{ marginTop: '2%' }} divided>
            <Grid.Column width={6} verticalAlign={"middle"} textAlign={"right"}>
                <Button size="huge" className="Tab2-text btn-EditData red"
                    id={item.name}
                    href={item.url}
                    style={{ fontSize: '15px', width: '200px' }}>
                    {item.name}
                </Button>
            </Grid.Column>

            <Grid.Column verticalAlign='middle' width={10} textAlign='left'>
                {item.detail}
            </Grid.Column>
        </Grid>
    </Fragment>
)


const SetOfOperation = ({ item }) => (
    <Fragment>
        <Grid.Column style={{ fontWeight: "bold" }}>
            <Icon disabled name={item.icon} size='large' style={{ marginBottom: "2%" }} />
            <br />
            {item.name}
        </Grid.Column>
    </Fragment>
)

const operation = [
    {
        name: "VIEW",
        icon: "eye"
    },
    {
        name: "ADD",
        icon: "add"
    },
    {
        name: "EDIT",
        icon: "edit"
    },
    {
        name: "DELETE",
        icon: "delete"
    }
]


class AdminHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            header: props.header,
            url: props.manage
        }
    }

    render() {
        let { header, url} = this.state
        return (
            <Fragment>
                <Container>
                    <div className="admission">
                        <Header as="h2" style={{ color: "#3BB3A9", marginBottom: "5%" }}>
                            {header}
                        </Header>

                        <Grid style={{ backgroundColor: "#FFFFFF", borderRadius: "15px", marginBottom: "5%" }} >
                            <Grid.Row columns={4} >
                                {
                                    operation.map(item => (
                                        <SetOfOperation
                                            item={item}
                                            key={item.name} />
                                    ))
                                }
                            </Grid.Row>
                        </Grid>
                        <Divider />
                        {
                            url.map(item => (
                                <SetOfButton
                                item={item}
                                key={item.id} />
                            ))
                        }
                    </div>
                </Container>
            </Fragment>
        )
    }
}

export default AdminHome