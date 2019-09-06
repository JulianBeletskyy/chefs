import * as types from '../actions/types'
import Cookies from 'js-cookie'

const initialState = {
    token: Cookies.get('token'),
    data: {},
}

const user = (user = initialState, action = {}) => {
    switch (action.type) {
        case types.SET_TOKEN:
            return Object.assign({}, user, {
                token: action.token,
            })
        case types.SET_USER_KEY:
            return Object.assign({}, user, {
                [action.key]: action.data,
            })
        case types.UPDATE_USER:
            return Object.assign({}, user, {
                data: {...user.data, ...action.data}
            })
        case types.CLEAR_STATE:
            return {...initialState, token: ''}
        default:
            return user
    }
}

export default user
