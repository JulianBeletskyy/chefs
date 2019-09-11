import React from 'react'
import Socketio from 'socket.io-client'
import { setNotify, toggleModal } from '../actions/ui'
import { addOrder } from '../actions/orders'
import store, { history } from '../store'
import Link from '../components/buttons/Link'

export const connectToUserRoom = (user, token) => {
	const socket = Socketio(`${window.location.protocol}//${window.location.hostname}:6001?token=${token}`)
	// socket.emit('userLogin', {message: 'user login...'})
	socket.on('userLogin', ({message}) => {
		console.log(message)
	})

	socket.on('clientLogin', ({message}) => {
		console.log(message)
	})

	socket.on('newOrderCreated', ({order, message}) => {
		const [, page] = window.location.pathname.split('/')
		if (page === 'orders') {
			order.newest = true
			store.dispatch(addOrder(order))
		}
		store.dispatch(setNotify(true,
			<div className="d-flex align-items-center justify-content-center">
				<Link title={message} onClick={resolveNewOrder(order, page)} />
			</div>, 'success', 0))
	})

	socket.on('orderChangeStatus', ({order, message}) => {
		store.dispatch(setNotify(true, message))
	})
}

const resolveNewOrder = (order, page) => () => {
	if (page === 'orders') {
		store.dispatch(toggleModal(true, order.orderId, <div></div>))
	} else {
		history.push('/orders')
	}
	store.dispatch(setNotify(false, '', 'success'))
}