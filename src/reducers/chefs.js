import * as types from '../actions/types'

const initialState = {
    list: [],
    chef: {},
}

const chefs = (chefs = initialState, action = {}) => {
    switch (action.type) {
        case types.SET_CHEFS_KEY:
            return Object.assign({}, chefs, {
                [action.key]: action.data,
            })
        case types.CLEAR_STATE:
            return initialState
        default:
            return chefs
    }
}

export default chefs
