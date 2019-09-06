import  * as types from './types'
import { get } from '../api'

export const getChefs = () => dispatch => {
	return get(`user/chefs`).then(res => {
		if (res.statusCode === 200) {
			dispatch(setChefsKey('list', res.chefs))
		}
		return res.statusCode === 200
	})
}

export const setChefsKey = (key, data) => ({
	type: types.SET_CHEFS_KEY,
	key,
	data,
})