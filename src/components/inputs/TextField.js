import React, {useState, useEffect} from 'react'
import cn from 'classnames'
import './inputs.css'

const randomId = () => {
	return '_' + Math.random().toString(36).substr(2, 9)
}

const TextField = ({type = 'text', value, onChange, placeholder, className, label, id = randomId(), inputRef, isValid = true, errorMessage}) => {
	let input = null
	const [active, setActive] = useState(!!value)
	const [readOnly, setReadOnly] = useState(true)
	useEffect(() => {
		if (value && !active) {
			setActive(true)
		}
	}, [value])
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
	const handleFocus = () => {
		if (readOnly) {
			setReadOnly(false)
		}
	}
	const handleRef = ref => {
		input = ref
		if (inputRef) {
			inputRef(ref)
		}
	}
	return (
		<div className="textfield-group">
			<input
				id={id}
				name={id}
				ref={handleRef}
				type={type}
				value={value}
				readOnly={readOnly}
				onFocus={handleFocus}
				onChange={handleChange}
				className={cn('textfield-input', className, {active: active, invalid: !isValid})} placeholder={placeholder} />
			<label htmlFor="input" className="textfield-label">{label}</label>
			<i className="textfield-bar"></i>
			{errorMessage && <span className="error-message">{errorMessage}</span>}
		</div>
	)
}

export default TextField