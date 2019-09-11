import React from 'react'
import './inputs.css'

const CheckBox = ({onChange, value}) => {
  const handleChange = ({target: {checked}}) => {
    onChange(checked)
  }
  return (
    <div>
      <input className='apple-switch' checked={value} onChange={handleChange} type='checkbox' />
    </div>
  )
}

export default CheckBox
