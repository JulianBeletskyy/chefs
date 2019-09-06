import React from 'react'
import cn from 'classnames'
import './buttons.css'

const BtnMain  = ({title, hoverTitle, variant, onClick}) => {
	hoverTitle = hoverTitle ? hoverTitle : title
	return (
		<span className="btn-container">
			<span className="mask">{hoverTitle}</span>
			<button className={(cn('btn-main', variant))} onClick={onClick}>{title}</button>
		</span>
	)
}

export default BtnMain
