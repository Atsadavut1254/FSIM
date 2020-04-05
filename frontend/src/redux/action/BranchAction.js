import api from 'axios'

import * as types from "../types";

const startGetData = () => ({
    type: types.GET_BRANCH_STARTED
})

const getDataSuccess = data => ({
    type: types.GET_BRANCH_LIST_SUCCESS,
    branch_list: data,
    error: null
})

const getDataFailed = error => ({
    type: types.GET_BRANCH_LIST_FAILED,
    branch_list: null,
    error: error
})

const getDetail = data => ({
    type: types.GET_BRANCH_DETAIL_SUCCESS,
    branch_detail: data,
    error: null
})

const getDetailFailed = error => ({
    type: types.GET_BRANCH_DETAIL_FAILED,
    branch_detail: null,
    error: error
})

export const getAllBranch = () => (dispatch)=> {
    dispatch(startGetData())
    api.get('/branch')
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

export const getBranchDetail = branch_id => dispatch => {
    dispatch(startGetData())
    api.get(`/branch?branch_id=${branch_id}`)
    .then(res => {
        let received = res.data
        if(received.response === true){
            dispatch(getDetail(received.data))
        }else{
            dispatch(getDetailFailed(received.data))
        }
    })
    .catch(error => {
        dispatch(getDetailFailed(error))
    })
}


