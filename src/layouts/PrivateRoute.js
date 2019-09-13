import React, { useEffect, lazy } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { refreshToken } from '../actions/auth'
import Loader from '../components/loader'
import Header from '../components/header/private'
import './layouts.css'

const ChefSideBar = lazy(() => import('../components/sidebars/chef'))
const Cart = lazy(() => import('../components/cart'))

const PrivateRoute = ({dispatch, token, user, isLoading, type, component: Component, ...rest}) => {
  useEffect(() => {
    if (token && !user.userId && !isLoading) {
      dispatch(refreshToken())
    }
  }, [token, user.userId, dispatch])
  const render = props => {
    if (token && !user.userId) {
      return <Loader />
    } else if (user.userId) {
      if (user.role !== type) {
        return <Redirect to="/login" />
      }
      return  (
        <div className={`layouts private h-100 ${user.role}`} style={{backgroundImage: `url(/assets/img/back.jpg)`}}>
          <Header />
          <div className="container-fluid h-100 overflow-auto layout-content pt-3">
            <div className="row h-100">
              {
                user.role === 'chef'
                &&  <div className="col-lg-3 d-none d-lg-block">
                    <ChefSideBar user={user} />
                  </div>
              }
              <div className="col-lg-9 col-12">
                <Component {...props} />
              </div>
              {
                user.role === 'client'
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
    user: user.data,
    isLoading: user.loading,
  })

export default connect(mapStateToProps)(PrivateRoute)