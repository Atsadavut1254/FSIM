import * as types from "../types";

const initialState = {
    branch_list: null,
    branch_detail: null,
    loading: false,
    error: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case types.GET_BRANCH_STARTED:
            return {
                ...state,
                loading: true
            }

        case types.GET_BRANCH_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                branch_list: action.branch_list
            }

        case types.GET_BRANCH_LIST_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error
            }

        case types.GET_BRANCH_DETAIL_SUCCESS:
            return {
                ...state,
                branch_detail: action.branch_detail,
                error: null,
                loading: false
            }

        case types.GET_BRANCH_DETAIL_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error,
                branch_detail: null
            }

        default:
            return state
    }
}