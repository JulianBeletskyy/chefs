import { post, get } from '../api'
import Cookies from 'js-cookie'
import * as types from '../actions/types'
import { connectToUserRoom } from '../socket'

export const signup = data => dispatch => {
	return post(`auth/signup`, data).then(res => {
		if (res.statusCode === 200) {
			dispatch(setToken(res.data.token))
			dispatch(setUserKey('data', res.data.user))
			return res.data.user.role
		}
		return res.statusCode === 200
	})
}

export const login = data => dispatch => {
	return post(`auth/login`, data).then(res => {
		if (res.statusCode === 200) {
			dispatch(setToken(res.data.token))
			dispatch(setUserKey('data', res.data.user))
			connectToUserRoom(res.data.user, res.data.token)
			return res.data.user.role
		}
		return res.statusCode === 200
	})
}

export const refreshToken = () => dispatch => {
	dispatch(setUserKey('loading', true))
	return get(`auth/refreshToken`).then(res => {
		if (res.statusCode === 200) {
			dispatch(setToken(res.token))
			dispatch(setUserKey('data', res.user))
			connectToUserRoom(res.user, res.token)
		}
		dispatch(setUserKey('loading', false))
	})
}

export const logout = () => async dispatch => {
	Cookies.set('token', '')
	await dispatch(clearState())
	return Promise.resolve(true)
}

export const clearState = () => ({
	type: types.CLEAR_STATE,
})

export const setToken = token => {
	Cookies.set('token', token)
	return {
		type: types.SET_TOKEN,
		token,
	}
}

export const setUserKey = (key, data) => ({
	type: types.SET_USER_KEY,
	key,
	data,
})