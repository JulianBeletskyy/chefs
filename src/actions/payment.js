import { get, post } from '../api'

export const createCustomer = () => dispatch => {
	return get(`payment/createCustomer`).then(res => {
		console.log(res)
	})
}

export const createCutomerToken = customerId => dispatch => {
	return post(`payment/createCutomerToken`, {customerId}).then(res => {
		return res.token
	})
}

export const getCustomerSources = customerId => dispatch => {
	return get(`payment/customerSources/${customerId}`).then(res => {
		console.log(res)
	})
}