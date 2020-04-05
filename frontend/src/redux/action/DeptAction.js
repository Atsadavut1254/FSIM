import api from 'axios'

import * as types from '../types'

const startGetData = () => ({
    type: types.GET_DEPT_STARTED,
})

const getDataSuccess = data => ({
    type: types.GET_DEPT_LIST_SUCCESS,
    department_list: data,
    error: null
})

const getDataFailed = error => ({
    type: types.GET_DEPT_LIST_FAILED,
    department_list: null,
    error: error
})

const getDetail = data => ({
    type: types.GET_DEPT_DETAIL_SUCCESS,
    department_detail: data,
    error: null
})

const getDetailFailed = error => ({
    type: types.GET_DEPT_DETAIL_FAILED,
    department_detail: null,
    error: error
})

export const getAllDepartment = () => dispatch => {
    dispatch(startGetData())
    api.get('/department')
        .then(res => {
            let received = res.data
            if (received.response === true) {
                dispatch(getDataSuccess(received.data))
            } else {
                dispatch(getDataFailed(received.data))
            }
        })
        .catch(error => {
            dispatch(getDataFailed(error))
        })
}

export const getDepartment = dept_id => dispatch => {
    dispatch(startGetData)
    api.get(`/department?dept_id=${dept_id}`)
        .then(res => {
            let received = res.data
            if (received.response === true) {
                dispatch(getDetail(received.data))
            } else {
                dispatch(getDetailFailed(received.data))
            }
        })
        .catch(error => {
            dispatch(getDetailFailed(error))
        })
}