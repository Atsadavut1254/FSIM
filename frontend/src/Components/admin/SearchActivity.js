import React from 'react'
import { FaSistrix, FaDatabase, FaEdit, FaTrash } from "react-icons/fa";
import { InputGroup, Button, Table } from 'react-bootstrap';
import Activity from '../option/activity';

class SearchActivity extends React.Component {


    state = {
        activity: 0,
        
    }
    handleChangeActivity = (search) => {
        this.setState({ activity: search });
    }


    handleSearch = () => {
        console.log(this.state.activity )

    }

    render() {

        return (

            <React.Fragment>
                <InputGroup className="mb-3" style={{ padding: '5%' }}>
                    <Activity  option={this.handleChangeActivity} />
                    <InputGroup.Append >
                        <Button
                            className="btn-info"
                            onClick={this.handleSearch}
                        >
                            <FaSistrix />
                        </Button>
                    </InputGroup.Append>
                </InputGroup>
                <hr></hr>

                <Table striped bordered hover style={{ marginTop: '5%'}}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>กิจกรรมรับเข้า</th>
                            <th>ประเภทโครงการ</th>
                            <th>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Sci Camp</td>
                            <td>Active</td>
                            <td>
                                <Button
                                    className="btn-info interval"
                                    onClick={this.handleSearch}
                                ><FaDatabase /></Button>
                                <Button
                                    className="btn-EditData interval"
                                    onClick={this.handleSearch}
                                ><FaEdit /></Button>
                                <Button
                                    className="btn-DeleteData interval"
                                    onClick={this.handleSearch}
                                ><FaTrash /></Button>
                            </td>

                        </tr>

                    </tbody>
                </Table>

            </React.Fragment>


        )
    }
}

export default SearchActivity