import * as types from './types'
import { post, get, put } from '../api'
import { clearCart } from './cart'

export const getOrders = () => dispatch => {
	return get(`order`).then(res => {
		if (res.statusCode === 200) {
			dispatch(setOrdersKey('lists', res.orders))
		}
		return res.statusCode === 200
	})
}

export const checkout = data => dispatch => {
	return post(`order/checkout`, data).then(res => {
		if (res.statusCode === 200) {
			dispatch(clearCart())
		}
		return res.statusCode === 200
	})
}

export const changeOrderStatus = (orderId, status) => dispatch => {
	return put(`order/status/${orderId}`, {status}).then(res => {
		if (res.statusCode === 200) {
			dispatch(updateOrder(orderId, res.order))
		}
		return res.statusCode === 200
	})
}

export const addOrder = order => ({
	type: types.ADD_ORDER,
	order,
})

export const updateOrder = (orderId, order) => ({
	type: types.UPDATE_ORDER,
	orderId,
	order,
})

export const setOrdersKey = (key, data) => ({
	type: types.SET_ORDERS_KEY,
	key,
	data,
})

export const reorderOrdersList = (key, startIndex, endIndex) => ({
	type: types.REORDER_ORDERS_LIST,
	key,
	startIndex,
	endIndex,
})

export const moveOrdersList = (srcKey, destKey, srcIndex, destIndex) => ({
	type: types.MOVE_ORDER_LIST,
	srcKey,
	destKey,
	srcIndex,
	destIndex,
})