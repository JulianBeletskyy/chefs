import React, {useState} from 'react'
import './sidebars.css'
import Link from '../buttons/Link'

let input = null

const ChefSideBar = ({user}) => {
	const [,page] = window.location.pathname.split('/')
	return (
		<div className="sidebar chef">
			<div className="chef-title logo-font mb-3 text-center py-3">{user.bussinesName}</div>
			<div className="pl-3">
				<div className="mb-3 sidebar-link">
					<Link to="/dashboard" title="Dashboard" active={page === 'dashboard'} />
				</div>
				<div className="mb-3 sidebar-link">
					<Link to="/meals" title="Meals" active={page === 'meals'} />
				</div>
				<div className="mb-3 sidebar-link">
					<Link to="/orders" title="Orders" active={page === 'orders'} />
				</div>
			</div>
		</div>
	)
}

export default ChefSideBar
