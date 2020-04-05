import * as types from '../types'

const initialState = {
    department_list: null,
    department_detail: null,
    error: null,
    loading: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case types.GET_DEPT_STARTED:
            return {
                ...state,
                loading: true
            }

        case types.GET_DEPT_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                department_list: action.department_list
            }

        case types.GET_DEPT_LIST_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error
            }

        case types.GET_DEPT_DETAIL_SUCCESS:
            return {
                ...state,
                department_detail: action.department_detail,
                error: null,
                loading: false
            }

        case types.GET_DEPT_DETAIL_FAILED:
            return {
                ...state,
                department_detail: null,
                error: action.error,
                loading: false
            }

        default:
            return state
    }
}