import React, {Component, Fragment} from "react";
import {Form, Col, Row, FormControl} from "react-bootstrap";
import {Button, Label} from "semantic-ui-react";

const Project = ({list}) => (
    <Fragment>
        <FormControl as="select">
            <option>กรุณาเลือกโครงการที่รับเข้า</option>
            {list.map(item => (<option value={item.id} key={item.id}>{item.name}</option>))}
        </FormControl>
    </Fragment>
)

class AddActivity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activity: "",
            project: 0
        }
    }

    handleNewActivity = search => {
        this.setState({ activity: search.target.value });
    };

    handleProject = search => {
        this.setState({ project: search.target.value });
    };

    handleSubmit = event => {
        console.log(this.state);
    };

    handleReset = event => {
        this.setState({ activity: "", project: 0 });
    };

    render() {
        return (
            <Fragment>
                <Form style={{padding: "5%"}}>
                    <Row className="style-addData interval-top">
                        <Col sm="3">
                            <Label>กิจกรรมรับเข้า</Label>
                        </Col>
                        <Col sm="6">
                            <Form.Control
                                type="text"
                                placeholder="กิจกรรมรับเข้าใหม่"
                                // onChange={this.handleChangeNewActivity}
                                // value={this.state.activity}
                            />
                        </Col>
                    </Row>
                    <Row className="style-addData interval-top">
                        <Col sm="3">
                            <Label>ประเภทโครงการ</Label>
                        </Col>
                        <Col sm="6">
                            <Project
                                list = {[{id: 1, name: "aaa"}]}
                                // option={this.handleChangeProject}
                                // value={this.state.project}
                            />
                        </Col>
                    </Row>

                    <div style={{marginTop: "5%"}}>
                        <Button
                            className="btn-EditData interval-1"
                            onClick={this.handleSearch}
                        >
                            เพิ่มโครงการ
                        </Button>
                        <Button
                            className="btn-EditData interval-1"
                            onClick={this.handleReset}
                        >
                            RESET
                        </Button>

                        <Button className="btn-info interval-1" onClick={this.handleSubmit}>
                            SUBMIT
                        </Button>
                    </div>
                </Form>
            </Fragment>
        );
    }
}

export default AddActivity