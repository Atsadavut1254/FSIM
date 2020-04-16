import React, {Component, Fragment} from "react";

import {
    Dropdown,
    Divider,
    Grid,
    Header,
    Container,
    Card,
    Table,
    Image
} from "semantic-ui-react";

// redux
import {connect} from 'react-redux'
import {getAllBranch} from "../../redux/action/BranchAction";


import GraphPie from "../../components/Graph/Pie";
import GraphBar from "../../components/Graph/Bar";
import AlumniTypePanel from "../../components/AlumniTypePanel";


class SummaryAdmission extends Component {
    
  
    render() {
        let {branch_list} = this.props
        return (
            <Fragment>
                 <Container>
                    <Header as="h4" align = 'center'>
                            ค้นหาข้อมูลการรับเข้าของปีการศึกษา{" "}
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
                            <Header  as = "h3">
                                จำนวนประเภทการเข้าศึกษาแต่ละสาขาวิชา ของนักศึกษาคณะวิทยาศาสตร์ มจธ.
                                </Header>
                            <Divider/>
                            <Table celled structured>
                                <Table.Header>
                                    <Table.Row active>
                                        <Table.HeaderCell width={2} textAlign="center">
                                            ประเภทการเข้าศึกษา
                                        </Table.HeaderCell>
                                        <Table.HeaderCell width={1} textAlign="center">
                                            เคมี
                                        </Table.HeaderCell>
                                        <Table.HeaderCell width={1} textAlign="center">
                                            คณิตศาสตร์
                                        </Table.HeaderCell>
                                        <Table.HeaderCell width={1} textAlign="center">
                                            สถิติ
                                        </Table.HeaderCell>
                                        <Table.HeaderCell width={1} textAlign="center">
                                            วิทยาการคอมพิวเตอร์ประยุกต์
                                        </Table.HeaderCell>
                                        <Table.HeaderCell width={1} textAlign="center">
                                            ฟิสิกส์ประยุกต์
                                        </Table.HeaderCell>
                                        <Table.HeaderCell width={1} textAlign="center">
                                            จุลชีววิทยา
                                        </Table.HeaderCell>
                                        <Table.HeaderCell width={1} textAlign="center">
                                            วิทยาศาสตร์และเทคโนโลยีการอาหาร
                                        </Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>

                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            คัดเลือกตรง
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                            </Table>
                        </Grid.Row>
                    </Grid>
                    <Grid>     
                         <Grid.Row> 
                            <Header  as = "h3">
                                ค่าเฉลี่ยประเภทการเข้าศึกษาแต่ละสาขาวิชาของนักศึกษาคณะวิทยาศาสตร์ มจธ.
                                </Header>
                            <Divider/>
                            <Table celled structured>
                                <Table.Header>
                                    <Table.Row active>
                                        <Table.HeaderCell width={3} textAlign="center">
                                            ประเภทการเข้าศึกษา
                                        </Table.HeaderCell>
                                        <Table.HeaderCell width={3} textAlign="center">
                                            จำนวนคน
                                        </Table.HeaderCell>
                                        <Table.HeaderCell width={3} textAlign="center">
                                            Max
                                        </Table.HeaderCell>
                                        <Table.HeaderCell width={3} textAlign="center">
                                            Min
                                        </Table.HeaderCell>
                                    
                                    </Table.Row>
                                </Table.Header>

                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            คัดเลือกตรง
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                    
                                    </Table.Row>
                                </Table.Body>
                            </Table>
                        </Grid.Row>
                    </Grid>   
                    <Grid>     
                         <Grid.Row> 
                            <Header  as = "h3">
                                ประเภทการรับเข้าศึกษาของคณะวิทยาศาสตร์ มจธ.
                                </Header>
                            <Divider/>
                            <Table celled structured>
                                <Table.Header>
                                    <Table.Row active>
                                        <Table.HeaderCell width={2} textAlign="center">
                                            ประเภทการเข้าศึกษา
                                        </Table.HeaderCell>
                                        <Table.HeaderCell width={1} textAlign="center">
                                            รวมจำนวนนักศึกษา (คน)
                                        </Table.HeaderCell>
                                        <Table.HeaderCell width={1} textAlign="center">
                                            ร้อยละ
                                        </Table.HeaderCell>
                                        <Table.HeaderCell width={1} textAlign="center">
                                            จำนวนนักศึกษาตกออก(คน)​
                                        </Table.HeaderCell>
                                        <Table.HeaderCell width={1} textAlign="center">
                                            ร้อยละนักศึกษาตกออก(จากนักศึกษาแต่ละประเภท)​
                                        </Table.HeaderCell>
                                        <Table.HeaderCell width={1} textAlign="center">
                                            ร้อยละนักศึกษาตกออก(จากนักศึกษาทั้งหมด)​
                                        </Table.HeaderCell>
                                        <Table.HeaderCell width={1} textAlign="center">
                                            จำนวนนักศึกษาติดวิทยาทัณฑ์(คน)​
                                        </Table.HeaderCell>
                                        <Table.HeaderCell width={1} textAlign="center">
                                            ร้อยละของนักศึกษาวิทยาทัณฑ์(จากแต่ละประเภท)​
                                        </Table.HeaderCell>
                                        <Table.HeaderCell width={1} textAlign="center">
                                            ร้อยละนักศึกษาวิทยาทัณฑ์จากนักศึกษาทั้งหมด​
                                        </Table.HeaderCell>

                                     
                                    </Table.Row>
                                </Table.Header>

                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            คัดเลือกตรง
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                    
                                    </Table.Row>
                                </Table.Body>
                            </Table>
                        </Grid.Row>
                    </Grid>         
                </Container>

            </Fragment>
        )
    }
}
export default SummaryAdmission