import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import user from './user.js'
import orders from './orders.js'
import meals from './meals.js'
import ui from './ui.js'
import chefs from './chefs.js'

const reducer = combineReducers({
    routing: routerReducer,
    user,
    orders,
    meals,
    chefs,
    ui,
})

export default reducer