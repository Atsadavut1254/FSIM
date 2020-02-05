import React from 'react'
import ReactDOM from 'react-dom';
import { Form, Col, Row, Button } from 'react-bootstrap';
import Activity from '../option/activity';
import Project from '../option/project';


class AddActivity extends React.Component {


    state = {
        activity: 0,
        project: 0
    }

    handleChangeActivity = (search) => {
        this.setState({ activity: search.target.value });
    }

    handleChangeProject = (search) => {
        this.setState({ project:  search.target.value });

    }






    render() {

        return (
            <React.Fragment>
                <Form style={{ padding: '5%' }}>
                    <Row  className="style-addData interval-top" >
                        <Col sm='3' >
                            <label>กิจกรรมรับเข้า</label>
                        </Col>
                        <Col sm='6'>
                            <Form.Control type="text" placeholder="กิจกรรมรับเข้าใหม่" />

                        </Col>
                    </Row>
                    <Row  className="style-addData interval-top"  >
                        <Col sm='3'>
                            <label>ประเภทโครงการ</label>
                        </Col>
                        <Col sm='6'>
                            <Project option={this.handleChangeProject} />
                        </Col>
                    </Row>

                  

                    
                    <div   style={{marginTop:'5%'}}>
                    <Button
                        className='btn-EditData interval-1'
                        onClick={this.handleSearch}
                    >เพิ่มโครงการ</Button>
                        <Button
                            className='btn-EditData interval-1'
                            onClick={this.handleSearch}
                        >RESET</Button>

                        <Button
                            className='btn-info interval-1'
                            onClick={this.handleSearch}
                        >SUBMIT</Button>
                    </div>


                </Form>
            </React.Fragment>
        )
    }
}

export default AddActivity