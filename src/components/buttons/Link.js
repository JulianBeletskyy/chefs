import React from 'react'
import { Link } from 'react-router-dom'
import cn from 'classnames'
import './buttons.css'

const CustomLink = ({title, to = '/', onClick, active}) => {
	const handleClick = e => {
		if (onClick) {
			e.preventDefault()
			onClick()
		}
	}
	return (
		<span className="link-wrapper">
			<span className="fake-link">{title}</span>
			<Link to={to} className={cn('link', {active})} onClick={handleClick}>{title}</Link>
		</span>
	)
}

export default CustomLink
