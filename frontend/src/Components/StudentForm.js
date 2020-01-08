import React, { Component } from "react";
import axios from 'axios'
import ApiManage from "../Class/ApiManage";

class StudentForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            imageURL: '',
            file: null,
        }

        this.handleUploadImage = this.handleUploadImage.bind(this)
    }

    handleUploadImage(ev) {
        ev.preventDefault()

        const data = new FormData()
        data.append('file', this.uploadInput.files[0])
        data.append('filename', this.fileName.value)

        let Api = new ApiManage()
        let path = Api.uploadApi()

        console.log(path)

        fetch(path, {
            method: 'POST',
            body: data,
        }).then(response => response.json())
    }

    render() {
        return (
            <React.Fragment>
                <div className="container">
                    <form onSubmit={this.handleUploadImage}>
                        <div>
                            <input ref={(ref) => { this.uploadInput = ref; }} type="file" />
                        </div>
                        <div>
                            <input ref={(ref) => { this.fileName = ref; }} type="text" placeholder="Enter the desired name of file" />
                        </div>
                        <br />
                        <div>
                            <button>Upload</button>
                        </div>
                        <img src={this.state.imageURL} alt="img" />
                    </form>
                </div>
            </React.Fragment>
        )
    }
}

export default StudentForm