import React from 'react'
import { Route } from 'react-router-dom'
import Header from '../components/header/public'
import './layouts.css'

const PublicRoute = props => {
	return (
		<div className="public h-100">
			<Header />
			<div className="container-fluid h-100">
				<Route {...props} exact />
			</div>
		</div>
	)
}

export default PublicRoute