import React, { useState } from 'react'
import cn from 'classnames'

const randomId = () => {
	return '_' + Math.random().toString(36).substr(2, 9)
}

const TextArea = ({value, onChange, placeholder, className, label, id = randomId(), rows= 4}) => {
	let input = null
	const [active, setActive] = useState(!!value)
	const handleChange = ({target: {value} }) => {
		if (!active && value) {
			setActive(true)
		} else if (!value) {
			setActive(false)
		}
		if (onChange) {
			onChange(value)
		}
	}
	return (
		<div className="textfield-group">
			<textarea
				id={id}
				name={id}
				ref={ref => input = ref}
				value={value}
				rows={rows}
				onChange={handleChange}
				className={cn('textarea-input', {active: active})} placeholder={placeholder} />
			<label htmlFor="input" className="textfield-label">{label}</label>
			<i className="textfield-bar"></i>
		</div>
	)
}

export default TextArea