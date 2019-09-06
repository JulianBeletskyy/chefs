import React, { Suspense, lazy } from 'react'
import { connect } from 'react-redux'
import './App.css'
import { Switch, Redirect } from 'react-router-dom'
import PublicRoute from './layouts/PublicRoute'
import PrivateRoute from './layouts/PrivateRoute'
import Loader from './components/loader'

const Login = lazy(() => import('./pages/login'))
const Signup = lazy(() => import('./pages/signup'))
const Landing = lazy(() => import('./pages/landing'))
const Chefs = lazy(() => import('./pages/chefs'))
const Dashboard = lazy(() => import('./pages/dashboard'))
const Orders = lazy(() => import('./pages/orders'))
const Meals = lazy(() => import('./pages/meals'))
const ChefProfile = lazy(() => import('./pages/profile/chef'))

const Modal = lazy(() => import('./components/modal'))
const Notify = lazy(() => import('./components/notify'))

const App = ({dispatch}) => {
  return (
    <div className="App">
      <Suspense fallback={<Loader />}>
        <Switch>
        	<PublicRoute path="/" exact component={Landing} />
        	<PublicRoute path="/login" exact component={Login} />
        	<PublicRoute path="/signup" exact  component={Signup} />
          <PrivateRoute path="/chefs" exact type="client" component={Chefs} />
          <PrivateRoute path="/dashboard" exact type="chef" component={Dashboard} />
          <PrivateRoute path="/orders" exact type="chef" component={Orders} />
          <PrivateRoute path="/meals" exact type="chef" component={Meals} />
          <PrivateRoute path="/meals" exact type="chef" component={Meals} />
          <PrivateRoute path="/chef-profile" exact type="chef" component={ChefProfile} />
        	<Redirect to="/" />
        </Switch>
        <Modal />
        <Notify />
      </Suspense>
    </div>
  )
}

export default connect()(App)
