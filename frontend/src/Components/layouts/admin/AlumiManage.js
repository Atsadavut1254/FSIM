import React, { Component, Fragment } from 'react'

import TabDialog from '../../admin/TabDialog'
import { Table, Button } from 'semantic-ui-react'

// 


const ManageTab = () => (
    <Fragment>
        <Table>
            <Table.Header>
                <Table.Row textAlign="center">
                    <Table.HeaderCell>
                        ลำดับ
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                        ปีการศึกษา
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                        ตารางที่เลือก
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                        ลิงก์ Google Sheet
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                        ดำเนินการ
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                <Table.Row>
                    <Table.Cell>
                        ลำดับ
                    </Table.Cell>
                    <Table.Cell>
                        ปีการศึกษา
                    </Table.Cell>
                    <Table.Cell>
                        ตารางที่เลือก
                    </Table.Cell>
                    <Table.Cell>
                        ลิงก์ Google Sheet
                    </Table.Cell>
                    <Table.Cell>
                        <Button>แก้ไข</Button>
                        <Button>ลบ</Button>
                    </Table.Cell>
                </Table.Row>
            </Table.Body>
        </Table>
    </Fragment>
)


class AlumniManage extends Component {
    render() {
        return (
            <Fragment>
                <TabDialog
                    dialogName="จัดการข้อมูลศิษย์เก่า"
                    tab1Name="จัดการรายการแบบสอบถาม"
                    tab2Name="เพิ่มข้อแบบสอบถาม"
                    tab1Pane={<ManageTab />}
                />
            </Fragment>
        )
    }
}

export default AlumniManage