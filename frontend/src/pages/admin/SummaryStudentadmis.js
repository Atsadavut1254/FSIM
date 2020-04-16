import React, {Component, Fragment} from "react";
import { Link } from 'react-router-dom'
import {
    Header,
    Dropdown,
    Divider,
    Grid,
    Card,
    Container,
    Button,
    Image
} from "semantic-ui-react";

// redux
import {connect} from 'react-redux'
import {getAllBranch} from "../../redux/action/BranchAction";

import bgyel from "../img/bg-head3.png";
import GraphBar from "../components/Graph/Bar";
import AdmissionTypePanel from "../components/AddmissionTypePanel";

class SummaryStudentadmis extends Component {

 

    render() {
        let {branch_list} = this.props
        return (
            <Fragment>
                <Container>
                    <Header as="h5" textAlign="center">
                        ค้นหาการรับเข้าโดยและปีการศึกษา{" "}
                        <Dropdown
                            options={this.setUpDropDown(branch_list)}
                            placeholder="สาขาวิชา"
                            selection
                        />
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
                    <Grid>
                        <Grid.Row>
                            <Card fluid={true}>
                                <AdmissionTypePanel/>
                            </Card>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={8}>
                                <Card className="card-default">
                                    <Card.Header as="h5">
                                        กราฟแสดงจำนวนที่รับเข้านักศึกษาของโครงการแต่ละประเภท
                                    </Card.Header>
                                    <Card.Content>
                                        <GraphBar/>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                            <Grid.Column width={8}>
                                <Card className="card-default">
                                    <Card.Header as="h5">
                                        กราฟแสดงผลการศึกษาโครงการต่างๆ 
                                    </Card.Header>
                                    <Card.Content>
                                        <GraphBar/>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={8}>
                                <Card className="card-default">
                                    <Card.Header as="h5">
                                        กราฟแสดงจำนวนนักศึกษาที่รับจากแต่ละโครงการ รอบที่ 1/1
                                    </Card.Header>
                                    <Card.Content>
                                        <GraphBar/>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                            <Grid.Column width={8}>
                                <Card className="card-default">
                                    <Card.Header as="h5">
                                        กราฟแสดงจำนวนนักศึกษาที่รับจากแต่ละโครงการ รอบที่ 1/2 
                                    </Card.Header>
                                    <Card.Content>
                                        <GraphBar/>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={8}>
                                <Card className="card-default">
                                    <Card.Header as="h5">
                                        กราฟแสดงจำนวนนักศึกษาที่รับจากแต่ละโครงการ รอบที่ 2
                                    </Card.Header>
                                    <Card.Content>
                                        <GraphBar/>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                            <Grid.Column width={8}>
                                <Card className="card-default">
                                    <Card.Header as="h5">
                                        กราฟแสดงจำนวนนักศึกษาที่รับจากแต่ละโครงการ รอบที่ 3/1 
                                    </Card.Header>
                                    <Card.Content>
                                        <GraphBar/>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={8}>
                                <Card className="card-default">
                                    <Card.Header as="h5">
                                        กราฟแสดงจำนวนนักศึกษาที่รับจากแต่ละโครงการ รอบที่ 3/2
                                    </Card.Header>
                                    <Card.Content>
                                        <GraphBar/>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                            <Grid.Column width={8}>
                                <Card className="card-default">
                                    <Card.Header as="h5">
                                        กราฟแสดงจำนวนนักศึกษาที่รับจากแต่ละโครงการ รอบที่ 4
                                    </Card.Header>
                                    <Card.Content>
                                        <GraphBar/>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={8}>
                                <Card className="card-default">
                                    <Card.Header as="h5">
                                        กราฟแสดงจำนวนนักศึกษาที่รับจากแต่ละโครงการ รอบที่ 5
                                    </Card.Header>
                                    <Card.Content>
                                        <GraphBar/>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                            <Grid.Column width={8}>
                                <Card className="card-default">
                                    <Card.Header as="h5">
                                        เกรดเฉลี่ยของนักศึกษาแต่ละรอบที่รับเข้า
                                    </Card.Header>
                                    <Card.Content>
                                        <GraphBar/>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <Grid.Row>
                        <Button as={Link} to="/admission">
                            เพิ่มเติม
                        </Button>
                    </Grid.Row>
                </Container>
            </Fragment>
        )
    }
}


export default SummaryStudentadmis