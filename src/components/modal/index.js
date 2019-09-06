import React from 'react'
import { connect } from 'react-redux'
import Modal from 'react-responsive-modal'
import { toggleModal, closeModal } from '../../actions/ui'
import './modal.css'

const CustomModal = ({dispatch, show, content, title}) => {
	const onCloseModal = () => {
		dispatch(closeModal())
	}
	const clearModal = () => {
		dispatch(toggleModal())
	}
	const el = content ? React.cloneElement(content, {closeMe: onCloseModal}) : null
	return (
		<Modal open={show} onClose={onCloseModal} onExited={clearModal} classNames={{modal: 'modal-body'}} center>
			{ title && <h3>{title}</h3> }
          	{ el }
        </Modal>
	)
}

const mapStateToProps = ({ui}) => ({
	show: ui.modal.show,
	content: ui.modal.content,
	title: ui.modal.title,
})

export default connect(mapStateToProps)(CustomModal)