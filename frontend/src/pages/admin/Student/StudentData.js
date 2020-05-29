import React, { Fragment } from 'react'

import {
    Header,
    Card
} from "semantic-ui-react";

import { Container, Col, Row } from 'react-bootstrap'

import Piechart from "../../../components/Graph/Pie";
import Barchart from "../../../components/Graph/Bar";
import Horizontal from "../../../components/Graph/BarHorizontal";

import { setupPieChart, setupStackBarChart } from '../../../components/Graph/GraphController'

import MediaQuery from 'react-responsive'
import { minDeviceWidth } from '../../../Constant'

import { useSelector } from 'react-redux'

export const StudentData = ({ deptID }) => {

    let selectedData = null

    let { analyze_by_dept } = useSelector(state => state.admin_student.studentData)

    if (analyze_by_dept !== null){
        selectedData = analyze_by_dept.filter(data => data['dept_id'] === deptID)[0]
    }

    return (
        <Fragment>
            <MediaQuery minDeviceWidth={minDeviceWidth}>
                <Container style={{ backgroundColor: "#FFFFFF", padding: "2%" }}>
                    <Header align="center" as="h2" style={{ marginBottom: "5%" }}>
                        จำนวนนักศึกษาทุกชั้นปี
                    </Header>
                    <Row >
                        <Col sm={12} lg={6} className="my-2">
                            <Card fluid>
                                <Card.Header align="center">
                                    <h3>จำนวนนักศึกษาต่อสาขา</h3>
                                </Card.Header>
                                <Card.Content>
                                    {
                                        selectedData !== null ? (
                                            <Piechart data={setupPieChart(selectedData.branch)} />
                                        ) : (
                                                <h2 className="text-center">ไม่พบข้อมูล</h2>
                                            )
                                    }
                                </Card.Content>
                            </Card>
                        </Col>
                        <Col sm={12} lg={6} className="my-2">
                            <Card fluid>
                                <Card.Header align="center">
                                    <h3>สถานะของนักศึกษาแต่ละชั้นปี</h3>
                                </Card.Header>
                                <Card.Content>
                                    {
                                        selectedData !== null ? (
                                            <Barchart data={setupStackBarChart(selectedData.status_by_year[0])} />
                                        ) : (
                                                <h2 className="text-center">ไม่พบข้อมูล</h2>
                                            )
                                    }
                                </Card.Content>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12} lg={12} className="my-2">
                            <Card fluid>
                                <Card.Header align="center">
                                    <h3>สถานะของนักศึกษาแต่ละสาขา</h3>
                                </Card.Header>
                                <Card.Content>
                                    {
                                        selectedData !== null ? (
                                            <Horizontal data={setupStackBarChart(selectedData.df_status_by_branch[0])} legend={{ display: false }} />
                                        ) : (
                                                <h2 className="text-center">ไม่พบข้อมูล</h2>
                                            )
                                    }
                                </Card.Content>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </MediaQuery>
            <MediaQuery maxDeviceWidth={minDeviceWidth - 1}>
                <Container style={{ backgroundColor: "#FFFFFF", padding: "2%" }}>
                    <Header align="center" as="h2" style={{ marginBottom: "5%" }}>
                        จำนวนนักศึกษาทุกชั้นปี
                    </Header>
                    <Row >
                        <Col sm={12} lg={6} className="my-2">
                            <Card fluid>
                                <Card.Header align="center">
                                    <h5>จำนวนนักศึกษาต่อสาขา</h5>
                                </Card.Header>
                                <Card.Content>
                                    {
                                        selectedData !== null ? (
                                            <Piechart data={setupPieChart(selectedData.branch)} />
                                        ) : (
                                                <h2 className="text-center">ไม่พบข้อมูล</h2>
                                            )
                                    }
                                </Card.Content>
                            </Card>
                        </Col>
                        <Col sm={12} lg={6} className="my-2">
                            <Card fluid>
                                <Card.Header align="center">
                                    <h5>สถานะของนักศึกษาแต่ละชั้นปี</h5>
                                </Card.Header>
                                <Card.Content>
                                    {
                                        selectedData !== null ? (
                                            <Barchart data={setupStackBarChart(selectedData.status_by_year[0])} />
                                        ) : (
                                                <h2 className="text-center">ไม่พบข้อมูล</h2>
                                            )
                                    }
                                </Card.Content>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12} lg={6} className="my-2">
                            <Card fluid>
                                <Card.Header align="center">
                                    <h5>สถานะของนักศึกษาแต่ละสาขา</h5>
                                </Card.Header>
                                <Card.Content>
                                    {
                                        selectedData !== null ? (
                                            <Horizontal data={setupStackBarChart(selectedData.df_status_by_branch[0])} />
                                        ) : (
                                                <h2 className="text-center">ไม่พบข้อมูล</h2>
                                            )
                                    }
                                </Card.Content>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </MediaQuery>

        </Fragment>
    )
}
