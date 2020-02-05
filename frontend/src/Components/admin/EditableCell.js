import React from 'react'
import { FormControl, Button, Form, Col, Row } from 'react-bootstrap';

class EditableCell extends React.Component {
    
    render() {
        return (
            <React.Fragment>
                <FormControl
                    type="text"
                    name={this.props.cellData.type}
                    id={this.props.cellData.id}
                    onChange={this.props.onProductTableUpdate}
                    inputRef={(ref) => { this.input = ref }}
                    defaultValue={this.props.cellData.value}
                    placeholder="ชื่อโครงการ"
            
                />
            </React.Fragment>

        );

    }

}

export default EditableCell