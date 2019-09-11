import * as types from '../actions/types'

const initialState = {
  items: [],
  delivery: false,
  deliveryPrice: 0,
  total: 0,
  chefId: null,
}

const cart = (cart = initialState, action = {}) => {
  switch (action.type) {
    case types.SET_CART:
      return Object.assign({}, cart, action.cart)
    case types.CLEAR_CART:
      return initialState
    case types.CLEAR_STATE:
      return initialState
    default:
      return cart
  }
}

export default cart