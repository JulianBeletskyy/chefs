import * as types from '../actions/types'

const initialState = {
    modal: {
    	show: false,
    	content: null,
    	title: ''
    },
    notify: {
        show: false,
        level: 'success',
        text: '',
    }
}

const ui = (ui = initialState, action = {}) => {
    switch (action.type) {
        case types.TOGGLE_MODAL:
            return Object.assign({}, ui, {
                modal: action.data,
            })
        case types.CLOSE_MODAL:
            return Object.assign({}, ui, {
                modal: {...ui.modal, show: false},
            })
        case types.SET_NOTIFY:
            return Object.assign({}, ui, {
                notify: {...ui.notify, ...action.data}
            })
        default:
            return ui
    }
}

export default ui
