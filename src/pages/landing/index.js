import React from 'react'
import { Logo } from '../../components/icons'
import './landing.css'

const Landing = () => {
  return (
    <div className="row justify-content-center align-items-center h-100">
      <div className="col-md-6 col-lg-4 text-center">
        <Logo width={200} height={200} />
      </div>
    </div>
  )
}

export default Landing
