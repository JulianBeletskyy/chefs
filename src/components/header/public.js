import React from 'react'
import './header.css'
import { Logo } from '../icons'
import Link from '../buttons/Link'

const HeaderPublic = () => {
  return (
    <div className="header d-flex justify-content-between align-items-center">
      <Logo />
      <div>
        <Link to="/login" title="Login" />
        <Link to="/signup" title="SignUp" />
      </div>
    </div>
  )
}

export default HeaderPublic
