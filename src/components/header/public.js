import React from 'react'
import './header.css'
import { Logo } from '../icons'
import Link from '../buttons/Link'


const HeaderPublic = () => {
	return (
		<div className="header d-flex justify-content-between align-items-center">
			<div className="d-flex align-items-center">
				<div className="mr-2">
					<Logo />
				</div>
				<span className="logo-font header-title">chefs & eaters</span>
			</div>
			<div>
				<Link to="/login" title="Login" />
				<Link to="/signup" title="SignUp" />
			</div>
		</div>
	)
}

export default HeaderPublic
