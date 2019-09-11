import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { setNotify } from '../../actions/ui'
import cn from 'classnames'
import './notify.css'

const CloseIcon = ({onClick}) => {
	return (
		<div className="close-notify" onClick={onClick}>
			<svg className="styles_closeIcon__1QwbI" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 36 36">
				<path d="M28.5 9.62L26.38 7.5 18 15.88 9.62 7.5 7.5 9.62 15.88 18 7.5 26.38l2.12 2.12L18 20.12l8.38 8.38 2.12-2.12L20.12 18z">
				</path>
			</svg>
		</div>
	)
}

let timeout = null

const Notify = ({dispatch, show, level, text, delay}) => {
	useEffect(() => {
		if (text) {
			if (delay) {
				if (timeout) {
					clearTimeout(timeout)	
				}
				timeout = setTimeout(() => {
					dispatch(setNotify(false, '', level))
				}, delay)
			}
		}
	}, [text])
	return (
		<div className={cn('notify', level, {show})}>
			{text}
			<CloseIcon onClick={() => dispatch(setNotify(false, '', level))} />
		</div>
	)
}

const mapStateToProps = ({ui}) => ({
	show: ui.notify.show,
	level: ui.notify.level,
	text: ui.notify.text,
	delay: ui.notify.delay,
})

export default connect(mapStateToProps)(Notify)
