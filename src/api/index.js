import { API_URL } from '../config'
import store from '../store'
import { setNotify } from '../actions/ui'
import { logout } from '../actions/auth'

const makeJson = async (response, status) => {
    const json = await response.json()
    return Promise.resolve({...json, statusCode: status})
}

const responseHandler = alert => response => {
    if (response.status === 401) {
        store.dispatch(logout())
    }
    const contentType = response.headers.get('content-type')
    if (contentType && contentType.indexOf('application/json') !== -1) {
        const promise = makeJson(response, response.status)
        promise.then(({message}) => {
            if (alert && message) {
                store.dispatch(setNotify(true, message))
            }
        })
        // store.dispatch(setUiKey('onRequest', false))
        return promise
    }
    return Promise.resolve({statusCode: response.status})
}

export const getHeader = () => {
    const user = store.getState().user
    const data = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        Authorization: `Bearer ${user.token}`,
    }
    return data
}

export const get = (url, alert = false) => {
    return fetch(`${API_URL}/${url}`, {
        method: 'get',
        headers: getHeader(),
    })
    .then(responseHandler(alert))
}

export const post = (url, body, alert = true) => {
    // store.dispatch(setUiKey('onRequest', true))
    return fetch(`${API_URL}/${url}`, {
        method: 'post',
        headers: getHeader(),
        body: JSON.stringify(body)
    })
    .then(responseHandler(alert))
}

export const put = (url, body, alert = false) => {
    // store.dispatch(setUiKey('onRequest', true))
    return fetch(`${API_URL}/${url}`, {
        method: 'put',
        headers: getHeader(),
        body: JSON.stringify(body)
    })
    .then(responseHandler(alert))
}

export const remove = (url, alert = false) => {
    return fetch(`${API_URL}/${url}`, {
        method: 'delete',
        headers: getHeader()
    })
    .then(responseHandler(alert))
}

export const patch = (url, body, alert = false) => {
    return fetch(`${API_URL}/${url}`, {
        method: 'patch',
        headers: getHeader(),
        body: JSON.stringify(body)
    })
    .then(responseHandler(alert))
}

export const file = (url, body, alert = false) => {
    const user = store.getState().user
    return fetch(`${API_URL}/${url}`, {
        method: 'post',
        headers: {
            // 'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${user.token}`
        },
        body: body
    })
    .then(responseHandler(alert))
}
