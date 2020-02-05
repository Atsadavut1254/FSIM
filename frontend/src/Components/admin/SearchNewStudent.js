import React from 'react'
import { FaSistrix,FaDatabase,FaEdit,FaTrash } from "react-icons/fa";
import { InputGroup, Button, Table } from 'react-bootstrap';
import Year from '../option/year';
import Faulty from '../option/faulty'

class SearchNewStudent extends React.Component {


    state = {
        faulty: 0,
        year: 0,
    }
    handleChangeFaulty = (search) => {
        this.setState({ faulty: search });
    }

    handleChangeYear = (search) => {
        this.setState({ year: search });
        console.log(search)
    }

    handleSearch = () => {
        console.log(this.state.faulty + " , " + this.state.year)

    }

    render() {

        return (

            <React.Fragment>
                <InputGroup className="mb-3" style={{ padding: '5%' }}>
                    <Faulty option={this.handleChangeFaulty} />
                    <Year option={this.handleChangeYear} />
                    <InputGroup.Append >
                        <Button
                            className="btn-info"
                            onClick={this.handleSearch}
                        >
                            <FaSistrix/>
                        </Button>
                    </InputGroup.Append>
                </InputGroup>
                <hr></hr>

                <Table striped bordered hover style={{ marginTop: '5%' }}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>ภาควิชา</th>
                            <th>ปีการศึกษา</th>
                            <th>จำนวนนักศึกษา</th>
                            <th>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>คณิตศาสตร์</td>
                            <td>2560</td>
                            <td>25</td>
                            <td>
                            <Button 
                                    className="btn-info interval"
                                    onClick={this.handleSearch}
                                ><FaDatabase /> ดู</Button>
                               
                                <Button
                                    className="btn-EditData interval"
                                    onClick={this.handleSearch}
                                ><FaEdit  /> แก้ไข</Button>
                               
                                <Button
                                    className="btn-DeleteData interval"
                                    onClick={this.handleSearch}
                                ><FaTrash/> ลบ</Button>
                               
                            </td>

                        </tr>

                    </tbody>
                </Table>

            </React.Fragment>


        )
    }
}

export default SearchNewStudent