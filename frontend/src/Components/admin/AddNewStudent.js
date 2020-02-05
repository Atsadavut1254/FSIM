import React from 'react'
import ReactDOM from 'react-dom';
import { FormControl, Button, Form, Col, Row } from 'react-bootstrap';
import { FaCloudUploadAlt } from "react-icons/fa";
import Year from '../option/year';
import Faulty from '../option/faulty'


class AddNewStudent extends React.Component {

    constructor() {
        super();
        this.onChange = this.onChange.bind(this);
        this.state = {
            faulty: 0,
            year: 0,
            files : []
            // FormElement:{
            //     faulty: {
            //         type:'text',
            //         value:'',
            //         validator :{
            //             required : true,
            //         },
            //         touched : false,
            //         error : {
            //             status :{ status : true ,message :''}
            //         }
            //     },
            //     year: {
            //         type:'text',
            //         value:'',
            //         validator :{
            //             required : true,
            //         },
            //         touched : false,
            //         error : {
            //             status :{ status : true ,message :''}
            //         }
                    
            //     },
            //     files:  []
            // },
            // formValid : false
            
        }
    }

    // onSubmit = (event) => {
    //     event.preventDefault();
    //     console.log(this.state)
    // }


    handleChangeFaulty = (search) => {
        // console.log(search.target.value);
        this.setState({ faulty: search.target.value });
    }

    handleChangeYear = (search) => {
        this.setState({ year: search.target.value });
    }

    // onformChange=(event)=>{
    //     const name=event.target.name;
    //     const value=event.target.value;
    //     let UploadForm={...this.state.FormElement};
    //     UploadForm[name].value=value;
    //     UploadForm[name].touched=true;
    //     const validatorObject = this.checkValidator(value,UploadForm[name].validator);
    //     UploadForm[name].error={
    //         status : validatorObject.state,
    //         message : validatorObject.message
    //     }
    //     let formStatus = true;
    //     for(let name in UploadForm){
    //         if(UploadForm[name].validator.required===true){
    //             formStatus=!UploadForm[name].error.status && formStatus
    //         }
    //     }

    //     this.state({
    //         ...this.state,
    //         FormElement : UploadForm,
    //         formValid : formStatus
    //     })

    // }

    // checkValidator = (value,rule)=>{
    //     let valid = true ;
    //     let message  = '' ;
    //     if(rule.require){
    //         if(value.trim().length===0){
    //             valid=false;
    //             message='จำเป็นต้องกรอก';
    //         }
    //     }
    // }

    // getErrorMessage=(name)=>{
    //     return this.state.FormElement[name].error.message;
    // }

    // getInputClass=(name)=>{
    //     const elementErrorStatus=this.state.FormElement[name].error.status;
    //     return elementErrorStatus && this.state.FormElement[name].touched ?
    //         'form-control is-invalid':
    //         'form-control is-valid'
    // }

    onChange(e) {
        var files = e.target.files;
        console.log(files);
        var filesArr = Array.prototype.slice.call(files);
        console.log(filesArr);
        this.setState({ files: [...filesArr] });
    }

    removeFile(f) {
        this.setState({ files: this.state.files.filter(x => x !== f) });
    }


    render() {

        return (


            <React.Fragment>


                <Form style={{ padding: '5%' }} onSubmit={this.onSubmit}>
                    <Row  className="style-addData" >
                        <Col sm='3' >
                            <label>ปีที่รับเข้า</label>
                        </Col>
                        <Col sm='6'>
                            <Year option={this.handleChangeYear} />

                        </Col>
                    </Row>
                    <Row  className="style-addData interval-top"  >
                        <Col sm='3'>
                            <label>ภาควิชา</label>
                        </Col>
                        <Col sm='6'>
                            {/* <input 
                                type='text'
                                className={this.getInputClass('year')}
                                id='year'
                                name='year'
                                onChange={this.onformChange}></input>
                            <div className='invalid-feedback'>
                                {this.getErrorMessage('year')}
                            </div> */}
                            <Faulty option={this.handleChangeFaulty} />
                        </Col>
                    </Row>
                    <Row className="style-addData interval-top" >
                        <Col sm='3'>
                            <label>ข้อมูลนักศึกษารับเข้า</label>
                        </Col>
                        <Col sm='9'>
                            <input type="file" />
                            <label className="custom-file-upload">
                                <input type="file" accept=".excel,.csv" onChange={this.onChange} />
                                <FaCloudUploadAlt style={{ color: '#FFFFFF' }} /> UPLOAD CSV FILE </label>
                            {this.state.files.map(x =>
                                <div className="file-preview" onClick={this.removeFile.bind(this, x)}>{x.name}</div>
                            )}
                        </Col>
                    </Row>
                    <div  className="style-addData "  style={{marginTop:'5%'}} >
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

export default AddNewStudent