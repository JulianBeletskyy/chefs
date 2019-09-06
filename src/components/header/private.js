import React from 'react'
import './header.css'
import { Logo } from '../icons'
import Link from '../buttons/Link'
import { useDispatch } from 'react-redux'
import { logout } from '../../actions/auth'
import { history } from '../../store'
import DropDown from '../dropdown'

const HeaderPrivate = () => {
	const dispatch = useDispatch()
	const handleLogout = () => {
		dispatch(logout()).then(() => {
			history.push('/login')
		})
	}
	const handleSelectDropdown = item => {
		switch (item.key) {
			case 'logout':
				handleLogout()
				break
			case 'profile':
				history.push('/chef-profile')
				break
			default:
				return
		}
	}
	return (
		<div className="header private d-flex justify-content-between align-items-stretch">
			<div className="d-flex align-items-center">
				<div className="mr-2">
					<Logo />
				</div>
				<span className="logo-font header-title">chefs & eaters</span>
			</div>
			<DropDown onClick={handleSelectDropdown} options={[{title: 'Profile', key: 'profile'}, {title: 'Logout', key: 'logout'}]} />
		</div>
	)
}

export default HeaderPrivate
