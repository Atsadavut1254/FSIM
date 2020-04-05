import React, { Component, Fragment } from "react";
import { Modal, Grid, Header, ModalContent, Card } from "semantic-ui-react";

// redux
import { connect } from 'react-redux'
import { closeModal } from "../../redux/action/modalAction";

import Piechart from "../Graph/Pie";
import Barchart from "../Graph/Bar";
import Horizontal from '../Graph/BarHorizontal'

//  wait other
import 'chartjs-plugin-datalabels'

import axios from 'axios'

// import color set
import { colorSet } from '../Constant'

class SummaryModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            department: "",
            loadTime: 0,
            departmentName: "",
            branch: [],
            byYear: [],
            byBranch: [],
            pieData: [],
            barData: [],
            horizontalData: []
        }
    }

    closeModal = () => {
        this.props.closeModal()
        this.setState({
            loadTime: 0
        })
    }



    fetchData = async (dept_id) => {
        await axios.get(`/department/student?dept_id=${dept_id}`)
            .then(res => {
                let received = res.data

                if (received.response === true) {
                    let data = received.data

                    this.setState({
                        department: data.dept_name,
                        branch: data.branch[0],
                        byYear: data.status_by_year[0],
                        byBranch: data.df_status_by_branch[0],
                        loadTime: 1
                    })

                }
            })
            .catch(error => {
                console.log("error")
                this.setState({
                    loadTime: 1
                })
            })
    }

    setBranch = () => {
        let { branch } = this.state
        let data = branch
        let labels = Object.keys(data)
        let dataset = []
        let background = []
        let hoverColor = []

        for (let i in data) {
            dataset.push(data[i])
        }


        for (let i in labels) {
            background.push(colorSet[i])
            hoverColor.push(colorSet[i] + "75")
        }

        this.setState({
            pieData: {
                labels: labels,
                datasets: [
                    {
                        data: dataset,
                        backgroundColor: background,
                        hoverBackgroundColor: hoverColor
                    }
                ]
            }
        })
    }

    setStudentYear = () => {
        let { byYear } = this.state
        let data = byYear
        let label = []
        let dataset = []

        // get sub label for check data
        let sub_label = []
        let cur_size = 0
        for (let key in data) {
            let temp = data[key]

            let year = 'ชั้นปีที่ ' + key
            label.push(year)

            let key_per = Object.keys(temp)

            if (key_per.length > cur_size) {
                cur_size = key_per.length
                sub_label = key_per
            }
        }

        for (let i in sub_label) {
            let inner = {
                label: sub_label[i],
                data: []
            }
            dataset.push(inner)
        }

        for (let i in byYear) {
            let data = byYear[i]
            let key = Object.keys(data)
            // key.pop()


            for (let j in sub_label) {
                if (key[j] === undefined) {
                    // console.log(`Status: ${sub_label[j]}: null`)
                    dataset[j].data.push(0)
                    continue
                }
                // console.log(`Status: ${sub_label[j]}: ${data[key[j]]}`)
                dataset[j].data.push(parseInt(data[key[j]]))
            }
        }

        for (let i in dataset) {
            dataset[i].backgroundColor = colorSet[i]
        }

        this.setState({
            barData: {
                labels: label,
                datasets: dataset
            }
        })

    }

    setBranchStatus = () => {
        let { byBranch } = this.state

        let label = []
        let dataset = []

        let sub_label = []
        let cur_size = 0
        for (let key in byBranch) {
            let data = byBranch[key]
            let key_per = Object.keys(data)

            let key_branch = 'สาขา ' + key
            label.push(key_branch)

            if (key_per.length > cur_size) {
                cur_size = key_per.length
                sub_label = key_per
            }
        }

        for (let i in sub_label) {
            let inner = {
                label: sub_label[i],
                data: []
            }
            dataset.push(inner)
        }

        for (let i in byBranch) {
            let data = byBranch[i]
            let key = Object.keys(data)
            // key.pop()


            for (let j in sub_label) {
                if (key[j] === undefined) {
                    // console.log(`Status: ${sub_label[j]}: null`)
                    dataset[j].data.push(0) 
                    continue
                }
                // console.log(`Status: ${sub_label[j]}: ${data[key[j]]}`)
                dataset[j].data.push(parseInt(data[key[j]]))
            }
        }

        for (let i in dataset) {
            dataset[i].backgroundColor = colorSet[i]
        }

        this.setState({
            horizontalData: {
                labels: label,
                datasets: dataset
            }
        })
    }

    async componentDidUpdate() {
        let { modal } = this.props

        if (modal.modalID != null && this.state.loadTime === 0) {
            await this.fetchData(modal.modalID)
            this.setBranch()
            this.setBranchStatus()
            this.setStudentYear()
        }
    }

    render() {
        let { modal } = this.props
        let { department, pieData, barData, horizontalData } = this.state

        return (
            <Fragment>
                <Modal className="modal-center" open={modal.modalOpen} onClose={this.closeModal}>
                    <Modal.Header className="tex-center">
                        <Header textAlign="center" as="h3">
                            จำนวนนักศึกษาทุกชั้นปี {department}
                        </Header>
                    </Modal.Header>
                    <ModalContent>
                        <Grid textAlign={"center"}>
                            <Grid.Row columns={2}>
                                <Grid.Column>
                                    <Card fluid>
                                        <Card.Header textAlign={"center"}>
                                            <h3>จำนวนนักศึกษาต่อสาขา</h3>
                                        </Card.Header>
                                        <Card.Content>
                                            <Piechart data={pieData} />
                                        </Card.Content>
                                    </Card>
                                </Grid.Column>
                                <Grid.Column>
                                    <Card fluid>
                                        <Card.Header textAlign={"center"}>
                                            <h3>สถานะของนักศึกษาแต่ละชั้นปี</h3>
                                        </Card.Header>
                                        <Card.Content>
                                        <Barchart data={barData} />
                                        </Card.Content>
                                    </Card>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column>
                                    <Card fluid>
                                        <Card.Header textAlign={"center"}>
                                            <h3>สถานะของนักศึกษาแต่ละสาขา</h3>
                                        </Card.Header>
                                        <Card.Content>
                                            <Horizontal data={horizontalData} />
                                        </Card.Content>
                                    </Card>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </ModalContent>
                </Modal>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    modal: state.modal
})

const mapDispatchToProps = dispatch => ({
    closeModal: () => dispatch(closeModal())
})

export default connect(mapStateToProps, mapDispatchToProps)(SummaryModal)