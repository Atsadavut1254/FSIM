import React, {Component, Fragment} from "react";

import {
    Header,
    Dropdown,
    Divider,
    Grid,
    Card,
    Container,
    Image
} from "semantic-ui-react";

import bgyel from "../../../img/bg-head3.png";
import AmountStudent from "../../general/AmountStudent";
import GraphPie from "../../Graph/Pie";
import GraphBar from "../../Graph/Bar";

class ActivityInformation extends Component {

    render() {
        return (
            <Fragment>
                <Header as="h5">
                    ค้นหาจำนวนช่องทางการสมัครของนักศึกษาประจำปี{" "}
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
                <Image size="big" className="head-right" src={bgyel}/>
                <Container>
                    <Grid>
                        <Grid.Row stretched>
                            <Grid.Column width={8}>
                                <Card className="card-default">
                                    <Card.Header as="h5">
                                        กราฟเปรียบเทียบจำนวนนักเรียนที่เข้าศึกษาในพื้นที่ต่างๆแบ่งตามภาควิชา
                                    </Card.Header>
                                    <Card.Content>
                                        <GraphBar/>
                                    </Card.Content>
                                    <Card.Content>
                                        <AmountStudent/>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                            <Grid.Column width={8}>
                                <Card className="card-default">
                                    <Card.Header as="h5">
                                        แผนภูมิเปรียบเทียบจำนวนนักเรียนที่เข้าศึกษาจากพื้นที่ต่างๆ
                                    </Card.Header>
                                    <Card.Content>
                                        <GraphPie/>
                                    </Card.Content>
                                    <Card.Content>
                                        <AmountStudent/>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row >
                            <Grid.Column width={8}>
                                <Card className="card-default">
                                    <Card.Header as="h5">
                                        กราฟแสดงพื้นที่ที่นักศึกษามา 5 อันดับแรก
                                    </Card.Header>
                                    <Card.Content>
                                        <GraphBar/>
                                    </Card.Content>
                                    <Card.Content>
                                        <AmountStudent/>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                            <Grid.Column width={8}>
                                <Card className="card-default">
                                    <Card.Header as="h5">
                                        กราฟแสดงจำนวนนักศึกษาที่เข้าศึกษาตามเหตุผลที่เลือกเรียนคณะวิทยาศาสตร์
                                        มจธ.
                                    </Card.Header>
                                    <Card.Content>
                                        <GraphBar/>
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
                                        กราฟแสดงสัดส่วนนักศึกษาที่เข้าศึกษาตามเหตุผลที่เลือกเรียนคณะวิทยาศาสตร์
                                        มจธ.
                                    </Card.Header>
                                    <Card.Content>
                                        <GraphPie/>
                                    </Card.Content>
                                    <Card.Content>
                                        <AmountStudent/>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                            <Grid.Column width={8}>
                                <Card className="card-default">
                                    <Card.Header as="h5">
                                        กราฟแสดงช่องทางที่นักศึกษารู้จัก มจธ.
                                    </Card.Header>
                                    <Card.Content>
                                        <GraphPie/>
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
                                        กราฟแสดงเปรียบเทียบจำนวนนักศึกษาที่เข้าศึกษาตามเหตุผลที่เลือกเรียนคณะวิทยาศาสตร์
                                        มจธ. ตามปีการศึกษา
                                    </Card.Header>
                                    <Card.Content>
                                        <GraphBar/>
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

export default ActivityInformation