import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { setNotify } from '../../actions/ui'
import cn from 'classnames'
import './notify.css'

const Notify = ({dispatch, show, level, text}) => {
	useEffect(() => {
		if (text) {
			setTimeout(() => {
				dispatch(setNotify(false))
			}, 2000)
		}
	}, [text])
	return (
		<div className={cn('notify', level, {show})}>
			{text}
		</div>
	)
}

const mapStateToProps = ({ui}) => ({
	show: ui.notify.show,
	level: ui.notify.level,
	text: ui.notify.text,
})

export default connect(mapStateToProps)(Notify)
