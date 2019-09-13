import React from 'react'
import { Route } from 'react-router-dom'
import Header from '../components/header/public'
import './layouts.css'
import { extension } from '../utils'

const PublicRoute = ({path, component: Component}) => {
  return (
    <div className="public h-100" style={{backgroundImage: `url(/assets/img/back.${extension()})`}}>
      <Header />
      <div className="public-content overflow-auto h-100">
	      <div className="container-fluid h-100">
	        <Route to={path} exact component={Component} />
	      </div>
      </div>
    </div>
  )
}

export default PublicRoute