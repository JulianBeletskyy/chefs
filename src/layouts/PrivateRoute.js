import React, { useEffect, lazy } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { refreshToken } from '../actions/auth'
import Loader from '../components/loader'
import Header from '../components/header/private'
import './layouts.css'

const ChefSideBar = lazy(() => import('../components/sidebars/chef'))
const Cart = lazy(() => import('../components/cart'))

const PrivateRoute = ({dispatch, token, userId, isLoading, role, type, component: Component, ...rest}) => {
  useEffect(() => {
    if (token && !userId && !isLoading) {
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
        <div className={`layouts private h-100 ${role}`} style={{backgroundImage: `url(/assets/img/back.jpg)`}}>
          <Header />
          <div className="container-fluid h-100 overflow-auto layout-content">
            <div className="row h-100">
              {
                role === 'chef'
                &&  <div className="col-sm-3">
                    <ChefSideBar />
                  </div>
              }
              <div className="col-sm-9">
                <Component {...props} />
              </div>
              {
                role === 'client'
                &&  <div className="col-sm-3">
                    <Cart />
                  </div>
              }
            </div>
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
    isLoading: user.loading,
  })

export default connect(mapStateToProps)(PrivateRoute)