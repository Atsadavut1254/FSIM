import {OPEN_MODAL, CLOSE_MODAL} from '../types'

export const openModal = (modalOpen= true, modalID = "None") => ({
    type: OPEN_MODAL,
    modalOpen,
    modalID
})

export const closeModal = (modalOpen = false) => ({
    type: CLOSE_MODAL,
    modalOpen
})