import React, { Component, Fragment } from 'react'

import { Container, Tab, Col, Row } from 'react-bootstrap'
import SideTab, { convertTabName, convertDetail } from '../../../components/SideTabDialog'

import { StudentData } from './StudentData'


import { connect } from 'react-redux'
import { getStudentData } from '../../../redux/action/adminStudentAction'
import { getDepartmentList } from '../../../redux/action/adminInformationAction'


class StudentSummary extends Component {

    componentDidMount() {
        this.getData()
    }

    getData = () => {
        this.props.getDepartmentList()
        this.props.getStudentData()
    }


    render() {

        let { departmentList } = this.props.information
        let { studentData } = this.props.student
        let key = false, tabName = null, tabDetail = []
        if (departmentList !== null) {
            key = departmentList[0]['dept_id']
            tabName = convertTabName(departmentList, "dept_id", "dept_name")
            if (departmentList !== null && studentData !== null) {
                departmentList.forEach(item => {
                    tabDetail.push(convertDetail(item['dept_id'], <StudentData deptID={item['dept_id']} />))
                })
            }
        }

        return (

            <Fragment>
                <div className="my-2 w-100 mx-auto">
                    <Container fluid>
                        <Tab.Container defaultActiveKey={key}>
                            <Row>
                                <Col >

                                    {
                                        key && tabName !== null && studentData !== null ? (
                                            <SideTab startKey={key} tabName={tabName} tabDetail={tabDetail} dropdownTitle={tabName[0]['tabTitle']} />

                                        ) : (
                                                <h1 className="text-center">ไม่พบข้อมูล</h1>
                                            )
                                    }

                                </Col>
                            </Row>
                        </Tab.Container>

                    </Container>
                </div>
            </Fragment>
        )
    }
}


const mapStateToProps = state => (
    {
        information: state.admin_information,
        student: state.admin_student
    }
)

const mapDispatchToProps = dispatch => (
    {
        getDepartmentList: () => dispatch(getDepartmentList()),
        getStudentData: () => dispatch(getStudentData()),
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(StudentSummary)
