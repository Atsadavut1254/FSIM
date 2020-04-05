import React, { Component, Fragment } from 'react'

import { Grid, Container, GridRow, Menu } from 'semantic-ui-react'

import Piechart from '../../Graph/Pie'
import Barchart from '../../Graph/Bar'
import BarHorizontal from '../../Graph/BarHorizontal'

// 
import AmountBox from '../../general/AmountBox'
import Modal from '../../general/Modal'

// axios
import axios from 'axios'

const AmountPanel = ({ data }) => (
    <Fragment>
        {data.length !== 0 &&
            <Grid.Row columns="equal">
                {data.map((item, index) => (
                    <Grid.Column key={index}>
                        <AmountBox name={item.branch_name} amount={item.amount_student} />
                    </Grid.Column>
                ))}
            </Grid.Row>
        }
    </Fragment>
)

const OverviewPage = ({ branch }) => (
    <Fragment>
        <Grid.Row>
            <Grid.Column>
                <AmountPanel data={branch} />
            </Grid.Column>
        </Grid.Row>
        <Grid.Row>
            <Modal />
        </Grid.Row>
    </Fragment>
)

class DepartmentDetail extends Component {

    constructor(props) {
        super(props)
        this.state = {
            department_id: props.match.params.dept_id,
            department_name: "",
            branch: [],
            activeItem: 'overview',
            overview: ""
        }

    }

    handleClick = (e, { name }) => this.setState({ activeItem: name })

    fetchDepartmentData = async (dept_id) => {
        await axios.get(`/department?dept_id=${dept_id}`)
            .then(res => {
                let recieved = res.data
                if (recieved.response === true) {
                    let data = recieved.data[0]
                    this.setState({
                        department_name: data.dept_name,
                        branch: data.branch
                    })
                }
            })
            .catch(error => {
                console.log(error)
            })
    }

    async componentDidMount() {
        let { department_id } = this.state
        await this.fetchDepartmentData(department_id)
    }

    componentDidUpdate() {
        console.log(this.state.branch)
    }

    render() {
        let { activeItem, department_id, department_name, branch } = this.state

        console.log(branch)

        return (
            <Fragment>
                <Container style={{ marginTop: '3.5rem' }}>
                    <h1 style={{ textAlign: 'center' }}>{department_name}</h1>
                    <Grid>
                        <GridRow columns={2}>
                            <Grid.Column width={4}>
                                <Menu secondary vertical>
                                    <Menu.Item
                                        name='overview'
                                        active={activeItem === 'overview'}
                                        onClick={this.handleClick}
                                    >ภาพรวม</Menu.Item>
                                    <Menu.Item
                                        name='results'
                                        active={activeItem === 'results'}
                                        onClick={this.handleClick}
                                    >ผลการศึกษา</Menu.Item>
                                </Menu>
                            </Grid.Column>
                            <Grid.Column>
                                {activeItem === 'overview' ? <OverviewPage branch={branch} /> : <Barchart />}
                            </Grid.Column>
                        </GridRow>
                    </Grid>
                </Container>
            </Fragment>
        )
    }

}

export default DepartmentDetail