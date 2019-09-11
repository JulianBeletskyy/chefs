import React from 'react'
import cn from 'classnames'
import './buttons.css'

const BtnMain  = ({title, variant, onClick, className}) => {
	return (
		<button className={(cn('bubbly-button', variant))} onClick={onClick}>{title}</button>
	)
}

export default BtnMain
