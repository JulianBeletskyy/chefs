import  * as types from './types'

export const toggleModal = (show = false, title = '', content = null) => ({
	type: types.TOGGLE_MODAL,
	data: {show, title, content},
})

export const closeModal = () => ({
	type: types.CLOSE_MODAL,
})

export const setNotify = (show, text, level = 'success') => ({
	type: types.SET_NOTIFY,
	data: {show, text, level}
})