import  * as types from './types'
import { get, post, remove } from '../api'

export const getCart = () => dispatch => {
	return get(`cart`).then(res => {
		if (res.statusCode === 200) {
			dispatch(setCart(res.cart))
		}
		return res.statusCode === 200
	})
}

export const addToCart = mealId => dispatch => {
	return post(`cart/add`, {mealId}).then(res => {
		if (res.statusCode === 200) {
			dispatch(setCart(res.cart))
		}
		return res.statusCode === 200
	})
}

export const incrementCart = mealId => dispatch => {
	return post(`cart/increment`, {mealId}).then(res => {
		if (res.statusCode === 200) {
			dispatch(setCart(res.cart))
		}
		return res.statusCode === 200
	})
}

export const decrementCart = mealId => dispatch => {
	return post(`cart/decrement`, {mealId}).then(res => {
		if (res.statusCode === 200) {
			dispatch(setCart(res.cart))
		}
		return res.statusCode === 200
	})
}

export const removeFromCart = mealId => dispatch => {
	return remove(`cart/remove/${mealId}`).then(res => {
		if (res.statusCode === 200) {
			console.log(res.cart)
			dispatch(setCart(res.cart))
		}
		return res.statusCode === 200
	})
}

export const clearCart = () => ({
	type: types.CLEAR_CART,
})

export const setCart = cart => ({
	type: types.SET_CART,
	cart
})