import React, { Component, Fragment } from "react";

import {
    Card,
    Container,
    Header
} from "semantic-ui-react";

import { connect } from 'react-redux'

import { Row, Col } from 'react-bootstrap'

import { Bar } from "react-chartjs-2";

import GraphBar from "../../components/Graph/Bar";

import { setupStackBarChart, setupNoneStackBarChart } from '../../components/Graph/GraphController'

import { getActivityData, selectYear } from '../../redux/action/adminActivityAction'

import { getYearList } from '../../redux/action/adminActivityAction'

import YearSelect from '../../components/YearSelect'

class ActivityInformation extends Component {

    componentDidMount() {
        this.props.getYearList()
        this.getData()
    }

    handleSeclectYear = async event => {
        let value = event.target.value
        if (value === 0)
            value = null
        await this.props.setYear(value)
        this.getData()
    }

    getData = () => {
        let { selectedYear } = this.props.activity
        this.props.getActivityData(selectedYear)
    }

    render() {
        let { activityData, yearList, selectedYear } = this.props.activity

        return (
            <Fragment>
                <Container >
                <Header textAlign="center" as="h2" className="my-5">
                           กราฟแสดงการวิเคราะห์นักศึกษาที่เข้าร่วมกิจกรรมประชาสัมพันธ์

                        </Header>
                <div className="my-5">
                    {
                        yearList != null && (
                            <YearSelect yearList={yearList} selectedYear={selectedYear} title="ค้นหากิจกรรมประชาสัมพันธ์โดยเลือกปีการศึกษา" onSelectYear={this.handleSeclectYear} />
                        )
                    }
                    </div>
                    <Container className="mb-5">
                        <Row>
                            <Col sm={12} lg={6} className="my-2">
                                <Card className="fs-cd-default">
                                    <Card.Header as="h4">
                                        กราฟแสดงจำนวนที่เข้าร่วมกิจกรรมในโครงการต่างๆ
                                    </Card.Header>
                                    <Card.Content>
                                        {
                                            activityData !== null ? (
                                                <Bar data={setupNoneStackBarChart(activityData.joinByActivity)} legend={{ display: false }} />
                                            ) : (
                                                    <h2 className="text-center">ไม่พบข้อมูล</h2>
                                                )
                                        }
                                    </Card.Content>
                                </Card>
                            </Col>
                            <Col sm={12} lg={6} className="my-2">
                                <Card className="fs-cd-default">
                                    <Card.Header as="h4">
                                        กราฟแสดงเปรียบเทียบจำนวนคนที่เข้าร่วมในโครงการต่างๆ
                                    </Card.Header>
                                    <Card.Content>
                                        {
                                            activityData !== null ? (
                                                <Bar data={setupStackBarChart(activityData.compareByPreviousYear)} legend={{ display: true }} />
                                            ) : (
                                                    <h2 className="text-center">ไม่พบข้อมูล</h2>
                                                )
                                        }
                                        <GraphBar />
                                    </Card.Content>
                                </Card>
                            </Col>
                        </Row>

                    </Container>

                </Container>
            </Fragment>
        )
    }
}

const mapStateToProps = state => (
    {
        activity: state.admin_activity
    }
)

const mapDispatchToProps = dispatch => (
    {
        getActivityData: (year) => dispatch(getActivityData(year)),
        setYear: (year) => dispatch(selectYear(year)),
        getYearList: () => dispatch(getYearList())
    }
)
export default connect(mapStateToProps, mapDispatchToProps)(ActivityInformation)