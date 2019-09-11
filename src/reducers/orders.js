import * as types from '../actions/types'

const initialState = {
  lists: {
    pending: [],
    accepted: [],
    preparing: [],
    delivered: []
  },
}

const orders = (orders = initialState, action = {}) => {
  switch (action.type) {
    case types.SET_ORDERS_KEY:
      return Object.assign({}, orders, {
        [action.key]: action.data,
      })
    case types.ADD_ORDER:
      return Object.assign({}, orders, {
        lists: {
          ...orders.lists,
          [action.order.status]: [action.order, ...orders.lists[action.order.status]]
        }
      })
    case types.UPDATE_ORDER:
      return Object.assign({}, orders, {
        lists: {
          ...orders.lists,
          [action.order.status]: orders.lists[action.order.status].map(order => {
            if (order.orderId === action.order.orderId) {
              order = action.order
            }
            return order
          })
        }
      })
    case types.REORDER_ORDERS_LIST:
      const { key, startIndex, endIndex } = action
      const list = Array.from(orders.lists[key])
      const [removedReorder] = list.splice(startIndex, 1)
      list.splice(endIndex, 0, removedReorder)
      return Object.assign({}, orders, {
        lists: {
          ...orders.lists,
          [key]: list,
        },
      })
    case types.MOVE_ORDER_LIST:
      const {srcKey, destKey, srcIndex, destIndex} = action
      const srcList = Array.from(orders.lists[srcKey])
      const destList = Array.from(orders.lists[destKey])
      const [removedMove] = srcList.splice(srcIndex, 1)
      destList.splice(destIndex, 0, removedMove)
      return Object.assign({}, orders, {
        lists: {
          ...orders.lists,
          [srcKey]: srcList,
          [destKey]: destList,
        }
      })
    case types.CLEAR_STATE:
      return initialState
    default:
      return orders
  }
}

export default orders
