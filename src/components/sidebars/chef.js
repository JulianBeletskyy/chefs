import React from 'react'
import { connect } from 'react-redux'
import './sidebars.css'

const ChefSideBar = ({user}) => {
	return (
		<div className="sidebar chef">
			<div className="logo" style={{backgroundImage: `url(${user.logo || '/assets/img/default-logo.png'})`}}>
			</div>
			<div className="chef-title logo-font">{user.firstName}</div>
		</div>
	)
}

const mapStateToProps = ({user}) => {
	return {
		user: user.data
	}
}

export default connect(mapStateToProps)(ChefSideBar)
