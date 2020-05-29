import React, { Component, Fragment } from "react";

import {
    Header,
    Divider,
    Grid,
    Card,
    Container
} from "semantic-ui-react";

import { Table} from 'react-bootstrap'


import GraphBar from "../../../components/Graph/Bar";

import YearSelect from '../../../components/YearSelect'

import { setupStackBarChart, setupNoneStackBarChart } from '../../../components/Graph/GraphController'
import { Bar } from "react-chartjs-2";

import { connect } from 'react-redux'
import { getActivityData, getActivityList, selectYear } from '../../../redux/action/adminActivityAction'


class ActivitySummary extends Component {

    componentDidMount() {
        this.getData()
    }

    handleSeclectYear = async event => {
        let value = event.target.value
        await this.props.setYear(value)
        this.getData()
    }

    getData = () => {
        let { selectedYear } = this.props.activity
        this.props.getActivityData(selectedYear)
        this.props.getActivityList()
    }

    render() {
        let { activityData, activityList, selectedYear, yearList } = this.props.activity

        return (
            <Fragment>
                <Container>
                    {
                        yearList !== null && (
                            <YearSelect yearList={yearList} selectedYear={selectedYear} onSelectYear={this.handleSeclectYear} title={"ค้นหากิจกรรมประชาสัมพันธ์โดยเลือกปีการศึกษา"} />
                        )
                    }
                    <Grid textAlign='center'>
                        <Grid.Row>
                            <Grid.Column mobile={16} computer={8}>
                                <Card className="fs-cd-default">
                                    <Card.Header as="h5">
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
                            </Grid.Column>
                            <Grid.Column mobile={16} computer={8}>
                                <Card className="fs-cd-default">
                                    <Card.Header as="h5">
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
                            </Grid.Column>
                        </Grid.Row>
                        <Divider />
                        <Grid.Row>
                            <Header as="h3" align='center'> งบประมาณที่ใช่ในการจัดกิจกรรมแต่ละโครงการ</Header>
                        </Grid.Row>
                        <Grid.Row style={{margin:'2%'}}>
                            <Table  responsive   hover>
                                <thead>
                                    <tr className="text-center">
                                        <th width={4}>
                                            ปีการศึกษา
                                        </th>
                                        <th width={4}>
                                            ชื่อโครงการ
                                        </th>
                                        <th width={4}>
                                            งบประมาณที่ใช้
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {
                                        activityList !== null ? (
                                            activityList.filter(data => data['education_year'] === parseInt(selectedYear)).map((item, index) => (
                                                <tr className="text-center" key={index}>
                                                    <td>{item['education_year']}</td>
                                                    <td>{item['activity_name']}</td>
                                                    <td>{item['activity_budget']}</td>
                                                </tr>
                                            ))
                                        ) : (
                                               null
                                            )
                                    }
                                </tbody>
                            </Table>
                            {
                                activityList !== null ? null: <div className="text-center" style={{ marginTop: '5%' }}> <h3  >ไม่พบข้อมูล</h3></div>
                            }
                        </Grid.Row>
                    </Grid>

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
        getActivityList: () => dispatch(getActivityList()),
        setYear: (year) => dispatch(selectYear(year))
    }
)


export default connect(mapStateToProps, mapDispatchToProps)(ActivitySummary)