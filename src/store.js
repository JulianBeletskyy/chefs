import { createStore, applyMiddleware } from 'redux'
import reducer from './reducers'
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'react-router-redux'

import thunk from 'redux-thunk'
import promise from 'redux-promise'

export const history = createBrowserHistory()
const middleware = routerMiddleware(history)

const initialState = {}

export default createStore(reducer, initialState, applyMiddleware(middleware, thunk, promise))