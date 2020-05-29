import React, { Component, Fragment } from 'react'
import axios from "axios";


import { Container, Modal, Tab, Col, Row } from 'react-bootstrap'
import { Header, Divider } from 'semantic-ui-react'
import SideTab, { convertTabName, convertDetail } from '../../../components/SideTabDialog'
import ReactModal from '../../../components/ReactModal'

import Line from "../../../components/Graph/Line";
import { setupLineChart } from "../../../components/Graph/GraphController";

import { connect } from 'react-redux'
import { getStudentList } from '../../../redux/action/adminStudentAction'
import { getDepartmentList } from '../../../redux/action/adminInformationAction'
import { openModal } from '../../../redux/action/modalAction'

import Tracking from './TrackingTable'

class StudentTracking extends Component {

  constructor(props) {
    super(props)
    this.state = {
      tabKey: null,
      trackingStudent: [],
      showTrack: false

    }
  }

  componentDidMount() {
    this.getData()
  }

  getData = () => {
    let { selectedYear } = this.props.student
    this.props.getDepartmentList()
    this.props.getStudentList(selectedYear)
  }


  handleTracking = (id_student, dept_name) => {
    axios.get(`/admin/student/tracking?id_student=${id_student}`)
      .then(res => {

        let data = res.data.data
        this.setState({
          trackingStudent: {
            student_id: data.student_id,
            firstname: data.firstname,
            lastname: data.lastname,
            trackking: this.setLabelTracking(setupLineChart(data.trackking)),
            dept: dept_name,
          },

          showTrack: true
        },

        )
      })
      .catch(error => {
        console.error(error)
        this.props.openModal(true, [{ text: 'ยังไม่มีข้อมูลเกรดของนักศึกษาหมายเลข  ' + id_student, color: '#C0392B', type: false }])
      })
  }

  handlTrackClose = () => {
    this.setState({
      showTrack: false,
      trackingStudent: [],

    })
  }

  setLabelTracking = (data) => {
    let dataLabel = data.labels
    let newLabel = []

    dataLabel.forEach(item => {
      let number = parseInt(item)
      let semester = (number % 2) + 1
      let year = Math.floor(number / 2) + 1
      newLabel.push('ปี ' + year + ' เทอม ' + semester)
    },
      data.labels = newLabel
    )
    return data
  }

  render() {
    let { showTrack, trackingStudent } = this.state
    let { departmentList } = this.props.information
    let key = false, tabName = null, tabDetail = []
    let { studentList } = this.props.student
    if (departmentList !== null) {
      key = departmentList[0]['dept_id']
      tabName = convertTabName(departmentList, "dept_id", "dept_name")
      if (departmentList !== null && studentList !== null) {
        departmentList.forEach(item => {
          tabDetail.push(convertDetail(item['dept_id'], <Tracking deptId={item['dept_id']} deptName={item['dept_name']} handleTracking={this.handleTracking} />))
        })

      }
    }

    return (
      <Fragment>
        <ReactModal />
        <div className="my-2 w-100 mx-auto">
          {
            trackingStudent !== null ?
              (<Modal
                size="lg"
                centered
                show={showTrack}
                onHide={this.handlTrackClose}
              >

                <Modal.Body>
                  <Container className="mb-5">
                    <Row>
                      <Col sm={12} lg={12} className="my-2">
                        <div >
                          <Header as='h2'>ข้อมูลนักศึกษา</Header>
                          <h5>รหัสนักศึกษา : {trackingStudent.student_id}</h5>
                          <h5>ชื่อ-นามสกุล : {trackingStudent.firstname}   {trackingStudent.lastname} </h5>
                          <h5>ภาควิชา    : {trackingStudent.dept}</h5>
                        </div>
                        <Divider style={{ marginBottom: '4%' }} />
                        <div style={{ padding: '3%' }}>
                          <Line data={trackingStudent.trackking} legend={{ display: false }} />
                        </div>
                        <h5 align="center" style={{ margin: '2%' }}>กราฟแสดงเกรดเฉลี่ยนักศึกษารายเทอม</h5>
                      </Col>
                    </Row>
                  </Container>
                </Modal.Body>
              </Modal>) : null
          }
          <Container fluid>
            <Tab.Container defaultActiveKey={key}>
              <Row>
                <Col >
                  {
                    key && tabName !== null && studentList !== null ? (
                      <SideTab startKey={key} tabName={tabName} tabDetail={tabDetail} dropdownTitle={"รายชื่อภาควิชา"} />
                    )
                      : (
                        <div className="text-center"> <h3 style={{ marginTop: '5%' }} >ไม่พบข้อมูล</h3></div>
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
    student: state.admin_student,
    information: state.admin_information
  }
)

const mapDispatchToProps = dispatch => (
  {
    getStudentList: (selectedYear) => dispatch(getStudentList(selectedYear)),
    getDepartmentList: () => dispatch(getDepartmentList()),
    openModal: (bool, data) => dispatch(openModal(bool, data))
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(StudentTracking)