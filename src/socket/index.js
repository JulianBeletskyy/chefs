import Socketio from 'socket.io-client'

export const connectToUserRoom = (user, token) => {
	const socket = Socketio(`${window.location.protocol}//${window.location.hostname}:6001?token=${token}`)
	// socket.emit('userLogin', {message: 'user login...'})
	socket.on('userLogin', ({message}) => {
		console.log(message)
	})

	socket.on('clientLogin', ({message}) => {
		console.log(message)
	})
}