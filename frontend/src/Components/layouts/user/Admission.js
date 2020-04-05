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

// redux
import {connect} from 'react-redux'
import {getAllBranch} from "../../../redux/action/BranchAction";

import bgyel from "../../../img/bg-head3.png";
import GraphLine from "../../Graph/Line";
import GraphBar from "../../Graph/Bar";
import AdmissionTypePanel from "../../general/AddmissionTypePanel";

class Admission extends Component {

    constructor(props) {
        super(props);
        this.state = {
            branch: props.branch_list
        }
    }

    componentDidMount() {
        this.fetchBranch()
    }

    fetchBranch = () => {
        this.props.allBranch()
        let {branch_list} = this.props
        this.setState({
            branch: branch_list
        })
    }

    setUpDropDown = branch => {
        let options = []
        for (const item in branch) {
            let b = {
                key: branch[item].branch_id,
                value: branch[item].branch_id,
                text: branch[item].branch_name
            }
            options.push(b)
        }
        return options.sort()
    }

    render() {
        let {branch_list} = this.props
        return (
            <Fragment>
                <Image size="big" className="head-right" src={bgyel}/>
                <Container>
                    <Header as="h5">
                        ค้นหาการรับเข้าโดยสาขาวิชาและปีการศึกษา{" "}
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
                                        กราฟแสดงเปรียบเทียบจำนวนนักเรียนที่รับเข้าในโครงการต่างๆประจำปี
                                        2560
                                    </Card.Header>
                                    <Card.Content>
                                        <GraphBar/>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                            <Grid.Column width={8}>
                                <Card className="card-default">
                                    <Card.Header as="h5">
                                        กราฟแสดงผลการศึกษาโครงการต่างๆ ประจำปี 2560
                                    </Card.Header>
                                    <Card.Content>
                                        <GraphBar/>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={16}>
                                <Card className="card-default">
                                    <Card.Header as="h5">
                                        กราฟแสดงค่าเฉลี่ยเกรดของแต่ละโครงการประจำปีการศึกษา 2560
                                    </Card.Header>
                                    <Card.Content>
                                        <GraphLine/>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={8}>
                                <Card className="card-default">
                                    <Card.Header as="h5">
                                        กราฟแสดงโรงเรียนที่เข้าศึกษา 5 โรงเรียนแรก
                                        ที่เข้าศึกษามากที่สุด
                                    </Card.Header>
                                    <Card.Content>
                                        <GraphBar/>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                            <Grid.Column width={8}>
                                <Card className="card-default">
                                    <Card.Header as="h5">
                                        10 อันดับโรงเรียนที่เข้าศึกษามากที่สุด
                                    </Card.Header>
                                    <Card.Content>
                                        <GraphLine/>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={8}>
                                <Card className="card-default">
                                    <Card.Header as="h5">
                                        กราฟเปรียบเทียบจำนวนนักเรียนที่เข้าศึกษาแบ่งตามโรงเรียน
                                        ประจำปี 2560 และ 2561
                                    </Card.Header>
                                    <Card.Content>
                                        <GraphLine/>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                            <Grid.Column width={8}>
                                <Card className="card-default">
                                    <Card.Header as="h5">
                                        กราฟเปรียบเทียบจำนวนนักเรียนที่เข้าศึกษาแบ่งตามโครงการประจำปี
                                        2560 และ 2561
                                    </Card.Header>
                                    <Card.Content>
                                        <GraphLine/>
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

const mapStateToProps = state => ({
    branch_list: state.branch.branch_list
})

const mapDispatchToProps = dispatch => ({
    allBranch: () => dispatch(getAllBranch())
})

export default connect(mapStateToProps, mapDispatchToProps)(Admission)