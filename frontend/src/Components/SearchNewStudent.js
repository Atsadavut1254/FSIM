import React from 'react'
import Index from "./Index";
import ReactDOM from 'react-dom';
import { FaSistrix } from "react-icons/fa";
import { InputGroup, FormControl, Container, Button,Table } from 'react-bootstrap';

class SearchNewStudent extends React.Component {
    state = {
        faulty: 0,
        year: 0,
    }
    handleChangeFaulty = (search) => {
        this.setState({ faulty: search.target.value });
    }

    handleChangeYear = (search) => {
        this.setState({ year: search.target.value });
    }

    handleSearch = () => {
        console.log(this.state.faulty + " , " + this.state.year)

    }

    render() {

        return (
            <React.Fragment>

            <Container >
                <div>
                    <InputGroup className="mb-3" style={{ padding: '5%' }}>
                        <FormControl as="select"
                            value={this.state.faulty}
                            onChange={this.handleChangeFaulty} >
                            <option value='0'>ภาควิชา</option>
                            <option value='Math'>Math</option>
                            <option value='CHM'>CHM</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </FormControl>
                        <FormControl as="select"
                            value={this.state.year}
                            onChange={this.handleChangeYear}
                        >
                            <option value='0'>ปีที่รับเข้า</option>
                            <option value='1'>1</option>
                            <option value='2'>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </FormControl>
                        <InputGroup.Append >
                            <Button
                                variant="outline-secondary"
                                style={{ backgroundColor: '#3BB3A9', borderColor: '#3BB3A9' }}
                                onClick={this.handleSearch}
                            >
                                <FaSistrix style={{ color: '#FFFFFF' }} />
                            </Button>
                        </InputGroup.Append>
                    </InputGroup>
                </div>
                <hr></hr>

                <Table striped bordered hover style={{marginTop :'5%'}}>
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
                                className="button ShowData"
                                variant="outline-secondary" 
                                onClick={this.handleSearch}
                            ><FaSistrix style={{ color: '#FFFFFF' }} /></Button>
                            <Button
                                className="button EditData"
                                variant="outline-secondary"
                                onClick={this.handleSearch}
                            ><FaSistrix style={{ color: '#FFFFFF' }} /></Button>
                            <Button
                                className="button DeleteData"
                                variant="outline-secondary"
                                onClick={this.handleSearch}
                            ><FaSistrix style={{ color: '#FFFFFF' }} /></Button>
</td>

                        </tr>
                       
                    </tbody>
                </Table>

            </Container>
            </React.Fragment>


        )
    }
}

export default SearchNewStudent