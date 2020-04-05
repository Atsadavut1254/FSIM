import React, {Component, Fragment} from "react";
import {FaSistrix, FaDatabase, FaEdit, FaTrash} from "react-icons/fa";
import {FormControl, InputGroup} from "react-bootstrap";
import {Divider, Table, Button, TableHeaderCell, TableHeader, TableRow} from "semantic-ui-react";

const ActivityOption = ({search}) => (
    <Fragment>
        <FormControl as="select">
            <option value='0'>ชื่อกิจกรรมรับเข้า</option>
            <option value='Scicamp'>Sci Camp</option>
        </FormControl>
    </Fragment>
)

class SearchActivity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activity: 0
        }
    }

    handleChangeActivity = search => {
        this.setState({
            activity: search
        })
    }

    handleSearch = () => {
        console.log(this.state.activity);
    };

    render() {
        return (
            <Fragment>
                <InputGroup className="mb-3" style={{padding: "5%"}}>
                    <ActivityOption option={this.handleChangeActivity}/>
                    <InputGroup.Append>
                        <Button className="btn-info" onClick={this.handleSearch}>
                            <FaSistrix/>
                        </Button>
                    </InputGroup.Append>
                </InputGroup>
                <Divider/>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHeaderCell>#</TableHeaderCell>
                            <TableHeaderCell>กิจกรรมรับเข้า</TableHeaderCell>
                            <TableHeaderCell>ประเภทโครงการ</TableHeaderCell>
                            <TableHeaderCell>การจัดการ</TableHeaderCell>
                        </TableRow>
                    </TableHeader>
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>1</Table.Cell>
                            <Table.Cell>Sci Camp</Table.Cell>
                            <Table.Cell>Active</Table.Cell>
                            <Table.Cell>
                                <Button
                                    className="btn-info interval"
                                    onClick={this.handleSearch}
                                >
                                    <FaDatabase />
                                </Button>
                                <Button
                                    className="btn-EditData interval"
                                    onClick={this.handleSearch}
                                >
                                    <FaEdit />
                                </Button>
                                <Button
                                    className="btn-DeleteData interval"
                                    onClick={this.handleSearch}
                                >
                                    <FaTrash />
                                </Button>
                            </Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
            </Fragment>
        )
    }
}

export default SearchActivity