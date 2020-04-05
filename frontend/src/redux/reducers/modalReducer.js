import { OPEN_MODAL, CLOSE_MODAL } from '../types'

const initialState = {
    modalOpen: null,
    modalID: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case OPEN_MODAL: {
            return {
                ...state,
                modalOpen: action.modalOpen,
                modalID: action.modalID
            }
        }

        case CLOSE_MODAL: {
            return {
                ...state,
                modalOpen: action.modalOpen,
                modalID: null
            }
        }

        default:
            return state
    }
}