
import React from 'react'
import EditableCell from './EditableCell'
import { Button, InputGroup, Row } from 'react-bootstrap';
import { FaSistrix, FaDatabase, FaEdit, FaTrash } from "react-icons/fa";

class ProjectRow extends React.Component {
    onDelEvent() {
        this.props.onDelEvent(this.props.product);
    }


    render() {

        return (
            <React.Fragment>
                    <InputGroup className="mb-3"  >
                        
                        <EditableCell
                            onProductTableUpdate={this.props.onProductTableUpdate}
                            cellData={{
                                type: "project",
                                value: this.props.product.project,
                                id: this.props.product.id
                            }} />
                        <InputGroup.Append >
                            <Button
                                onClick={this.props.onAddEve}
                                className="btn-EditData interval-1">+</Button>
                            <Button
                                className='btn-DeleteData interval-1'
                                onClick={this.onDelEvent.bind(this)}
                            > - </Button>
                        </InputGroup.Append>
                    </InputGroup>
            </React.Fragment>
        );

    }

}

export default ProjectRow