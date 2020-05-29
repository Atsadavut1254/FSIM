import * as types from '../types'

import { startLoading, stopLoading } from './generalAction'
import { openModal } from './modalAction'

import axios from 'axios'


// Load Student 
const loadStudentstart = () => (
    {
        type: types.LOAD_STUDENT_DATA_START
    }
)

const loadStudentSuccess = (studentData) => (
    {
        type: types.LOAD_STUDENT_DATA_SUCCESS,
        studentData: studentData
    }
)

const loadStudentFailed = (error) => (
    {
        type: types.LOAD_STUDENT_DATA_FAILED,
        error: error
    }
)



// student List 
const loadStudentListStart = () => (
    {
        type: types.LOAD_STUDENT_LIST_START
    }
)

const loadStudentListSuccess = (list) => (
    {
        type: types.LOAD_STUDENT_LIST_SUCCESS,
        studentList: list
    }
)

const loadStudentListFailed = (error) => (
    {
        type: types.LOAD_STUDENT_LIST_FAILED,
        error: error
    }

)
// add student
const addStudentStart = () => (
    {
        type: types.ADD_STUDENT_START
    }
)

const addStudentSuccess = (result) => (
    {
        type: types.ADD_STUDENT_SUCCESS,
        actionResult: result
    }
)

const addStudentFailed = (error, result) => (
    {
        type: types.ADD_STUDENT_FAILED,
        actionResult: result,
        error: error
    }
)

// add gpax student
const addGpaxStudentStart = () => (
    {
        type: types.ADD_GPAX_STUDENT_START
    }
)

const addGpaxStudentSuccess = (result) => (
    {
        type: types.ADD_GPAX_STUDENT_SUCCESS,
        actionResult: result
    }
)

const addGpaxStudentFailed = (error, result) => (
    {
        type: types.ADD_GPAX_STUDENT_FAILED,
        actionResult: result,
        error: error
    }
)


///กราฟ
export const getStudentData = () => dispatch => {
    dispatch(startLoading())
    dispatch(loadStudentstart())
    axios.get(`/admin/student/analyze`)
        .then(res => {
            let data = res.data.data
            if (Object.keys(data) < 1) {
                dispatch(loadStudentFailed("Can not find data"))
                dispatch(stopLoading())
                return
            }
            dispatch(loadStudentSuccess(data))
            dispatch(stopLoading())
        })
        .catch(err => {
            dispatch(loadStudentFailed(err))
            dispatch(stopLoading())
        })
}


///หน้า student tracking
export const getStudentList = () => dispatch => {
    dispatch(startLoading())
    dispatch(loadStudentListStart())

    axios.get(`/admin/student/list?year=2560`)
        .then(res => {
            let data = res.data.data
            if (Object.keys(data) < 1) {
                dispatch(loadStudentListFailed("Can not find data"))
                dispatch(stopLoading())
                return
            }
            dispatch(loadStudentListSuccess(data))
            dispatch(stopLoading())
        })
        .catch(err => {
            dispatch(loadStudentListFailed(err))
            dispatch(stopLoading())
        })
}

//เพิ่มนศ.
export const addStudent = data => dispatch => {
    dispatch(startLoading())
    dispatch(addStudentStart())
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }
    axios.post('/admin/student', data,config)
        .then(res => {
            dispatch(addStudentSuccess(true))
            dispatch(getStudentData())
            dispatch(getStudentList())
            dispatch(stopLoading())
            dispatch(openModal(true, [{ text: 'บันทึกสำเร็จ', color: '#33cc33', type: true }]))

        })
        .catch(err => {
            console.error(err)
            dispatch(openModal(true, [{ text: 'บันทึกล้มเหลว กรุณาตรวจสอบการบันทึกอีกครั้ง', color: '#C0392B', type: false }]))
            dispatch(addStudentFailed(err, false))
            dispatch(stopLoading())
        })
}

//เพิ่มเกรด
export const addStudentGpax = data => dispatch => {
    dispatch(addGpaxStudentStart())
    dispatch(startLoading())
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }
    axios.post('/admin/student/academic', data,config)
        .then(res => {
            dispatch(addGpaxStudentSuccess(true))
            dispatch(getStudentData())
            dispatch(getStudentList())
            dispatch(stopLoading())
            dispatch(openModal(true, [{ text: 'บันทึกสำเร็จ', color: '#33cc33', type: true }]))

        })
        .catch(err => {
            console.error(err)
            dispatch(openModal(true, [{ text: 'บันทึกล้มเหลว กรุณาตรวจสอบการบันทึกอีกครั้ง', color: '#C0392B', type: false }]))
            dispatch(addGpaxStudentFailed(err, false))
            dispatch(stopLoading())
        })
}


