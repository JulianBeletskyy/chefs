import React, { Suspense, lazy } from 'react'
import './App.css'
import { Switch, Redirect } from 'react-router-dom'
import PublicRoute from './layouts/PublicRoute'
import PrivateRoute from './layouts/PrivateRoute'
import Loader from './components/loader'

const pages = [
  {
    component: lazy(() => import('./pages/chefs')),
    role: 'client',
    url: '/chefs'
  }, {
    component: lazy(() => import('./pages/chef')),
    role: 'client',
    url: '/chef/:chefId'
  }, {
    component: lazy(() => import('./pages/dashboard')),
    role: 'chef',
    url: '/dashboard'
  }, {
    component: lazy(() => import('./pages/orders')),
    role: 'chef',
    url: '/orders'
  }, {
    component: lazy(() => import('./pages/meals')),
    role: 'chef',
    url: '/meals'
  }, {
    component: lazy(() => import('./pages/profile/chef')),
    role: 'chef',
    url: '/chef-profile'
  }
]

const Login = lazy(() => import('./pages/login'))
const Signup = lazy(() => import('./pages/signup'))
const Landing = lazy(() => import('./pages/landing'))

const Modal = lazy(() => import('./components/modal'))
const Notify = lazy(() => import('./components/notify'))

const App = () => {
  return (
    <div className="App">
      <Suspense fallback={<Loader />}>
        <Switch>
        	<PublicRoute path="/" exact component={Landing} />
        	<PublicRoute path="/login" exact component={Login} />
        	<PublicRoute path="/signup" exact component={Signup} />
          { 
            pages.map(({url, role, component}, i) =>
              <PrivateRoute key={i} path={url} exact type={role} component={component} />)
          }
        	<Redirect to="/" />
        </Switch>
        <Modal />
        <Notify />
      </Suspense>
    </div>
  )
}

export default App
