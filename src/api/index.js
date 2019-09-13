import { API_URL } from '../config'
import store from '../store'
import { setNotify } from '../actions/ui'
import { logout } from '../actions/auth'

const makeJson = async (response, status) => {
    const json = await response.json()
    return Promise.resolve({...json, statusCode: status})
}

const responseHandler = alert => async response => {
    if (response.status === 401) {
        store.dispatch(logout())
    }
    const contentType = response.headers.get('content-type')

    if (contentType && contentType.indexOf('application/octet-stream') !== -1) {
        const file = await response.blob()
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            console.log(reader.result)
        }
        
    }
    if (contentType && contentType.indexOf('application/json') !== -1) {
        const promise = makeJson(response, response.status)
        promise.then(({message}) => {
            if (alert && message) {
                store.dispatch(setNotify(true, message, response.status === 200 ? 'success' : 'error'))
            }
        })
        // store.dispatch(setUiKey('onRequest', false))
        return promise
    }
    return Promise.resolve({statusCode: response.status})
}

const errorHandler = error => {
    store.dispatch(setNotify(true, error.toString(), 'error'))
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
    .catch(errorHandler)
}

export const post = (url, body, alert = true) => {
    // store.dispatch(setUiKey('onRequest', true))
    return fetch(`${API_URL}/${url}`, {
        method: 'post',
        headers: getHeader(),
        body: JSON.stringify(body)
    })
    .then(responseHandler(alert))
    .catch(errorHandler)
}

export const put = (url, body, alert = true) => {
    // store.dispatch(setUiKey('onRequest', true))
    return fetch(`${API_URL}/${url}`, {
        method: 'put',
        headers: getHeader(),
        body: JSON.stringify(body)
    })
    .then(responseHandler(alert))
    .catch(errorHandler)
}

export const remove = (url, alert = false) => {
    return fetch(`${API_URL}/${url}`, {
        method: 'delete',
        headers: getHeader()
    })
    .then(responseHandler(alert))
    .catch(errorHandler)
}

export const patch = (url, body, alert = false) => {
    return fetch(`${API_URL}/${url}`, {
        method: 'patch',
        headers: getHeader(),
        body: JSON.stringify(body)
    })
    .then(responseHandler(alert))
    .catch(errorHandler)
}

export const file = (url, body, alert = false) => {
    const user = store.getState().user
    return fetch(`${API_URL}/${url}`, {
        method: 'post',
        headers: {
            'Authorization': `Bearer ${user.token}`
        },
        body: body
    })
    .then(responseHandler(alert))
    .catch(errorHandler)
}
