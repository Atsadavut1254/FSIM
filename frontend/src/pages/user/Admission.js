import React, { Component, Fragment } from "react";

import {
    Grid,
    Card,
    Container,
    Header,
} from "semantic-ui-react";


import Barchart from "../../components/Graph/Bar";
import { setupNoneStackBarChart, setupStackBarChart } from '../../components/Graph/GraphController';


import { connect } from 'react-redux'
import { selectYear, getYearList } from '../../redux/action/adminAdmissionAction'


import YearSelect from '../../components/YearSelect'

import Axios from "axios";

class Admission extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectYear: null,
            countChannel: null,
            countSchool: null,
            compareYear: null,
            countStatus: null,
            countGrade: null,
            admissionRound: [],
            gpa_by_branch: null

        }
    }

    componentDidMount() {
        this.props.getYearList()
        this.fetchAdmissionRound()
        this.getCountChannel()
   

    }

    fetchAdmissionRound() {
        Axios.get(`/admission/round/list`)
            .then(res => {

                let data = res.data.data


                this.setState({
                    admissionRound: data
                })
            })
            .catch(error => {
                console.error(error)
            })
    }


    handleSalarySelect = event => {
        let value = event.target.value
        let { countGrade,response_round } = this.state
        if(response_round){
            this.setState({
                gpa_by_branch: countGrade[value]['gpa_by_branch']
            })
        }else{
            this.setState({
                gpa_by_branch: null
            })
        }
       




    }

    getCountChannel = () => {
        let { selectedYear } = this.props.admission
        let { admissionRound } = this.state


        Axios.get(`/admission/analyze?year=${selectedYear}`)
            .then(res => {

                let data = res.data.data

                let countChannel = data['count_channel']
                let countSchool = data['count_by_school']
                let compareYear = data['compare_year'][0]
                let countStatus = data['count_by_status'][0]
                let countGrade = data['count_by_branch']
                let response_round = data['response_round']

                let gpa_by_branch = null
                if(response_round){
                    gpa_by_branch = countGrade[admissionRound[0]['round_id']]['gpa_by_branch']
                }else{
                    gpa_by_branch = null
                }
                this.setState({
                    countChannel: setupNoneStackBarChart(countChannel),
                    countSchool: setupStackBarChart(countSchool),
                    compareYear: setupStackBarChart(compareYear),
                    countStatus: setupStackBarChart(countStatus),
                    countGrade: countGrade,
                    gpa_by_branch: gpa_by_branch,
                    response_round : response_round
                })
            })
            .catch(error => {
                console.error(error)
                this.setState({
                    countChannel: null,
                    countSchool: null,
                    compareYear: null,
                    countStatus: null,
                    countGrade: null,
                    gpa_by_branch: null
                })
            })
    }

    handleSeclectYear = async event => {
        let value = event.target.value
        if (value === 0)
            value = null
        await this.props.setYear(value)
        this.getCountChannel()
    }



    render() {
        let { countChannel, countSchool, compareYear, countStatus, countGrade, admissionRound, gpa_by_branch } = this.state
        let { selectedYear, yearList } = this.props.admission

        return (
            <Fragment>
                <Container >
                <Header textAlign="center" as="h2" className="my-5">
                           กราฟแสดงการวิเคราะห์นักศึกษาที่เข้ารับการศึกษารายปี
                        </Header>
                    <div className="my-5"> {
                        yearList !== null && (
                            <YearSelect yearList={yearList} selectedYear={selectedYear} onSelectYear={this.handleSeclectYear} title={"ค้นหาข้อมูลการรับเข้าโดยเลือกปีการศึกษา"} />
                        )
                    }</div>
                   
                    <Grid textAlign="center">
                        <Grid.Row>
                            <Grid.Column width={16}>
                                <Card className="fs-cd-default">
                                    <Card.Header as="h4">
                                        กราฟแสดงเปรียบเทียบจำนวนนักเรียนที่รับเข้าในโครงการต่างๆประจำปี
                                        {selectedYear}
                                    </Card.Header>
                                    <Card.Content>
                                        {
                                            countChannel !== null ? (
                                                <Barchart data={countChannel} />
                                            ) : (<h3 className="text-center">ไม่พบข้อมูล</h3>)
                                        }

                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={16}>
                                <Card className="fs-cd-default">
                                    <Card.Header as="h4">
                                        กราฟแสดงผลการศึกษาโครงการต่างๆ ประจำปี {selectedYear}
                                    </Card.Header>
                                    <Card.Content>
                                        {
                                            countStatus !== null ? (<Barchart data={countStatus} />) : (<h3 className="text-center">ไม่พบข้อมูล</h3>)
                                        }


                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={16}>
                                <Card className="fs-cd-default">
                                    <Card.Header as="h4">
                                        กราฟแสดงค่าเฉลี่ยเกรดของแต่ละโครงการประจำปีการศึกษา {selectedYear}
                                    </Card.Header>
                                    <Card.Header as="h5" align='right' className='fs-font-18'>

                                        <select className="form-control" defaultValue={admissionRound.length !== 0 ? admissionRound[0]['round_name'] : null} onChange={countGrade !== null ? this.handleSalarySelect : null}>
                                            {
                                                admissionRound.length !== 0 ? (
                                                    admissionRound.map((item, index) => (
                                                        <option key={index}
                                                            value={item['round_id']}>{item['round_name']}</option>
                                                    ))
                                                ) : (<option value="">ไม่พบข้อมูล</option>)
                                            }
                                        </select>
                                    </Card.Header>
                                    <Card.Content>
                                           
                                        {(gpa_by_branch !== undefined )&(gpa_by_branch!==null)? <Barchart data={setupStackBarChart(gpa_by_branch)}  /> : (<h3 className="text-center">ไม่พบข้อมูล</h3>)}
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={16}>
                                <Card className="fs-cd-default">
                                    <Card.Header as="h4">
                                        กราฟแสดง 5 อันดับโรงเรียน {selectedYear}
                                    </Card.Header>
                                    <Card.Content>
                                        {
                                            countSchool !== null ? (
                                                <Barchart data={countSchool}  />
                                            ) : (<h3 className="text-center">ไม่พบข้อมูล</h3>)
                                        }
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={16}>
                                <Card className="fs-cd-default">
                                    <Card.Header as="h4">
                                        กราฟเปรียบเทียบจำนวนนักเรียนที่เข้าศึกษาแบ่งตามโครงการประจำปี {selectedYear} และ {parseInt(selectedYear) + 1}
                                    </Card.Header>
                                    <Card.Content>
                                        {
                                            compareYear !== null ? (
                                                <Barchart data={compareYear}  />
                                            ) : (<h3 className="text-center">ไม่พบข้อมูล</h3>)
                                        }

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

const mapStateToProps = state => (
    {
        admission: state.admin_admission
    }
)

const mapDispatchToProps = dispatch => (
    {
        setYear: (year) => dispatch(selectYear(year)),
        getYearList: () => dispatch(getYearList()),
    }
)


export default connect(mapStateToProps, mapDispatchToProps)(Admission)