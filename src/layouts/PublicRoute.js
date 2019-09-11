import React from 'react'
import { Route } from 'react-router-dom'
import Header from '../components/header/public'
import './layouts.css'

const PublicRoute = ({path, component: Component}) => {
  return (
    <div className="public h-100">
      <Header />
      <div className="container-fluid h-100">
        <Route to={path} exact component={Component} />
      </div>
    </div>
  )
}

export default PublicRoute