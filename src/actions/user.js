import  * as types from './types'
import { put, get } from '../api'

export const updateProfile = data => dispatch => {
	return put(`user`, data).then(res => {
		if (res.statusCode === 200) {
			dispatch(updateUser(res.user))
		}
		return res.statusCode === 200
	})
}

export const updateUser = data => ({
	type: types.UPDATE_USER,
	data,
})