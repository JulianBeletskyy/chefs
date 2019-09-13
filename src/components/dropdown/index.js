import React, { useState, useEffect } from 'react'
import { randomId } from '../../utils'
import cn from 'classnames'
import './dropdown.css'

const ID = randomId()

const DropDown = ({options, onClick}) => {
	const [show, setShow] = useState(false)
	useEffect(() => {
		if (show) {
			document.body.addEventListener('click', closeDropDown, {once: true})
		}
		return () => {
			document.body.removeEventListener('click', closeDropDown)
		}
	}, [show])
	const handleClick = option => () => {
		onClick(option)
		closeDropDown()
	}
	const toggleDropDown = () => {
		setShow(!show)
	}
	const closeDropDown = e => {
		if (e && e.target.closest(`#${ID}`)) {
			return
		}
		setShow(false)
		
	}
	const renderOptions = option => {
		return  (
			<div className="dropdown-item" onClick={handleClick(option)}>{option.title}</div>
		)
	}
	return (
		<div className="dropdown d-flex align-items-center" id={ID}>
			<div className="dropdown-title" onClick={toggleDropDown}>
				Menu
			</div>
			<div className={cn('dropdown-list', {show})}>
				{ options.map((option, i) => <div key={i}>{renderOptions(option)}</div>) }
			</div>
		</div>
	)
}

export default DropDown
