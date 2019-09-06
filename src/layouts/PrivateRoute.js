import React, { useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { refreshToken } from '../actions/auth'
import Loader from '../components/loader'
import Header from '../components/header/private'
import ChefSideBar from '../components/sidebars/chef'
import './layouts.css'

const PrivateRoute = ({dispatch, token, userId, role, type, component: Component, ...rest}) => {
	useEffect(() => {
		if (token && !userId) {
			dispatch(refreshToken())
		}
	}, [token, userId, dispatch])
	const render = props => {
		if (token && !userId) {
			return <Loader />
		} else if (userId) {
			if (role !== type) {
				return <Redirect to="/login" />
			}
			return  (
				<div className={`layouts private h-100 ${role}`}>
					<Header />
					<div className="container-fluid h-100 overflow-auto">
						{
							role === 'chef'
							? 	<ChefSideBar />
							: 	null
						}
						<Component {...props} />
					</div>
				</div>
			)
		}
		return <Redirect to="/login" />
	}
	return <Route {...rest} render={render} />
}

const mapStateToProps = ({user}) =>
	({
		token: user.token,
		userId: user.data.userId,
		role: user.data.role,
	})

export default connect(mapStateToProps)(PrivateRoute)