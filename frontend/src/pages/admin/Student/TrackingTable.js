import React, { Fragment } from 'react'

import { useSelector } from 'react-redux'

import { Button, Table } from 'react-bootstrap'

export default ({ deptId, deptName, handleTracking }) => {

    let { studentList } = useSelector(state => state.admin_student)

    let selectedData = null

    if (studentList !== null) {
        selectedData = studentList.filter(data => data['dept_id'] === deptId)[0]
    }

    return (
        <Fragment>

            <Table responsive hover>
                <thead>
                    <tr align="center">
                        <th>ลำดับ</th>
                        <th>รหัสนักศึกษา</th>
                        <th>ชื่อ-นามสกุล</th>
                        <th>สาขา</th>
                        <th>GPAX</th>
                        <th>กราฟผลการเรียน</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        selectedData !== null ? (
                            selectedData['student'].map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item['student_id']}</td>
                                    <td>{item['firstname']}  {item['lastname']}</td>
                                    <td>{item['branch_name']}</td>
                                    <td>{item['current_gpax']}</td>
                                    <td> <Button onClick={() => handleTracking(item['student_id'], deptName)}>ติดตามผลการเรียน</Button></td>

                                </tr>
                            ))
                        ) : (
                                <tr>
                                    <td colSpan={3}>
                                        <h2 className="text-center">ไม่พบข้อมูล</h2>
                                    </td>
                                </tr>
                            )
                    }
                </tbody>
            </Table>
        </Fragment>

    );
}