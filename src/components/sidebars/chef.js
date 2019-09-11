import React from 'react'
import { connect } from 'react-redux'
import './sidebars.css'
import Link from '../buttons/Link'

const ChefSideBar = ({user}) => {
	return (
		<div className="sidebar chef h-100">
			<div className="logo" style={{backgroundImage: `url(${user.logo || '/assets/img/default-logo.png'})`}}>
			</div>
			<div className="chef-title logo-font">{user.firstName}</div>
			<div>
				<div className="mb-3">
					<Link to="/dashboard" title="Dashboard" />
				</div>
				<div className="mb-3">
					<Link to="/meals" title="Meals" />
				</div>
				<div className="mb-3">
					<Link to="/orders" title="Orders" />
				</div>
			</div>
		</div>
	)
}

const mapStateToProps = ({user}) => {
	return {
		user: user.data
	}
}

export default connect(mapStateToProps)(ChefSideBar)
