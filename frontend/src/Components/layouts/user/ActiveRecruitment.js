import React, {Component, Fragment} from "react";

import {
    Header,
    Dropdown,
    Divider,
    Grid,
    Card,
    CardContent,
    Container,
    Image
} from "semantic-ui-react";

import bgyel from "../../../img/bg-head3.png";

import AmountStudent from "../../general/AmountStudent";
import GraphLine from "../../Graph/Line";
import GraphHorizaontaBar from "../../Graph/BarHorizontal";


class ActiveRecruitment extends Component {

    render() {
        return (
            <Fragment>
                <Image size="big" className="head-right" src={bgyel}/>
                <Container className="container my-5">
                    <Header as="h5">
                        ค้นหาการรับเข้าโดยสาขาวิชาและปีการศึกษา{" "}
                        <Dropdown
                            options={[
                                {key: "2560", value: "2560", text: "2560"},
                                {key: "2561", value: "2561", text: "2561"}
                            ]}
                            placeholder="Select"
                            selection
                        />
                    </Header>

                    <Divider/>

                    <Grid columns={2}>
                        <Grid.Row stretched>
                            <Grid.Column width={8}>
                                <Card className="card-default">
                                    <Card.Header as="h5">
                                        การแสดงจำนวนนักศึกษารับเข้าจากโครงการต่างๆทั้งหมด 1000 คน
                                    </Card.Header>
                                    <CardContent>
                                        <GraphHorizaontaBar/>
                                    </CardContent>
                                </Card>
                            </Grid.Column>
                            <Grid.Column width={8}>
                                <Card className="card-default">
                                    <Card.Header as="h5">
                                        การแสดงจำนวนนักศึกษารับเข้าจากโครงการต่างๆ
                                    </Card.Header>
                                    <Card.Content>
                                        <GraphLine/>
                                    </Card.Content>
                                    <Card.Content>
                                        <AmountStudent/>
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
                                        <GraphLine/>
                                    </Card.Content>
                                    <Card.Content>
                                        <AmountStudent/>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                            <Grid.Column width={8}>
                                <Card className="card-default">
                                    <Card.Header as="h5">
                                        การแสดงจำนวนนักศึกษารับเข้าจากโครงการ B
                                    </Card.Header>
                                    <Card.Content>
                                        <GraphLine/>
                                    </Card.Content>
                                    <Card.Content>
                                        <AmountStudent/>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </Fragment>
        )
    }
}

export default ActiveRecruitment